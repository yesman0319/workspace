package com.xiaoma.universe.common.utils;

import java.io.IOException;
import java.net.SocketTimeoutException;
import java.security.GeneralSecurityException;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLException;
import javax.net.ssl.SSLSession;
import javax.net.ssl.SSLSocket;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.http.Consts;
import org.apache.http.HttpEntity;
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
import org.apache.http.conn.ConnectTimeoutException;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.conn.ssl.SSLContextBuilder;
import org.apache.http.conn.ssl.TrustStrategy;
import org.apache.http.conn.ssl.X509HostnameVerifier;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.message.BasicNameValuePair;

import com.xiaoma.universe.common.contant.Contant;

/**
 *  依赖的jar包有：commons-lang-2.6.jar、httpclient-4.3.2.jar、httpcore-4.3.1.jar、commons-io-2.4.jar
 * @author zhaoyb
 *
 */
@SuppressWarnings("deprecation")
public class HttpClientUtils {

    public static final int connTimeout=10000;
    public static final int readTimeout=80000;
    public static final String charset="UTF-8";
    private static HttpClient client = null;
    
    static {
        PoolingHttpClientConnectionManager cm = new PoolingHttpClientConnectionManager();
        cm.setMaxTotal(128);
        cm.setDefaultMaxPerRoute(128);
        client = HttpClients.custom().setConnectionManager(cm).build();
    }
    
    public static Map<String,Object> postParameters(String url, String parameterStr) throws ConnectTimeoutException, SocketTimeoutException, Exception{
        return post(url,parameterStr,"application/x-www-form-urlencoded",charset,connTimeout,readTimeout);
    }
    
    public static Map<String, Object> postParameters(String url, String parameterStr,String charset, Integer connTimeout, Integer readTimeout) throws ConnectTimeoutException, SocketTimeoutException, Exception{
        return post(url,parameterStr,"application/x-www-form-urlencoded",charset,connTimeout,readTimeout);
    }
    
    public static Map<String,Object> postParameters(String url, Map<String, String> params) throws ConnectTimeoutException,  
     SocketTimeoutException, Exception {
         return postForm(url, params, null, connTimeout, readTimeout);
     }
    
    public static Map<String,Object> postParameters(String url, Map<String, String> params, Integer connTimeout,Integer readTimeout) throws ConnectTimeoutException,  
    SocketTimeoutException, Exception {
         return postForm(url, params, null, connTimeout, readTimeout);
     }
      
    public static Map<String,Object> get(String url) throws Exception {  
        return get(url,null, charset, null, null);  
    }
    
    public static Map<String,Object> get(String url, String charset) throws Exception {  
        return get(url,null,charset, connTimeout, readTimeout);  
    } 

