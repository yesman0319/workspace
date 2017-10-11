package com.xiaoma.universe.wechat.model.dto;

import java.io.Serializable;

/**
 * @Title:Entity
 * @Description: TODO
 * @author Administrator
 * @since 2016年11月21日
 * @version V1.0  
 */
public class TWechatPush  implements Serializable {
	private Integer id;
    private String toUserName;////商户的公众号原始id。  
    private String fromUserName;//用户的openid。    
    private String createTime;//消息创建时间（整型）。 
    private String msgType;//消息类型，event。
    private String ticket;//扫描的二维码标示
    private String event;//事件类型，subscribe为关注公众号事件。
	/**
	 * ”分割。①scene表示场景：scanbarcode为扫码场景，scanimage为扫封面（图像）场景。②keystandard表示商品编码标准：barcode为条码。
	 * ③keystr表示商品编码内容。④extinfo表示调用“获取商品二维码接口”时传入的extinfo，为标识参数。
	 */
    private String eventKey;
    private String pushXml;//原始xml代码
    private String city;//city
    private String country;//country
    private String extInfo;//extInfo
    private String keyStandard;//keyStandard
    private String keyStr;//keyStr
    private String province;//province
    private String reasonMsg;//reasonMsg
    private String regionCode;//regionCode
    private String result;//result
    private Integer scene;//scene
    private Integer sex;//sex
    private String content;//content

	public TWechatPush() {
		super();
	}
	
    public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getToUserName() {
        return toUserName;
    }

    public void setToUserName(String toUserName) {
        this.toUserName = toUserName;
    }
    public String getFromUserName() {
        return fromUserName;
    }

    public void setFromUserName(String fromUserName) {
        this.fromUserName = fromUserName;
    }
    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }
    public String getMsgType() {
        return msgType;
    }

    public void setMsgType(String msgType) {
        this.msgType = msgType;
    }
    
    
    public String getTicket() {
		return ticket;
	}

	public void setTicket(String ticket) {
		this.ticket = ticket;
	}

	public String getEvent() {
        return event;
    }

    public void setEvent(String event) {
        this.event = event;
    }
    public String getEventKey() {
        return eventKey;
    }

    public void setEventKey(String eventKey) {
        this.eventKey = eventKey;
    }
    public String getPushXml() {
        return pushXml;
    }

    public void setPushXml(String pushXml) {
        this.pushXml = pushXml;
    }

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getExtInfo() {
		return extInfo;
	}

	public void setExtInfo(String extInfo) {
		this.extInfo = extInfo;
	}

	public String getKeyStandard() {
		return keyStandard;
	}

	public void setKeyStandard(String keyStandard) {
		this.keyStandard = keyStandard;
	}

	public String getKeyStr() {
		return keyStr;
	}

	public void setKeyStr(String keyStr) {
		this.keyStr = keyStr;
	}

	public String getProvince() {
		return province;
	}

	public void setProvince(String province) {
		this.province = province;
	}

	public String getReasonMsg() {
		return reasonMsg;
	}

	public void setReasonMsg(String reasonMsg) {
		this.reasonMsg = reasonMsg;
	}

	public String getRegionCode() {
		return regionCode;
	}

	public void setRegionCode(String regionCode) {
		this.regionCode = regionCode;
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public Integer getScene() {
		return scene;
	}

	public void setScene(Integer scene) {
		this.scene = scene;
	}

	public Integer getSex() {
		return sex;
	}

	public void setSex(Integer sex) {
		this.sex = sex;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

    
}
