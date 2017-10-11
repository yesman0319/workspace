package com.xiaoma.universe.shopping.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xiaoma.rest.authentication.UniverseSession;
import com.xiaoma.universe.information.controller.BaseController;
import com.xiaoma.universe.shopping.model.Coupon;
import com.xiaoma.universe.shopping.model.CouponRecord;
import com.xiaoma.universe.shopping.service.CouponRecordService;
import com.xiaoma.universe.userlogin.controller.UserVO;

/**
 * 商品 
 * 
 * @ClassName:OrderPaymentController
 * @author zhaijilong
 */
@Controller
@RequestMapping("/coupons")
public class CouponsRecordController extends BaseController{

	private Logger logger = Logger.getLogger(CouponsRecordController.class);
	
	@Autowired
	private CouponRecordService couponRecordService;
	
	//获取可用的优惠券
	@RequestMapping(value="/workableness",method = RequestMethod.GET)
	public String getCoupon(HttpServletRequest request,Model model,String goodId,String code){
		UserVO user = (UserVO) UniverseSession.getAttribute("userInfo");
		List<CouponRecord> couponRecordList = couponRecordService.getCouponRecord(request,goodId, String.valueOf(user.getId()));
		model.addAttribute("couponList", couponRecordList);              //可用的优惠券
		model.addAttribute("code", code);                                //支付前一个页面会用到
		model.addAttribute("goodId", goodId);
		return "h5/h5_coupons";
	}
	
	//获取全部优惠券,用于H5 和 web 个人中心,如果fromType 为空，则用于H5
	@RequestMapping(method = RequestMethod.GET)
	public String getAllCoupon(HttpServletRequest request,Model model,String userId,String fromType,String version){
		String returnUrl = "h5/h5_coupons_old";
		if(version != null && version.trim().equals("8.5")){
			returnUrl = "h5/h5_coupons";
		}
		
		if(null != fromType && !fromType.equals("")){
				UserVO user = (UserVO) UniverseSession.getAttribute("userInfo");
				userId = String.valueOf(user.getId());
				returnUrl = "personal/user_coupons";
		}
		List<CouponRecord> couponRecordList = couponRecordService.getCouponRecord(request,null,userId);
		model.addAttribute("couponList", couponRecordList);              //可用的优惠券
		model.addAttribute("couponNum", couponRecordService.getCouldUseCouponNum(couponRecordList,"personCenter")); 
		if(couponRecordList == null || couponRecordList.size()== 0){
			model.addAttribute("noCoupon","y");
		}else{
			model.addAttribute("noCoupon","n");
		}
		model.addAttribute("coupons","cur");
		return returnUrl;
	}
	
	//获取 可用  优惠券 个数
	@RequestMapping(value="/numbers",method = RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> getAllCoupon(HttpServletRequest request,Model model,String userId){
		if(userId == null||userId.trim().equals("")){
			UserVO user = (UserVO) UniverseSession.getAttribute("userInfo");
			userId = String.valueOf(user.getId());
		}
		List<CouponRecord> couponRecordList = couponRecordService.getCouponRecord(request,null,userId);
		Map<String,Object> mp = new HashMap<String,Object>();
		mp.put("couponNum", couponRecordService.getCouldUseCouponNum(couponRecordList,"personCenter")); 
		return mp;
	}
}