    /** 
     * 发送一个 put 请求, 使用指定的字符集编码. 
     * @param url 
     * @param body RequestBody 
     * @param mimeType 例如 application/xml "application/x-www-form-urlencoded" a=1&b=2&c=3
     * @param charset 编码 
     * @param connTimeout 建立链接超时时间,毫秒. 
     * @param readTimeout 响应超时时间,毫秒. 
     * @return ResponseBody, 使用指定的字符集编码. 
     * @throws ConnectTimeoutException 建立链接超时异常 
     * @throws SocketTimeoutException  响应超时 
     * @throws Exception 
     */  
    public static Map<String,Object> post(String url, String body, String mimeType,String charset, Integer connTimeout, Integer readTimeout) 
            throws ConnectTimeoutException, SocketTimeoutException, Exception {
    	Map<String,Object> map = new HashMap<String,Object>();
        HttpClient client = null;
        HttpPost post = new HttpPost(url);
        String result = "";
        try {
            if (StringUtils.isNotBlank(body)) {
                HttpEntity entity = new StringEntity(body, ContentType.create(mimeType, charset));
                post.setEntity(entity);
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

            HttpResponse res;
            if (url.startsWith("https")) {
                // 执行 Https 请求.
                client = createSSLInsecureClient();
                res = client.execute(post);
                map.put("status", res.getStatusLine().getStatusCode());
            } else {
                // 执行 Http 请求.
                client = HttpClientUtils.client;
                res = client.execute(post);
                map.put("status", res.getStatusLine().getStatusCode());
            }
            result = IOUtils.toString(res.getEntity().getContent(), charset);
            map.put("content", result);
        } finally {
            post.releaseConnection();
            if (url.startsWith("https") && client != null&& client instanceof CloseableHttpClient) {
                ((CloseableHttpClient) client).close();
            }
        }
        return map;
    }  
    /** 
     * 发送一个 put 请求, 使用指定的字符集编码. 
     * @param url 
     * @param body RequestBody 
     * @param mimeType 例如 application/xml "application/x-www-form-urlencoded" a=1&b=2&c=3
     * @param charset 编码 
     * @param connTimeout 建立链接超时时间,毫秒. 
     * @param readTimeout 响应超时时间,毫秒. 
     * @return ResponseBody, 使用指定的字符集编码. 
     * @throws ConnectTimeoutException 建立链接超时异常 
     * @throws SocketTimeoutException  响应超时 
     * @throws Exception 
     */  
    public static Map<String,Object> put(String url, String body, String mimeType,String charset, Integer connTimeout, Integer readTimeout) 
    		throws ConnectTimeoutException, SocketTimeoutException, Exception {
    	Map<String,Object> map = new HashMap<String,Object>();
    	HttpClient client = null;
    	HttpPut put = new HttpPut(url);
    	String result = "";
    	try {
    		if (StringUtils.isNotBlank(body)) {
    			HttpEntity entity = new StringEntity(body, ContentType.create(mimeType, charset));
    			put.setEntity(entity);
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
    		
    		HttpResponse res;
    		if (url.startsWith("https")) {
    			// 执行 Https 请求.
    			client = createSSLInsecureClient();
    			res = client.execute(put);
    			map.put("status", res.getStatusLine().getStatusCode());
    		} else {
    			// 执行 Http 请求.
    			client = HttpClientUtils.client;
    			res = client.execute(put);
    			 map.put("status", res.getStatusLine().getStatusCode());
    		}
    		result = IOUtils.toString(res.getEntity().getContent(), charset);
    		map.put("content", result);
    	} finally {
    		put.releaseConnection();
    		if (url.startsWith("https") && client != null&& client instanceof CloseableHttpClient) {
    			((CloseableHttpClient) client).close();
    		}
    	}
    	return map;
    }  
    
    
    /** 
     * 提交form表单 
     *  
     * @param url 
     * @param params 
     * @param connTimeout 
     * @param readTimeout 
     * @return 
     * @throws ConnectTimeoutException 
     * @throws SocketTimeoutException 
     * @throws Exception 
     */  
    public static Map<String,Object> postForm(String url, Map<String, String> params, Map<String, String> headers, Integer connTimeout,Integer readTimeout) throws ConnectTimeoutException,  
            SocketTimeoutException, Exception {  
        Map<String,Object> map = new HashMap<String,Object>();
        HttpClient client = null;  
        HttpPost post = new HttpPost(url);  
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
                map.put("status", res.getStatusLine().getStatusCode());
            } else {  
                // 执行 Http 请求.  
                client = HttpClientUtils.client;  
                res = client.execute(post);
                map.put("status", res.getStatusLine().getStatusCode());
            }  
         String str = IOUtils.toString(res.getEntity().getContent(), "UTF-8");
         map.put("content", res.getEntity().getContent());
        } finally {  
            post.releaseConnection();  
            if (url.startsWith("https") && client != null  
                    && client instanceof CloseableHttpClient) {  
                ((CloseableHttpClient) client).close();  
            }  
        }  
        return map;
    } 
    
