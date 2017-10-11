package com.xiaoma.universe.information.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;
import com.xiaoma.universe.common.api.ApiClient;
import com.xiaoma.universe.common.api.JsonUtil;
import com.xiaoma.universe.common.contant.Contant;
import com.xiaoma.universe.common.utils.ResponseData;
import com.xiaoma.universe.information.model.Category;
import com.xiaoma.universe.information.model.DownloadHistory;
import com.xiaoma.universe.information.model.Info;
import com.xiaoma.universe.information.model.Label;
import com.xiaoma.universe.information.model.obj.InfoDayRecommend;
import com.xiaoma.universe.information.model.obj.InfoVo;
import com.xiaoma.universe.information.model.obj.PageBean;
import com.xiaoma.universe.learnplan.domain.vo.api.PlanDetailVO;
import com.xiaoma.universe.learnplan.service.PlanService;
import com.xiaoma.universe.livemanage.service.LivelessionService;

@Service("infoService")
public class InfoService {
	private Logger logger = Logger.getLogger(LivelessionService.class);
	
	@Autowired
	private PlanService planService;

	/**
	 * 获取首页直播列表
	 * 
	 * @param vo
	 * @param model
	 * @return
	 */
	@SuppressWarnings({"rawtypes", "unchecked", "deprecation"})
	public List<InfoVo> getIndexInfos(Integer size) {
		if(size==null || size==0){
			size=5;
		}
		List<InfoVo> lists = null;
			String url = Contant.GET_INFOINDEX_URL + "?size="+size+"&order=create_time";
			Map<String, String> headers = getHeaders();
			ResponseData responseData = ApiClient.get(url, headers);
			if (responseData.getCode() != 200) {
				return null;
			}
			JSONObject resultJson = (JSONObject) JSONObject.parse(responseData.getBackData());
			net.sf.json.JSONArray arrayJson = net.sf.json.JSONArray.fromObject(resultJson.get("list"));
			Map<String, Class> classMap = new HashMap<String, Class>();
			classMap.put("infoList", Info.class);
			lists = (List<InfoVo>) net.sf.json.JSONArray.toList(arrayJson, InfoVo.class, classMap);
		    return lists;
	}



	@SuppressWarnings("unchecked")
	public List<Category> getCategoryList() {
		List<Category> categoryList=null;
		Map<String, String> headers = getHeaders();
		ResponseData responseData = ApiClient.get(Contant.GET_CATEGORY_URL, headers);
		if (responseData.getCode() != 200) {
			return null;
		}
        net.sf.json.JSONArray resultJson = net.sf.json.JSONArray.fromObject(responseData.getBackData());
		categoryList = (List<Category>) net.sf.json.JSONArray.toCollection(resultJson, Category.class);
        return categoryList;
	}
	
	
	@SuppressWarnings("unchecked")
	public List<Label> getLabelList() {
		List<Label> labelList =null;
		Map<String, String> headers = getHeaders();
		ResponseData responseData = ApiClient.get(Contant.GET_LABEL_URL, headers);
		if (responseData.getCode() != 200) {
			return null;
		}
		net.sf.json.JSONArray resultJson = net.sf.json.JSONArray.fromObject(responseData.getBackData());
	    labelList = (List<Label>) net.sf.json.JSONArray.toCollection(resultJson, Label.class);
		return labelList;
	}
	

	@SuppressWarnings("unchecked")
	public List<Info> getInfoByDownLoad() {
		List<Info> dinfoList =null;
		Map<String, String> headers = getHeaders();
		String url = Contant.GET_INFODOWN_URL+"?pageSize=5&sortby=download&order=DESC&islike=false";
		ResponseData responseData = ApiClient.get(url, headers);
		if (responseData.getCode() != 200) {
			return null;
		}
		net.sf.json.JSONObject resultJson  = net.sf.json.JSONObject.fromObject(responseData.getBackData());
		net.sf.json.JSONArray array = net.sf.json.JSONArray.fromObject(resultJson.get("items"));
		dinfoList = (List<Info>) net.sf.json.JSONArray.toCollection(array,Info.class);
		return dinfoList;
	}
	

	@SuppressWarnings("unchecked")
	public InfoDayRecommend getInfoDayFist() throws Exception {
		InfoDayRecommend infodr = new InfoDayRecommend();
		Map<String, String> headers = getHeaders();
		String url=Contant.GET_DAYDOWN_URL+"?top=1&islike=false";
		ResponseData responseData = ApiClient.get(url, headers);
		if (responseData.getCode() != 200) {
			return null;
		}
		List<Info> dl = (List<Info>) JsonUtil.jsonToList(responseData.getBackData(), Info.class);
		Info tinfo=dl==null?null:dl.get(0);
		infodr.setInfo(tinfo);
		if(tinfo!=null){
			Category tcate = getCategoryById(tinfo.getCategoryId());
			infodr.setCategory(tcate);
		}
        return infodr;
	}

