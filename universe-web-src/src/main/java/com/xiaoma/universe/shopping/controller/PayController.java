
package com.xiaoma.universe.shopping.controller;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.xiaoma.universe.common.api.ApiClient;
import com.xiaoma.universe.common.api.JsonUtil;
import com.xiaoma.universe.common.contant.Contant;
import com.xiaoma.universe.common.interceptor.UserVo;
import com.xiaoma.universe.common.utils.DESIOSUtil;
import com.xiaoma.universe.common.utils.GenerateQrCodeUtil;
import com.xiaoma.universe.common.utils.GetTokenFromCooklie;
import com.xiaoma.universe.common.utils.MapUtil;
import com.xiaoma.universe.common.utils.ResponseData;
import com.xiaoma.universe.shopping.ZeroByVO;
import com.xiaoma.universe.shopping.enums.Constants.PaymentType;
import com.xiaoma.universe.shopping.model.CouponRecord;
import com.xiaoma.universe.shopping.model.GoodVO;
import com.xiaoma.universe.shopping.model.Wallet;
import com.xiaoma.universe.shopping.service.CouponRecordService;
import com.xiaoma.universe.shopping.service.WalletService;
import com.xiaoma.universe.userlogin.controller.UserVO;

/**
 * 订单支付相关 
 * 
 * @ClassName:OrderPaymentController
 * @author zhaijilong
 */
@Controller
//@RequestMapping("/orders")/h5/product/pay/
@RequestMapping("/web/product/pay")
public class PayController{

