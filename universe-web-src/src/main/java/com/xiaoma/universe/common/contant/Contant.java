package com.xiaoma.universe.common.contant;

import com.xiaoma.universe.common.utils.PropertiesUtils;

public class Contant {
	public static String INTERFACE_HOST=PropertiesUtils.getString("info_download_api");
	public static String SHOPPING_HOST=PropertiesUtils.getString("SHOPPING_HOST");
	public static String DOMAIN_NAME=PropertiesUtils.getString("DOMAIN_NAME");
	public static String LEARN_API_URL=PropertiesUtils.getString("learn_api_url");
	public static String MESSAGE_API_URL = PropertiesUtils.getString("message_api_url"); 
	 
	

	  public final static String CODE="status";
	  
	  //获取所有分类
	  public final static String GET_CATEGORY_URL = INTERFACE_HOST + "/categories/";
      //获取资料标签
	  public final static String GET_LABEL_URL = INTERFACE_HOST +"/labels/";
	  //获取首页资料展示
	  public final static String GET_INFOINDEX_URL = INTERFACE_HOST +"/info/index";
	  //下载榜
	  public final static String GET_INFODOWN_URL = INTERFACE_HOST +"/info/search";
	  //每日首推资料
	  public final static String GET_DAYDOWN_URL = INTERFACE_HOST +"/info/";
      //下载历史记录的查询
	  public final static String POST_DOWNHISTORY_URL = INTERFACE_HOST +"/downloadhistories/";
	  //下载历史记录的查询
	  public final static String GET_USERDOWNLOAD_URL = INTERFACE_HOST +"/downloadhistories/search";
	  //下载资料判断权限
	  public final static String GET_INFOPERMIT_URL = INTERFACE_HOST+"/infopermits/";
      //下载后的记录
	  public final static String GET_DOWNLOADAFTER_URL = INTERFACE_HOST+"/infopermits/save";
	  
	  //模考首页展示记录
	  public final static String GET_TPO_LIST = LEARN_API_URL+"/mkTpo/tpos.action";
	  
	  //-----------支付相关-------start-------
	  public final static String ORDER_BUY_INDEX  = SHOPPING_HOST + "/goods/get"; 
		 
	  public final static String  WX_OPENT_MEMBER_FOR_WEB =  SHOPPING_HOST + "/pay/wx/web"; // 商城

      public final static String  ALI_OPENT_MEMBER_FOR_H5 =  SHOPPING_HOST + "/pay/h5/ali"; // 支付宝 h5 在商城中请求URL
      
      public final static String  WX_OPENT_MEMBER_FOR_H5 =  SHOPPING_HOST + "/pay/h5/wx"; // 微信 h5 在商城中请求URL
      
      public final static String  WX_H5_NOTIFY_UPDATE_ORDERS =  SHOPPING_HOST + "/pay/h5/wx/orders"; // 微信 h5回调后修改 商城订单
		
	  public final static String  ALI_OPENT_MEMBER_FOR_DMF =  SHOPPING_HOST + "/pay/ali/web/dmf";
		
	  public final static String  PAY_RESULT =  SHOPPING_HOST + "/pay/result";  //商城
	  
	  public final static String  WX_APP_ID = "wx59b9035ec663ded4";
	  
	  public final static String GOODS_LISTS_PAGES = SHOPPING_HOST + "/goods";   //商品分页查询
	  
	  public final static String CALL_BACK_PARAMS = SHOPPING_HOST + "/callBackParams";   //查询计划ID
	  
	  //零元购
	  public final static String  COUPON_PAY =  SHOPPING_HOST + "/pay/coupon/order"; // 商城
     //-----------支付相关--------end--------
	  
	  //--------------------------计划    以下-------------------------
	  public final static String  JUDGE_IF_NEED_BUY =  LEARN_API_URL + "/app/judge/exist";
	  public final static String COMMENT_API_URL = LEARN_API_URL + "/speakingswritings/comment/";
	  public final static String COMPARE_URL = LEARN_API_URL + "/compare";
	  

	  public final static String  JIJING_GROUP =  LEARN_API_URL + "/jijing/group";
	  public final static String  JIJING_QUESTIONS =  LEARN_API_URL + "/jijing/question";

	  public static String LEARNING_PLAN_LABEL = LEARN_API_URL + "/web/plan/label";//标签

	  //--------------------------计划   以上-------------------------
	  
	  //静态文件路径
	  public final static String STATIC_PAGE_URL  = PropertiesUtils.getString("STATIC_PAGE_URL"); 
	  //统计分析JS URL
	  public final static String ANALYTICS_JS_URL  = STATIC_PAGE_URL+PropertiesUtils.getString("ANALYTICS_JS_URL");
	  
	  //--------------------------音频直播-------------------------
		public static String LIVE_ROOM_URL = PropertiesUtils.getString("videocourse_api_url");
//		public static String GET_LIVE_ROOM = LIVE_ROOM_URL + "/liveRoom";
		public static String GET_LIVE_ROOM = LIVE_ROOM_URL + "/liveRoom";
//		public static String GET_LIVE_ROOM = "http://localhost:9080/liveRoom";
	    public final static String LIVE_ROOM_CHECK_SLIENCE =  LIVE_ROOM_URL + "/liveSilent";//验证是否禁言
//	    public final static String LIVE_ROOM_CHECK_SLIENCE =  "http://localhost:9080/liveSilent";//验证是否禁言
		public static String GET_LIVE_TOPIC_LIST = LIVE_ROOM_URL + "/liveTopic";
//		public static String GET_LIVE_TOPIC_LIST = "http://localhost:9080/liveTopic";
		public static String GET_LIVE_COURSE_LIST = LIVE_ROOM_URL + "/liveCourse";
//		public static String GET_LIVE_COURSE_LIST = "http://localhost:9080/liveCourse";
		public static String GET_LIVE_ROOM_DETAIL = LIVE_ROOM_URL + "/liveRoom/detail";
//		public static String GET_LIVE_ROOM_DETAIL = "http://localhost:9080/liveRoom/detail";
		public static String UPLOAD_AUDIO = LIVE_ROOM_URL + "/liveAudioMessage";
//		public static String UPLOAD_AUDIO = "http://localhost:9080/liveAudioMessage";
		public static String UPLOAD_AUDIO_BACK = LIVE_ROOM_URL + "/liveAudioMessage/back";
//		public static String UPLOAD_AUDIO_BACK = "http://localhost:9080/liveAudioMessage/back";
		public static String GET_LIVE_ROOM_DETAIL_STU = LIVE_ROOM_URL + "/liveRole";
//		public static String GET_LIVE_ROOM_DETAIL_STU = "http://localhost:9080/liveRole";
		public static String GET_LIVE_SILENT = LIVE_ROOM_URL + "/liveSilent";
//		public static String GET_LIVE_SILENT = "http://localhost:9080/liveSilent";
		
		   
		//************************************素材相关*****************************************
		public static String MATERIAL = LIVE_ROOM_URL + "/material"; //获取素材
		public static String MATERIAL_ALBUM = LIVE_ROOM_URL + "/materialAlbum"; //获取素材 
		public static String MATERIAL_QUOTE = LIVE_ROOM_URL + "/materialQuote"; //素材引用 
		public static String MATERIAL_CATEGORY = LIVE_ROOM_URL + "/material/categories"; //素材引用

}
