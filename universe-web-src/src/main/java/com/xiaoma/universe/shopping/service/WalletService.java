package com.xiaoma.universe.shopping.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.xiaoma.rest.authentication.UniverseSession;
import com.xiaoma.universe.common.api.ApiClient;
import com.xiaoma.universe.common.api.JsonUtil;
import com.xiaoma.universe.common.contant.Contant;
import com.xiaoma.universe.common.paging.YzPagingInfo;
import com.xiaoma.universe.common.utils.ResponseData;
import com.xiaoma.universe.shopping.model.GoodVO;
import com.xiaoma.universe.shopping.model.Wallet;
import com.xiaoma.universe.shopping.model.WalletDetail;

@Service("walletService")
public class WalletService {
	private Logger logger = Logger.getLogger(WalletService.class);

	/**
	 * 获得用户钱包
	 * 
	 * @param request
	 * @return
	 */
	public Wallet getWallet(HttpServletRequest request) {
		return getWallet(request, false);
	}

	/**
	 * 获得用户钱包和钱包充值商品
	 * 
	 * @param request
	 * @param good
	 *            是否获取钱包充值商品
	 * @return
	 */
	public Wallet getWallet(HttpServletRequest request, boolean good) {
		String url = Contant.SHOPPING_HOST + (good ? "/goods/wallet/" : "/wallet/");
		Map<String, String> headers = new HashMap<String, String>();
		headers.put("fromType", "web");
		ResponseData responseData = ApiClient.get(url, headers, request, ApiClient.FORMAT_DEFAULT);
		if (responseData.getCode() == 200) {
			try {
				return (Wallet) JsonUtil.jsonToBean(responseData.getBackData(), Wallet.class);
			}
			catch (Exception e) {
				logger.error(e.getMessage());
			}
		}
		return new Wallet();
	}

	/**
	 * 获得钱包充值明细
	 * 
	 * @param request
	 * @return
	 */
	public Map<String, Object> getWalletDetailList(HttpServletRequest request) {
		String pageSize = request.getParameter("page_size");
		String page = request.getParameter("page");
		String url = Contant.SHOPPING_HOST + "/wallet/details/?pageSize=" + (StringUtils.isBlank(pageSize) ? 10 : pageSize) + "&page=" + (StringUtils.isBlank(page) ? 1 : page);
		Map<String, Object> map = new HashMap<String, Object>();
		Map<String, String> headers = new HashMap<String, String>();
		headers.put("fromType", "web");
		ResponseData responseData = ApiClient.get(url, headers, request, ApiClient.FORMAT_DEFAULT);
		if (responseData.getCode() == 200) {
			try {
				JSONObject resultJson = (JSONObject) JSONObject.parse(responseData.getBackData());
				map.put("paddingInfo", new YzPagingInfo(request, resultJson.getInteger("total")));
				map.put("walletDetailList", JSON.parseArray(resultJson.getString("items"), WalletDetail.class));
			}
			catch (Exception e) {
				logger.error(e.getMessage());
			}
		}
		return map;

	}
	
	public WalletDetail getWalletDetail(HttpServletRequest request,String out_order_id) {
		String url = Contant.SHOPPING_HOST + "/wallet/details/"+out_order_id;
		Map<String, String> headers = new HashMap<String, String>();
		headers.put("fromType", "web");
		ResponseData responseData = ApiClient.get(url, headers, request, ApiClient.FORMAT_DEFAULT);
		if (responseData.getCode() == 200) {
			try {
				return (WalletDetail) JsonUtil.jsonToBean(responseData.getBackData(), WalletDetail.class);
			}
			catch (Exception e) {
				logger.error(e.getMessage());
			}
		}
		return null;
	}

	/**
	 * 根据商品Id获得商品
	 * 
	 * @param request
	 * @return Good
	 */
	public GoodVO getGood(HttpServletRequest request) {
		String url = Contant.SHOPPING_HOST + "/goods/get/?id=" + request.getParameter("good_id") + "&fromType=web";
		Map<String, String> headers = new HashMap<String, String>();
		headers.put("fromType", "web");
		ResponseData responseData = ApiClient.get(url, headers, request, ApiClient.FORMAT_DEFAULT);
		if (responseData.getCode() == 200) {
			try {
				JSONObject resultJson = (JSONObject) JSONObject.parse(responseData.getBackData());
				if (resultJson.getIntValue("code") == 200) {
					List<GoodVO> list = JSON.parseArray(resultJson.getString("goods"), GoodVO.class);
					if (list != null && list.size() > 0)
						return list.get(0);
				}

			}
			catch (Exception e) {
				logger.error(e.getMessage());
			}
		}
		return null;
	}

	
	/**
	 * 钱包支付，返回参数：status：状态，0=失败，1=成功；message：消息
	 * @param request
	 * @param orderId
	 * @param fromType
	 * @return
	 */
	public JSONObject walletPay(HttpServletRequest request, String orderId,String fromType) {
		String url = Contant.SHOPPING_HOST + "/pay/wallet/pay/";
		Map<String, String> headers = new HashMap<String, String>();
		headers.put("fromType", StringUtils.isNotBlank(fromType) ? fromType : "web");

		Map<String, String> params = new HashMap<String, String>();
		params.put("orderId", orderId);
		ResponseData responseData = ApiClient.post(url, params, headers, request, ApiClient.FORMAT_DEFAULT);
		if (responseData.getCode() == 200) {
			try {
				JSONObject resultJson = (JSONObject) JSONObject.parse(responseData.getBackData());
				return resultJson;
			}
			catch (Exception e) {
				logger.error(e.getMessage());
			}
		}
		return null;
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
	public JSONObject walletOrderPay(HttpServletRequest request, String goodId, String attrId, String userId, String callBack, String recommentPersion, String learnStartTime, String totalPrice, String phoneNum, String couponId, String fromType) {
		String url = Contant.SHOPPING_HOST + "/pay/wallet/order/pay/";
		Map<String, String> headers = new HashMap<String, String>();
		headers.put("fromType",StringUtils.isNotBlank(fromType) ? fromType : "web");
		Map<String, String> params = new HashMap<String, String>();
		
		String referrerUserid = (String) UniverseSession.getAttribute("userIdInCookie")==null?"":(String) UniverseSession.getAttribute("userIdInCookie"); //从session中获取分享人ID
		params.put("referrerUserid", referrerUserid);  //获取分享人
		
		params.put("goodId", goodId);
		params.put("attrId", attrId);
		params.put("userId", userId);
		params.put("callBack", callBack);
		params.put("recommentPersion", recommentPersion);
		params.put("learnStartTime", learnStartTime);
		params.put("totalPrice", totalPrice);
		params.put("phoneNum", phoneNum);
		params.put("couponId", couponId);
		params.put("fromType", StringUtils.isNotBlank(fromType) ? fromType : "web");
		ResponseData responseData = ApiClient.post(url, params, headers, request, ApiClient.FORMAT_DEFAULT);
		if (responseData.getCode() == 200) {
			try {
				JSONObject resultJson = (JSONObject) JSONObject.parse(responseData.getBackData());
				return resultJson;
			}
			catch (Exception e) {
				logger.error(e.getMessage());
			}
		}
		return null;

	}

}
