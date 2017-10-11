package com.xiaoma.universe.common.api;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.http.Consts;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.config.RequestConfig.Builder;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpDelete;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.conn.ssl.TrustStrategy;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.ssl.SSLContextBuilder;   
import org.slf4j.Logger; 
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.xiaoma.rest.authentication.UniverseSession;
import com.xiaoma.universe.common.exception.UserNotFoundAjaxException;
import com.xiaoma.universe.common.exception.UserNotFoundException;
import com.xiaoma.universe.common.utils.HttpClientUtils;
import com.xiaoma.universe.common.utils.PropertiesUtils;
import com.xiaoma.universe.common.utils.ResponseData;
import com.xiaoma.universe.userlogin.controller.UserVO;

public class ApiClient {
	public static final String FORMAT_DEFAULT = "";
	public static final String FORMAT_AJAX = "ajax";
	public static final int connTimeout = 10000;
	public static final int readTimeout = 80000;
	public static final String charset = "UTF-8";
	public static final String AUTH_API_REFRESH_TOKEN_URL = PropertiesUtils.getString("auth_api_refresh_token_url");
	public static final String AUTH_API_REFRESH_TOKEN_URL_HTTPS = PropertiesUtils
			.getString("auth_api_refresh_token_url_https");
	private static HttpClient client = null;

	static {
		PoolingHttpClientConnectionManager cm = new PoolingHttpClientConnectionManager();
		cm.setMaxTotal(128);
		cm.setDefaultMaxPerRoute(128);
		client = HttpClients.custom().setConnectionManager(cm).build();
	}

	private static final Logger logger = LoggerFactory.getLogger(ApiClient.class);
	public static long REFRESH_TAG = 86400; // 秒

	public static AccessToken token = null;
	public static String url = ApiPropertiesUtils.getString("kong_url");
	public static String client_id = ApiPropertiesUtils.getString("kong_client_id");
	public static String client_secret = ApiPropertiesUtils.getString("kong_client_secret");

	public static void refreshToken() {
		Map<String, String> params = new HashMap<String, String>();
		// 必要参数
		params.put("client_id", client_id);
		params.put("client_secret", client_secret);
		params.put("grant_type", "client_credentials");

		// 是否配置了request_host，如果配置了kong请求走host 否则走path
		Map<String, String> headers = new HashMap<String, String>();

		try {
			// 发送请求
			ResponseData backdata = postNoToken(url, params, headers, connTimeout, readTimeout);
			if (backdata.getCode() != HttpServletResponse.SC_OK) {
				token = null;
				return;
			}

			// 封装返回结果
			ObjectMapper objectMapper = new ObjectMapper();
			objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
			token = (AccessToken) objectMapper.readValue(backdata.getBackData(), AccessToken.class);
			if (token != null && !StringUtils.isBlank(token.getAccess_token())) {
				Date dateStart = new Date();
				long temp = token.getExpires_in() * 1000L;
				Date dateEnd = new Date(dateStart.getTime() + temp);
				token.setCreate_dt(dateStart);
				token.setExpires_dt(dateEnd);
			} else {
				token = null;
			}

		} catch (Exception e) {
			token = null;
			e.printStackTrace();
		}
		if (token == null) {
			logger.error("refresh token error!!! check client_info and kong server!!");
		}
	}

	public static String getUserOrAppToken(HttpServletRequest request) {

		String tokenStr = getToken(request);
		if (!StringUtils.isBlank(tokenStr)) {
			return tokenStr;
		}
		if (token == null) {
			refreshToken();
		} else {
			Date dateNow = new Date();
			long timelong = (token.getExpires_dt().getTime() - dateNow.getTime()) / 1000;
			if (timelong < REFRESH_TAG) {
				refreshToken();
			}
		}
		if (token != null) {
			return token.getAccess_token();
		} else {
			return "notoken";
			// throw new Exception("初始化token失败");
		}
	}

	public static void initToken(Map<String, String> reqHeaders) {
		if (token == null) {
			refreshToken();
		} else {
			Date dateNow = new Date();
			long timelong = (token.getExpires_dt().getTime() - dateNow.getTime()) / 1000;
			if (timelong < REFRESH_TAG) {
				refreshToken();
			}
		}
		if (token != null) {
			reqHeaders.put("Authorization", "bearer " + token.getAccess_token());
		} else {
			logger.error("refresh token error!!! check client_info and kong server!!");
			// throw new Exception("初始化token失败");
		}
	}

