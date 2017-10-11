/**
 * 
 */
package com.xiaoma.universe.common.utils.upyun;

import java.io.IOException;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.xiaoma.universe.common.utils.TimeHelper;
import com.xiaoma.universe.common.utils.UUIDUtil;

/**
 * @author xiaoma
 *
 */
public class UploadAuidoUtil {
	private static final Logger LOG = LoggerFactory.getLogger(UploadAuidoUtil.class);
    private static final String BUCKET_NAME = "universetoefl";
    private static final String OPERATOR_NAME = "universetoefl";
    private static final String OPERATOR_PWD = "universetoefl";
    private static final String URL = "http://" + BUCKET_NAME + ".b0.upaiyun.com/";
    private static final String DIR_ROOT = "yztuofu/audio/";
    /**
     * 
     * @param image 文件
     * @param fileType  类型 后缀名
     * @return
     * @throws IOException String
     */
    public static String uploadFile(byte[] file, String fileType) throws IOException{
        UpYun upyun = new UpYun(BUCKET_NAME, OPERATOR_NAME, OPERATOR_PWD);
        upyun.setDebug(false);
        // 要传到upyun后的文件路径
        
        String uuid = UUIDUtil.getUUID();
		String date = TimeHelper.date2String(new Date(), "yyyyMMdd"); 
		String filename = date+"/"+uuid+"."+fileType;
		
        String filePath = DIR_ROOT  + filename;
        boolean result = upyun.writeFile(filePath, file, true);
        String url = null;
        if(result){
            LOG.info("upload image successful");
            url = URL + filePath;
        }
        return url;
    }
}
