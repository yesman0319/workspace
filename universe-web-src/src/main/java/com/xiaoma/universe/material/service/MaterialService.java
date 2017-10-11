package com.xiaoma.universe.material.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.xiaoma.universe.common.api.ApiClient;
import com.xiaoma.universe.common.contant.Contant;
import com.xiaoma.universe.common.utils.ResponseData;
import com.xiaoma.universe.material.model.Material;
import com.xiaoma.universe.material.model.MaterialAlbum;

@Service("materialService")
public class MaterialService {
	
	/*
	 * sort_by 字段名
	 * order_by 正序（asc）或 倒序（desc）
	 */
	public String createCallUrl(Material material,Integer pageSize,Integer page,String sort_by,String order_by){
		StringBuffer requestURL = new StringBuffer(Contant.MATERIAL+"?1=1");
		if(sort_by != null && sort_by.trim().equals("")){
			requestURL.append("&sort_by="+sort_by);
		}
		if(order_by != null && order_by.trim().equals("")){
			requestURL.append("&order_by="+order_by);
		}
		if(page!=null){
			requestURL.append("&page_size="+pageSize+"&current_page="+page);
		}
		if(material.getId() != null && material.getId().intValue() != 0){
			requestURL.append("&id="+material.getId());
		}
		if(material.getName() != null && material.getName().trim().equals("")){
			requestURL.append("&name="+material.getName());
		}
		if(material.getFileContentType() != null && !material.getFileContentType().trim().equals("")){
			requestURL.append("&fileContentType="+material.getFileContentType());
		}
		if(material.getFileUrl() != null && !material.getFileUrl().trim().equals("")){
			requestURL.append("&fileUrl="+material.getFileUrl());
		}
		if(material.getFileSize() != null && !material.getFileSize().trim().equals("")){
			requestURL.append("&fileSize="+material.getFileSize());
		}
		if(material.getAlbumId() != null && material.getAlbumId().intValue() != 0){
			requestURL.append("&albumId="+material.getAlbumId());
		}
		if(material.getAlbumName() != null && !material.getAlbumName().trim().equals("")){
			requestURL.append("&albumName="+material.getAlbumName());
		}
		if(material.getImgUrl() != null && !material.getImgUrl().trim().equals("")){
			requestURL.append("&imgUrl="+material.getImgUrl());
		}
		if(material.getThumbnailImgUrl() != null && !material.getThumbnailImgUrl().trim().equals("")){
			requestURL.append("&thumbnailImgUrl="+material.getThumbnailImgUrl());
		}
		if(material.getCategoryId() != null && material.getCategoryId().intValue() != 0){
			requestURL.append("&categoryId="+material.getCategoryId());
		}
		if(material.getCategoryName() != null && !material.getCategoryName().trim().equals("")){
			requestURL.append("&categoryName="+material.getCategoryName());
		}
		if(material.getDescription() != null && !material.getDescription().trim().equals("")){
			requestURL.append("&description="+material.getDescription());
		}
		if(material.getYear() != null && material.getYear().intValue() != 0){
			requestURL.append("&year="+material.getYear());
		}
		if(material.getMonth() != null && material.getMonth().intValue() != 0){
			requestURL.append("&month="+material.getMonth());
		}
		if(material.getDay() != null && material.getDay().intValue() != 0){
			requestURL.append("&day="+material.getDay());
		}
		if(material.getCreateBy() != null && !material.getCreateBy().trim().equals("")){
			requestURL.append("&createBy="+material.getCreateBy());
		}
		if(material.getCreateTime() != null){
			requestURL.append("&createTime="+material.getCreateTime());
		}
		if(material.getUpdateBy() != null && !material.getUpdateBy().trim().equals("")){
			requestURL.append("&updateBy="+material.getUpdateBy());
		}
		if(material.getUpdateTime() != null){
			requestURL.append("&updateTime="+material.getUpdateTime());
		}
		if(material.getEnabled() != null){
			requestURL.append("&enabled="+material.getEnabled());
		}
		if(material.getSortNum() != null){
			requestURL.append("&sortNum="+material.getSortNum());
		}
		if(material.getSortNum() != null){
			requestURL.append("&sortNum="+material.getSortNum());
		}
		if(material.getFileName() != null && !material.getFileName().trim().equals("")){
			requestURL.append("&fileName="+material.getFileName());
		}
		if(material.getDuration() != null){
			requestURL.append("&duration="+material.getDuration());
		}
		
		return requestURL.toString();
	}
  
   public List<MaterialAlbum> getMaterialAlbum(MaterialAlbum materialAlbum){
	   
	   List<MaterialAlbum> materialAlbumList = new ArrayList<MaterialAlbum>();
	   
	   StringBuffer requestUrl = new StringBuffer(Contant.MATERIAL_ALBUM+"?1=1");
	   if(materialAlbum.getId() != null){
		   requestUrl.append("&id="+materialAlbum.getId());
	   }
	   
	   if(materialAlbum.getAlbumName() != null && !materialAlbum.getAlbumName().trim().equals("")){
		   requestUrl.append("&albumName="+materialAlbum.getAlbumName());
	   }
	   
	   if(materialAlbum.getCreatePersion() != null && !materialAlbum.getCreatePersion().trim().equals("")){
		   requestUrl.append("&createPersion="+materialAlbum.getCreatePersion());
	   }
	  
	   Map<String, String> headers = new HashMap<String, String>();	   
       //查询 专辑编辑 信息
 		ResponseData data = ApiClient.get(requestUrl.toString(), headers);  //调用远程后台接口
 		if (data.getCode() != 200) {
 			System.out.println("获取专辑信息失败,请返回重新获取");
 			return materialAlbumList;
 		}
 		JSONObject resultJson = (JSONObject) JSONObject.parse(data.getBackData());
 		materialAlbumList = JSON.parseArray(resultJson.getString("materialAlbumList"), MaterialAlbum.class);
 		return materialAlbumList;
   }
}