	public static ResponseData post(String url, Map<String, String> params, Map<String, String> headers) {
		return post(url, params, headers, "", connTimeout, readTimeout);
	}

	public static ResponseData post(String url, Map<String, String> params, Map<String, String> headers,
			HttpServletRequest request, String format) {
		String token = getToken(request);
		if (headers == null) {
			headers = new HashMap<String, String>();
		}
		if (!StringUtils.isEmpty(token)) {
			headers.put("Authorization", "bearer " + token);
		}
		return post(url, params, headers, format, connTimeout, readTimeout);
	}

	public static ResponseData postJson(String url, Map<String, String> params, Map<String, String> headers,
			HttpServletRequest request, String format) {
		String token = getToken(request);
		if (headers == null) {
			headers = new HashMap<String, String>();
		}
		if (!StringUtils.isEmpty(token)) {
			headers.put("Authorization", "bearer " + token);
		}
		return postJson(url, params, headers, format, connTimeout, readTimeout);
	}

	public static ResponseData postJsonData(String url, String params, Map<String, String> headers,
			HttpServletRequest request, String format) {
		String token = getToken(request);
		if (headers == null) {
			headers = new HashMap<String, String>();
		}
		if (!StringUtils.isEmpty(token)) {
			headers.put("Authorization", "bearer " + token);
		}
		return postJsonData(url, params, headers, format, connTimeout, readTimeout);
	}

	public static String getToken(HttpServletRequest request) {
		if (request == null)
			return "";
		// request.getCookies();
		String token = "";
		UserVO userVO = (UserVO) UniverseSession.getAttribute("userInfo");
		if (userVO != null)
			token = userVO.getAccess_token();
		return token;
	}

	public static ResponseData postJson(String url, Map<String, String> params, Map<String, String> headers) {

		return postJson(url, params, headers, "", connTimeout, readTimeout);
	}

	public static ResponseData get(String url, Map<String, String> headers, HttpServletRequest request, String format) {
		String token = getToken(request);
		if (headers == null) {
			headers = new HashMap<String, String>();
		}
		if (!StringUtils.isEmpty(token)) {
			headers.put("Authorization", "bearer " + token);
		}
		return get(url, headers, format, charset, connTimeout, readTimeout);
	}

	public static ResponseData getData(String url, Map<String, String> headers, HttpServletRequest request,
			String format) {
		String token = getToken(request);
		if (headers == null) {
			headers = new HashMap<String, String>();
		}
		if (!StringUtils.isEmpty(token)) {
			headers.put("Authorization", "bearer " + token);
		}
		return getData(url, headers, format, charset, connTimeout, readTimeout);
	}

	public static ResponseData get(String url, Map<String, String> headers) {
		return get(url, headers, "", charset, connTimeout, readTimeout);
	}

	public static ResponseData get(String url, Map<String, String> headers, String format, String charset,
			Integer connTimeout, Integer readTimeout) {
		if (headers == null) {
			headers = new HashMap<String, String>();
		}
		if (StringUtils.isEmpty(headers.get("Authorization"))) {
			initToken(headers);
		}
		HttpClient client = null;
		HttpGet get = new HttpGet(url);
		ResponseData resData = new ResponseData();
		try {
			if (headers != null && !headers.isEmpty()) {
				for (Entry<String, String> entry : headers.entrySet()) {
					get.addHeader(entry.getKey(), entry.getValue());
				}
			}

			// 设置参数
			Builder customReqConf = RequestConfig.custom();
			if (connTimeout != null) {
				customReqConf.setConnectTimeout(connTimeout);
			}
			if (readTimeout != null) {
				customReqConf.setSocketTimeout(readTimeout);
			}
			get.setConfig(customReqConf.build());

			HttpResponse res = null;

			if (url.startsWith("https")) {
				// 执行 Https 请求.
				client = createSSLInsecureClient();
				res = client.execute(get);
			} else {
				// 执行 Http 请求.
				client = ApiClient.client;
				res = client.execute(get);
			}
			if (res.getStatusLine().getStatusCode() == HttpServletResponse.SC_UNAUTHORIZED) {
				if (FORMAT_AJAX.equals(format)) {
					throw new UserNotFoundAjaxException("用户登录过期");
				}

				throw new UserNotFoundException();
			}
			resData.setCode(res.getStatusLine().getStatusCode());
			resData.setBackData(IOUtils.toString(res.getEntity().getContent(), "UTF-8"));
		} catch (UserNotFoundException e) {
			throw new UserNotFoundException();
		} catch (UserNotFoundAjaxException e) {
			throw new UserNotFoundAjaxException("用户登录过期");
		} catch (Exception e) {
			resData.setCode(500);
			resData.setBackData("请求其他系统失败");
		} finally {
			get.releaseConnection();
			if (url.startsWith("https") && client != null && client instanceof CloseableHttpClient) {
				try {
					((CloseableHttpClient) client).close();
				} catch (IOException e) {
					resData.setCode(500);
					resData.setBackData("请求其他系统失败");
					e.printStackTrace();
				}
			}
		}
		logger.info(url);
//		logger.info(resData.getBackData());
		return resData;
	}

