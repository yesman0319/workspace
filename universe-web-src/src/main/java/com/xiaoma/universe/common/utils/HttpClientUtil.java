package com.xiaoma.universe.common.utils;
import java.io.IOException;
import java.net.SocketTimeoutException;
import java.security.GeneralSecurityException;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;

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
import org.apache.http.client.methods.HttpPatch;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.conn.ConnectTimeoutException;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.conn.ssl.TrustStrategy;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.ssl.SSLContextBuilder;

/** 
 *  修改了过期的方法
 * @author chengzhongliang
 *
 */
public class HttpClientUtil {

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
    
    public static ResponseData postParameters(String url, String parameterStr) throws ConnectTimeoutException, SocketTimeoutException, Exception{
        return post(url,parameterStr,"application/x-www-form-urlencoded",charset,connTimeout,readTimeout);
    }
    
    public static ResponseData postParameters(String url, String parameterStr,String charset) throws ConnectTimeoutException, SocketTimeoutException, Exception{
        return post(url,parameterStr,"application/x-www-form-urlencoded",charset,connTimeout,readTimeout);
    }
     
    public static ResponseData get(String url) {  
        return get(url,null, charset, null, null);  
    }
    
    public static ResponseData get(String url, String charset) throws Exception {  
        return get(url,null,charset, connTimeout, readTimeout);  
    } 

    /** 
     * 发送一个 Post 请求  
     */  
    public static ResponseData post(String url, Map<String, String> params, Map<String, String> headers) {
    	ResponseData res = post(url, params, headers, connTimeout, readTimeout);
			return res;
    }
    
