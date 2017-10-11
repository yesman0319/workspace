package com.xiaoma.universe.shopping.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.alibaba.fastjson.JSONObject;
import com.xiaoma.universe.common.interceptor.UserVo;
import com.xiaoma.universe.common.utils.DESIOSUtil;
import com.xiaoma.universe.common.utils.GetTokenFromCooklie;
import com.xiaoma.universe.information.controller.BaseController;
import com.xiaoma.universe.shopping.model.GoodAttr;
import com.xiaoma.universe.shopping.model.GoodVO;
import com.xiaoma.universe.shopping.service.WalletService;
import com.xiaoma.universe.shopping.utils.OrderIdWorker;
import com.xiaoma.universe.userlogin.controller.UserVO;

/**
 * @Title: 钱包
 * @Description:
 * @author xiaoma
 * @since 2016年12月27日
 * @version V1.0
 */
@Controller
public class WalletController extends BaseController {

	private static Logger logger = Logger.getLogger(WalletController.class);

	@Autowired
	private WalletService walletService; // 钱包

	@RequestMapping(value = "/personal/wallet.html", method = RequestMethod.GET)
	public String userWallet(Model model, HttpServletRequest request) {
		try {
			model.addAttribute("walletActive", "cur");
			model.addAttribute("userWallet", walletService.getWallet(request, true));
			model.addAllAttributes(walletService.getWalletDetailList(request));
			Integer paySuccess = 2;// 未支付
			String out_order_id = request.getParameter("out_order_id");
			if (StringUtils.isNotBlank(out_order_id)) {// 支付成功1，是否失败0
				paySuccess = null == walletService.getWalletDetail(request, out_order_id) ? 0 : 1;
			}
			model.addAttribute("paySuccess", paySuccess);
			return "personal/user_wallet";
		}
		catch (Exception e) {
			logger.error(e.getMessage(), e);
			return "500";
		}
	}

	@RequestMapping(value = "/wallet/charge.html", method = RequestMethod.GET)
	public String walletCharge(HttpServletRequest request, HttpServletResponse response,@UserVo UserVO userInfo) {
		try {
			GoodVO good = walletService.getGood(request);
			if (null != good) {
				List<GoodAttr> goodAttrList = good.getGoodAttrList();
				String check_price = "0.00";
				String attr_id = null;
				String attr_value=null;
				if (goodAttrList != null && goodAttrList.size() > 0) {
					GoodAttr goodAttr = goodAttrList.get(0);
					attr_id = String.valueOf(goodAttr.getId());
					attr_value=goodAttr.getAttrValue();
					check_price = good.getLocalPrice().add(goodAttr.getPrice()).toString();
				} else {
					check_price = good.getLocalPrice().toString();
				}
				String out_order_id = request.getParameter("out_order_id");
				if (StringUtils.isBlank(out_order_id)) {
					SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
					out_order_id = sdf.format(new Date()) + String.valueOf(new OrderIdWorker(1).nextId());
				}
				JSONObject result=new JSONObject();
				result.put("goodid", String.valueOf(good.getId()));           
				result.put("checkprice", check_price);
				result.put("goodname", good.getGoodName());
				
				result.put("attrid", attr_id);
				result.put("attrvalue", attr_value);
				result.put("learnstarttime", "");
				
				result.put("userid", String.valueOf(userInfo.getId()));
				result.put("outOrderId", out_order_id);
				result.put("callBack", "");
				result.put("recommentPersion", "");
				result.put("couponId", "");
				result.put("supportPaymentTypes", good.getSupportPaymentTypes());
				GetTokenFromCooklie.setCookie(response, "OUT_ORDER_ID", out_order_id, -1);
				
				/*GetTokenFromCooklie.setCookie(response, "BUY_GOOD_ID", String.valueOf(good.getId()), -1);
				GetTokenFromCooklie.setCookie(response, "ATTR_ID", attr_id, -1);
				GetTokenFromCooklie.setCookie(response, "ATTR_VAlUE", null, -1);
				GetTokenFromCooklie.setCookie(response, "LEARN_START_TIME", null, -1);
				GetTokenFromCooklie.setCookie(response, "CHECK_PRICE", check_price, -1);
				GetTokenFromCooklie.setCookie(response, "BUY_GOOD_NAME", java.net.URLEncoder.encode(good.getGoodName(), "UTF-8"), -1);
				GetTokenFromCooklie.setCookie(response, "OUT_ORDER_ID", out_order_id, -1);
				GetTokenFromCooklie.setCookie(response, "CALL_BACK", null, -1);
				GetTokenFromCooklie.setCookie(response, "RECOMMENT_PERSION", null, -1);
				GetTokenFromCooklie.setCookie(response, "COUPON_ID", "", -1);
				GetTokenFromCooklie.setCookie(response, "BUY_GOOD_PAYMENT_TYPES", java.net.URLEncoder.encode(good.getSupportPaymentTypes(), "UTF-8"), -1);*/	
				
				return "forward:/web/product/pay/wx?jsonStr="+java.net.URLEncoder.encode(DESIOSUtil.encryptDES(result.toString(), "8476cded"), "UTF-8");
			}
		}
		catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		return "500";

	}
}
