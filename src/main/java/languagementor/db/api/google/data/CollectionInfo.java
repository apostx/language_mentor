package languagementor.db.api.google.data;

import com.google.appengine.repackaged.com.google.gson.annotations.SerializedName;
import com.google.appengine.repackaged.org.apache.commons.codec.digest.DigestUtils;
import languagementor.db.api.data.ICollectionInfo;

public class CollectionInfo implements ICollectionInfo {

	@SerializedName("id")
	private final String _id;
	
	@SerializedName("title")
	private final String _title;

	public CollectionInfo(String title) {
		_id = DigestUtils.md5Hex(title);
		_title = title;
	}

	public String getTitle() {
		return _title;
	}

	public String getId() {
		return _id;
	}
}
