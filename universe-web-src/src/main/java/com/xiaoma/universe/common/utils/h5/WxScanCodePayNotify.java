package com.xiaoma.universe.common.utils.h5;

import java.io.BufferedOutputStream;
import java.io.StringReader;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.jdom.Document;
import org.jdom.Element;
import org.jdom.input.SAXBuilder;
import org.xml.sax.InputSource;

import com.xiaoma.universe.common.contant.Contant;


/**
 * 微信支付后的，回调处理类
 * @author zhaijilong
 */
public class WxScanCodePayNotify {
	
	public WxScanCodePayResultData notify(HttpServletRequest request,HttpServletResponse response) throws Exception {
		
		String inputLine;
		String notityXml = "";  //微信返回的处理结果信息
		String resXml = "";     //告诉微信“回调信息”接口情况
		try {
			while ((inputLine = request.getReader().readLine()) != null) {
				notityXml += inputLine;
			}
			request.getReader().close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		System.out.println("接收到的回调报文：" + notityXml);
		Map m = parseXmlToList2(notityXml);
		System.out.println("----------------------------wx---h5--notify------------------:"+m);
		WxScanCodePayResultData wpr = new WxScanCodePayResultData();
		
		String appid = m.get("appid")==null?"":m.get("appid").toString();
		//校验返回的公众号是否和发过去的相同
		if(appid.equals(Contant.WX_APP_ID)){    
			
			wpr.setAppid(m.get("appid").toString());
			wpr.setBankType(m.get("bank_type").toString());
			wpr.setCashFee(m.get("cash_fee").toString());
			wpr.setFeeType(m.get("fee_type").toString());
			wpr.setIsSubscribe(m.get("is_subscribe").toString());
			wpr.setMchId(m.get("mch_id").toString());
			wpr.setNonceStr(m.get("nonce_str").toString());
			wpr.setOpenid(m.get("openid").toString());
			wpr.setOutTradeNo(m.get("out_trade_no").toString());
			wpr.setResultCode(m.get("result_code").toString());
			wpr.setReturnCode(m.get("return_code").toString());
			wpr.setSign(m.get("sign").toString());
			wpr.setTimeEnd(m.get("time_end").toString());
			wpr.setTotalFee(m.get("total_fee").toString());
			wpr.setTradeType(m.get("trade_type").toString());
			wpr.setTransactionId(m.get("transaction_id").toString());
			
			if("SUCCESS".equals(wpr.getResultCode())){
				// 支付成功
				resXml = "<xml>" + "<return_code><![CDATA[SUCCESS]]></return_code>"
				                 + "<return_msg><![CDATA[OK]]></return_msg>" 
						         + "</xml> ";
			}else{
				// 支付失败
				resXml = "<xml>" + "<return_code><![CDATA[FAIL]]></return_code>"
				                 + "<return_msg><![CDATA[报文为空]]></return_msg>" 
						         + "</xml> ";
			}
			
			//告诉微信我已经收到了回调信息，不要再给我发了。
			BufferedOutputStream out = new BufferedOutputStream(response.getOutputStream());
			out.write(resXml.getBytes());                                   
			out.flush();
			out.close();
		}
		return wpr;
	}
	
	/**
	 * description: 解析微信通知xml
	 * 
	 * @param xml
	 * @return
	 * @author ex_yangxiaoyi
	 * @see
	 */
	@SuppressWarnings({ "unused", "rawtypes", "unchecked" })
	private Map parseXmlToList2(String xml) {
		Map retMap = new HashMap();
		try {
			StringReader read = new StringReader(xml);
			// 创建新的输入源SAX 解析器将使用 InputSource 对象来确定如何读取 XML 输入
			InputSource source = new InputSource(read);
			// 创建一个新的SAXBuilder
			SAXBuilder sb = new SAXBuilder();
			// 通过输入源构造一个Document
			Document doc = (Document) sb.build(source);
			Element root = doc.getRootElement();// 指向根节点
			List<Element> es = root.getChildren();
			if (es != null && es.size() != 0) {
				for (Element element : es) {
					retMap.put(element.getName(), element.getValue());
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return retMap;
	}

}
