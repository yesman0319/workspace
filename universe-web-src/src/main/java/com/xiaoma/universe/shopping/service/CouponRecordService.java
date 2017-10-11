package com.xiaoma.universe.shopping.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.xiaoma.universe.common.api.ApiClient;
import com.xiaoma.universe.common.contant.Contant;
import com.xiaoma.universe.common.utils.ResponseData;
import com.xiaoma.universe.shopping.model.CouponRecord;
@Service("couponRecordService")
public class CouponRecordService {
	private Logger logger = Logger.getLogger(CouponRecordService.class);
	
	
	//获取 根据参数获取 优惠券
	public List<CouponRecord> getCouponRecord(HttpServletRequest request,String goodId,String userId){
		
		List<CouponRecord> couponRecordList = new  ArrayList<CouponRecord>();
		/*由于正式 商城 没部署，web某个地方一直请求这块，暂时注释掉，用到优惠券时再打开
		 * StringBuffer callCouponRecordURL = new StringBuffer(Contant.SHOPPING_HOST+"/couponRecord"+"?userId="+userId); 
		logger.info("callCouponRecordURL:"+callCouponRecordURL);
		
		if(null != goodId && !goodId.equals("")){
			callCouponRecordURL.append("&goodId="+goodId);
		}
		
		Map<String, String> headers = new HashMap<String, String>();
		ResponseData data = ApiClient.get(callCouponRecordURL.toString(), headers,request,"");  //调用远程后台接口
		if (data.getCode() != 200) {
			return couponRecordList;
		}
		JSONObject resultJson = JSONObject.parseObject(data.getBackData());
		try{
			couponRecordList = JSONArray.parseArray(resultJson.get("couponRecordList").toString(),CouponRecord.class);
		}catch(Exception e){
			e.printStackTrace();
		}*/
		 return couponRecordList;
	}
	
	public int getCouldUseCouponNum(List<CouponRecord> couponRecordList,String fromTag){
		int couldUseCouponNum = 0;
	    for(CouponRecord couponRecord:couponRecordList){
	    	String resultStatus = couponRecord.getResultStatus();
	    	String statusForPersonCenter = couponRecord.getStatus();
	    	
	    	if(fromTag != null && fromTag.trim().equals("personCenter") && null != statusForPersonCenter && !statusForPersonCenter.equals("0")){  //个人中心 能用的个数
	    		couldUseCouponNum = couldUseCouponNum+1;
	    	}else if(resultStatus != null && resultStatus.trim().equals("0")){   //支付时 能用的个数
	    		couldUseCouponNum = couldUseCouponNum+1;
	    	}
	    }
	    return couldUseCouponNum;
	}
}
