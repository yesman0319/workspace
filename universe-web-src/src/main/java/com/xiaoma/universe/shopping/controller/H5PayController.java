
package com.xiaoma.universe.shopping.controller;

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.xiaoma.rest.authentication.UniverseSession;
import com.xiaoma.universe.common.api.ApiClient;
import com.xiaoma.universe.common.contant.Contant;
import com.xiaoma.universe.common.interceptor.UserVo;
import com.xiaoma.universe.common.utils.MapUtil;
import com.xiaoma.universe.common.utils.ObjectMapUtil;
import com.xiaoma.universe.common.utils.ResponseData;
import com.xiaoma.universe.common.utils.h5.WxScanCodePayNotify;
import com.xiaoma.universe.common.utils.h5.WxScanCodePayResultData;
import com.xiaoma.universe.information.controller.BaseController;
import com.xiaoma.universe.shopping.model.CouponRecord;
import com.xiaoma.universe.shopping.model.GoodAttr;
import com.xiaoma.universe.shopping.model.GoodVO;
import com.xiaoma.universe.shopping.service.CouponRecordService;
import com.xiaoma.universe.shopping.service.WalletService;
import com.xiaoma.universe.userlogin.controller.UserVO;

/**
 * 商品相关
 * @ClassName:GoodsController
 * @author zhaijilong
 */
@Controller
//@RequestMapping("/goods")
@RequestMapping("/h5/product/pay")
public class H5PayController  extends BaseController{
	
 
	
	private String noStockMessage  = "哎呀,被抢完了";
 
    private Logger logger = Logger.getLogger(H5PayController.class);
	
	@Autowired
	private CouponRecordService couponRecordService;
	
