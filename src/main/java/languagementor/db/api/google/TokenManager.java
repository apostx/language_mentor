package languagementor.db.api.google;

import com.google.appengine.api.urlfetch.HTTPMethod;
import com.google.appengine.api.urlfetch.HTTPRequest;
import com.google.appengine.api.urlfetch.URLFetchServiceFactory;
import com.google.appengine.repackaged.com.google.gson.Gson;
import java.net.URL;
import java.net.URLEncoder;

public class TokenManager {

	static private final String TOKEN_URL = "https://www.googleapis.com/oauth2/v3/token";
	static private final String ENC = "UTF-8";

	private String _refreshToken;
	private String _clientId;
	private String _clientSecret;

	private final Gson _gson = new Gson();
	private TokenData _tokenData = new TokenData();

	private long _tokenTimeStamp = 0;

	public void setRefreshToken(String value) {
		_refreshToken = value;
	}

	public void setClientId(String value) {
		_clientId = value;
	}

	public void setClientSecret(String value) {
		_clientSecret = value;
	}

	public String getAccessToken() throws Exception {
		init();
		return _tokenData.access_token;
	}

	private void init() throws Exception {
		long currentTimeStamp = System.currentTimeMillis();

		if(getTokenTimeout() <= (currentTimeStamp - _tokenTimeStamp)) {
			_tokenTimeStamp = currentTimeStamp;
			refreshAccessToken();
		}
	}

	private void refreshAccessToken() throws Exception {
		String payload = "client_secret=$client_secret&grant_type=refresh_token&refresh_token=$refresh_token&client_id=$client_id";
		payload = payload.replace("$client_secret", URLEncoder.encode(_clientSecret, ENC));
		payload = payload.replace("$refresh_token", URLEncoder.encode(_refreshToken, ENC));
		payload = payload.replace("$client_id", URLEncoder.encode(_clientId, ENC));

		HTTPRequest request = new HTTPRequest(new URL(TOKEN_URL), HTTPMethod.POST);
		request.setPayload(payload.getBytes(ENC));

		String stringData = new String(URLFetchServiceFactory.getURLFetchService().fetch(request).getContent(), ENC);

		_tokenData = _gson.fromJson(stringData, TokenData.class);
	}

	private int getTokenTimeout() {
		return _tokenData.expires_in * 1000;
	}
}
