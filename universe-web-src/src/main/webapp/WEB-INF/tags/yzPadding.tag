<?xml version="1.0" encoding="UTF-8"?>

<taglib version="2.0" xmlns="http://java.sun.com/xml/ns/j2ee"

 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"

 xsi:schemaLocation="http://java.sun.com/xml/ns/j2ee web-jsptaglibrary_2_0.xsd">

<tlib-version>1.0</tlib-version> 
<jsp-version>2.0</jsp-version> 
<short-name>padding</short-name> 
<uri>/padding</uri> 
<tag>

    <name>padding</name>

    <tag-class>com.xiaoma.universe.common.paging.YzPagingTag</tag-class>

    <body-content>empty</body-content>

    <attribute>

        <name>pagintInfo</name>

         <required>true</required>

         <rtexprvalue>true</rtexprvalue>

    </attribute>

 </tag>

</taglib>