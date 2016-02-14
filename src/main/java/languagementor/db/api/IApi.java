package languagementor.db.api;

import languagementor.db.api.data.ICollectionInfo;
import languagementor.db.api.data.ICollectionData;
import org.springframework.stereotype.Service;

@Service
public interface IApi {

	ICollectionInfo[] getCollectionList() throws Exception;

	ICollectionData getCollection(String collectionId) throws Exception;
}
