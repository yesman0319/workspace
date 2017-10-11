package com.xiaoma.universe.common.utils;

import com.alibaba.fastjson.JSONObject;

public class ResponseData {
    private int code = 0;
    private String backData = "";

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getBackData() {
        return backData;
    }

    public void setBackData(String backData) {
        this.backData = backData;
    }

    public String getMessage() {
        if (!StringUtils.isEmpty(backData)) {
            try {
                JSONObject json = JSONObject.parseObject(backData);
                return json.getString("message");
            } catch (Exception e) {
                return backData;
            }
        }
        return "";
    }

    @Override
    public String toString() {
        return "code: " + code + "backData: " + backData;
    }
}
