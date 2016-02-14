package languagementor.controller;

import com.google.appengine.repackaged.com.google.gson.Gson;
import languagementor.db.api.IApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class LanguageController {

	@Autowired
	@Qualifier("databaseApi")
	private IApi _databaseApi;
	
	@RequestMapping(value="/{collectionId}", method=RequestMethod.GET)
	public String collection(@PathVariable String collectionId) {
		return "redirect:/#/" + collectionId;
	}

	@RequestMapping(value="/service.json", method=RequestMethod.GET, produces="application/json; charset=UTF-8")
	@ResponseBody
	public String collectionListService() throws Exception {
		Gson gson=new Gson();
		return gson.toJson(_databaseApi.getCollectionList());
	}

	@RequestMapping(value="/{collectionId}/service.json", method=RequestMethod.GET, produces="application/json; charset=UTF-8")
	@ResponseBody
	public String collectionService(@PathVariable String collectionId) throws Exception {
		Gson gson=new Gson();
		return gson.toJson(_databaseApi.getCollection(collectionId));
	}
}
