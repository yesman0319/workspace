package com.xiaoma.universe.common.utils;

import java.math.BigDecimal;


public class BigDecimalUtils {
	//默认除法运算精度
    private static final int DEF_DIV_SCALE = 2;
    //这个类不能实例化
    private BigDecimalUtils(){
    }
 
    /**
     * 提供精确的加法运算。
     * @param v1 被加数
     * @param v2 加数
     * @return 两个参数的和
     */
    public static double add(double v1,double v2){
        BigDecimal b1 = new BigDecimal(Double.toString(v1));
        BigDecimal b2 = new BigDecimal(Double.toString(v2));
        return b1.add(b2).doubleValue();
    }
    /**
     * 提供精确的减法运算。
     * @param v1 被减数
     * @param v2 减数
     * @return 两个参数的差
     */
    public static double sub(double v1,double v2){
        BigDecimal b1 = new BigDecimal(Double.toString(v1));
        BigDecimal b2 = new BigDecimal(Double.toString(v2));
        return b1.subtract(b2).doubleValue();
    } 
    /**
     * 提供精确的乘法运算。
     * @param v1 被乘数
     * @param v2 乘数
     * @return 两个参数的积
     */
    public static double mul(double v1,double v2){
        BigDecimal b1 = new BigDecimal(Double.toString(v1));
        BigDecimal b2 = new BigDecimal(Double.toString(v2));
        return b1.multiply(b2).doubleValue();
    }
 
    /**
     * 提供（相对）精确的除法运算，当发生除不尽的情况时，精确到
     * 小数点以后10位，以后的数字四舍五入。
     * @param v1 被除数
     * @param v2 除数
     * @return 两个参数的商
     */
    public static double div(double v1,double v2){
        return div(v1,v2,DEF_DIV_SCALE);
    }
 
    /**
     * 提供（相对）精确的除法运算。当发生除不尽的情况时，由scale参数指
     * 定精度，以后的数字四舍五入。
     * @param v1 被除数
     * @param v2 除数
     * @param scale 表示表示需要精确到小数点以后几位。
     * @return 两个参数的商
     */
    public static double div(double v1,double v2,int scale){
        if(scale<0){
            throw new IllegalArgumentException(
                "The scale must be a positive integer or zero");
        }
        if(v2==0){
        	 throw new IllegalArgumentException(
                     "除数不能为0");
        }
        BigDecimal b1 = new BigDecimal(Double.toString(v1));
        BigDecimal b2 = new BigDecimal(Double.toString(v2));
        return b1.divide(b2,scale,BigDecimal.ROUND_HALF_UP).doubleValue();
    }
 
    /**
     * 提供精确的小数位四舍五入处理。
     * @param v 需要四舍五入的数字
     * @param scale 小数点后保留几位
     * @return 四舍五入后的结果
     */
    public static double round(double v,int scale){
        if(scale<0){
            throw new IllegalArgumentException(
                "The scale must be a positive integer or zero");
        }
        BigDecimal b = new BigDecimal(Double.toString(v));
        BigDecimal one = new BigDecimal("1");
        return b.divide(one,scale,BigDecimal.ROUND_HALF_UP).doubleValue();
    }
    
    
    /**
     * @param v1 被除数
     * @param v2 除数
     * @return 两个参数的商	默认2位小数
     */
    public static double div(Integer v1,Integer v2){
        return div(Double.valueOf(v1.toString()),Double.valueOf(v2.toString()),DEF_DIV_SCALE);
    }
    
    /**
     * @param v1 被除数
     * @param v2 除数
     * @param scale 保留的小数位数
     * @return 两个参数的商	默认2位小数
     */
    public static double div(Integer v1,Integer v2,int scale){
        return div(Double.valueOf(v1.toString()),Double.valueOf(v2.toString()),scale);
    }
    
    public static boolean isNumber(String value){
    	if(value==null)
    		return false;
    	boolean strResult = value.matches("-?[0-9]+.*[0-9]*");
    	if(strResult == true) {
    		return true;
    	}  
    	return false;
    }

    static String[] units = { "", "十", "百", "千", "万", "十万", "百万", "千万", "亿",
    		"十亿", "百亿", "千亿", "万亿" };
    static char[] numArray = { '零', '一', '二', '三', '四', '五', '六', '七', '八', '九' };
    public static String intToChinaString(int value) { 
    	if(value==0)
    		return "零";
    	
    	char[] val = String.valueOf(value).toCharArray();
    	int len = val.length;
    	StringBuilder sb = new StringBuilder();
    	for (int i = 0; i < len; i++) {
    		String m = val[i] + "";
    		int n = Integer.valueOf(m);
    		boolean isZero = n == 0;
    		String unit = units[(len - 1) - i];
    		if (isZero) {
    			if ('0' == val[i - 1]) {
    				// not need process if the last digital bits is 0
    				continue;
    			} else {
    				// no unit for 0
    				sb.append(numArray[n]);
    			}
    		} else {
    			sb.append(numArray[n]);
    			sb.append(unit);
    		}
    	}
    	
    	String backStr = sb.toString();
    	if(backStr.length()>1){ 
        	String lastChar = backStr.substring(sb.length()-1);
        	if(lastChar.equals("零")){ 
        		backStr = backStr.substring(0, backStr.length()-1);
        	}
    	}
    	
    	return backStr;
    } 
    public static void main(String arg[]){
    	System.out.println(intToChinaString(0));
    	System.out.println(intToChinaString(1));
    	System.out.println(intToChinaString(2));
    	System.out.println(intToChinaString(3));

    	System.out.println(intToChinaString(10));
    	System.out.println(intToChinaString(19));
    	System.out.println(intToChinaString(200));
    	System.out.println(intToChinaString(201));

    	System.out.println(intToChinaString(2000));

    	System.out.println(intToChinaString(2001));
    	System.out.println(intToChinaString(2201));

    	System.out.println(intToChinaString(8588));

    	System.out.println(intToChinaString(85288));

    	System.out.println(intToChinaString(8522288));
    }
}