	public static ResponseData getData(String url, Map<String, String> headers, String format, String charset,
			Integer connTimeout, Integer readTimeout) {
		if (headers == null) {
			headers = new HashMap<String, String>();
		}
		if (StringUtils.isEmpty(headers.get("Authorization"))) {
			initToken(headers);
		}

		HttpClient client = null;
		HttpGet get = new HttpGet(url);
		ResponseData resData = new ResponseData();
		try {
			if (headers != null && !headers.isEmpty()) {
				for (Entry<String, String> entry : headers.entrySet()) {
					get.addHeader(entry.getKey(), entry.getValue());
				}
			}

			// 设置参数
			Builder customReqConf = RequestConfig.custom();
			if (connTimeout != null) {
				customReqConf.setConnectTimeout(connTimeout);
			}
			if (readTimeout != null) {
				customReqConf.setSocketTimeout(readTimeout);
			}
			get.setConfig(customReqConf.build());

			HttpResponse res = null;

			if (url.startsWith("https")) {
				// 执行 Https 请求.
				client = createSSLInsecureClient();
				res = client.execute(get);
			} else {
				// 执行 Http 请求.
				client = ApiClient.client;
				res = client.execute(get);
			}

   			resData.setCode(res.getStatusLine().getStatusCode());
			resData.setBackData(IOUtils.toString(res.getEntity().getContent(), "UTF-8"));
		}
		// catch(UserNotFoundException e){
		// throw new UserNotFoundException();
		// }
		// catch(UserNotFoundAjaxException e){
		// throw new UserNotFoundAjaxException("用户登录过期");
		// }
		catch (Exception e) {
			resData.setCode(500);
			resData.setBackData("请求其他系统失败");
		} finally {
			get.releaseConnection();
			if (url.startsWith("https") && client != null && client instanceof CloseableHttpClient) {
				try {
					((CloseableHttpClient) client).close();
				} catch (IOException e) {
					resData.setCode(500);
					resData.setBackData("请求其他系统失败");
					e.printStackTrace();
				}
			}
		}
		logger.info(url);
		logger.info(resData.getBackData());
		return resData;
	}

