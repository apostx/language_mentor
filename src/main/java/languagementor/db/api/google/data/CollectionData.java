package languagementor.db.api.google.data;

import com.google.appengine.repackaged.com.google.gson.annotations.SerializedName;
import java.util.List;
import languagementor.db.api.data.ICollectionData;

public class CollectionData implements ICollectionData {

	@SerializedName("id")
	private final String _id;

	@SerializedName("title")
	private final String _title;

	@SerializedName("collection")
	private final List<PhraseTranslationData> _collection;

	public String getId() {
		return _id;
	}

	public String getTitle() {
		return _title;
	}

	public List<PhraseTranslationData> getCollection() {
		return _collection;
	}

	public CollectionData(String id, String title, List<PhraseTranslationData> collection) {
		_id = id;
		_title = title;
		_collection = collection;
	}
}
