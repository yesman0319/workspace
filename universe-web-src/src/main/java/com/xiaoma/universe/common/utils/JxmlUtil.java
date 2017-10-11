package com.xiaoma.universe.common.utils;

import java.beans.IntrospectionException;
import java.io.IOException;
import java.io.InputStream;
import java.io.StringReader;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Modifier;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.jdom.input.SAXBuilder;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.input.SAXBuilder;
import org.xml.sax.InputSource;
    
  
/** 
 * 使用Jaxb2.0实现XML<->Java Object的Binder. 
 *  
 * 特别支持Root对象是List的情形. 
 *  
 * @author 
 */  
public class JxmlUtil {
    
	public static String byte2String(HttpServletRequest request) throws IOException
	{
		  byte[] bytes = new byte[1024 * 1024];  
	      InputStream is = request.getInputStream();  

	      int nRead = 1;  
	      int nTotalRead = 0;  
	      while (nRead > 0) {  
	          nRead = is.read(bytes, nTotalRead, bytes.length - nTotalRead);  
	          if (nRead > 0)  
	              nTotalRead = nTotalRead + nRead;  
	      }  
	      return  new String(bytes, 0, nTotalRead, "utf-8");
	}
	@SuppressWarnings("unchecked")
  public static Map<String,Object> parse(String protocolXML) throws IOException {   
	  Map<String,Object> result = new HashMap<String,Object>();
    try {
    	StringReader read = new StringReader(protocolXML);
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
		    	result.put(element.getName(), element.getText());
		    } 
	    }
	 }catch (Exception e) {  
        e.printStackTrace();
    }  
    return result;
  }
  
  public static Object convertMap(Class type, Map map)
          throws IntrospectionException, IllegalAccessException,
          InstantiationException, InvocationTargetException {
	  map = convertFirstChar(map);
      Object obj = type.newInstance(); // 创建 JavaBean 对象

      // 给 JavaBean 对象的属性赋值
      Field[] fields = obj.getClass().getDeclaredFields();   
      for (Field field : fields) {    
          int mod = field.getModifiers();    
          if(Modifier.isStatic(mod) || Modifier.isFinal(mod)){    
              continue;    
          }    

          field.setAccessible(true);    
          field.set(obj, map.get(field.getName()));   
      }   
      return obj;
  } 
  
  public static Map<String,Object> convertFirstChar( Map<String,Object> map)
  {
	  Map<String,Object> result = new HashMap<String,Object> ();
	  Set<Entry<String, Object>> entryset = map.entrySet();
	  for(Entry<String, Object> entry:entryset)
	  {
		  String str = entry.getKey();
		  Object value = entry.getValue();
	      char[] chars=new char[1];  
	      chars[0]=str.charAt(0);  
	      String temp=new String(chars);  
	      str = str.replaceFirst(temp,temp.toLowerCase());
	      result.put(str, value);
	  }
	  return result;
  }
}  