	public static ResponseData postJson(String url, Map<String, String> params, Map<String, String> headers,
			String format, Integer connTimeout, Integer readTimeout) {

		if (headers == null) {
			headers = new HashMap<String, String>();
		}
		if (StringUtils.isEmpty(headers.get("Authorization"))) {
			initToken(headers);
		}

		HttpClient client = null;
		ResponseData resData = new ResponseData();
		HttpPost post = new HttpPost(url);
		try {
			String jsonData = JsonUtil.beanToJson(params);
			StringEntity entity = new StringEntity(jsonData, "utf-8");// 解决中文乱码问题
			entity.setContentEncoding("UTF-8");
			entity.setContentType("application/json");
			post.setEntity(entity);

			if (headers != null && !headers.isEmpty()) {
				for (Entry<String, String> entry : headers.entrySet()) {
					post.addHeader(entry.getKey(), entry.getValue());
				}
			}
			// 设置参数
			Builder customReqConf = RequestConfig.custom();
			if (connTimeout != null) {
				customReqConf.setConnectTimeout(connTimeout);
			}
			if (readTimeout != null) {
				customReqConf.setSocketTimeout(readTimeout);
			}
			post.setConfig(customReqConf.build());
			HttpResponse res = null;
			if (url.startsWith("https")) {
				// 执行 Https 请求.
				client = createSSLInsecureClient();
				res = client.execute(post);
			} else {
				// 执行 Http 请求.
				client = ApiClient.client;
				res = client.execute(post);
			}
			if (res.getStatusLine().getStatusCode() == HttpServletResponse.SC_UNAUTHORIZED) {
				if (FORMAT_AJAX.equals(format)) {
					throw new UserNotFoundAjaxException("用户登录过期");
				}
				throw new UserNotFoundException();
			}
			resData.setCode(res.getStatusLine().getStatusCode());
			resData.setBackData(IOUtils.toString(res.getEntity().getContent(), "UTF-8"));
		} catch (UserNotFoundAjaxException e) {
			throw new UserNotFoundAjaxException("用户登录过期");
		} catch (UserNotFoundException e) {
			throw new UserNotFoundException();
		} catch (Exception e) {
			resData.setCode(500);
			resData.setBackData("请求其他系统失败");
		} finally {
			post.releaseConnection();
			if (url.startsWith("https") && client != null && client instanceof CloseableHttpClient) {
				try {
					((CloseableHttpClient) client).close();
				} catch (IOException e) {
					resData.setCode(500);
					resData.setBackData("请求其他系统失败");
					e.printStackTrace();
				}
			}
		}

		logger.info(resData.getBackData());
		return resData;
	}

	public static ResponseData postJsonData(String url, String data, Map<String, String> headers, String format,
			Integer connTimeout, Integer readTimeout) {

		if (headers == null) {
			headers = new HashMap<String, String>();
		}
		if (StringUtils.isEmpty(headers.get("Authorization"))) {
			initToken(headers);
		}

		HttpClient client = null;
		ResponseData resData = new ResponseData();
		HttpPost post = new HttpPost(url);
		try {
			String jsonData = data;
			StringEntity entity = new StringEntity(jsonData, "utf-8");// 解决中文乱码问题
			entity.setContentEncoding("UTF-8");
			entity.setContentType("application/json");
			post.setEntity(entity);

			if (headers != null && !headers.isEmpty()) {
				for (Entry<String, String> entry : headers.entrySet()) {
					post.addHeader(entry.getKey(), entry.getValue());
				}
			}
			// 设置参数
			Builder customReqConf = RequestConfig.custom();
			if (connTimeout != null) {
				customReqConf.setConnectTimeout(connTimeout);
			}
			if (readTimeout != null) {
				customReqConf.setSocketTimeout(readTimeout);
			}
			post.setConfig(customReqConf.build());
			HttpResponse res = null;
			if (url.startsWith("https")) {
				// 执行 Https 请求.
				client = createSSLInsecureClient();
				res = client.execute(post);
			} else {
				// 执行 Http 请求.
				client = ApiClient.client;
				res = client.execute(post);
			}
			// if(res.getStatusLine().getStatusCode()==HttpServletResponse.SC_UNAUTHORIZED)
			// {
			// if(FORMAT_AJAX.equals(format))
			// {
			// throw new UserNotFoundAjaxException("用户登录过期");
			// }
			// throw new UserNotFoundException();
			// }
			resData.setCode(res.getStatusLine().getStatusCode());
			resData.setBackData(IOUtils.toString(res.getEntity().getContent(), "UTF-8"));
		} catch (UserNotFoundAjaxException e) {
			throw new UserNotFoundAjaxException("用户登录过期");
		} catch (UserNotFoundException e) {
			throw new UserNotFoundException();
		} catch (Exception e) {
			resData.setCode(500);
			resData.setBackData("请求其他系统失败");
		} finally {
			post.releaseConnection();
			if (url.startsWith("https") && client != null && client instanceof CloseableHttpClient) {
				try {
					((CloseableHttpClient) client).close();
				} catch (IOException e) {
					resData.setCode(500);
					resData.setBackData("请求其他系统失败");
					e.printStackTrace();
				}
			}
		}

		logger.info(resData.getBackData());
		return resData;
	}

