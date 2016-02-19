package languagementor.db.api.google;

import languagementor.db.api.google.data.CollectionInfo;
import com.google.appengine.repackaged.com.google.gson.Gson;
import com.google.appengine.repackaged.org.apache.commons.codec.digest.DigestUtils;
import com.google.gdata.client.spreadsheet.SpreadsheetService;
import com.google.gdata.data.spreadsheet.Cell;
import com.google.gdata.data.spreadsheet.CellEntry;
import com.google.gdata.data.spreadsheet.CellFeed;
import com.google.gdata.data.spreadsheet.SpreadsheetEntry;
import com.google.gdata.data.spreadsheet.WorksheetEntry;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import languagementor.db.api.IApi;
import languagementor.db.api.data.ICollectionData;
import languagementor.db.api.data.ICollectionInfo;
import languagementor.db.api.google.data.CollectionData;
import languagementor.db.api.google.data.PhraseData;
import languagementor.db.api.google.data.PhraseTranslationData;
import languagementor.db.api.google.data.PhraseTranslationTargetData;
import org.springframework.stereotype.Component;

@Component
public class SpreadsheetApi implements IApi {

	private TokenManager _tokenManager;
	private SpreadsheetService _service;

	private URL _entryURL;

	private Gson _gson;

	public void setApplicationName(String value) {
		_service = new SpreadsheetService(value);
	}

	public void setApplicationId(String value) throws Exception {
		_entryURL = new URL("https://spreadsheets.google.com/feeds/spreadsheets/".concat(value));
	}

	public void setTokenManager(TokenManager value) {
		_tokenManager = value;
	}

	public ICollectionInfo[] getCollectionList() throws Exception {
		_service.setHeader("Authorization", "Bearer " + _tokenManager.getAccessToken());
		SpreadsheetEntry spreadsheet = _service.getEntry(_entryURL, SpreadsheetEntry.class);
		List<WorksheetEntry> worksheetEntryList = spreadsheet.getWorksheets();
		ICollectionInfo[] collectionInfoList = new ICollectionInfo[worksheetEntryList.size()];
		int c = 0;

		for(WorksheetEntry worksheetEntry : worksheetEntryList) {
			collectionInfoList[c++] = new CollectionInfo(worksheetEntry.getTitle().getPlainText());
		}

		return collectionInfoList;
	}

	public ICollectionData getCollection(String collectionId) throws Exception {
		_service.setHeader("Authorization", "Bearer " + _tokenManager.getAccessToken());
		SpreadsheetEntry spreadsheet = _service.getEntry(_entryURL, SpreadsheetEntry.class);
		List<WorksheetEntry> worksheetEntryList = spreadsheet.getWorksheets();

		String collectionTitle = null;

		for(WorksheetEntry worksheetEntry : worksheetEntryList) {
			collectionTitle = worksheetEntry.getTitle().getPlainText();

			if(DigestUtils.md5Hex(collectionTitle).equals(collectionId)) {
				List<PhraseTranslationData> collection = getPhraseList(worksheetEntry.getCellFeedUrl());

				return new CollectionData(collectionId, collectionTitle, collection);
			}
		}

		throw new Exception("Missing collection");
	}

	private List<PhraseTranslationData> getPhraseList(URL feedUrl) throws Exception {
		CellFeed feed = null;

		do {
			try {
				feed = _service.getFeed(feedUrl, CellFeed.class);
				break;
			} catch(Exception e) {
			}
		} while(true);

		return buildTranslationList(feed);
	}

	private PhraseData createPhrase(String[] data, int startIndex) {
		String phrase = data[startIndex];
		String phonetic = data[startIndex + 1];
		String audio = data[startIndex + 2];

		return phrase == null ? null : new PhraseData(phrase, phonetic, audio);
	}

	private void expandPhraseTranslationDataList(List<PhraseTranslationData> translationList, String[] row) {
		PhraseTranslationData phraseTranslationData;

		if(row[0] != null) {
			phraseTranslationData = new PhraseTranslationData(createPhrase(row, 0));
			translationList.add(phraseTranslationData);
		} else {
			phraseTranslationData = translationList.get(translationList.size() - 1);
		}

		PhraseData targetPhraseData = createPhrase(row, 3);
		PhraseData sourceExampleData = createPhrase(row, 6);
		PhraseData targetExampleData = createPhrase(row, 9);

		PhraseTranslationTargetData translationTargetData = new PhraseTranslationTargetData(targetPhraseData, sourceExampleData, targetExampleData);
		phraseTranslationData.getTranslationTargetList().add(translationTargetData);
	}

	private List<PhraseTranslationData> buildTranslationList(CellFeed feed) throws Exception {
		List<PhraseTranslationData> translationList = new ArrayList<PhraseTranslationData>();

		int rowIndex;
		int colIndex;
		int prevRowIndex = 1;

		String[] row = new String[12];

		for(CellEntry entry : feed.getEntries()) {
			Cell c = entry.getCell();

			colIndex = c.getCol();
			rowIndex = c.getRow();

			if(rowIndex != prevRowIndex) {
				expandPhraseTranslationDataList(translationList, row);
				prevRowIndex = rowIndex;

				for(int i = 0; i < row.length; ++i) {
					row[i] = null;
				}
			}

			row[colIndex - 1] = c.getValue();
		}

		expandPhraseTranslationDataList(translationList, row);

		return translationList;
	}
}