	@Autowired
	private WalletService walletService;
 
	
	/**
	 * 展示购买
	 * @param goodid 商品id
	 * @param outOrderId 外部订单号  计划卡片或视频课程等
	 * @param goodid 商品id
	 * @param recommentPersion 推荐人
	 * @param fromH5 是否是从H5界面获得的
	 * @param paidRedirect 付完款后H5的调转URL
	 * @return  
	 */      
	//get
	@RequestMapping(value="/{goodId}",method = RequestMethod.GET)
    public String getGood(HttpServletRequest request,Model model,String code,@PathVariable String goodId,String outOrderId,String callBack,String total_fee,String out_trade_no){
		
		String returnURL = "h5/h5_pay"; 
		String callUrl = getSuccessURL(request);
		
	 
        //-------判断用户是否登录, 如果没有跳转到登录界面-------
		UserVO user = (UserVO) UniverseSession.getAttribute("userInfo");
		UniverseSession.setAttribute("payUrl", callUrl);
		if(user == null || user.getId() <= 0){
			model.addAttribute("successURL",callUrl);
			return "redirect:/h5/show/fastlogin.html?backUrl="+callUrl;
		}
		
		
		//-------查看用户是否够买-------
		Map<String, String> headers1 = new HashMap<String, String>();
		ResponseData data1 = ApiClient.get(Contant.JUDGE_IF_NEED_BUY+"?orderSn="+outOrderId, headers1,request,"");  //调用计划
		if (data1.getCode() != 200) {
			model.addAttribute("error", "获取信息失败,请返回重新获取");
			return returnURL;
		}
		String resultStr1 = data1.getBackData().replaceAll("\\\\r\\\\n", "</br>"); //转换换行
		JSONObject resultJson1 = (JSONObject) JSONObject.parse(resultStr1);
		boolean judge = resultJson1.getBoolean("judge");
		int planId = resultJson1.getIntValue("planId");
		System.out.println("********************judge**********等于ture 表示需要购买**************"+judge);
		if(!judge){//true 需要购买
			return "redirect:/h5/plan/share/"+planId+".html";
		}
		//------------------
		
		
		
		//---------------微信支付oauth2授权---------只有在微信浏览器打开才会有如下代码--------------
		String ua = request.getHeader("user-agent").toLowerCase();
        if (ua.indexOf("micromessenger") > 0 && (code == null||code.equals(""))) {// 是微信浏览器,且code为空
        	String encodeUrl = "";
        	try {
				   encodeUrl = URLEncoder.encode(callUrl, "utf-8");
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
        	return "redirect:https://open.weixin.qq.com/connect/oauth2/authorize?appid="+Contant.WX_APP_ID+"&redirect_uri="+encodeUrl+"&response_type=code&scope=snsapi_base&state=0#wechat_redirect";
        	//String url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+Contant.WX_APP_ID+"&redirect_uri="+encodeUrl+"&response_type=code&scope=snsapi_base&state=0#wechat_redirect";
        	//wxH5getCode1(url);
        }
		
		Map<String, String> headers = new HashMap<String, String>();
		try {
			if(out_trade_no == null && total_fee == null){
				ResponseData data = ApiClient.get(Contant.ORDER_BUY_INDEX+"?id="+goodId, headers,request,"");  //调用远程后台接口
				if (data.getCode() != 200) {
					model.addAttribute("error", "获取产品信息失败,请返回重新获取");
					return returnURL;
				}
				
				String resultStr = data.getBackData().replaceAll("\\\\r\\\\n", "</br>"); //转换换行
				JSONObject resultJson = (JSONObject) JSONObject.parse(resultStr);
				Integer status = resultJson.getInteger("code");
				
				if(status != 200){
					model.addAttribute("error", "获取产品信息失败,请返回重新获取");
					return returnURL;
				}
				
				JSONArray goodsArray = resultJson.getJSONArray("goods");
				JSONObject goodJson = (JSONObject)goodsArray.get(0);
				Integer goodStatus =  goodJson.getInteger("goodStatus");
				
				if(goodStatus==1){ //商品已下架
					model.addAttribute("error", "商品已下架，请返回选择其它商品");
					return returnURL;
				}
				
				GoodVO goodVO = (GoodVO)JSONObject.toJavaObject(goodJson,GoodVO.class);
				if(code == null || code.equals("")){                            //微信OAuth2.0授权后返回的code
					 code = request.getParameter("code");  
				}

				model.addAttribute("code", code);                          //微信OAuth2.0授权后返回的code
				model.addAttribute("good", goodVO);                        //商品信息
				model.addAttribute("outOrderId", outOrderId);              //外部订单号 计划卡片或视频课程等
				model.addAttribute("callBack", callBack);                  //回调函数
				model.addAttribute("appid",Contant.WX_APP_ID);
				
				/***********************************************优惠券************************************************/
			    List<CouponRecord> couponRecordList = couponRecordService.getCouponRecord(request,goodId,String.valueOf(user.getId()));
			    model.addAttribute("couponList", couponRecordList); 
			    model.addAttribute("couponNum", couponRecordService.getCouldUseCouponNum(couponRecordList,null));  //可用的优惠券数量
			}else{
				model.addAttribute("orderId", out_trade_no); 
				model.addAttribute("totalFee", total_fee); 
			}
			   
			    model.addAttribute("phoneNum", user.getPhone());             //回调函数userInfo.getPhone();
			    model.addAttribute("userId", user.getId()); 
			    model.addAttribute("planId", planId); 
			    
			    model.addAttribute("wallet",walletService.getWallet(request));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return returnURL;
	}
	
	
	
	/**
	 * 进入商品分享列表页面
	 * @return  
	 */      
	@RequestMapping(value="/lists",method = RequestMethod.GET)
    public String getList(HttpServletRequest request,Model model){
		
		String returnURL = "h5/h5_product_list"; 
		String callUrl = getSuccessURL(request);
        
		//-------判断用户是否登录, 如果没有跳转到登录界面-------
		UserVO user = (UserVO) UniverseSession.getAttribute("userInfo");
		UniverseSession.setAttribute("payUrl", callUrl);
		if(user == null || user.getId() <= 0){
			model.addAttribute("successURL",callUrl);
			return "redirect:/h5/show/fastlogin.html?backUrl="+callUrl;
		}
		
		
		Map<String, String> headers = new HashMap<String, String>();
		ResponseData data = ApiClient.get(Contant.ORDER_BUY_INDEX, headers,request,"");  //调用远程后台接口
		if (data.getCode() != 200) {
			model.addAttribute("error", "获取产品信息失败,请返回重新获取");
			return returnURL;
		}

		
		JSONObject resultJson = JSONObject.parseObject(data.getBackData());
		Integer status = (Integer) resultJson.get("code");
		if(status != 200){
			model.addAttribute("error", "获取产品信息失败,请返回重新获取");
			return returnURL;
		}
		List<GoodVO> goodList =  null;
		try{
			goodList = JSONArray.parseArray(resultJson.get("goods").toString(),GoodVO.class);
		}catch(Exception e){
			e.printStackTrace();
		}
		
		model.addAttribute("goodList", goodList); 
		model.addAttribute("userId", user.getId()); 
		return returnURL;
	}
	
	
	/**
	 * 展示购买
	 * @param goodid 商品id
	 * @param outOrderId 外部订单号  计划卡片或视频课程等
	 * @param goodid 商品id
	 * @param recommentPersion 推荐人
	 * @param fromH5 是否是从H5界面获得的
	 * @param paidRedirect 付完款后H5的调转URL
	 * @return  
	 */      
	//get
	@RequestMapping(value="/share/{goodId}",method = RequestMethod.GET)
    public String shareGood(HttpServletRequest request,Model model,@PathVariable String goodId){
		
		String returnURL = "h5/share_good"; 
		Map<String, String> headers = new HashMap<String, String>();
		try {
				ResponseData data = ApiClient.get(Contant.ORDER_BUY_INDEX+"?id="+goodId, headers,request,"");  //调用远程后台接口
				if (data.getCode() != 200) {
					model.addAttribute("error", "获取产品信息失败,请返回重新获取");
					return returnURL;
				}
				
				String resultStr = data.getBackData().replaceAll("\\\\r\\\\n", "</br>"); //转换换行
				JSONObject resultJson = (JSONObject) JSONObject.parse(resultStr);
				Integer status = resultJson.getInteger("code");
				
				if(status != 200){
					model.addAttribute("error", "获取产品信息失败,请返回重新获取");
					return returnURL;
				}
				
				JSONArray goodsArray = resultJson.getJSONArray("goods");
				JSONObject goodJson = (JSONObject)goodsArray.get(0);
				Integer goodStatus =  goodJson.getInteger("goodStatus");
				
				if(goodStatus==1){ //商品已下架
					model.addAttribute("error", "商品已下架，请返回选择其它商品");
					return returnURL;
				}
				
				
				GoodVO goodVO = (GoodVO)JSONObject.toJavaObject(goodJson,GoodVO.class);
				
				if(goodVO != null){
				 BigDecimal minPrice = goodVO.getLocalPrice();
				 BigDecimal marketPrice = goodVO.getMarketPrice();
				 List<GoodAttr> goodAttrList = goodVO.getGoodAttrList();
				 if(goodAttrList != null && goodAttrList.size() != 0){
					GoodAttr goodAttr = (GoodAttr)goodAttrList.get(0);
					minPrice.add(goodAttr.getPrice());
					marketPrice.add(goodAttr.getMarketPrice());
				 }
				  model.addAttribute("minPrice", minPrice);                        //商品信息
				  model.addAttribute("marketPrice", marketPrice);
				} 
				 model.addAttribute("good", goodVO);                        //商品信息
				
				 model.addAttribute("codeUrl", getSuccessURL(request));     //生成二维码的地址
				 System.out.println(getSuccessURL(request));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return returnURL;
	}
	
	
	
	/**
	 * 进入商品二维码分享列表页面
	 * @return  
	 */      
	@RequestMapping(value="/codepic",method = RequestMethod.GET)
    public String toCodePic(HttpServletRequest request,Model model,String codeUrl){
		String returnURL = "h5/code_pic"; 
		model.addAttribute("codeUrl", codeUrl+"&source=weixin"); 
		return returnURL;
	}
	
	
	
	
	
	 public void wxH5getCode1(String uploadurl){
		    org.apache.commons.httpclient.HttpClient client = new org.apache.commons.httpclient.HttpClient();
	        PostMethod post = new PostMethod(uploadurl);
	        post.setRequestHeader(
	                        "User-Agent",
	                        "mozilla/5.0 (linux; android 4.4.2; huawei p7-l07 build/huaweip7-l07) applewebkit/537.36 (khtml, like gecko) version/4.0 chrome/37.0.0.0 mobile mqqbrowser/6.8 tbs/036824 safari/537.36 micromessenger/6.3.25.861 nettype/cmnet language/zh_cn");
	        post.setRequestHeader("Host", "file.api.weixin.qq.com");
	        post.setRequestHeader("Connection", "Keep-Alive");
	        post.setRequestHeader("Cache-Control", "no-cache");
	        try
	        {
	                int status = client.executeMethod(post);
	        }
	        catch (Exception e)
	        {
	            e.printStackTrace();
	        }
	 }
	
	
	/**
	 * 切换用户
	 * @return  
	 */      
	//get
	@RequestMapping(value="/users",method = RequestMethod.GET)
    public String updateUser(HttpServletRequest request,Model model){
		
		UserVO user = (UserVO) UniverseSession.getAttribute("userInfo");
		String payUrl = UniverseSession.getAttribute("payUrl") == null?"":(String)UniverseSession.getAttribute("payUrl");
		if(user != null && user.getId() >= 0){
			UniverseSession.removeAttribute("userInfo");
		}
		//model.addAttribute("successURL", payUrl);
		return "redirect:/h5/show/fastlogin.html?backUrl="+payUrl;
	}
	
	
	
	/**--app下单后，调用此方法，查询付款是否成功---------------
     * @param orderId    本地订单号  
     * @return           处理结果
     */
	 @RequestMapping(value="/wx/notify")
	 @ResponseBody
	 public void wxNotify(HttpServletRequest request,HttpServletResponse response){
		System.out.println("-----------------------------------h5 微信支付回调------------------------------------");
		String resultStr = "";
		Map<String, String> headers = new HashMap<String, String>();
		WxScanCodePayNotify wcpn = new WxScanCodePayNotify();
		Map<String, String> params = new HashMap<String, String>();
		try {
			 WxScanCodePayResultData wxresultDate = wcpn.notify(request, response);
			   // 将参数转换成Map<String,Object>形式，并查询数据库，如果条件为空，则查询全部
				try {
					params = ObjectMapUtil.getFieldStringVlaue(wxresultDate);
				} catch (Exception e) {
					e.printStackTrace();
				}
			//调用远程生成 支付宝 当面付接口
			if(wxresultDate!=null&wxresultDate.getOutTradeNo()!=null){
				 ResponseData data = ApiClient.post(Contant.WX_H5_NOTIFY_UPDATE_ORDERS,params,headers);
				// Map<String, Object> resultDataMap = HttpClientUtils.postMap(Contant.WX_H5_NOTIFY_UPDATE_ORDERS,params,headers); 
	     		/* if(resultDataMap!=null && resultDataMap.get("status").toString().equals("200")){
				  System.out.print("...........................回调成功...........................");
				 }*/
				 if (data.getCode() == 200) {
						 System.out.print("...........................回调成功...........................");
				}
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}  
	 }
	 
		/**
		 * H5微信支付
		 * @param goodid 商品id
		 * @param outOrderId 外部订单号  计划卡片或视频课程等
		 * @param goodid 商品id
		 * @param recommentPersion 推荐人
		 * @param fromH5 是否是从H5界面获得的
		 * @return  
		 */
		@RequestMapping(value="/wx",method = RequestMethod.POST)
		@ResponseBody
	    public Map<String,Object> getH5WxPayParam(HttpServletRequest request,Model model,
	    		                                  String code,String goodId,String attrId,
	    		                                  String outOrderId,String callBack,
	    		                                  String recommentPersion,
	    		                                  String learnStartTime,String totalPrice,
	    		                                  @UserVo UserVO userInfo,String couponId,String openId){
			
			UserVO user = (UserVO) UniverseSession.getAttribute("userInfo");
			
			if(user == null){
				return MapUtil.resultMap("error", "用户为空");
			}
			
			Map<String, String> headers = new HashMap<String, String>();
			//header设置参数
			Map<String, String> params = new HashMap<String, String>();
			
			//判断  查询  库存量
			if(goodId != null){
            	ResponseData goodData = ApiClient.get(Contant.SHOPPING_HOST+"/goods/unique?goodId="+goodId,headers,request,"ajax");
    			if (goodData.getCode() != 200) {
    				model.addAttribute("error", "获取产品信息失败,请返回重新获取");
    			}
    			JSONObject callGoolResultJson = (JSONObject) JSONObject.parse(goodData.getBackData());
    			JSONObject goodjson = (JSONObject) callGoolResultJson.get("good");
    			int stockNum = (Integer)goodjson.get("stockNum");
				if(stockNum <= 0){
					return MapUtil.resultMap("noStock",noStockMessage);
				}
			}
			
			
			String referrerUserid =  getReferrerUserid();                   //获取分享人
			params.put("referrerUserid", referrerUserid);                     
			
			params.put("goodId", goodId);                                   //购买的商品id
			params.put("attrId", attrId);                                   //购买的商品时长id
			params.put("userId", String.valueOf(user.getId()));                                  //用户id  String.valueOf(userInfo.getId())
			params.put("learnStartTime", learnStartTime);                   //选中的开始学习的时间
			params.put("totalPrice", totalPrice);                           //总共应付款      主要用作校验
			params.put("callBack", callBack);                               //回调 参数
			params.put("outOrderId", outOrderId);                           //外部订单号  计划卡片或视频课程的订单id
			params.put("recommentPersion",recommentPersion);                //推荐人  
			params.put("phoneNum",user.getPhone());                         //电话号码  
			params.put("couponId", couponId);                               //优惠券Id
			if(code == null || code.equals("")){                            //微信OAuth2.0授权后返回的code
			 code = request.getParameter("code"); 
			}
			params.put("code",code);  
			params.put("openId",openId);  
			//调用远程
			ResponseData data = ApiClient.post(Contant.WX_OPENT_MEMBER_FOR_H5,params,headers,request,"ajax");
			if (data.getCode() != 200) {
				return MapUtil.resultMap("error", "获取产品信息失败,请返回重新获取");
			}
			System.out.println("H5:请求参数params:"+params+"----code:---"+code);
			JSONObject resultJson = (JSONObject) JSONObject.parse(data.getBackData());
			/*resultMap.put("appId",resultJson.get("appid"));
			resultMap.put("timeStamp",resultJson.get("tempstamp"));
			resultMap.put("nonceStr",resultJson.get("noncestr"));
			resultMap.put("package","prepay_id="+resultJson.get("prepayid"));
			resultMap.put("signType","MD5");
			resultMap.put("paySign",resultJson.get("sign"));*/
			System.out.println("*******************:resultJson:"+resultJson.toString());
			Map<String,Object> mp = new HashMap<String, Object>();
			if(resultJson.get("error") != null && !resultJson.get("error").toString().trim().equals("")){  //如果有错误信息
				mp.put("error", resultJson.get("error"));
				return mp;
			}
			return (Map)resultJson;
		}
		
		/**
		 * h5 支付宝支付，获取支付参数
		 * @param goodid 商品id
		 * @param outOrderId 外部订单号  计划卡片或视频课程等
		 * @param goodid 商品id
		 * @param recommentPersion 推荐人
		 * @param userId 购买用户的id
		 * @param learnStartTime 开始学习时间
		 * @param totalPrice 总价
		 * @param callBack 回调函数
		 * @return  
		 */
		@RequestMapping(value="/ali",method = RequestMethod.POST)
		@ResponseBody
	    public Map<String,String> getH5AliPayParam(HttpServletRequest request,HttpServletResponse response,
	    		                                   Model model,String goodId,String attrId,String outOrderId,
	    		                                   String callBack,String recommentPersion,String learnStartTime,
	    		                                   String totalPrice,@UserVo UserVO userInfo,String couponId){
			
			
						Map<String, String> headers = new HashMap<String, String>();
						//header设置参数
						Map<String, String> params = new HashMap<String, String>();
						
 
						//判断  查询  库存量
						if(goodId != null){
			            	ResponseData goodData = ApiClient.get(Contant.SHOPPING_HOST+"/goods/unique?goodId="+goodId,headers,request,"ajax");
			    			if (goodData.getCode() != 200) {
			    				model.addAttribute("error", "获取产品信息失败,请返回重新获取");
			    			}
			    			JSONObject callGoolResultJson = (JSONObject) JSONObject.parse(goodData.getBackData());
			    			JSONObject goodjson = (JSONObject) callGoolResultJson.get("good");
			    			int stockNum = (Integer)goodjson.get("stockNum");
		    				if(stockNum <= 0){
		    					params.put("noStock", noStockMessage);
		    					return params;
		    				}
			            }
						 
						UserVO user = (UserVO) UniverseSession.getAttribute("userInfo");
           
						String phoneNum = "";
						String userId = "";
						if(userInfo != null){
						       phoneNum = userInfo.getPhone();                         //电话号码 
						       userId = String.valueOf(userInfo.getId());
						}
						
						String referrerUserid =  getReferrerUserid();                   //获取分享人
						String callURL=Contant.ALI_OPENT_MEMBER_FOR_H5+"?goodId="+goodId+"&attrId="+attrId+"&userId="+userId+"&learnStartTime="+learnStartTime+"&totalPrice="+totalPrice+"&outOrderId="+outOrderId+"&callBack="+callBack+"&recommentPersion="+recommentPersion+"&phoneNum="+phoneNum+"&couponId="+couponId+"&referrerUserid="+referrerUserid;
						logger.info(callURL);
						System.out.println(callURL);
						ResponseData data = ApiClient.get(callURL,headers,request,"ajax");
						if (data.getCode() != 200) {
							model.addAttribute("error", "获取产品信息失败,请返回重新获取");
						}
						JSONObject resultJson = (JSONObject) JSONObject.parse(data.getBackData());
						String aliPayHtmlText = (String)resultJson.get("aliPayHtmlText");
						if(aliPayHtmlText == null){
							params.put("error",resultJson.get("message") == null?null:String.valueOf(resultJson.get("message")));
						}
					/*	aliPayHtmlText = aliPayHtmlText.replaceFirst("\"", "");
						aliPayHtmlText = aliPayHtmlText.substring(0, aliPayHtmlText.length()-1);
						aliPayHtmlText = aliPayHtmlText.replaceAll("\\\\", "");*/
						String orderId = (String)resultJson.get("orderId");
						
						params.put("aliPayHtmlText", aliPayHtmlText);
						params.put("orderId", orderId);
						return params;
						
		}
		
		
		 /**------H5 成功支付后的 跳转 的提示 页面----*/
		 @RequestMapping(value="/ali/returnjsp",method = RequestMethod.GET)
		 public String tojsdzResultJsp(String total_fee,String out_trade_no,Model model){
			 model.addAttribute("total_fee", total_fee);       //支付金额
			 model.addAttribute("out_trade_no", out_trade_no); //商城订单号
			return "h5/h5_pay_success";
		 } 
		 
		 
		 
   /**
	 * 钱包下单并支付，返回参数：orderId：订单Id；status：状态，0=失败，1=成功；message：消息
	 * @param request
	 * @param goodId 商品ID
	 * @param attrId 商品属性ID
	 * @param userId 用户Id
	 * @param callBack 回调地址
	 * @param recommentPersion 推荐人
	 * @param learnStartTime 计划开始时间
	 * @param totalPrice 价格
	 * @param phoneNum 用户手机号
	 * @param couponId 优惠券Id
	 * @param fromType 来源，默认为web
	 * @return JSONObject对象,
	 */
	@RequestMapping(value="/wallet",method = RequestMethod.POST)
	@ResponseBody
    public Map<String,Object> walletOrderPay(HttpServletRequest request,Model model,
    		                                  String code,String goodId,String attrId,
    		                                  String outOrderId,String callBack,
    		                                  String recommentPersion,
    		                                  String learnStartTime,String totalPrice,
    		                                  @UserVo UserVO userInfo,String couponId,String openId){
		
		UserVO user = (UserVO) UniverseSession.getAttribute("userInfo");
		if(user == null){
			return MapUtil.resultMap("error", "用户为空");
		}
		
		Map<String, String> headers = new HashMap<String, String>();
		//判断  查询  库存量
		if(goodId != null){
        	ResponseData goodData = ApiClient.get(Contant.SHOPPING_HOST+"/goods/unique?goodId="+goodId,headers,request,"ajax");
			if (goodData.getCode() != 200) {
				model.addAttribute("error", "获取产品信息失败,请返回重新获取");
			}
			JSONObject callGoolResultJson = (JSONObject) JSONObject.parse(goodData.getBackData());
			JSONObject goodjson = (JSONObject) callGoolResultJson.get("good");
			int stockNum = (Integer)goodjson.get("stockNum");
			if(stockNum <= 0){
				return MapUtil.resultMap("noStock",noStockMessage);
			}
		}
		
	    JSONObject walletPayResultJSONObject = walletService.walletOrderPay(request, goodId, attrId, String.valueOf(user.getId()), callBack, recommentPersion, learnStartTime, totalPrice, user.getPhone(), couponId, "walletH5");
		logger.info("*******************:walletPayResultJSONObject:"+walletPayResultJSONObject.toString());
	    System.out.println("*******************:walletPayResultJSONObject:"+walletPayResultJSONObject.toString());
		Map<String,Object> mp = new HashMap<String, Object>();
		return (Map)walletPayResultJSONObject;
	}
	
	//获得分享人的 userId,存入商城的订单表中
	private String getReferrerUserid(){
		String referrerUserid = (String) UniverseSession.getAttribute("userIdInCookie")==null?"":(String) UniverseSession.getAttribute("userIdInCookie"); //从session中获取分享人ID
		System.out.println("---------referrerUserid 从session中获取的推荐人用户id----------"+referrerUserid);
		logger.info("---------referrerUserid 从session中获取的推荐人用户id----------"+referrerUserid);
		return referrerUserid;
	}
}