	public static ResponseData post(String url, Map<String, String> params, Map<String, String> headers, String format,
			Integer connTimeout, Integer readTimeout) {

		if (headers == null) {
			headers = new HashMap<String, String>();
		}
		if (StringUtils.isEmpty(headers.get("Authorization"))) {
			initToken(headers);
		}

		HttpClient client = null;
		HttpPost post = new HttpPost(url);
		ResponseData resData = new ResponseData();
		try {
			if (params != null && !params.isEmpty()) {
				List<NameValuePair> formParams = new ArrayList<org.apache.http.NameValuePair>();
				Set<Entry<String, String>> entrySet = params.entrySet();
				for (Entry<String, String> entry : entrySet) {
					formParams.add(new BasicNameValuePair(entry.getKey(), entry.getValue()));
				}
				UrlEncodedFormEntity entity = new UrlEncodedFormEntity(formParams, Consts.UTF_8);
				post.setEntity(entity);
			}

			if (headers != null && !headers.isEmpty()) {
				for (Entry<String, String> entry : headers.entrySet()) {
					post.addHeader(entry.getKey(), entry.getValue());
				}
			}
			// 设置参数
			Builder customReqConf = RequestConfig.custom();
			if (connTimeout != null) {
				customReqConf.setConnectTimeout(connTimeout);
			}
			if (readTimeout != null) {
				customReqConf.setSocketTimeout(readTimeout);
			}
			post.setConfig(customReqConf.build());
			HttpResponse res = null;
			System.out.println(post.getURI());

			if (url.startsWith("https")) {
				// 执行 Https 请求.
				client = createSSLInsecureClient();
				res = client.execute(post);
			} else {
				// 执行 Http 请求.
				client = ApiClient.client;
				res = client.execute(post);
			}
			if (res.getStatusLine().getStatusCode() == HttpServletResponse.SC_UNAUTHORIZED) {
				if (format != null && format.equals("ajax")) {
					throw new UserNotFoundAjaxException("用户登录过期");
				}
				throw new UserNotFoundException();
			}
			resData.setCode(res.getStatusLine().getStatusCode());
			resData.setBackData(IOUtils.toString(res.getEntity().getContent(), "UTF-8"));
		} catch (UserNotFoundAjaxException e) {
			throw new UserNotFoundAjaxException("用户登录过期");
		} catch (UserNotFoundException e) {
			throw new UserNotFoundException();
		} catch (Exception e) {
			e.getStackTrace();
			// System.out.println(e.getStackTrace()+"kldsjfjds"+e.getMessage());
			resData.setCode(500);
			resData.setBackData("请求其他系统失败");
		} finally {
			post.releaseConnection();
			if (url.startsWith("https") && client != null && client instanceof CloseableHttpClient) {
				try {
					((CloseableHttpClient) client).close();
				} catch (IOException e) {
					resData.setCode(500);
					resData.setBackData("请求其他系统失败");
					e.printStackTrace();
				}
			}
		}
		logger.info(url);
		logger.info(resData.getBackData());
		return resData;
	}

	public static ResponseData put(String url, Map<String, String> params, Map<String, String> headers) {
		return put(url, params, headers, "", connTimeout, readTimeout);
	}

	public static ResponseData put(String url, Map<String, String> params, Map<String, String> headers,
			HttpServletRequest request, String format) {
		String token = getToken(request);
		if (headers == null) {
			headers = new HashMap<String, String>();
		}
		if (!StringUtils.isEmpty(token)) {
			headers.put("Authorization", "bearer " + token);
		}
		return put(url, params, headers, format, connTimeout, readTimeout);
	}