	private Logger logger = Logger.getLogger(PayController.class);
	
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
	 * @return  
	 */
	@RequestMapping(value="/get",method = RequestMethod.GET)
    public String getGood(HttpServletRequest request,Model model,String goodId,String outOrderId,String callBack,String recommentPersion,@UserVo UserVO userInfo){
		String categoryType = request.getParameter("categoryType");
		logger.info("web/product/pay/get::start:::categoryType="+categoryType);
		if("3".equals(categoryType)){
			model.addAttribute("categoryType", 3);  
		}else if("4".equals(categoryType)){
			model.addAttribute("categoryType", 4);  
		}
		String returnURL = "orderpay/order";   //web 商品购买页面
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
			model.addAttribute("good", goodVO);                        //商品信息
			model.addAttribute("outOrderId", outOrderId);              //外部订单号 计划卡片或视频课程等
			model.addAttribute("callBack", callBack);                  //回调函数
			model.addAttribute("recommentPersion", recommentPersion);  //推荐人
			
			
			/***********************************************优惠券************************************************/
			List<CouponRecord> couponRecordList = couponRecordService.getCouponRecord(request,goodId, String.valueOf(userInfo.getId()));
			List<CouponRecord> couponRecordListResult = new ArrayList<CouponRecord>();
			for(CouponRecord couponRecord:couponRecordList){
				if(couponRecord.getResultStatus() != null && couponRecord.getResultStatus().equals("0")){ //筛选出可用的优惠券
					couponRecordListResult.add(couponRecord);
			     }
			}
			model.addAttribute("couponList", couponRecordListResult);               //可用的优惠券
			
			//查询计划ID
			try{
				
				categoryType = categoryType == null?"0":categoryType;
				ResponseData calldata = ApiClient.get(Contant.CALL_BACK_PARAMS+"?goodId="+goodId+"&categoryId="+categoryType, headers,request,"");  //调用远程后台接口
				if (calldata.getCode() != 200) {
					model.addAttribute("error", "获取产品信息失败,请返回重新获取");
					return returnURL;
				}
				String callresultStr = calldata.getBackData().replaceAll("\\\\r\\\\n", "</br>"); //转换换行
				JSONObject callresultJson = (JSONObject) JSONObject.parse(callresultStr);
				String  callBackPrams = "";
				if(callresultJson != null){
					 callBackPrams = callresultJson.getString("callBackPrams");
				}
				model.addAttribute("callBackPrams", callBackPrams);  
				
				logger.info("web/product/pay/get:::callBackPrams="+callBackPrams);
				logger.info("web/product/pay/get:::categoryType="+categoryType);
			}catch(Exception e){
				e.printStackTrace();
				logger.info("goodId="+goodId);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return returnURL;
	}
	
	
	/**
	 * 零元购买（使用优惠券）h5
	 */
	@RequestMapping(value="/coupon/buy",method = RequestMethod.POST)
	@ResponseBody
	public Object couponH5Buy(HttpServletRequest request,Model model, ZeroByVO zeroByVO,@UserVo UserVO userInfo){
		//参数判断  
		try {
			logger.info(JsonUtil.beanToJson(zeroByVO));
		} catch (Exception e) {
			e.printStackTrace();
		}

		
		//header设置参数
		Map<String, String> headers = new HashMap<String, String>();
		Map<String, String> params = new HashMap<String, String>();
		
		
		params.put("goodId", String.valueOf(zeroByVO.getGoodId()));                                   //购买的商品id
		params.put("attrId", zeroByVO.getAttrId());                                   //购买的商品时长id
		params.put("userId", userInfo.getId()+"");                //用户id  
		params.put("learnStartTime",zeroByVO.getLearnStartTime());//选中的开始学习的时间
		params.put("totalPrice", zeroByVO.getTotalPrice());                           //总共应付款      主要用作校验
		params.put("recommentPersion", zeroByVO.getRecommentPersion()); //推荐人  
		params.put("phoneNum", userInfo.getPhone());                    //购买者电话
		params.put("couponId", String.valueOf(zeroByVO.getCouponId()));                               //优惠券id
		ResponseData data = ApiClient.post(Contant.COUPON_PAY,params,headers,request,"");
		
		Map<String,Object> result = new HashMap<String,Object>();
		JSONObject resultJson = (JSONObject) JSONObject.parse(data.getBackData());
		if(resultJson.containsKey("error")){
			model.addAttribute("couponError", resultJson.get("error"));
			model.addAttribute("couponStatus", -1);
			result.put("error",resultJson.get("error"));
			result.put("status", -1);
			return result;
		}
		model.addAttribute("couponStatus", 1);
		result.put("status", 1);
		result.put("success","购买成功");
		result.put("orderId",resultJson.get("orderId"));
		return result;//"h5/h5_pay_success";
	}
	/**
	 * 零元购买（使用优惠券）web
	 */
	@RequestMapping(value="/coupon/buy",method = RequestMethod.GET)
	public String couponWebBuy(HttpServletRequest request,Model model,@UserVo UserVO userInfo){
		//参数判断
		Map<String,String> getParamMap = getRequestParam(request,userInfo);
		if (null == getParamMap){
				model.addAttribute("error","参数为空");
			    return "orderpay/pay";
		}
		
		String categoryType = request.getParameter("categoryType");
		ResponseData data = useCouponBuy(request,model,userInfo,categoryType,getParamMap);
		
		
		JSONObject resultJson = (JSONObject) JSONObject.parse(data.getBackData());
		if(resultJson.containsKey("error")){
			model.addAttribute("couponError",resultJson.get("error"));
			model.addAttribute("couponStatus", -1);
			return "forward:/web/product/pay/get?goodId="+GetTokenFromCooklie.getCookieByName(request,"BUY_GOOD_ID");
		}
		model.addAttribute("couponStatus", 1);
		if("3".equals(categoryType)){
			model.addAttribute("categoryType", 3);  
		}else if("4".equals(categoryType)){
			model.addAttribute("categoryType", 4);  
		}
		if(resultJson.containsKey("categoryId")){
			Integer categoryId = resultJson.getInteger("categoryId");
			String callBackPrams = resultJson.getString("callBackPrams");
			model.addAttribute("categoryId", categoryId);
			model.addAttribute("callBackPrams",callBackPrams);
		}
		model.addAttribute("couponStatus", 1);
		return "forward:/web/product/pay/get?goodId="+GetTokenFromCooklie.getCookieByName(request,"BUY_GOOD_ID");
	}
	/*private int getStockNum(Map<String, String> getParamMap,Model model,HttpServletRequest request) {
		String goodId = getParamMap.get("goodid"); 
		Map<String, String> headers = new HashMap<String, String>();
		//判断  查询  库存量
		if(goodId != null){
        	ResponseData goodData = ApiClient.get(Contant.SHOPPING_HOST+"/goods/unique?goodId="+goodId,headers,request,"ajax");
			if (goodData.getCode() != 200) {
				model.addAttribute("error", "获取产品信息失败,请返回重新获取");
				return -1;
			}
			JSONObject callGoolResultJson = (JSONObject) JSONObject.parse(goodData.getBackData());
			JSONObject goodjson = (JSONObject) callGoolResultJson.get("good");
			int stockNum = (Integer)goodjson.get("stockNum");
			logger.info("--1-----stockNum:"+stockNum);
			if(stockNum <= 0){
				return -1;
			}
		}
		return 1;
		
	}*/


	private ResponseData useCouponBuy(HttpServletRequest request, Model model, UserVO userInfo,String categoryType,Map<String,String> getParamMap) {
		Map<String, String> headers = new HashMap<String, String>();
		//header设置参数
		Map<String, String> params = new HashMap<String, String>();
		
		String goodid = getParamMap.get("goodid");            
		String attrid = getParamMap.get("attrid");
		String checkprice = getParamMap.get("checkprice");
		String couponId = getParamMap.get("couponId");
		
		params.put("goodId", goodid);                                   //购买的商品id
		params.put("attrId", attrid);                                   //购买的商品时长id
		params.put("attrValue", getParamMap.get("attrvalue"));          //购买的商品时长名称  
		params.put("userId", userInfo.getId()+"");                //用户id  
		params.put("learnStartTime", getParamMap.get("learnstarttime"));//选中的开始学习的时间
		params.put("totalPrice", checkprice);                           //总共应付款      主要用作校验
		params.put("recommentPersion", getParamMap.get("recommentPersion")); //推荐人  
		params.put("phoneNum", userInfo.getPhone());                    //购买者电话
		params.put("couponId", couponId);                               //优惠券id
		params.put("categoryType", categoryType);                               //优惠券id
		ResponseData data = ApiClient.post(Contant.COUPON_PAY,params,headers,request,"");
		return data;
	}


	/**---微信开通会员调用此方法---web 下订单-----
     * @param goodid      商品id
     * @param goodattrid  商品属性id 
     * @param checkprice  前台传过来的价格，仅用于验证   
     * @return            支付页面
     */
	@RequestMapping(value="/wx",method = RequestMethod.GET)
    public String wxOpenMember(HttpServletRequest request,Model model,@UserVo UserVO userInfo){
		
		//参数判断
		Map<String,String> getParamMap = getRequestParam(request,userInfo);
		//获取钱包信息
		Wallet wallet = walletService.getWallet(request);
		model.addAllAttributes(getSupportPaymentTypes(getParamMap));
		model.addAttribute("wallet", wallet);
		model.addAttribute("walletPay", false);
		if (null == getParamMap){
				model.addAttribute("error","参数为空");				
			    return "orderpay/pay";
		}		
		String userId = getParamMap.get("userid"); 
		try {
			
			Map<String, String> headers = new HashMap<String, String>();
			//header设置参数
			Map<String, String> params = new HashMap<String, String>();
			
			String goodid = getParamMap.get("goodid");            
			String attrid = getParamMap.get("attrid");
			String checkprice = getParamMap.get("checkprice");
			String callBack = getParamMap.get("callBack");
			String outOrderId = getParamMap.get("outOrderId");
			String couponId = getParamMap.get("couponId");
			
			params.put("goodid", goodid);                                   //购买的商品id
			params.put("attrid", attrid);                                   //购买的商品时长id
			params.put("attrValue", getParamMap.get("attrvalue"));          //购买的商品时长名称  
			params.put("userid", userId);                //用户id  
			params.put("learnStartTime", getParamMap.get("learnstarttime"));//选中的开始学习的时间
			params.put("totalPrice", checkprice);                           //总共应付款      主要用作校验
			params.put("callBack", callBack);                               //回调 参数
			params.put("outOrderId", outOrderId);                           //外部订单号  计划卡片或视频课程的订单id
			params.put("recommentPersion", getParamMap.get("recommentPersion")); //推荐人  
			params.put("phoneNum", userInfo.getPhone());                    //购买者电话
			params.put("couponId", couponId);                               //优惠券id
			
			
			System.out.println(Contant.WX_OPENT_MEMBER_FOR_WEB);
			//调用远程生成微信二维码接口
			ResponseData data = ApiClient.post(Contant.WX_OPENT_MEMBER_FOR_WEB,params,headers,request,"");
			if (data.getCode() != 200) {
				model.addAttribute("error", "获取产品信息失败,请返回重新获取");				
				return "orderpay/order";
			}
			
			JSONObject resultJson = (JSONObject) JSONObject.parse(data.getBackData());
			Integer status = (Integer)resultJson.get("status");
			if(status == 1){
				model.addAttribute("error", resultJson.get("result"));
				if(resultJson.get("result") == null){
					model.addAttribute("error",resultJson.get("message"));
				}				
				return "orderpay/pay";
			}
			
			String resultParam = resultJson.getString("result");
			JSONObject paramJson = (JSONObject) JSONObject.parse(resultParam);
			String code_url = paramJson.get("code_url") == null?"":paramJson.get("code_url").toString();
			String order_id = paramJson.get("order_id") == null?"":paramJson.get("order_id").toString();
			String order_price = paramJson.get("order_price") == null?"":paramJson.get("order_price").toString();
			
			Double tempCheckPrice = null;
			Double tempOrderPrice = null;
			if(checkprice != null){
				tempCheckPrice = Double.valueOf(checkprice);
				tempOrderPrice = Double.valueOf(order_price);
			}
			
			//如果前台页面传过来的价格和数据库中商品价格 相等
			if(tempOrderPrice != null && tempCheckPrice != null && tempCheckPrice.doubleValue() == tempOrderPrice.doubleValue()){
				model.addAttribute("code_url",code_url);         //返回微信生成的二维码code
				model.addAttribute("order_id",order_id);         //本地订单号
				model.addAttribute("good_id",goodid);            //商品id
				model.addAttribute("good_attrid",attrid);        //商品属性id
				model.addAttribute("order_price",order_price);   //支付金额
				model.addAttribute("callBack",callBack);         //回调函数
				model.addAttribute("outOrderId",outOrderId);     //外部订单号
				model.addAttribute("good_name",getParamMap.get("goodname"));
				model.addAttribute("user_id",userId);
				model.addAttribute("walletPay", true);
			}			
			
		} catch (Exception e) {			
			model.addAttribute("error","处理订单失败");
			logger.error(e.getMessage(), e);
		}
		return "orderpay/pay";
    }
	
	private Map<String ,Object> getSupportPaymentTypes(Map<String,String> paramMap){
		String supportPaymentTypes=paramMap.get("supportPaymentTypes");
		Map<String ,Object >map=new HashMap<String,Object>();		
		List<PaymentType> paymentTypes=new ArrayList<PaymentType>();
		if(StringUtils.isNotBlank(supportPaymentTypes)){
			String strs[]=StringUtils.split(supportPaymentTypes.trim(),",");
			for (int i = 0; i < strs.length; i++) {											
				paymentTypes.add(PaymentType.getPaymentType(Integer.valueOf(strs[i].trim())));
			}
		}else{
			supportPaymentTypes="1900";
			paymentTypes.add(PaymentType.wallet);
		}
		map.put("jsonStr", paramMap.get("jsonStr"));		
		map.put("supportPaymentTypeList", paymentTypes);
		//map.put("defaultPaymentType", paymentTypes.get(0));
		map.put("supportPaymentTypes", supportPaymentTypes);
		return map;
	}
	
	 /**
	   * 生成二维码图片并直接以流的形式输出到页面
	   * @param code_url
	   * @param response
	   */
	  @RequestMapping("/qrcode")
	  @ResponseBody
	  public void getQRCode(String code_url,HttpServletResponse response,HttpServletRequest request){
	    String result = GenerateQrCodeUtil.encodeQrcode(code_url, response);
	    if(result!= null && result.equals("error")){
	    	//如果失败，则再生成一次
	    	result = GenerateQrCodeUtil.encodeQrcode(code_url, response);
	    }
	 }
	  
	  
	   /**---下订单 ----支付宝 web 当面付-----
	     * @param productId   产品ID
	     * @param orderid     本地订单号
	     * @param token       token
	     * @return            支付页面
	     */
		@RequestMapping(value="/ali/web/dmf",method = RequestMethod.GET)
		@ResponseBody
		public Map<String,Object> aliOpenMember(HttpServletRequest request,String totalPrice,String orderid,@UserVo UserVO userInfo){

			//参数判断
			Map<String,String> getParamMap = getRequestParam(request,userInfo);
			if(StringUtils.isBlank(orderid)){
				 return MapUtil.toMap(1, "没有生成订单号");
			}
			if (null == getParamMap){
				 return MapUtil.toMap(1, "参数为空");
			}
			
		    try{
				//header设置token
				Map<String, String> headers = new HashMap<String, String>();
				Map<String, String> params = new HashMap<String, String>();
				
				params.put("orderid", orderid);
				params.put("totalPrice", totalPrice);
				
				System.out.println(Contant.ALI_OPENT_MEMBER_FOR_DMF);
				//调用远程生成 支付宝 当面付接口
				ResponseData data = ApiClient.post(Contant.ALI_OPENT_MEMBER_FOR_DMF,params,headers,request,"ajax");
				if (data.getCode() != 200) {
					return MapUtil.toMap(1, "获取支付信息失败");
				}
				
				JSONObject resultJson = (JSONObject) JSONObject.parse(data.getBackData());
				Integer status = (Integer)resultJson.get("status");
				if(status == 1){
					return MapUtil.toMap(1, resultJson.get("message").toString());
				}
				
				Map<String, Object> resultMap = (Map) resultJson;
				resultMap.put("interfacehost", Contant.SHOPPING_HOST);
				return resultMap;
			} catch (Exception e) {
				logger.error(e.getMessage(), e);
				return MapUtil.toMap(1, "支付宝订单创建失败，请选择微信支付或重新购买");
			}
	    }
		
		
		/**
		 * 钱包支付，返回参数：orderId：订单Id；status：状态，0=失败，1=成功；message：消息
		 * @param request
		 * @param orderId 本地订单号
		 */
		@RequestMapping(value="/wallet",method = RequestMethod.GET)
		@ResponseBody
	    public Map<String,Object> walletOrderPay(HttpServletRequest request,String orderId){
			JSONObject resultPayJson = walletService.walletPay(request, orderId,"web");
			Map errorPayMap = new HashMap();
			if(resultPayJson == null){
				errorPayMap.put("status", "0");
				errorPayMap.put("message", "支付失败");
				return errorPayMap;
			}
			return (Map)resultPayJson;
		}
		
		
		
		/**--app下单后，调用此方法，查询付款是否成功---------------
	     * @param orderId    本地订单号  
	     * @return           处理结果
	     */
		 @RequestMapping(value="/result",method = RequestMethod.GET)
		 @ResponseBody
		 public Map<String,Object> queryAppPayStatusResult(String orderid,HttpServletRequest request){
			String resultStr = "";
			Map<String, String> headers = new HashMap<String, String>();
			try {
				//调用远程生成 支付宝 当面付接口
				ResponseData data = ApiClient.get(Contant.PAY_RESULT+"?orderid="+orderid+"&fromType=web",headers,request,"ajax");
				if(data.getCode() == 200){
				 resultStr = data.getBackData();
				}
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}  
			  //调用远程后台接口
			 JSONObject resultJson = (JSONObject) JSONObject.parse(resultStr);
			 return (Map) resultJson;
		 }

		 
		 /**------支付成功或失败的页面跳转----*/ 
		 @RequestMapping(value="/resultjsp",method = RequestMethod.GET)
		 public String toPayResultJsp(String order_id,String order_price,String pay_result,String pay_type,String goodid,Model model,HttpServletRequest request,String call_back,String out_order_id,@UserVo UserVO userInfo){
			 
			 model.addAttribute("order_id", order_id);
			 model.addAttribute("order_price", order_price);
			 model.addAttribute("pay_result", pay_result);
			 model.addAttribute("pay_type",pay_type);
			 model.addAttribute("good_id",goodid);
			 model.addAttribute("call_back",call_back);
			 model.addAttribute("out_order_id",out_order_id);
			 model.addAttribute("user_id",userInfo.getId());
			 /*String token = GetTokenFromCooklie.getCookieByName(request,"TOEFL_ID");
			 if(null == token || token.trim().equals("")){
				 return "/error/error"; 
			 }*/
			 
			 return "orderpay/payResult";
		 }
		 
		 
		 /**------即时到账 成功支付后的 跳转 的提示 页面----*/
		 @RequestMapping(value="/jsdz/resultjsp",method = RequestMethod.GET)
		 public String tojsdzResultJsp(){
			return "orderpay/returnForJSDZ";
		 } 
		 
		 /**------协议----*/
		 @RequestMapping(value="/agreement",method = RequestMethod.GET)
		 public String agreement(){
			return "orderpay/agreement";
		 }
		 
		 private Map<String,String> getRequestParam(HttpServletRequest request,@UserVo UserVO userInfo){
			
				
				Map<String,String> map = new HashMap<String,String>();				
				
				try {
					String jsonStr=request.getParameter("jsonStr");
					
					if(StringUtils.isNotBlank(jsonStr)){
						
						try {
							 jsonStr=DESIOSUtil.decryptDES(jsonStr,"8476cded");
							 map = (Map<String,String>) JSONObject.parse(jsonStr);
							 map.put("jsonStr", request.getParameter("jsonStr"));
							 return map;
						}
						catch (Exception e) {							
							e.printStackTrace();
						}						
					}
					String goodid = GetTokenFromCooklie.getCookieByName(request,"BUY_GOOD_ID");                      //商品 id
					
					
					Integer userid = userInfo.getId();                                                               //用户 id
					String attrid = GetTokenFromCooklie.getCookieByName(request,"ATTR_ID");                          //选中的 商品时长（1个月，2个月，3个月等）id    
					String tempattrValue = GetTokenFromCooklie.getCookieByName(request,"ATTR_VAlUE");                
					String attrValue = java.net.URLDecoder.decode(tempattrValue==null?"":tempattrValue,"UTF-8");     //选中的 商品名称（1个月，2个月，3个月等）  
					
					String templearnStartTime = GetTokenFromCooklie.getCookieByName(request,"LEARN_START_TIME");     //选中的 开始学习时间
					String learnStartTime = java.net.URLDecoder.decode(templearnStartTime==null?"":templearnStartTime,"UTF-8");
					
					String tempcheckprice = GetTokenFromCooklie.getCookieByName(request,"CHECK_PRICE");
					String checkprice = java.net.URLDecoder.decode(tempcheckprice==null?"":tempcheckprice,"UTF-8");  //获取页面传过来的价格，主要做校验用
					
					String tempgoodname = GetTokenFromCooklie.getCookieByName(request,"BUY_GOOD_NAME");
					String goodname = java.net.URLDecoder.decode(tempgoodname==null?"":tempgoodname,"UTF-8");        //获取页面传过来的要购买的商品名称
					
					String outOrderId = GetTokenFromCooklie.getCookieByName(request,"OUT_ORDER_ID");                 //外部 订单 id (卡片或视频课程的订单id)
					String tempCallBack = GetTokenFromCooklie.getCookieByName(request,"CALL_BACK");                      //回调 函数
					String callBack = java.net.URLDecoder.decode(tempCallBack==null?"":tempCallBack,"UTF-8"); 
					
					String tempRecommentPersion = GetTokenFromCooklie.getCookieByName(request,"RECOMMENT_PERSION");
					String recommentPersion = java.net.URLDecoder.decode(tempRecommentPersion==null?"":tempRecommentPersion,"UTF-8");        //推荐人
					
					String couponId = GetTokenFromCooklie.getCookieByName(request,"COUPON_ID");
					
					String supportPaymentTypes = GetTokenFromCooklie.getCookieByName(request,"BUY_GOOD_PAYMENT_TYPES");
					
					
					System.out.println(recommentPersion);
					
					//参数判断
					if (StringUtils.isBlank(goodid)|| StringUtils.isBlank(checkprice)){
							return null;
					}
					 
					map.put("goodid", goodid);           
					map.put("checkprice", checkprice);
					map.put("goodname", goodname);
					
					map.put("attrid", attrid);
					map.put("attrvalue", attrValue);
					map.put("learnstarttime", learnStartTime);
					
					map.put("userid", userid.toString());
					map.put("outOrderId", outOrderId);
					map.put("callBack", callBack);
					map.put("recommentPersion", recommentPersion);
					map.put("couponId", couponId);
					map.put("supportPaymentTypes", StringUtils.isNotBlank(supportPaymentTypes)?java.net.URLDecoder.decode(supportPaymentTypes,"UTF-8"):"");
				} catch (UnsupportedEncodingException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
				return map;
		 }
		 
		  @RequestMapping("/share/qrcode")
		  @ResponseBody
		  public void getShareQRCode(String code_url,HttpServletResponse response,HttpServletRequest request){
			code_url = code_url+"&source=weixin";
		    String result = GenerateQrCodeUtil.encodeQrcode(code_url, response);
		    if(result!= null && result.equals("error")){
		    	//如果失败，则再生成一次
		    	result = GenerateQrCodeUtil.encodeQrcode(code_url, response);
		    }
		 }
}
