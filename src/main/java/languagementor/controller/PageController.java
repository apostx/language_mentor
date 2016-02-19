package languagementor.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class PageController {

	@RequestMapping(value = "/{collectionId:[a-z0-9]{32}}", method = RequestMethod.GET)
	public String collection(@PathVariable String collectionId) {
		return "redirect:/#/" + collectionId;
	}
}