	public static ResponseData put(String url, Map<String, String> params, Map<String, String> headers, String format,
			Integer connTimeout, Integer readTimeout) {

		if (headers == null) {
			headers = new HashMap<String, String>();
		}
		if (StringUtils.isEmpty(headers.get("Authorization"))) {
			initToken(headers);
		}

		HttpClient client = null;
		HttpPut put = new HttpPut(url);
		ResponseData resData = new ResponseData();
		try {
			if (params != null && !params.isEmpty()) {
				List<NameValuePair> formParams = new ArrayList<org.apache.http.NameValuePair>();
				Set<Entry<String, String>> entrySet = params.entrySet();
				for (Entry<String, String> entry : entrySet) {
					formParams.add(new BasicNameValuePair(entry.getKey(), entry.getValue()));
				}
				UrlEncodedFormEntity entity = new UrlEncodedFormEntity(formParams, Consts.UTF_8);
				put.setEntity(entity);
			}

			if (headers != null && !headers.isEmpty()) {
				for (Entry<String, String> entry : headers.entrySet()) {
					put.addHeader(entry.getKey(), entry.getValue());
				}
			}
			// 设置参数
			Builder customReqConf = RequestConfig.custom();
			if (connTimeout != null) {
				customReqConf.setConnectTimeout(connTimeout);
			}
			if (readTimeout != null) {
				customReqConf.setSocketTimeout(readTimeout);
			}
			put.setConfig(customReqConf.build());
			HttpResponse res = null;
			if (url.startsWith("https")) {
				// 执行 Https 请求.
				client = createSSLInsecureClient();
				res = client.execute(put);
			} else {
				// 执行 Http 请求.
				client = ApiClient.client;
				res = client.execute(put);
			}
			if (res.getStatusLine().getStatusCode() == HttpServletResponse.SC_UNAUTHORIZED) {
				if (format != null && format.equals("ajax")) {
					throw new UserNotFoundAjaxException("用户登录过期");
				}
				throw new UserNotFoundException();

			}
			resData.setCode(res.getStatusLine().getStatusCode());
			resData.setBackData(IOUtils.toString(res.getEntity().getContent(), "UTF-8"));
		} catch (UserNotFoundAjaxException e) {
			throw new UserNotFoundAjaxException("用户登录过期");
		} catch (UserNotFoundException e) {
			throw new UserNotFoundException();
		} catch (Exception e) {
			resData.setCode(500);
			resData.setBackData("请求其他系统失败");
		} finally {
			put.releaseConnection();
			if (url.startsWith("https") && client != null && client instanceof CloseableHttpClient) {
				try {
					((CloseableHttpClient) client).close();
				} catch (IOException e) {
					resData.setCode(500);
					resData.setBackData("请求其他系统失败");
					e.printStackTrace();
				}
			}
		}
		return resData;
	}

	public static ResponseData delete(String url, Map<String, String> headers, HttpServletRequest request,
			String format) {
		String token = getToken(request);
		if (headers == null) {
			headers = new HashMap<String, String>();
		}
		if (!StringUtils.isEmpty(token)) {
			headers.put("Authorization", "bearer " + token);
		}

		return delete(url, headers, format, connTimeout, readTimeout);
	}
	

	public static ResponseData delete(String url, Map<String, String> headers, String format, Integer connTimeout,
			Integer readTimeout) {

		if (headers == null) {
			headers = new HashMap<String, String>();
		}
		if (StringUtils.isEmpty(headers.get("Authorization"))) {
			initToken(headers);
		}

		HttpClient client = null;
		HttpDelete delete = new HttpDelete(url);
		ResponseData resData = new ResponseData();
		try {

			if (headers != null && !headers.isEmpty()) {
				for (Entry<String, String> entry : headers.entrySet()) {
					delete.addHeader(entry.getKey(), entry.getValue());
				}
			}
			// 设置参数
			Builder customReqConf = RequestConfig.custom();
			if (connTimeout != null) {
				customReqConf.setConnectTimeout(connTimeout);
			}
			if (readTimeout != null) {
				customReqConf.setSocketTimeout(readTimeout);
			}
			delete.setConfig(customReqConf.build());
			HttpResponse res = null;
			if (url.startsWith("https")) {
				// 执行 Https 请求.
				client = createSSLInsecureClient();
				res = client.execute(delete);
			} else {
				// 执行 Http 请求.
				client = ApiClient.client;
				res = client.execute(delete);
			}

			if (res.getStatusLine().getStatusCode() == HttpServletResponse.SC_UNAUTHORIZED) {
				if (format != null && format.equals("ajax")) {
					throw new UserNotFoundAjaxException("用户登录过期");
				}
				throw new UserNotFoundException();

			}
			resData.setCode(res.getStatusLine().getStatusCode());
			if (res.getEntity() != null && res.getEntity().getContent() != null) {
				resData.setBackData(IOUtils.toString(res.getEntity().getContent()));
			}
		} catch (UserNotFoundAjaxException e) {
			throw new UserNotFoundAjaxException("用户登录过期");
		} catch (UserNotFoundException e) {
			throw new UserNotFoundException();
		} catch (Exception e) {
			resData.setCode(500);
			resData.setBackData("UserNotFoundException");
		} finally {
			delete.releaseConnection();
			if (url.startsWith("https") && client != null && client instanceof CloseableHttpClient) {
				try {
					((CloseableHttpClient) client).close();
				} catch (IOException e) {
					resData.setCode(500);
					resData.setBackData("请求其他系统失败");
					e.printStackTrace();
				}
			}
		}
		return resData;
	}

