/**
 * 
 */
package com.xiaoma.universe.common.paging;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.TagSupport;

import com.xiaoma.universe.common.api.JsonUtil;

/**
 * @author xiaoma
 *
 */
public class YzPagingTag extends TagSupport{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private YzPagingInfo pagintInfo;

	@Override

    public int doStartTag() throws JspException {

        try {

            JspWriter out = this.pageContext.getOut();
            if(pagintInfo == null) {

                out.println("No pagintInfo Found...");

                return SKIP_BODY; 
            }
            String htmlStr = "";
            if(pagintInfo.getTotalPage()>1){
            	htmlStr ="<script type=\"text/javascript\"> function paddingSubmit(){ 	\n "
                 		+ "var page = $(\"#padding_page_current\").val(); \n	"
                 		+ "if(parseInt(page)<= "+ pagintInfo.getTotalPage() +"&& parseInt(page)>0){" 
                 		+ "location.href = \""+ pagintInfo.getUrlNoPage() + (pagintInfo.getUrlNoPage().indexOf("?")>=0?"&":"?")+ "page=\" +page; }\n} \n "
                 		+ "</script> \n <div style=\"margin:0 auto;width:810px;text-align:center;\">"
                 		+ "\n"
                 		
                 		+ "<div class=\"page\"><span class=\"first\"><a href=\""+ pagintInfo.getPageToUrl(pagintInfo.getFirstPage())  +"\"  >首页</a></span>\n"
                 		+ "<span class=\"prev\"><a href=\""+ pagintInfo.getPreviousUrl()+"\">上一页</a></span>"
                 		+ "<ul class=\"page_list\">    ";
                if(pagintInfo.getStartPage()>1)
                {
                    htmlStr = htmlStr  + "<li class=\"omit_left\">...</li>    ";
                }
         		
                 for(int i=pagintInfo.getStartPage();i<=pagintInfo.getEndPage();i++){
                 	htmlStr = htmlStr + "<li><a href=\""+ pagintInfo.getPageToUrl(i) +"\">"+ i +"</a></li>\n";
                 }
                 if(pagintInfo.getEndPage()<pagintInfo.getTotalPage())
                 {
                     htmlStr = htmlStr  + "<li class=\"omit_left\">...</li></ul>";
                 }

                 htmlStr = htmlStr  +  "<span class=\"next\"><a href=\""+ pagintInfo.getNextUrl()  +"\">下一页</a></span>\n"
                 		+ "<span class=\"last\"><a href=\""+ pagintInfo.getPageToUrl(pagintInfo.getLastPage())  +"\">末页</a></span>\n"
                 		+ "<span class=\"page_count\">共<span class=\"total_count\">"+ pagintInfo.getTotalPage() +"</span>页</span>\n"
                 		+ "<label class=\"cur_page\">当前<input id=\"padding_page_current\" class=\"goTO\" type=\"text\" value=\""+ pagintInfo.getCurrentPage() +"\"/>页</label>\n"
                 		+ "\n<a class=\"ok\" href=\"#\" onClick=\"paddingSubmit()\" >确定</a>\n</div></div>\n";
                 
            }
           
            out.println(htmlStr); 
        } catch(Exception e) {
            throw new JspException(e.getMessage());
        }

        return SKIP_BODY;

    }

   

    @Override
    public int doEndTag() throws JspException {

        return EVAL_PAGE;

    }

 
    
	public YzPagingInfo getPagintInfo() {
		return pagintInfo;
	}

	public void setPagintInfo(YzPagingInfo pagintInfo) {
		this.pagintInfo = pagintInfo;
	}
	
	
}
