/**
 * 
 */
package com.xiaoma.universe.message.controler;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSONObject;
import com.xiaoma.rest.authentication.TeacherInfo;
import com.xiaoma.rest.authentication.UniverseSession;
import com.xiaoma.universe.common.api.ApiClient;
import com.xiaoma.universe.common.api.JsonUtil;
import com.xiaoma.universe.common.interceptor.UserVo;
import com.xiaoma.universe.common.paging.YzPagingInfo;
import com.xiaoma.universe.common.utils.BigDecimalUtils;
import com.xiaoma.universe.common.utils.PropertiesUtils;
import com.xiaoma.universe.common.utils.ResponseData;
import com.xiaoma.universe.common.utils.TimeUtil;
import com.xiaoma.universe.common.utils.upyun.UploadAuidoUtil;
import com.xiaoma.universe.learnplan.domain.vo.api.AudiosVO;
import com.xiaoma.universe.learnplan.domain.vo.api.CustomPlanVO;
import com.xiaoma.universe.learnplan.domain.vo.api.CustomPlansVO;
import com.xiaoma.universe.learnplan.domain.vo.api.ExerciseHistoriesVO;
import com.xiaoma.universe.learnplan.domain.vo.api.InformationVO;
import com.xiaoma.universe.learnplan.domain.vo.api.PlanDayDefaultVisitVO;
import com.xiaoma.universe.learnplan.domain.vo.api.PlanDayDetailVO;
import com.xiaoma.universe.learnplan.domain.vo.api.PlanDayExerciseVO;
import com.xiaoma.universe.learnplan.domain.vo.api.PlanDayInfoStatisticVO;
import com.xiaoma.universe.learnplan.domain.vo.api.PlanDayInfoVO;
import com.xiaoma.universe.learnplan.domain.vo.api.PlanDetailVO;
import com.xiaoma.universe.learnplan.domain.vo.api.PlanInfosVO; 
import com.xiaoma.universe.learnplan.domain.vo.api.PlanUserOneDayStatisticVO;
import com.xiaoma.universe.learnplan.domain.vo.api.PlanUserStatisticVO;
import com.xiaoma.universe.learnplan.domain.vo.api.PlanUsersVO;
import com.xiaoma.universe.learnplan.domain.vo.api.VideoUserStatus;
import com.xiaoma.universe.learnplan.domain.vo.api.VideosVO;
import com.xiaoma.universe.learnplan.domain.vo.api.exercise.IntensiveListeningQuestionParagraphVO;
import com.xiaoma.universe.learnplan.domain.vo.api.exercise.IntensiveListeningQuestionSentenceVO;
import com.xiaoma.universe.learnplan.domain.vo.api.exercise.IntensiveListeningQuestionVO;
import com.xiaoma.universe.learnplan.domain.vo.api.exercise.NewTranslateVO;
import com.xiaoma.universe.learnplan.domain.vo.api.exercise.NewTranslatesVO;
import com.xiaoma.universe.learnplan.domain.vo.api.exercise.PreparationVO;
import com.xiaoma.universe.learnplan.domain.vo.api.exercise.SpokenVO;
import com.xiaoma.universe.learnplan.domain.vo.api.exercise.SpokensVO;
import com.xiaoma.universe.learnplan.domain.vo.api.exercise.TranslateVO;
import com.xiaoma.universe.learnplan.domain.vo.api.exercise.TranslatesVO;
import com.xiaoma.universe.learnplan.domain.vo.api.exercise.WordQuestionsVO;
import com.xiaoma.universe.learnplan.domain.vo.web.MyPlanVO;
import com.xiaoma.universe.learnplan.domain.vo.web.PlanDayVO;
import com.xiaoma.universe.learnplan.domain.vo.web.PlanDetailInfoVO;
import com.xiaoma.universe.learnplan.domain.vo.web.PlanInformationVO;
import com.xiaoma.universe.learnplan.domain.vo.web.PlanLiveLessionVO;
import com.xiaoma.universe.learnplan.service.ExerciseService;
import com.xiaoma.universe.learnplan.service.PlanService;
import com.xiaoma.universe.learnplan.util.LearnplanUtil;
import com.xiaoma.universe.learnplan.util.SortExerciseComparator;
import com.xiaoma.universe.livemanage.model.LivelessionVO;
import com.xiaoma.universe.livemanage.service.LivelessionService;
import com.xiaoma.universe.message.service.MessageService;
import com.xiaoma.universe.userlogin.controller.UserVO;

/**
 * @author xiaoma
 *
 */
@Controller 
public class MessageController { 
	
	public static int WORD_PAGE_SIZE = 10;
	public static String APP_DOWNLOAD_URL = PropertiesUtils.getString("APP_DOWNLOAD_URL"); 
	private static final Logger logger = LoggerFactory.getLogger(MessageController.class);
	

	@Autowired
	private MessageService messageService; 
 


	@Autowired
	private ExerciseService exerciseService;

	@RequestMapping(value="/personal/messages")
	public String userMessages(HttpServletRequest request,Model model){ 
		try{
			model.addAttribute("message_api_url",MessageService.MESSAGE_API_URL);
		}catch(Exception e){ 
			e.printStackTrace();
		} 
		return "message/user_notice";
	}
	 
}