    /** 
     * 发送一个 Post 请求
     */  
    public static ResponseData post(String url, String body, String mimeType,String charset, Integer connTimeout, Integer readTimeout) 
        {
        HttpClient client = null;
        HttpPost post = new HttpPost(url);

        ResponseData resData = new ResponseData();
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
            } else {
                // 执行 Http 请求.
                client = HttpClientUtil.client;
                res = client.execute(post);
            }
            resData.setCode(res.getStatusLine().getStatusCode());
            resData.setBackData(IOUtils.toString(res.getEntity().getContent(), "UTF-8"));
        }
        catch(Exception e){ 
        	resData.setCode(500);
        	resData.setBackData("请求其他系统失败"); 
        }
        finally {
            post.releaseConnection();
            if (url.startsWith("https") && client != null&& client instanceof CloseableHttpClient) {
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
    public static ResponseData post(String url, Map<String, String> params, Map<String, String> headers, Integer connTimeout,Integer readTimeout){  
  
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
                client = HttpClientUtil.client;  
                res = client.execute(post);
            }   

            resData.setCode(res.getStatusLine().getStatusCode());
            resData.setBackData(IOUtils.toString(res.getEntity().getContent(), "UTF-8"));  
        } catch(Exception e){ 
        	resData.setCode(500);
        	resData.setBackData("请求其他系统失败"); 
        }
        finally {  
            post.releaseConnection();  
            if (url.startsWith("https") && client != null  
                    && client instanceof CloseableHttpClient) {  
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
     * 发送一个 patch 请求  
     */  
    public static ResponseData patch(String url, Map<String, String> params, Map<String, String> headers) {
    	ResponseData res = patch(url, params, headers, connTimeout, readTimeout);
			return res;
    }
    
    /** 
     * patch 请求
     *  
     * @param url 
     * @param params 
     * @param headers 
     * @param connTimeout 
     * @param readTimeout 
     * @return  
     */  
    public static ResponseData patch(String url, Map<String, String> params, Map<String, String> headers, Integer connTimeout,Integer readTimeout){  
  
        HttpClient client = null;  
        HttpPatch method = new HttpPatch(url);
        ResponseData resData = new ResponseData();
        try {  
            if (params != null && !params.isEmpty()) {  
                List<NameValuePair> formParams = new ArrayList<org.apache.http.NameValuePair>();  
                Set<Entry<String, String>> entrySet = params.entrySet();  
                for (Entry<String, String> entry : entrySet) {  
                    formParams.add(new BasicNameValuePair(entry.getKey(), entry.getValue()));  
                }  
                UrlEncodedFormEntity entity = new UrlEncodedFormEntity(formParams, Consts.UTF_8);  
                method.setEntity(entity);  
            }
            
            if (headers != null && !headers.isEmpty()) {  
                for (Entry<String, String> entry : headers.entrySet()) {  
                    method.addHeader(entry.getKey(), entry.getValue());  
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
            method.setConfig(customReqConf.build());  
            HttpResponse res = null;
            if (url.startsWith("https")) {  
                // 执行 Https 请求.  
                client = createSSLInsecureClient();  
                res = client.execute(method);
            } else {  
                // 执行 Http 请求.  
                client = HttpClientUtil.client;  
                res = client.execute(method);
            }   

            resData.setCode(res.getStatusLine().getStatusCode());
            resData.setBackData(IOUtils.toString(res.getEntity().getContent(), "UTF-8"));  
        } catch(Exception e){ 
        	resData.setCode(500);
        	resData.setBackData("请求其他系统失败"); 
        }
        finally {  
        	method.releaseConnection();  
            if (url.startsWith("https") && client != null  
                    && client instanceof CloseableHttpClient) {  
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
     * 发送一个 Post 请求  
     */  
    public static ResponseData put(String url, Map<String, String> params, Map<String, String> headers) {
    	ResponseData res = put(url, params, headers, connTimeout, readTimeout);
			return res;
    }
    
    
    
    /** 
     * put 请求
     *  
     * @param url 
     * @param params 
     * @param headers
     * @param connTimeout 
     * @param readTimeout 
     * @return  
     */  
    public static ResponseData put(String url, Map<String, String> params, Map<String, String> headers, Integer connTimeout,Integer readTimeout){  
  
        HttpClient client = null;  
        HttpPut method = new HttpPut(url);   
        ResponseData resData = new ResponseData();
        try {  
            if (params != null && !params.isEmpty()) {  
                List<NameValuePair> formParams = new ArrayList<org.apache.http.NameValuePair>();  
                Set<Entry<String, String>> entrySet = params.entrySet();  
                for (Entry<String, String> entry : entrySet) {  
                    formParams.add(new BasicNameValuePair(entry.getKey(), entry.getValue()));  
                }  
                UrlEncodedFormEntity entity = new UrlEncodedFormEntity(formParams, Consts.UTF_8);  
                method.setEntity(entity);  
            }
            
            if (headers != null && !headers.isEmpty()) {  
                for (Entry<String, String> entry : headers.entrySet()) {  
                    method.addHeader(entry.getKey(), entry.getValue());  
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
            method.setConfig(customReqConf.build());  
            HttpResponse res = null;
            if (url.startsWith("https")) {  
                // 执行 Https 请求.  
                client = createSSLInsecureClient();  
                res = client.execute(method);
            } else {  
                // 执行 Http 请求.  
                client = HttpClientUtil.client;  
                res = client.execute(method);
            }   

            resData.setCode(res.getStatusLine().getStatusCode());
            resData.setBackData(IOUtils.toString(res.getEntity().getContent(), "UTF-8"));  
        } catch(Exception e){ 
        	resData.setCode(500);
        	resData.setBackData("请求其他系统失败"); 
        }
        finally {  
        	method.releaseConnection();  
            if (url.startsWith("https") && client != null  
                    && client instanceof CloseableHttpClient) {  
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
     * delete 请求
     *  
     * @param url
     * @param headers
     * @param connTimeout 
     * @param readTimeout 
     * @return  
     */  
    public static ResponseData delete(String url, Map<String, String> headers, Integer connTimeout,Integer readTimeout){  
  
        HttpClient client = null;  
        HttpDelete method = new HttpDelete(url);   
        ResponseData resData = new ResponseData();
        try {
            if (headers != null && !headers.isEmpty()) {  
                for (Entry<String, String> entry : headers.entrySet()) {  
                    method.addHeader(entry.getKey(), entry.getValue());  
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
            method.setConfig(customReqConf.build());  
            HttpResponse res = null;
            if (url.startsWith("https")) {  
                // 执行 Https 请求.  
                client = createSSLInsecureClient();  
                res = client.execute(method);
            } else {  
                // 执行 Http 请求.  
                client = HttpClientUtil.client;  
                res = client.execute(method);
            }   

            resData.setCode(res.getStatusLine().getStatusCode());
            resData.setBackData(IOUtils.toString(res.getEntity().getContent(), "UTF-8"));  
        } catch(Exception e){ 
        	resData.setCode(500);
        	resData.setBackData("请求其他系统失败"); 
        }
        finally {  
        	method.releaseConnection();  
            if (url.startsWith("https") && client != null  
                    && client instanceof CloseableHttpClient) {  
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
     * delete 请求
     *  
     * @param url
     * @param headers
     * @return  
     */  
    public static ResponseData delete(String url, Map<String, String> headers){
    	ResponseData res = delete(url, headers,connTimeout, readTimeout);
        return res;
    }
    
    public static ResponseData get(String url,  Map<String, String> headers){
    	ResponseData res = get(url, headers,charset,connTimeout, readTimeout);
    	return res;
    }
    
    /** 
     * 发送一个 GET 请求 
     *  
     * @param url 
     * @param charset 
     * @param connTimeout  建立链接超时时间,毫秒. 
     * @param readTimeout  响应超时时间,毫秒. 
     * @return  
     */  
    public static ResponseData get(String url, Map<String, String> headers, String charset, Integer connTimeout,Integer readTimeout) 
            { 
        
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
                client = HttpClientUtil.client;  
                res = client.execute(get);  
            }
            resData.setCode(res.getStatusLine().getStatusCode());
            resData.setBackData(IOUtils.toString(res.getEntity().getContent(), "UTF-8"));
        } catch(Exception e){ 
        	resData.setCode(500);
        	resData.setBackData("请求其他系统失败"); 
        }
        finally {  
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
        return resData;  
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
    
    /**
     * post方式提交json
     * @param url
     * @param body
     * @param headers
     * @return
     */
    public static ResponseData postJson(String url ,String body, Map<String, String> headers){
		{
	        HttpClient client = null;
	        HttpPost post = new HttpPost(url);
	        ResponseData resData = new ResponseData();
	        try {
	        	 if (headers != null && !headers.isEmpty()) {  
		                for (Entry<String, String> entry : headers.entrySet()) {  
		                	post.addHeader(entry.getKey(), entry.getValue());  
		                }  
		            }  
	        	
	            if (StringUtils.isNotBlank(body)) {
	                HttpEntity entity = new StringEntity(body, ContentType.create("application/json", charset));
	                post.setEntity(entity);
	            }
	            // 设置参数
	            Builder customReqConf = RequestConfig.custom();
	            if (connTimeout > 0) {
	                customReqConf.setConnectTimeout(connTimeout);
	            }
	            if (readTimeout > 0) {
	                customReqConf.setSocketTimeout(readTimeout);
	            }
	            post.setConfig(customReqConf.build());

	            HttpResponse res;
	            if (url.startsWith("https")) {
	                // 执行 Https 请求.
	                client = createSSLInsecureClient();
	                res = client.execute(post);
	            } else {
	                // 执行 Http 请求.
	                client = HttpClientUtil.client;
	                res = client.execute(post);
	            }
	            resData.setCode(res.getStatusLine().getStatusCode());
	            resData.setBackData(IOUtils.toString(res.getEntity().getContent(), "UTF-8"));
	        }
	        catch(Exception e){ 
	        	e.printStackTrace();
	        	resData.setCode(500);
	        	resData.setBackData("请求其他系统失败"); 
	        }
	        finally {
	            post.releaseConnection();
	            if (url.startsWith("https") && client != null&& client instanceof CloseableHttpClient) {
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
	
	}
    
    public static void main(String[] args) {  
//        try {
//           // String str= post("https://localhost:443/ssl/test.shtml","name=12&page=34","application/x-www-form-urlencoded", "UTF-8", 10000, 10000);
//            //String str= get("https://localhost:443/ssl/test.shtml?name=12&page=34","GBK");
//            /*Map<String,String> map = new HashMap<String,String>();
//            map.put("name", "111");
//            map.put("page", "222");
//            String str= postForm("https://localhost:443/ssl/test.shtml",map,null, 10000, 10000);*/
//           // System.out.println(str);
//        } catch (ConnectTimeoutException e) {
//            // TODO Auto-generated catch block
//            e.printStackTrace();
//        } catch (SocketTimeoutException e) {
//            // TODO Auto-generated catch block
//            e.printStackTrace();
//        } catch (Exception e) {
//            // TODO Auto-generated catch block
//            e.printStackTrace();
//        }
    }
    
   
    
    
}