	public static ResponseData postNoToken(String url, Map<String, String> params, Map<String, String> headers,
			Integer connTimeout, Integer readTimeout) {

		HttpClient client = null;
		HttpPost post = new HttpPost(url);
		ResponseData resData = new ResponseData();
		try {
			if (params != null && !params.isEmpty()) {
				List<NameValuePair> formParams = new ArrayList<org.apache.http.NameValuePair>();
				Set<Entry<String, String>> entrySet = params.entrySet();
				for (Entry<String, String> entry : entrySet) {
					formParams.add(new BasicNameValuePair(entry.getKey(), entry.getValue()));
				}
				UrlEncodedFormEntity entity = new UrlEncodedFormEntity(formParams, Consts.UTF_8);
				post.setEntity(entity);
			}

			if (headers != null && !headers.isEmpty()) {
				for (Entry<String, String> entry : headers.entrySet()) {
					post.addHeader(entry.getKey(), entry.getValue());
				}
			}
			// 设置参数
			Builder customReqConf = RequestConfig.custom();
			if (connTimeout != null) {
				customReqConf.setConnectTimeout(connTimeout);
			}
			if (readTimeout != null) {
				customReqConf.setSocketTimeout(readTimeout);
			}
			post.setConfig(customReqConf.build());
			HttpResponse res = null;
			if (url.startsWith("https")) {
				// 执行 Https 请求.
				client = createSSLInsecureClient();
				res = client.execute(post);
			} else {
				// 执行 Http 请求.
				client = ApiClient.client;
				res = client.execute(post);
			}
			if (res.getStatusLine().getStatusCode() == HttpServletResponse.SC_UNAUTHORIZED) {

				throw new UserNotFoundException();

			}
			resData.setCode(res.getStatusLine().getStatusCode());
			resData.setBackData(IOUtils.toString(res.getEntity().getContent(), "UTF-8"));
		} catch (UserNotFoundException e) {
			throw new UserNotFoundException();
		} catch (Exception e) {
			e.printStackTrace();
			resData.setCode(500);
			resData.setBackData("请求其他系统失败");
		} finally {
			post.releaseConnection();
			if (url.startsWith("https") && client != null && client instanceof CloseableHttpClient) {
				try {
					((CloseableHttpClient) client).close();
				} catch (IOException e) {
					resData.setCode(500);
					resData.setBackData("请求其他系统失败");
					e.printStackTrace();
				}
			}
		}
		return resData;
	}

	/**
	 * 创建 SSL连接
	 *  
	 * @return
	 * @throws GeneralSecurityException
	 */
	private static CloseableHttpClient createSSLInsecureClient() throws GeneralSecurityException {
		try {
			SSLContext sslContext = new SSLContextBuilder().loadTrustMaterial(null, new TrustStrategy() {
				public boolean isTrusted(X509Certificate[] chain, String authType) throws CertificateException {
					return true;
				}
			}).build();

			SSLConnectionSocketFactory sslsf = new SSLConnectionSocketFactory(sslContext, new HostnameVerifier() {

				@Override
				public boolean verify(String arg0, SSLSession arg1) {
					return true;
				} 
			});

			return HttpClients.custom().setSSLSocketFactory(sslsf).build();

		} catch (GeneralSecurityException e) {
			throw e;
		}
	}

}
