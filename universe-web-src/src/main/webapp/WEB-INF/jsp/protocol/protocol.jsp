<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<% 
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()+ path;
    String cdnPath="http://static01.xiaoma.com/universe-web";
    pageContext.setAttribute("basePath", basePath);
    pageContext.setAttribute("path", path);
    pageContext.setAttribute("cdnPath", basePath);
%>

<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <meta name="applicable-device" content="pc,mobile">
    
    <title>用户使用协议</title>
    <link rel="icon" href="${basePath}/favicon.ico" type="image/x-icon" />
	<link rel="shortcut icon"  href="${basePath}/favicon.ico" type="image/x-icon" >
	<link rel="bookmark"  href="${basePath}/favicon.ico" type="image/x-icon">
    <link type="text/css" rel="stylesheet" href="${basePath}/css/protocol.css"/>
</head>
<body>
<div class="section"  <c:if test="${not empty param.type}">style="margin-top: 50px;"</c:if>>
    <c:if test="${not empty param.type}"><h1>用户使用协议</h1></c:if>
    <div class="content" >
    <h2>用户使用协议</h2>
    <span class="sort">一、总则</span>
    <p>1.1 本协议的签署方为北京天使云教育投资有限公司和本网站用户，适用于本网站用户在本网站的全部活动。</p>

    <p>1.2在用户注册本网站前，请认真阅读本协议，如用户同意接受本协议的约定，请勾选“同意”选项，勾选后正式成为本网站注册用户，本协议自用户成为注册用户时即生效。</p>

    <p>1.3 如用户不同意本协议的约定（包括全部和部分），则请停止继续注册或主动停止使用本网站的服务。完成注册或继续使用本网站的服务，则默认为用户同意受本协议全部条款（包括本网站对本协议随时所做的任何修改）的约束。</p>
    <span class="sort">二、定义和释义</span>

    <p>2.1 本网站：指由北京天使云教育投资有限公司负责运营的网站，域名www.vip-young.com以下所称“本网站”包含了网站及北京天使云教育投资有限公司。</p>

    <p>2.2 天使云教育：指北京天使云教育投资有限公司及其关联或授权的提供本协议约定的线上服务的主体。</p>

    <p>2.3 用户：指本网站的注册用户，符合本合同规定的条件并已通过本网站使用本协议约定的线上服务的单位或个人，无论该等服务为免费或者付费服务。</p>
    <span class="sort">三、用户注册</span>

    <p>3.1 注册用户在注册时向本网站提交的注册用户名、密码、安全问题答案及找回密码的手机号码或电子邮箱是注册用户在本网站的有效识别信息。用户注册成功，即成为本网站的注册用户。</p>

    <p>3.2 个人注册信息发生变化时，应及时更新，所有用户输入的个人信息将被视作准确的表明了用户的身份，并作为本网站提供所有服务的有效身份认证依据。</p>

    <p>3.3 注册用户应当妥善保管自己的注册用户名和密码，除本协议另有约定，不得将注册用户名转让、赠与或授权给第三方使用。因注册用户个人原因导致的注册用户名和密码泄露、丢失或注册用户名和密码被窃取、篡改等导致的一切损失，由注册用户自行承担。注册用户须对使用注册用户名和密码所采取的一切行为负责，本网站不承担任何责任。</p>

    <p>3.4 用户发现任何注册用户名和密码被非法使用的状况，应立即通知本网站。</p>

    <p>3.5 用户自行配备上网的所需设备，包括个人电脑、调制解调器或其他上网装置。用户应自行负担因使用这种接入方式而产生的电话费、上网费等费用。</p>

    <p>3.6 用户应对以其用户名进行的所有活动和事件负责,不得允许多人使用同一账户学习付费课程，一经发现立即关闭其课程，并不退还学费。</p>　
    <span class="sort">四、使用规则</span>

    <p>4．1　用户在使用本网站服务时，必须遵守中华人民共和国相关法律法规的规定，用户应同意将不会利用本服务进行任何违法或不正当的活动，包括但不限于下列行为∶</p>

    <p class="marl">4.1.1 上载、展示、张贴、传播或以其它方式传送含有下列内容之一的信息：</p>

    <p class="marll">i 反对宪法所确定的基本原则的；</p>

    <p class="marll">ii 危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；</p>

    <p class="marll">iii 损害国家荣誉和利益的；</p>

    <p class="marll">iv 煽动民族仇恨、民族歧视、破坏民族团结的；</p>

    <p class="marll">v 破坏国家宗教政策，宣扬邪教和封建迷信的；</p>

    <p class="marll">vi 散布谣言，扰乱社会秩序，破坏社会稳定的；</p>

    <p class="marll">vii 散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；</p>

    <p class="marll">viii 侮辱或者诽谤他人，侵害他人合法权利的；</p>

    <p class="marll">ix 含有虚假、有害、胁迫、侵害他人隐私、骚扰、侵害、中伤、粗俗、猥亵、或其它道德上令人感的内容；</p>

    <p class="marll">x 含有中国法律、法规、规章、条例以及任何具有法律效力之规范所限制或禁止的其它内容的；</p>

    <p class="marl">4.1.2不得为任何非法目的而使用网络服务系统；</>
    <p class="marl">4.1.3不利用本网站服务从事以下活动：</p>

    <p class="marll">i 未经允许，进入计算机信息网络或者使用计算机信息网络资源的；</p>

    <p class="marll">ii 未经允许，对计算机信息网络功能进行删除、修改或者增加的；</p>

    <p class="marll">iii 未经允许，对进入计算机信息网络中存储、处理或者传输的数据和应用程序进行删除、修改或增加的；</p>

    <p class="marll">iv 故意制作、传播计算机病毒等破坏性程序的；</p>

    <p class="marll">v 其他危害计算机信息网络安全的行为。</p>

    <p> 4．2　用户违反本协议或相关的服务条款的规定，导致或产生的任何第三方主张的任何索赔、要求或损失，包括合理的律师费，您同意赔偿本网站与合作公司、关联公司，并使之免受损害。对此，本网站有权视用户的行为性质，采取包括但不限于删除用户发布信息内容、暂停服务、终止服务、限制使用、回收本网站账号、追究法律责任等措施。对恶意注册本网站账号或利用本网站账号进行违法活动、捣乱、骚扰、欺骗、其他用户以及其他违反本协议的行为，本网站有权回收其账号。同时，本网站会视司法部门的要求，协助调查。</p>

    <p>4．3　用户不得对本网站任何部分或本网站服务之使用或获得，进行复制、拷贝、出售、转售或用于任何其它商业目的。</p>

    <p>4．4　用户须对自己在使用本网站服务过程中的行为承担法律责任。用户承担法律责任的形式包括但不限于：对受到侵害者进行赔偿，以及在本网站首先承担了因用户行为导致的行政处罚或侵权损害赔偿责任后，用户应给予本网站等额的赔偿。</p>

    <p>4．5　用户可以使用本网站各个频道单项服务，当用户使用本网站各单项服务时，用户的使用行为视为其对该单项服务的服务条款以及本网站在该单项服务中发出的各类公告的同意。</p>

    <p>4．6　本协议以及各个频道单项服务条款和公告可由本网站随时更新和修订，且无需另行通知。用户在使用相关服务时，应关注本网站对此更新和修订的通知，并遵守其所适用的相关条款。</p>
    <span class="sort">五、知识产权保护</span>

    <p>5.1  本网站的结构、网页设计、文字、图像、视频、音频、软件、可下载文档和其它信息等所有资料及/或信息，除特别声明外，其著作权均属本网站及天使云教育所有，受中国知识产权法律及中国签署的国际版权公约的保护，无论该等资料及/或信息以任何形式表现（包括但不限于文字、声音、图片、录像、表格、软件、电子邮件等）。</p>

    <p>5.2 未经天使云教育许可，任何人不得擅自对本网站的包括电子课件在内的任何作品进行全盘的或者在原作品基础上作出变动后为任何形式的复制、传播、展示、镜像、上载、下载或从事其他任何违反著作权法等相关法律、法规的活动。</p>

    <p>5.3 用户下载学习课程后仅能供自己学习之用，不得转发给他人共享使用或进行销售，一经发现，本网站及天使云教育有权立即关闭其课程(不退还学费)并向用户主张因此给天使云教育造成的损害赔偿。</p>

    <p>5.4 对侵犯天使云教育知识产权的个人和组织，天使云教育将依法追究其法律责任。</p>
    <span class="sort">六、隐私保护条款</span>

    <p>6.1 个人资料</p>

    <p class="marl">6.1.1 本网站收集个人资料的主要目的在于，为用户您提供一个顺利、有效和度身订造的课程学习电子服务。本网站仅收集本网站认为就此目的及达成该目的所必须的关于用户的个人资料。</p>
    <p class="marl">6.1.2 本网站的网站内容可能涉及由第三方所有、控制或者运营的其他网站(以下称“第三方网站”)。本网站不能保证也没有义务保证第三方网站上的信息的真实性和有效性，不因用户使用第三方网站而承担任何其他义务或责任。</p>

    <p class="marl">6.1.3 本网站可能通过其他合法来源（包括第三方网站等）收集到的用户的额外资料，以更好地了解本网站用户，并为其度身订造本网站服务、解决争议等。</p>

    <p class="marl">6.1.4 本网站按照用户在本网站网址上的行为自动追踪关于用户的某些资料。本网站利用这些资料进行有关本网站之用户的人口统计、兴趣及行为的内部研究，以更好地了解用户及向用户提供更好的服务。</p>

    <p class="marl">6.1.5 本网站在本网站的某些网页上使用诸如“Cookies”的资料收集装置。Cookies是用户浏览器存在用户终端的加密数据，以协助本网站为用户提供度身订造的服务。本网站亦提供某些只能通过使用“Cookies”才可得到的功能。本网站还利用“Cookies”使用户能够在某段期间内减少输入密码的次数。“Cookies”还可以协助本网站提供专门针对用户的兴趣而提供的资料。因此，请用户留意上述Cookies使用过程中的相关风险。</p>

    <p class="marl">6.1.6 如果用户将个人通讯信息（例如：手机短信、电邮或信件）交付给本网站，或如果其他用户或第三方向本网站发出关于用户在本网站上的活动或登录事项的通讯信息，本网站可以将这些资料收集在用户的专门档案中，并利用这些资料以更好地了解用户，以便向用户提供更好的服务。</p>

    <p> 6.2 对用户资料的使用：</p>

    <p class="marl">6.2.1  本网站有权使用关于用户的个人资料（包括但不限于本网站持有的有关用户的档案中的资料，及本网站从用户目前及以前在本网站上的活动所获取的其他资料）以解决争议、对纠纷进行调停、有助于确保在本网站向用户提供的各项服务，并执行本协议。本网站有时候可能调查多个用户以识别问题或解决争议，特别是本网站可审查用户的资料以区分使用多个用户名或别名，但实际为同一人的用户。
        为限制在网站上的欺诈、非法或其他刑事犯罪活动，使本网站免受其害，用户同意本网站可通过人工或自动程序对用户的个人资料进行评价。</p>

    <p class="marl">6.2.2  用户同意本网站可以使用其个人资料以改进本网站的推广和促销工作、分析网站的使用率、改善本网站的内容和产品推广形式，并使本网站的网站内容、设计和服务更能符合用户的要求。这些使用能改善本网站的网页，以调整本网站的网页使其更能符合用户的需求，从而使用户在使用本网站服务时得到更为顺利、有效、安全及度身订造的用户体验。</p>

    <p class="marl">6.2.3  用户同意本网站利用用户的资料与用户联络并向用户传递针对用户的兴趣而提供的信息，例如：有针对性的广告条、行政管理方面的通知、产品提供以及有关用户使用本网站的通讯。用户接受服务协议和隐私规则即为明示同意收取这些资料。</p>

    <p>6.3对用户资料的披露：</p>

    <p class="marl">6.3.1  本网站将采用行业标准惯例以保护用户的个人资料，但鉴于技术限制，本网站不能确保用户的全部私人通讯及其他个人资料不会通过本协议中未列明的途径泄露出去。特别是用户在使用本网站的过程中，请确保用户周围环境安全、网络环境安全，并不同时使用其他易导致用户个人信息被截取的网站、软件或工具等。本网站不对本网站自身之外的原因导致用户个人资料泄露而产生的损失承担任何责任。</p>

    <p class="marl">6.3.2 本网站有义务根据有关法律法规等规范性文件或者相关立法、行政、司法机关的要求向相关立法、司法机关和政府部门或其派出机构、代理人提供用户的个人资料。</p>
    <span class="sort">七、违约责任和责任限制</span>

    <p>7.1 如一方违反有关法律、法规、规章或监管要求，及本协议的规定，造成另一方损失，守约方可以书面方式要求违约方在指定的期限内停止违约行为，并承担因违约行为产生的一切责任。</p>

    <p>7.2 守约方有权向违约方请求赔偿损失，包括但不限于律师费、诉讼费及赔偿金等。但本网站违约赔偿损失的总额不超过向注册用户收取的课程学习费用总额。</p>

    <p>7.3  不论在何种情况下，本网站均不对由于Internet连接故障，电脑，通讯或其他系统的故障，电力故障，罢工，劳动争议，暴乱，起义，骚乱，火灾，洪水，风暴，爆炸，战争，政府行为等不可抗力，国际、国内法院的命令或第三方的不作为而造成的不能服务或延迟服务承担责任。</p>
    <span class="sort">八、法律适用和争议解决</span>

    <p>8.1 本协议的签订、效力、履行、终止、解释和争端解决受中国（不包括香港、澳门和台湾）法律的管辖。如本协议某条款与现行法律相抵触时，该条款自动无效。</p>

    <p>8.2 因本协议履行发生任何争议，本网站建议先由双方友好协商解决，协商不成的，任何一方有权将纠纷提交至北京小马过河教育科技有限公司所在地有管辖权的人民法院诉讼解决。</p>
    <span class="sort">九、其他</span>

    <p>9.1 在本网站的某些部分或页面中、或者注册用户使用本网站相关服务的过程中，可能存在除本协议以外的单独的附加服务条款或协议，当这些服务条款或协议与本协议条款及规则存在冲突时，则前述本协议条款和规则以外的服务条款或协议将优先适用。</p>

    <p>9.2 本协议部分条款被认定无效时，不影响本协议其他条款的效力。</p>

    <p>9.3 本网站对本协议享有最终的解释权。本协议及本网站有关页面的相关名词可互相引用参照，如有不同理解，则以本协议条款为准。</p>

    <p>9.4 若注册用户在使用本网站的过程中有任何的疑问、投诉和咨询，可随时致电客服热线。</p>

    </div>
</div>
</body>
</html>