    /** 
     *更新表单 
     * @param url 
     * @param params 
     * @param connTimeout 
     * @param readTimeout 
     * @return 
     * @throws ConnectTimeoutException 
     * @throws SocketTimeoutException 
     * @throws Exception 
     * **/
    public static Map<String,Object> putForm(String url, Map<String, String> params, Map<String, String> headers, Integer connTimeout,Integer readTimeout) throws ConnectTimeoutException,  
    SocketTimeoutException, Exception {  
    Map<String,Object> map = new HashMap<String,Object>();
    HttpClient client = null;  
    HttpPut put = new HttpPut(url);  
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
		        map.put("status", res.getStatusLine().getStatusCode());
		    } else {  
		        // 执行 Http 请求.  
		        client = HttpClientUtils.client;  
		        res = client.execute(put);
		        map.put("status", res.getStatusLine().getStatusCode());
		    }  
		 String str = IOUtils.toString(res.getEntity().getContent(), "UTF-8");
		 map.put("content", res.getEntity().getContent());
	} finally {  
		put.releaseConnection();  
	    if (url.startsWith("https") && client != null  
	            && client instanceof CloseableHttpClient) {  
	        ((CloseableHttpClient) client).close();  
	    }  
	}  
	return map;
	} 
	    
    
    /** 
     * 发送一个 GET 请求 
     * @param url 
     * @param charset 
     * @param connTimeout  建立链接超时时间,毫秒. 
     * @param readTimeout  响应超时时间,毫秒. 
     * @return 
     * @throws ConnectTimeoutException   建立链接超时 
     * @throws SocketTimeoutException   响应超时 
     * @throws Exception 
     */  
    public static Map<String,Object> get(String url, Map<String, String> headers, String charset, Integer connTimeout,Integer readTimeout) 
            throws ConnectTimeoutException,SocketTimeoutException, Exception { 
    	Map<String,Object> map= new HashMap<String,Object>();
        HttpClient client = null;  
        HttpGet get = new HttpGet(url);
        String result = "";  
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
                map.put("status", res.getStatusLine().getStatusCode());
            } else {  
                // 执行 Http 请求.  
                client = HttpClientUtils.client;  
                res = client.execute(get); 
                map.put("status", res.getStatusLine().getStatusCode());
            }  
            result = IOUtils.toString(res.getEntity().getContent(), charset);
            map.put("content", result);
        } finally {  
            get.releaseConnection();  
            if (url.startsWith("https") && client != null && client instanceof CloseableHttpClient) {  
                ((CloseableHttpClient) client).close();  
            }  
        }  
        return map;  
    } 
    
    /** 
     * 发送一个 Delete 请求 
     * @param url 
     * @param charset 
     * @param connTimeout  建立链接超时时间,毫秒. 
     * @param readTimeout  响应超时时间,毫秒. 
     * @return 
     * @throws ConnectTimeoutException   建立链接超时 
     * @throws SocketTimeoutException   响应超时 
     * @throws Exception 
     */  
    public static Map<String,Object> delete(String url, Map<String, String> headers, String charset, Integer connTimeout,Integer readTimeout) 
    		throws ConnectTimeoutException,SocketTimeoutException, Exception { 
    	Map<String,Object> map= new HashMap<String,Object>();
    	HttpClient client = null;  
    	HttpDelete delete = new HttpDelete(url);
    	String result = "";  
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
    			 map.put("status", res.getStatusLine().getStatusCode());
    		} else {  
    			// 执行 Http 请求.  
    			client = HttpClientUtils.client;  
    			res = client.execute(delete); 
    			map.put("status", res.getStatusLine().getStatusCode());
    			System.out.println(res.getStatusLine().getStatusCode()+"请求回来的状态");
    		}  
    		result = IOUtils.toString(res.getEntity().getContent(), charset);
    		map.put("content", result);
    	} finally {  
    		delete.releaseConnection();  
    		if (url.startsWith("https") && client != null && client instanceof CloseableHttpClient) {  
    			((CloseableHttpClient) client).close();  
    		}  
    	}  
    	return map;  
    }  
    
    
    /** 
     * 从 response 里获取 charset 
     *  
     * @param ressponse 
     * @return 
     */  
    @SuppressWarnings("unused")  
    private static String getCharsetFromResponse(HttpResponse ressponse) {  
        // Content-Type:text/html; charset=GBK  
        if (ressponse.getEntity() != null  && ressponse.getEntity().getContentType() != null && ressponse.getEntity().getContentType().getValue() != null) {  
            String contentType = ressponse.getEntity().getContentType().getValue();  
            if (contentType.contains("charset=")) {  
                return contentType.substring(contentType.indexOf("charset=") + 8);  
            }  
        }  
        return null;  
    }  
    
    
    
    /**
     * 创建 SSL连接
     * @return
     * @throws GeneralSecurityException
     */
    private static CloseableHttpClient createSSLInsecureClient() throws GeneralSecurityException {
        try {
            SSLContext sslContext = new SSLContextBuilder().loadTrustMaterial(null, new TrustStrategy() {
                        public boolean isTrusted(X509Certificate[] chain,String authType) throws CertificateException {
                            return true;
                        }
                    }).build();
            
            SSLConnectionSocketFactory sslsf = new SSLConnectionSocketFactory(sslContext, new X509HostnameVerifier() {

                        @Override
                        public boolean verify(String arg0, SSLSession arg1) {
                            return true;
                        }

                        @Override
                        public void verify(String host, SSLSocket ssl)
                                throws IOException {
                        }

                        @Override
                        public void verify(String host, X509Certificate cert)
                                throws SSLException {
                        }

                        @Override
                        public void verify(String host, String[] cns,
                                String[] subjectAlts) throws SSLException {
                        }

                    });
            
            return HttpClients.custom().setSSLSocketFactory(sslsf).build();
            
        } catch (GeneralSecurityException e) {
            throw e;
        }
    }
    
    public static void main(String[] args) {  
        try {
            Map<String, Object> str= post("https://localhost:443/ssl/test.shtml","name=12&page=34","application/x-www-form-urlencoded", "UTF-8", 10000, 10000);
            //String str= get("https://localhost:443/ssl/test.shtml?name=12&page=34","GBK");
            /*Map<String,String> map = new HashMap<String,String>();
            map.put("name", "111");
            map.put("page", "222");
            String str= postForm("https://localhost:443/ssl/test.shtml",map,null, 10000, 10000);*/
            System.out.println(str);
        } catch (ConnectTimeoutException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (SocketTimeoutException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
    
    public static Map<String, Object> postMap(String url, Map<String, String> params, Map<String, String> headers) throws Exception{
    	Map<String, Object> str = postForm(url, params, headers, connTimeout, readTimeout);
			return str;
    }
    public static Map<String, Object> putMap(String url, Map<String, String> params, Map<String, String> headers) throws Exception{
    	Map<String, Object> str = putForm(url, params, headers, connTimeout, readTimeout);
    	return str;
    }
    
    public static Map<String, Object> getMap(String url,  Map<String, String> headers) throws  Exception{
    	Map<String, Object> str = get(url, headers,charset,connTimeout, readTimeout);
    	return str;
    }
    public static Map<String, Object> deleteMap(String url,  Map<String, String> headers) throws  Exception{
    	Map<String, Object> str = delete(url, headers,charset,connTimeout, readTimeout);
    	return str;
    }
    

    public static String getToken() throws Exception{
        final Integer connTimeout1=10000;
        final Integer readTimeout1=80000;
        final String charset1="UTF-8";
        HttpClient client = null;
    	Map<String,String> headers = new HashMap<String,String>();
    	Map<String,String> params = new HashMap<String,String>();
    	params.put("client_id", PropertiesUtils.getString("CLIENT_ID"));
    	params.put("client_secret", PropertiesUtils.getString("CLIENT_SECRET"));
    	params.put("grant_type", PropertiesUtils.getString("GRANT_TYPE"));
         String url=PropertiesUtils.getString("AUTHURL");
         HttpPost post = new HttpPost(url);  
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
             if (connTimeout1 != null) {  
                 customReqConf.setConnectTimeout(connTimeout1);  
             }  
             if (readTimeout1 != null) {  
                 customReqConf.setSocketTimeout(readTimeout1);  
             }  
             post.setConfig(customReqConf.build());  
             HttpResponse res = null;  
             if (url.startsWith("https")) {  
                 // 执行 Https 请求.  
                 client = createSSLInsecureClient();  
                 res = client.execute(post);
                 int status = res.getStatusLine().getStatusCode();
             } else {  
                 // 执行 Http 请求.  
                 client = HttpClientUtils.client;  
                 res = client.execute(post);
                 int status = res.getStatusLine().getStatusCode();
             }  
          String str = IOUtils.toString(res.getEntity().getContent(), "UTF-8");
          return str;
         } finally {  
             post.releaseConnection();  
             if (url.startsWith("https") && client != null  
                     && client instanceof CloseableHttpClient) {  
                 ((CloseableHttpClient) client).close();  
             }  
         }  

     } 

}
    