	public Category getCategoryById(Integer id) {
		Map<String, String> headers = getHeaders();
		ResponseData responseData = ApiClient.get(Contant.GET_CATEGORY_URL+id, headers);
		if (responseData.getCode() != 200) {
			return null;
		}
		net.sf.json.JSONObject result = net.sf.json.JSONObject.fromObject(responseData.getBackData());
		Category tcate=(Category) net.sf.json.JSONObject.toBean(result,Category.class);
		return tcate;
	}
	@SuppressWarnings("unchecked")
	public PageBean getInfoList(Integer categoryId, boolean islike, String label, String name, Integer page, String sort,Integer pageSize) {
		Map<String, String> headers = getHeaders();
		String infoUrl =Contant.GET_INFODOWN_URL+"?categoryId="+categoryId+"&islike="+islike+"&labels="+label+"&name="+name+"&pageSize="+pageSize+"&page="+page+"&sortby="+sort+"&order=DESC";
		PageBean pageInfo= new PageBean();
		ResponseData responseData = ApiClient.get(infoUrl, headers);
		if (responseData.getCode() != 200) {
			return null;
		}
		net.sf.json.JSONObject resultJson  = net.sf.json.JSONObject.fromObject(responseData.getBackData());
		net.sf.json.JSONArray array = net.sf.json.JSONArray.fromObject(resultJson.get("items"));
		List<Info> infoList = (List<Info>) net.sf.json.JSONArray.toCollection(array,Info.class);
		String total = resultJson.getString("total");
		Integer totalPage=0;
		if(Integer.parseInt(total)%10==0){
			totalPage=Integer.parseInt(total)/10;
		}else{
			totalPage=Integer.parseInt(total)/10+1;
		}
		pageInfo.setInfoList(infoList);
		pageInfo.setPage(page>totalPage?totalPage:page);
		pageInfo.setTotalPage(totalPage);
		return pageInfo;
	}
	

	public Info getInfoById(Integer id) throws Exception {
		Map<String, String> headers = getHeaders();
		ResponseData responseData = ApiClient.get(Contant.GET_DAYDOWN_URL+id, headers);
		if (responseData.getCode() != 200) {
			return null;
		}
		Info info = (Info) JsonUtil.jsonToBean(responseData.getBackData(), Info.class);
	    return info;
	}
	

	public String getPermit(HttpServletRequest request, Integer id) {
		Map<String, String> headers = getHeaders();
		ResponseData responseData = ApiClient.get(Contant.GET_INFOPERMIT_URL+"?infoId="+id, headers,request,"ajax");
		if (responseData.getCode() != 200) {
			return null;
		}
    	String str = JSONObject.toJSONString(responseData.getBackData());
        return str;
	}
	
	public String saveDownloadHistory(HttpServletRequest request,Integer id, String ip) {
		Map<String, String> headers = new HashMap<String, String>();
		headers.put("fromType", "web");
		Map<String, String> params = new  HashMap<String, String>();
		params.put("infoId", id.toString());
		params.put("ip", ip);
		ResponseData responseData = ApiClient.post(Contant.GET_DOWNLOADAFTER_URL,params,headers,request,"");
		if (responseData.getCode() == 201) {
			return "success";
		}else{
			return "fail";
		}
	}

	@SuppressWarnings("unchecked")
	public PageBean getPageDownloadHistory(HttpServletRequest request, Integer page,Integer pageSize,Integer userId) {
		Map<String, String> headers = getHeaders();
		PageBean pageBean = new PageBean();
		String url=Contant.GET_USERDOWNLOAD_URL+"?pageSize="+pageSize+"&page="+page+"&sortby=download_time&order=DESC";
		
		ResponseData responseData = null;
		if(null == userId){
			responseData = ApiClient.get(url, headers,request,"");
		}else{
			responseData = ApiClient.get(url+"&userId="+userId, headers);
		}
		if (responseData.getCode() != 200) {
			return null;
		}
		net.sf.json.JSONObject resultJson  = net.sf.json.JSONObject.fromObject(responseData.getBackData());
		net.sf.json.JSONArray array = net.sf.json.JSONArray.fromObject(resultJson.get("items"));
		List<DownloadHistory> dhList = (List<DownloadHistory>) net.sf.json.JSONArray.toCollection(array,DownloadHistory.class);
		String total = resultJson.getString("total");
		Integer totalPage=0;
		if(Integer.parseInt(total)%pageSize==0){
			totalPage=Integer.parseInt(total)/pageSize;
		}else{
			totalPage=Integer.parseInt(total)/pageSize+1;
		}
		pageBean.setTotal(Integer.parseInt(total));
		pageBean.setDhList(dhList);
		pageBean.setPage( page>totalPage?totalPage:page);
		pageBean.setTotalPage(totalPage);
		return pageBean;
	}
	

	public List<PlanDetailVO> getPlanByIds(HttpServletRequest request, String planIds) {
		List<PlanDetailVO> list = new ArrayList<PlanDetailVO>();
		if(planIds==null || "".endsWith(planIds)){
			return list;
		}
		PlanDetailVO planDetail=null;
		if(planIds.indexOf(",")<0) {
			 planDetail = planService.getPlanDetail(request, planIds);
			 list.add(planDetail);
		}else{
			String[] split = planIds.split(",");
			for (String str : split) {
				planDetail = planService.getPlanDetail(request, planIds);
				if(planDetail!=null)
				list.add(planDetail);
			}
		}
		return list;
		
	}


	private Map<String, String> getHeaders() {
		Map<String, String> headers = new HashMap<String, String>();
		headers.put("Content-Type", "application/json");
		headers.put("fromType", "web");
		return headers;
	}























}
