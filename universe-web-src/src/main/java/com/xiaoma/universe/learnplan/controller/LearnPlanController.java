/**
 * 
 */
package com.xiaoma.universe.learnplan.controller;

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
import com.xiaoma.universe.learnplan.domain.vo.api.PlanDayExerciseKindResult;
import com.xiaoma.universe.learnplan.domain.vo.api.PlanDayExerciseResultVO;
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
import com.xiaoma.universe.learnplan.domain.vo.api.exercise.difficultSentence.DifficultSentenceGroupVO;
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
import com.xiaoma.universe.userlogin.controller.UserVO;

/**
 * @author xiaoma
 *
 */
@Controller 
public class LearnPlanController { 
	
	public static int WORD_PAGE_SIZE = 10;
	public static String APP_DOWNLOAD_URL = PropertiesUtils.getString("APP_DOWNLOAD_URL"); 
	private static final Logger logger = LoggerFactory.getLogger(LearnPlanController.class);
	

	@Autowired
	private PlanService planService; 

	@Autowired
	private LivelessionService livelessionService;


	@Autowired
	private ExerciseService exerciseService;

	@RequestMapping(value="/personal/exercises")
	public String planExerciseHistory(HttpServletRequest request,Model model,Integer page_size,Integer page,@UserVo UserVO user){

		try{
			if(page_size==null){
				page_size = YzPagingInfo.PAGE_SIZE_DEFAULT;
			}

			if(page==null){
				page = 1;
			}
			int userid = 0;
			if(user!=null){
				userid = user.getId();
			}
			ExerciseHistoriesVO exerciseHistoriesVO = planService.getExerciseHistory(request,page,page_size, userid); 
			if(exerciseHistoriesVO!=null){
				model.addAttribute("exerciseList", exerciseHistoriesVO.getResult());  
				YzPagingInfo paddingInfo = new YzPagingInfo(request,exerciseHistoriesVO.getTotal());
				model.addAttribute("paddingInfo",paddingInfo);
			}
		}catch(Exception e){ 
			e.printStackTrace();
		} 
		return "learnplan/plan_exercise_history";
	}
	
	@RequestMapping(value="/gettime")
	@ResponseBody
	public Object getTime(){
 
		return "";
	}
	
	
	@RequestMapping(value="/exercises/notinplan")
	public String planExerciseResult(HttpServletRequest request,Model model,String planid,String dayid,String exerciseid, String result,String page_size,String page,
			@UserVo UserVO user){
		try{ 
			
			int exerciseIdVal = BigDecimalUtils.isNumber(exerciseid)?Integer.valueOf(exerciseid):0;
			PlanDayDetailVO dayDetailVO = planService.getOnDayExercises(request, planid, dayid);
			if(dayDetailVO==null){
				return "500";
			}
			List<PlanDayExerciseVO> exercises = dayDetailVO.getExercises();
			  
			PlanDayExerciseVO currentExercise = null;
			if(exercises!=null){ 
				for(PlanDayExerciseVO exerciseVO:exercises){
					if(exerciseVO.getId()==exerciseIdVal){ 
						currentExercise = exerciseVO;
						break;
					}
				}
			}
			   
			if(currentExercise==null)
				return "500";
			
			Object learnplan_show_tip =  UniverseSession.getAttribute("learnplan_show_tip");
			boolean show_tip = true;
			if(learnplan_show_tip!=null){
				show_tip = false;
			}else{
				UniverseSession.setAttribute("learnplan_show_tip", "show");
			}
			
			String token = ApiClient.getUserOrAppToken(request); 
			boolean islogin;
			if(user == null || user.getId() <= 0){ 
				islogin = false;
			}else{
				islogin = true;
			}
			int moduleID = currentExercise.getModuleId();
			//口语练习特殊
			if(moduleID == 21){
				String groupId = ""+currentExercise.getLevelOne();
				SpokensVO spokensVO = planService.getEcerciseSpoken(groupId,request);
				if(spokensVO==null){
					return "500";
				}
				List<SpokenVO> spokens = spokensVO.getResult();
				String groupName = spokensVO.getGroupName();
				model.addAttribute("groupName", groupName);
				model.addAttribute("spokens", spokens); 
				model.addAttribute("groupId",groupId);
			}
			
			//翻译
			if(moduleID == 20){ 
				String groupId = ""+currentExercise.getLevelOne();
				TranslatesVO translatesVO = planService.getEcerciseTranslate(groupId,request);
				if(translatesVO==null){
					return "500";
				}
				
				List<TranslateVO> translates =  translatesVO.getResult();

				String groupName = translatesVO.getGroupName();

				model.addAttribute("groupName", groupName);
				model.addAttribute("translates", translates);
				model.addAttribute("token", token);
				model.addAttribute("groupUnitId", groupId); 
			}

			//单词
			if(moduleID == 29){ 
				String groupId = ""+currentExercise.getLevelOne();

				int page_v = (page==null?1:Integer.valueOf(page));
				int page_size_v = (page_size==null?WORD_PAGE_SIZE:Integer.valueOf(page_size));

				WordQuestionsVO wordsVO = exerciseService.getWordQuestion(request, groupId, page_v, page_size_v);
				WordQuestionsVO wordsAll = exerciseService.getWordQuestion(request, groupId, 0, 0);
				
				if(wordsVO==null || wordsAll==null){
					return "500";
				}
				model.addAttribute("words", wordsVO.getRows());  
				model.addAttribute("wordTotal", wordsVO.getTotal());  
				model.addAttribute("wordDataList", JsonUtil.beanToJson(wordsAll.getRows()));
				YzPagingInfo paddingInfo = new YzPagingInfo(request,wordsVO.getTotal(),page_size_v);
				model.addAttribute("paddingInfo",paddingInfo); 
			}
			//精听
			if(moduleID == 30){ 
				String questionId = ""+currentExercise.getLevelOne();
 
				IntensiveListeningQuestionVO questionVO = exerciseService.getIntensiveListenQuestion(request, questionId); 
				if(questionVO==null){
					return "500";
				}
				 
				List<IntensiveListeningQuestionSentenceVO> sentenceList = new ArrayList<IntensiveListeningQuestionSentenceVO>();
				for(IntensiveListeningQuestionParagraphVO paragrah:questionVO.getParagraphList()){
					if(paragrah.getSentenceList()!=null && paragrah.getSentenceList().size()>0){
						sentenceList.addAll(paragrah.getSentenceList());
						for(IntensiveListeningQuestionSentenceVO sentence:paragrah.getSentenceList()){
							sentence.initWordList();
						}
					}
					
					
				}
				model.addAttribute("audio_url", questionVO.getAudioUrl());  
				model.addAttribute("paragraphList", questionVO.getParagraphList());  
				model.addAttribute("sentenceList", JsonUtil.beanToJson(sentenceList));  
				
			}

			//长难句
			if(moduleID == 35){ 
				String groupId = ""+currentExercise.getLevelOne();
				DifficultSentenceGroupVO vo = planService.getExerciseDifficultSentence(groupId,request);
				if(vo==null){
					return "500";
				}  
				int hasTip = 0;
				if(user!=null){
					hasTip = planService.getMaker( user.getId());
				}
				model.addAttribute("hasTip", hasTip); 
				model.addAttribute("groupQuestion", JsonUtil.beanToJson(vo)); 
			}
			
			model.addAttribute("apiUrl",PlanService.PLAN_API_URL); 
			model.addAttribute("islogin",islogin);
			model.addAttribute("app_down_url",APP_DOWNLOAD_URL);
			model.addAttribute("result",result);
			model.addAttribute("dayInfo",dayDetailVO); 
			model.addAttribute("currentExercise", currentExercise);
	        model.addAttribute("planid", dayDetailVO.getPlanId());
			
		}catch(Exception e){
			e.getStackTrace();
			logger.debug( e.getStackTrace().toString()); 
		} 
		return "learnplan/plan_exercise_result";
	}
	
	
	@RequestMapping(value="/exercises/delete")
	public String planExerciseHistoryDelete(HttpServletRequest request,Model model,String planid,String dayid,String exerciseid){
		try{  
			planService.deleteExerciseHistory(request, model, planid, dayid, exerciseid);
		}catch(Exception e){
			e.getStackTrace();
			logger.debug( e.getStackTrace().toString()); 
		} 
		return "redirect:/personal/exercises";
	}
	
	@RequestMapping(value="/exercises/inplan")
	public String planExercise(HttpServletRequest request,Model model,String planid,String dayid,String exerciseid,String result,String page_size,String page,
			@UserVo UserVO user){
		try{ 
			
			
			
			int exerciseIdVal = BigDecimalUtils.isNumber(exerciseid)?Integer.valueOf(exerciseid):0;
			PlanDayDetailVO dayDetailVO = planService.getOnDayExercises(request, planid, dayid);
			if(dayDetailVO==null){
				return "500";
			}
			 
			//开通体验，放到我的计划里
			
			PlanUserOneDayStatisticVO userStatitic = dayDetailVO.getUserStatitic();
			if(userStatitic!=null){
				if(userStatitic.getUserStatus()==0 || userStatitic.getIsDelete()>0){
					if(BigDecimalUtils.isNumber(planid)){  
						planService.experiencePlan(request, Integer.valueOf(planid));
					} 
				}
			}
			
			List<PlanDayExerciseVO> exercises = dayDetailVO.getExercises();
			
			int readingTime = 0;
			int listeningTime = 0;
			int speakingTime = 0;
			int writingTime = 0;
			int prepTime = 0;
			
			int doneCount = 0;
			int totalCount = 0;


			List<PlanDayExerciseVO> readingList = new ArrayList<PlanDayExerciseVO>();
			List<PlanDayExerciseVO> listeningList = new ArrayList<PlanDayExerciseVO>(); 
			List<PlanDayExerciseVO> speakingList = new ArrayList<PlanDayExerciseVO>();
			List<PlanDayExerciseVO> writingList = new ArrayList<PlanDayExerciseVO>();
			List<PlanDayExerciseVO> prepList = new ArrayList<PlanDayExerciseVO>();
			PlanDayExerciseVO currentExercise = null;
			PlanDayExerciseVO nextExercise = null;
			if(exercises!=null){ 
				totalCount = exercises.size();
				exercises.sort(new SortExerciseComparator());
				for(PlanDayExerciseVO exerciseVO:exercises){  
//					if(StringUtils.isNotBlank(exerciseid)){
//						Integer eId = Integer.valueOf(exerciseid);
//						if(eId.intValue() == exerciseVO.getId()){
//							model.addAttribute("originName",exerciseVO.getOriginName());
//						}
//					}
					if(exerciseVO.getIsDone()==PlanDayExerciseVO.IS_DONE){
						doneCount++;
					}
//					 
//					
					if(exerciseVO.getId()==exerciseIdVal){
						currentExercise = exerciseVO; 
					} 
					
					if("1".equals(exerciseVO.getKind())){//听力
						listeningList.add(exerciseVO);  
						listeningTime = listeningTime + (BigDecimalUtils.isNumber(exerciseVO.getEstimateTime())?Integer.valueOf(exerciseVO.getEstimateTime()):0);
					} 
					if("2".equals(exerciseVO.getKind())){//口语
						speakingList.add(exerciseVO); 
						speakingTime = speakingTime + (BigDecimalUtils.isNumber(exerciseVO.getEstimateTime())?Integer.valueOf(exerciseVO.getEstimateTime()):0);		
					} 
					if("3".equals(exerciseVO.getKind())){//阅读
						readingList.add(exerciseVO);
						readingTime = readingTime + (BigDecimalUtils.isNumber(exerciseVO.getEstimateTime())?Integer.valueOf(exerciseVO.getEstimateTime()):0);				
					}
					if("4".equals(exerciseVO.getKind())){//写作
						writingList.add(exerciseVO);
						writingTime = writingTime + (BigDecimalUtils.isNumber(exerciseVO.getEstimateTime())?Integer.valueOf(exerciseVO.getEstimateTime()):0);
					}
					
					if("5".equals(exerciseVO.getKind())){//写作
						prepList.add(exerciseVO);
						prepTime = prepTime + (BigDecimalUtils.isNumber(exerciseVO.getEstimateTime())?Integer.valueOf(exerciseVO.getEstimateTime()):0);
					}
				}
			}
			
			List<PlanDayExerciseKindResult> planDayExerciseKindResultList = dayDetailVO.getPlanDayExerciseKindResultList();
			for(PlanDayExerciseKindResult planDayExerciseKindResult:planDayExerciseKindResultList) {
				if(currentExercise==null){
					List<PlanDayExerciseResultVO> exerciseList = planDayExerciseKindResult.getExerciseList();
					for(PlanDayExerciseResultVO exerciseVO:exerciseList){
						if(exerciseVO.getIsDone()!=PlanDayExerciseVO.IS_DONE){
							currentExercise = com.xiaoma.universe.common.utils.JsonUtil.json2Obj(com.xiaoma.universe.common.utils.JsonUtil.toJson(exerciseVO), PlanDayExerciseVO.class);
							exerciseVO.setIsDoing(1);
							break;
						}
					}
				}
				else {
					break;
				}
			}
			
			if(currentExercise==null && planDayExerciseKindResultList.size()>0&&planDayExerciseKindResultList.get(0).getExerciseList().size()>0){
				currentExercise = com.xiaoma.universe.common.utils.JsonUtil.json2Obj(com.xiaoma.universe.common.utils.JsonUtil.toJson(planDayExerciseKindResultList.get(0).getExerciseList().get(0)), PlanDayExerciseVO.class);
			}
			
			//从预习里找一个
			if(currentExercise==null){
				for(PlanDayExerciseVO exerciseVO:prepList){
					if(exerciseVO.getIsDone()!=PlanDayExerciseVO.IS_DONE){
						
						currentExercise = exerciseVO;
						break;
					}
				}
			}
			
			//从听力里找一个
			if(currentExercise==null){
				for(PlanDayExerciseVO exerciseVO:listeningList){
					if(exerciseVO.getIsDone()!=PlanDayExerciseVO.IS_DONE){
						
						currentExercise = exerciseVO;
						break;
					}
				}
			}
			
			//从口语里找一个
			if(currentExercise==null){
				for(PlanDayExerciseVO exerciseVO:speakingList){
					if(exerciseVO.getIsDone()!=PlanDayExerciseVO.IS_DONE){
						currentExercise = exerciseVO;
						break;
					}
				}
			} 
			
			//从阅读里找一个
			if(currentExercise==null){
				for(PlanDayExerciseVO exerciseVO:readingList){
					if(exerciseVO.getIsDone()!=PlanDayExerciseVO.IS_DONE){
						currentExercise = exerciseVO;
						break;
					}
				}
			} 
			
			//从写作里找一个
			if(currentExercise==null){
				for(PlanDayExerciseVO exerciseVO:writingList){
					if(exerciseVO.getIsDone()!=PlanDayExerciseVO.IS_DONE){
						currentExercise = exerciseVO;
						break;
					}
				}
			} 
			
			//都做过，直接做第一道题
			//从听力里找一个
			if(currentExercise==null && listeningList.size()>0){
				currentExercise = listeningList.get(0);
			}
			
			//从口语里找一个
			if(currentExercise==null && speakingList.size()>0){
				currentExercise = speakingList.get(0); 
			} 
			
			//从阅读里找一个
			if(currentExercise==null && readingList.size()>0){
				currentExercise = readingList.get(0);
			} 
			
			//从写作里找一个
			if(currentExercise==null && writingList.size()>0){
				currentExercise = writingList.get(0); 
			} 
			
			if(currentExercise==null)
				return "500";
			else{ 
				//if(currentExercise.getModuleId()!=25 && currentExercise.getModuleId()!=26 && currentExercise.getModuleId()!=27 && currentExercise.getModuleId()!=28)
				currentExercise.setIsDoing(1);
			}
			if(StringUtils.isBlank(result)){
				if(currentExercise.getIsDone()>0){
					result = "1";
				}
			}

			int currentindex=exercises.indexOf(currentExercise);
			if(currentindex<(exercises.size()-1)){
				nextExercise = exercises.get(currentindex+1);
			}
			
			Object learnplan_show_tip =  UniverseSession.getAttribute("learnplan_show_tip");
			boolean show_tip = true;
			if(learnplan_show_tip!=null){
				show_tip = false;
			}else{
				UniverseSession.setAttribute("learnplan_show_tip", "show");
			}
			
			String token = ApiClient.getUserOrAppToken(request); 
			boolean islogin;
			if(user == null || user.getId() <= 0){ 
				islogin = false;
			}else{
				islogin = true;
				model.addAttribute("userId",user.getId());
			}
			int moduleID = currentExercise.getModuleId();
			//口语练习特殊
			if(moduleID == 21){
				String groupId = ""+currentExercise.getLevelOne();
				SpokensVO spokensVO = planService.getEcerciseSpoken(groupId,request);
				if(spokensVO==null){
					return "500";
				}
				List<SpokenVO> spokens = spokensVO.getResult();
				String groupName = spokensVO.getGroupName();
				model.addAttribute("groupName", groupName);
				model.addAttribute("spokens", spokens); 
				model.addAttribute("groupId",groupId);
			}
			
			//翻译
			if(moduleID == 20){ 
				String groupId = ""+currentExercise.getLevelOne();
				TranslatesVO translatesVO = planService.getEcerciseTranslate(groupId,request);
				if(translatesVO==null){
					return "500";
				}
				
				List<TranslateVO> translates =  translatesVO.getResult();

				String groupName = translatesVO.getGroupName();

				model.addAttribute("groupName", groupName);
				model.addAttribute("translates", translates);
				model.addAttribute("token", token);
				model.addAttribute("groupUnitId", groupId); 
			}
			
			
			//单词
			if(moduleID == 29){ 
				String groupId = ""+currentExercise.getLevelOne();

				int page_v = (page==null?1:Integer.valueOf(page));
				int page_size_v = (page_size==null?WORD_PAGE_SIZE:Integer.valueOf(page_size));

				WordQuestionsVO wordsVO = exerciseService.getWordQuestion(request, groupId, page_v, page_size_v);
				WordQuestionsVO wordsAll = exerciseService.getWordQuestion(request, groupId, 0, 0);
				model.addAttribute("words", wordsVO.getRows());  
				model.addAttribute("wordTotal", wordsVO.getTotal());  
				model.addAttribute("wordDataList", JsonUtil.beanToJson(wordsAll.getRows()));
				YzPagingInfo paddingInfo = new YzPagingInfo(request,wordsVO.getTotal(),page_size_v);
				model.addAttribute("paddingInfo",paddingInfo);
				
				if(wordsVO==null){
					return "500";
				}
			}
			
			//精听
			if(moduleID == 30){ 
				String questionId = ""+currentExercise.getLevelOne();
 
				IntensiveListeningQuestionVO questionVO = exerciseService.getIntensiveListenQuestion(request, questionId); 
				if(questionVO==null){
					return "500";
				}
				 
				List<IntensiveListeningQuestionSentenceVO> sentenceList = new ArrayList<IntensiveListeningQuestionSentenceVO>();
				for(IntensiveListeningQuestionParagraphVO paragrah:questionVO.getParagraphList()){
					if(paragrah.getSentenceList()!=null && paragrah.getSentenceList().size()>0){
						sentenceList.addAll(paragrah.getSentenceList());
						for(IntensiveListeningQuestionSentenceVO sentence:paragrah.getSentenceList()){
							sentence.initWordList();
						}
					}
					
					
				}
				model.addAttribute("audio_url", questionVO.getAudioUrl());  
				model.addAttribute("paragraphList", questionVO.getParagraphList());  
				model.addAttribute("sentenceList", JsonUtil.beanToJson(sentenceList));  
				
			}
			//默写 （新的记忆复写）
			if(moduleID == 33){ 
				String groupId = ""+currentExercise.getLevelOne();
				NewTranslatesVO translatesVO = planService.getNewTranslate(groupId,request);
				if(translatesVO==null){
					return "500";
				}
				
				List<NewTranslateVO> translates =  translatesVO.getResult();

				String groupName = translatesVO.getGroupName();

				model.addAttribute("newTranslatesData", JsonUtil.beanToJson(translatesVO)); 
				model.addAttribute("translatesVO", translatesVO);
				model.addAttribute("groupName", groupName);
				model.addAttribute("translates", translates);
				model.addAttribute("token", token);
				model.addAttribute("groupUnitId", groupId); 
			}
			//课前预习
			if(moduleID == 34){ 
				String groupId = ""+currentExercise.getLevelOne();
				PreparationVO preparationVO = planService.getExercisePreview(groupId,request);
				if(preparationVO==null){
					return "500";
				}
				
				
				model.addAttribute("id", preparationVO.getId());
				model.addAttribute("groupName", preparationVO.getName());
				model.addAttribute("content", preparationVO.getContent());
				model.addAttribute("token", token);
				model.addAttribute("groupUnitId", groupId); 
			}
			
			//长难句
			if(moduleID == 35){ 
				String groupId = ""+currentExercise.getLevelOne();
				DifficultSentenceGroupVO vo = planService.getExerciseDifficultSentence(groupId,request);
				if(vo==null){
					return "500";
				}  
				int hasTip = 0;
				if(user!=null){
					hasTip = planService.getMaker( user.getId());
				}
				model.addAttribute("hasTip", hasTip); 
				model.addAttribute("groupQuestion", JsonUtil.beanToJson(vo)); 
			}
			//下边这两行谁加的！！！！！！谁取消注释，拉出去日1000遍
//			model.addAttribute("dayid",dayid);
//			model.addAttribute("exerciseid", exerciseid);
			model.addAttribute("islogin",islogin);
			model.addAttribute("app_down_url",APP_DOWNLOAD_URL);
			model.addAttribute("doneCount",doneCount);
			model.addAttribute("totalCount",totalCount);
			model.addAttribute("result",result);
			model.addAttribute("token", token);
			model.addAttribute("show_tip", show_tip);
			model.addAttribute("currentExercise", currentExercise); 
			model.addAttribute("nextExercise", nextExercise);
			model.addAttribute("readingTime", readingTime);
			model.addAttribute("listeningTime", listeningTime);
			model.addAttribute("speakingTime", speakingTime);
			model.addAttribute("writingTime", writingTime);
			model.addAttribute("prepTime", prepTime);
			model.addAttribute("readingList", readingList);
			model.addAttribute("listeningList", listeningList);
			model.addAttribute("speakingList", speakingList);
			model.addAttribute("writingList", writingList);
			model.addAttribute("prepList", prepList); 
	        model.addAttribute("planid", dayDetailVO.getPlanId());
	        model.addAttribute("kindExercises", planDayExerciseKindResultList);
			model.addAttribute("dayInfo",dayDetailVO);
			model.addAttribute("apiUrl",PlanService.PLAN_API_URL); 
			
		}catch(Exception e){
			e.getStackTrace();
			logger.debug( e.getStackTrace().toString()); 
		} 
		return "learnplan/plan_exercise";
	}
	

@RequestMapping(value = "/exercise/spoken", method = RequestMethod.GET)
	public String exercisepoken(Model model,HttpServletRequest request, String groupId) {
		 
		try {
			SpokensVO spokensVO = planService.getEcerciseSpoken(groupId,request);
			if(spokensVO==null){
				return "500";
			}
			List<SpokenVO> spokens = spokensVO.getResult();
			String groupName = spokensVO.getGroupName();
			model.addAttribute("groupName", groupName);
			model.addAttribute("spokens", spokens); 
			model.addAttribute("groupId",groupId);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getMessage());
		}

		return "learnplan/plan_exercise_spoken";
	}

	
	@RequestMapping(value="/plan/answer/spoken", method=RequestMethod.POST)
	@ResponseBody
	public Object saveSpokenAnswer(HttpServletResponse response, HttpServletRequest request,String info) {
		JSONObject json = new JSONObject();
		 
		if(StringUtils.isBlank(info)) {
			json.put("code", 1);
			json.put("message", "参数错误");
			return json;
		}
		/**
		 * info的值
		 *  {"customExerciseId":8888 ,"groupId":13 ,
		 *  "results":[
		 *  {"answer":"I am teacher,you are student,so you must listen to me","questionId":"126","groupId":"13"} ,
		 *  {"answer":"I am teacher,you are student,so you must listen to me","questionId":"127","groupId":"13"} ,
		 *  {"answer":"I am teacher,you are student,so you must listen to me","questionId":"128","groupId":"13"} ,
		 *  {"answer":"I am teacher,you are student,so you must listen to me","questionId":"129","groupId":"13"} ,
		 *  {"answer":"I am teacher,you are student,so you must listen to me","questionId":"130","groupId":"13"} ,
		 *  {"answer":"I am teacher,you are student,so you must listen to me","questionId":"131","groupId":"13"} ,
		 *  {"answer":"I am teacher,you are student,so you must listen to me","questionId":"132","groupId":"13"} ,
		 *  {"answer":"I am teacher,you are student,so you must listen to me","questionId":"133","groupId":"13"} ,
		 *  {"answer":"I am teacher,you are student,so you must listen to me","questionId":"134","groupId":"13"}
		 *  ]}
		 */
		try {
//			org.apache.commons.httpclient.HttpClient client = new org.apache.commons.httpclient.HttpClient();
//			org.apache.commons.httpclient.methods.PostMethod postMethod = new org.apache.commons.httpclient.methods.PostMethod(Contant.SAVE_SPOKEN_ANSWER_URL);
//			postMethod.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8"); 
//			postMethod.setRequestHeader("token", token); 
//			postMethod.setRequestHeader("fromType", "web"); 
//			postMethod.setRequestHeader("systemId", "1");
 
			String body =  info.replaceAll("\\\\","");
			return planService.saveEcerciseSpokenResult(body, request);
		} catch(Exception ex) {
			ex.printStackTrace();
			logger.error(ex.getMessage());
			json.put("code", 1);
			json.put("message", "系统错误");
		}
		return "";
	}
	
	
	@RequestMapping(value="/plan/answer/translate", method=RequestMethod.POST)
	@ResponseBody
	public Object saveTranslateAnswer(HttpServletResponse response, HttpServletRequest request,String info) {
		JSONObject json = new JSONObject();
		 
		if(StringUtils.isBlank(info)) {
			json.put("code", 1);
			json.put("message", "参数错误");
			return json;
		}
		/**
		 * info的值
		 *  {"customExerciseId":8888 ,"groupId":13 ,
		 *  "results":[
		 *  {"answer":"I am teacher,you are student,so you must listen to me","questionId":"126","groupId":"13"} ,
		 *  {"answer":"I am teacher,you are student,so you must listen to me","questionId":"127","groupId":"13"} ,
		 *  {"answer":"I am teacher,you are student,so you must listen to me","questionId":"128","groupId":"13"} ,
		 *  {"answer":"I am teacher,you are student,so you must listen to me","questionId":"129","groupId":"13"} ,
		 *  {"answer":"I am teacher,you are student,so you must listen to me","questionId":"130","groupId":"13"} ,
		 *  {"answer":"I am teacher,you are student,so you must listen to me","questionId":"131","groupId":"13"} ,
		 *  {"answer":"I am teacher,you are student,so you must listen to me","questionId":"132","groupId":"13"} ,
		 *  {"answer":"I am teacher,you are student,so you must listen to me","questionId":"133","groupId":"13"} ,
		 *  {"answer":"I am teacher,you are student,so you must listen to me","questionId":"134","groupId":"13"}
		 *  ]}
		 */
		try {
//			org.apache.commons.httpclient.HttpClient client = new org.apache.commons.httpclient.HttpClient();
//			org.apache.commons.httpclient.methods.PostMethod postMethod = new org.apache.commons.httpclient.methods.PostMethod(Contant.SAVE_SPOKEN_ANSWER_URL);
//			postMethod.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8"); 
//			postMethod.setRequestHeader("token", token); 
//			postMethod.setRequestHeader("fromType", "web"); 
//			postMethod.setRequestHeader("systemId", "1");
 
			String body =  info.replaceAll("\\\\","");
			return planService.saveEcerciseTranslateResult(body, request);
		} catch(Exception ex) {
			ex.printStackTrace();
			logger.error(ex.getMessage());
			json.put("code", 1);
			json.put("message", "系统错误");
		}
		return "";
	}
	
	@ResponseBody
	@RequestMapping(value="/plan/proxy",method=RequestMethod.POST,consumes = {MediaType.ALL_VALUE})
	public Object planProxyPost(HttpServletRequest request,HttpServletResponse response,Model model,@RequestParam Map<String,String> param){
		try{  
			Map<String, Object> data = new HashMap<String, Object>();
			// ApiClient.post(url, params, headers, request, ApiClient.FORMAT_DEFAULT);
			Map<String, String[]> params = request.getParameterMap();  
			String proxyurl = request.getParameter("proxyurl");
			if(StringUtils.isBlank(proxyurl)){ 
				response.setStatus(HttpServletResponse.SC_BAD_REQUEST); 
				data.put("message", "地址不正确");
				return data;
			} 
			//String url = urlBuffer.toString();
			String apiUrl = proxyurl;
			 
			Map<String ,String> headers = PlanService.getHeaders(); 
			ResponseData responseData = ApiClient.post(apiUrl, param,headers,request,ApiClient.FORMAT_DEFAULT);
			response.setStatus(responseData.getCode());
			String str = responseData.getBackData(); 
			System.out.println(str);
			try{ 
				Object jsonNode = JSONObject.parse(str);
		        
		        return jsonNode;
			}catch(Exception e){ 
				return str;
			}  
		}catch(Exception e){ 
			e.printStackTrace();
		}  
		return "";
	}
	
	@ResponseBody
	@RequestMapping(value="/plan/proxy",method=RequestMethod.POST,consumes = {MediaType.APPLICATION_JSON_UTF8_VALUE})
	public Object planProxyPostJson(HttpServletRequest request,HttpServletResponse response,Model model){
		try{  
			Map<String, Object> data = new HashMap<String, Object>();
			// ApiClient.post(url, params, headers, request, ApiClient.FORMAT_DEFAULT);
			Map<String, String[]> params = request.getParameterMap();  
			String proxyurl = request.getParameter("proxyurl");
			if(StringUtils.isBlank(proxyurl)){ 
				response.setStatus(HttpServletResponse.SC_BAD_REQUEST); 
				data.put("message", "地址不正确");
				return data;
			}
			String queryString = "";  
			for (String key : params.keySet()) {  
				if(key.equals("proxyurl")){
					continue;
				}
				String[] values = params.get(key);  
				for (int i = 0; i < values.length; i++) {  
					String value = values[i];  
					queryString += key + "=" + value + "&";  
				}  
			}  
			// 去掉最后一个字符
			if(!StringUtils.isBlank(queryString)){ 
				queryString = queryString.substring(0, queryString.length() - 1);
			}
			
			StringBuffer urlBuffer = request.getRequestURL();
			//String url = urlBuffer.toString();
			String apiUrl = proxyurl;
			
			if(!StringUtils.isBlank(queryString)){ 
				apiUrl = apiUrl+ "?" + queryString;
			}

			String body = LearnplanUtil.readReauestBodyString(request);
			Map<String ,String> headers = PlanService.getHeaders(); 
			ResponseData responseData = ApiClient.postJsonData(apiUrl, body,headers,request,ApiClient.FORMAT_DEFAULT);
			response.setStatus(responseData.getCode());
			String str = responseData.getBackData(); 
			System.out.println(str);
			try{ 
				Object jsonNode = JSONObject.parse(str);
		        
		        return jsonNode;
			}catch(Exception e){ 
				return str;
			}  
		}catch(Exception e){ 
			e.printStackTrace();
		}  
		return "";
	}
	
	@ResponseBody
	@RequestMapping(value="/exercises/speak/answer",method=RequestMethod.POST)
	public Object planProxyPostFile(HttpServletRequest request,HttpServletResponse response,Model model,@RequestParam(value = "content")  MultipartFile[] myfiles){
		try{  
			Map<String, Object> data = new HashMap<String, Object>();
			// ApiClient.post(url, params, headers, request, ApiClient.FORMAT_DEFAULT);
			Map<String, String[]> params = request.getParameterMap();  
			String proxyurl = request.getParameter("proxyurl");
			if(StringUtils.isBlank(proxyurl)){ 
				response.setStatus(HttpServletResponse.SC_BAD_REQUEST); 
				data.put("message", "地址不正确");
				return data;
			}
			String queryString = "";  
			Map<String,Object> dataMap = new HashMap<String,Object>();
			for (String key : params.keySet()) {  
				if(key.equals("proxyurl")){
					continue;
				}
				String[] values = params.get(key);  
				if(values.length<=0)
					continue;
				
				if(values.length>1){
					ArrayList<String> arr = new ArrayList<String>();
					for (int i = 0; i < values.length; i++) {  
						String value = values[i];  
						arr.add(value);
					}  
					dataMap.put(key, arr);
				}else{ 
					String value = values[0];  
					dataMap.put(key, value);
				}
				
			}  
			
			// 去掉最后一个字符
			if(!StringUtils.isBlank(queryString)){ 
				queryString = queryString.substring(0, queryString.length() - 1);
			}
			
			StringBuffer urlBuffer = request.getRequestURL();
			//String url = urlBuffer.toString();
			String apiUrl = proxyurl;
			
			if(!StringUtils.isBlank(queryString)){ 
				apiUrl = apiUrl+ "?" + queryString;
			}
			String fileName="";
			if(myfiles!=null && myfiles.length>0){

				MultipartFile mf = myfiles[0];

				byte[] fileByte = readInputStream(mf.getInputStream());
				fileName = UploadAuidoUtil.uploadFile(fileByte, "mp3");
			}
			dataMap.put("audio_url", fileName);
			dataMap.put("content", fileName);
			String body = JsonUtil.beanToJson(dataMap);
			Map<String ,String> headers = PlanService.getHeaders(); 
			ResponseData responseData = ApiClient.postJsonData(apiUrl, body,headers,request,ApiClient.FORMAT_DEFAULT);
			response.setStatus(responseData.getCode());
			String str = responseData.getBackData(); 
			System.out.println(str);
			try{ 
				Object jsonNode = JSONObject.parse(str);
		        
		        return jsonNode;
			}catch(Exception e){ 
				return str;
			}  
		}catch(Exception e){ 
			e.printStackTrace();
		}  
		return "";
	}
	
	@RequestMapping(value="/plan/proxy",method=RequestMethod.GET)
	@ResponseBody
	public Object planProxyGet(HttpServletRequest request,HttpServletResponse response,Model model){
		try{  

			Map<String, Object> data = new HashMap<String, Object>();
			// ApiClient.post(url, params, headers, request, ApiClient.FORMAT_DEFAULT);
			Map<String, String[]> params = request.getParameterMap();  
			String proxyurl = request.getParameter("proxyurl");
			if(StringUtils.isBlank(proxyurl)){ 
				response.setStatus(HttpServletResponse.SC_BAD_REQUEST); 
				data.put("message", "地址不正确");
				return data;
			}
			String queryString = "";  
			System.out.println(params.keySet());
			for (String key : params.keySet()) {  
				if(key.equals("proxyurl")){
					continue;
				}
				String[] values = params.get(key);  
				for (int i = 0; i < values.length; i++) {  
					String value = values[i];  
					queryString += key + "=" + value + "&";  
				}  
			}  
			// 去掉最后一个字符
			if(!StringUtils.isBlank(queryString)){ 
				queryString = queryString.substring(0, queryString.length() - 1);
			}
			
			StringBuffer urlBuffer = request.getRequestURL();
			String url = urlBuffer.toString();
			String apiUrl = proxyurl;
			
			if(!StringUtils.isBlank(queryString)){ 
				apiUrl = apiUrl+ (proxyurl.indexOf("?")>0?"&":"?") + queryString;
			}
			Map<String ,String> headers = PlanService.getHeaders(); 
			ResponseData responseData = ApiClient.getData(apiUrl, headers,request,ApiClient.FORMAT_DEFAULT);
			response.setStatus(responseData.getCode());
			String str = responseData.getBackData();  
			try{ 
				Object jsonNode = JSONObject.parse(str);
		        return jsonNode;
			}catch(Exception e){ 
				return str;
			}  
		}catch(Exception e){ 
			
		}  
		return "";
	}
	@RequestMapping(value="/plan/proxy",method=RequestMethod.DELETE)
	@ResponseBody
	public Object planProxyDelete(HttpServletRequest request,HttpServletResponse response,Model model){
		try{  
			
			Map<String, Object> data = new HashMap<String, Object>();
			// ApiClient.post(url, params, headers, request, ApiClient.FORMAT_DEFAULT);
			Map<String, String[]> params = request.getParameterMap();  
			String proxyurl = request.getParameter("proxyurl");
			if(StringUtils.isBlank(proxyurl)){ 
				response.setStatus(HttpServletResponse.SC_BAD_REQUEST); 
				data.put("message", "地址不正确");
				return data;
			}
			String queryString = "";  
			System.out.println(params.keySet());
			for (String key : params.keySet()) {  
				if(key.equals("proxyurl")){
					continue;
				}
				String[] values = params.get(key);  
				for (int i = 0; i < values.length; i++) {  
					String value = values[i];  
					queryString += key + "=" + value + "&";  
				}  
			}  
			// 去掉最后一个字符
			if(!StringUtils.isBlank(queryString)){ 
				queryString = queryString.substring(0, queryString.length() - 1);
			}
			
			StringBuffer urlBuffer = request.getRequestURL();
			String url = urlBuffer.toString();
			String apiUrl = proxyurl;
			
			if(!StringUtils.isBlank(queryString)){ 
				apiUrl = apiUrl+ (proxyurl.indexOf("?")>0?"&":"?") + queryString;
			}
			Map<String ,String> headers = PlanService.getHeaders(); 
			ResponseData responseData = ApiClient.delete(apiUrl, headers,request,ApiClient.FORMAT_DEFAULT);
			response.setStatus(responseData.getCode());
			String str = responseData.getBackData();  
			try{ 
				net.sf.json.JSONObject jsonNode =  JsonUtil.jsonToObject(str);
				
				return jsonNode;
			}catch(Exception e){ 
				return str;
			}  
		}catch(Exception e){ 
			e.printStackTrace();
		}  
		return "";
	}
	
	@RequestMapping(value="/plan/user/experience")
	public String planExperience(HttpServletRequest request,Model model,String planid,@UserVo UserVO user){
		try{
			if(!BigDecimalUtils.isNumber(planid)){ 
				model.addAttribute("message", "计划不存在,请重新购买！");
				return "forward:/plans";
			} 

			boolean succ = planService.experiencePlan(request, Integer.valueOf(planid));

			if(!succ){
				model.addAttribute("message", "开通免费体验失败，请稍后重试");
			}
			return "forward:/plans/"+planid;
		}catch(Exception e){
			e.getStackTrace();
			logger.debug( e.getStackTrace().toString()); 
		} 
		return "forward:/plans/"+planid;
	}

	@RequestMapping(value="/plan/user/buy") 
	public String planBuy(HttpServletRequest request,Model model,String planid,@UserVo UserVO user){
		try{
			if(!BigDecimalUtils.isNumber(planid)){ 
				model.addAttribute("message", "计划不存在,请重新购买！");
				return "forward:/plans";
			} 
			
			PlanDetailVO planDetail = planService.getPlanDetail(request,planid); 
			int userBuyStatus = 0;
			if(planDetail!=null){
				PlanUserStatisticVO statistic = planDetail.getUserStatitic(); 
				if(statistic!=null){
					userBuyStatus = statistic.getUserStatus();
				}
			}
			if(userBuyStatus==1){
				return "redirect:/plans/"+planid;
			}
			String back = planService.buyPlan(request, Integer.valueOf(planid));

			return "redirect:"+back+"&categoryType=3";
		}catch(Exception e){
			e.printStackTrace();
			e.getStackTrace();
			logger.debug( e.getStackTrace().toString()); 
		} 
		return "500";
	}

	@RequestMapping(value="/plan/user/delete") 
	public String planDelete(HttpServletRequest request,Model model,String planid,@UserVo UserVO user){
		try{
			if(!BigDecimalUtils.isNumber(planid)){ 
				model.addAttribute("message", "计划不存在,请重新购买！");
				return "forward:/plans";
			} 

			boolean back = planService.deletePlan(request, Integer.valueOf(planid));

		}catch(Exception e){
			e.getStackTrace();
			logger.debug( e.getStackTrace().toString()); 
		} 
		return "redirect:/personal/plans";
	}
	@RequestMapping(value="/personal/plans") 
	public String planUser(HttpServletRequest request,Model model,Integer page_size,Integer page,@UserVo UserVO user){

		if(page_size==null){
			page_size = YzPagingInfo.PAGE_SIZE_DEFAULT;
		}

		if(page==null){
			page = 1;
		}
		CustomPlansVO plans = planService.getAllMyPlan(request,page_size, page,null); 
		int total = 0;
		if(plans!=null){
			List<MyPlanVO> myplans = new ArrayList<MyPlanVO>();
			if(plans.getRows()!=null){

				for(CustomPlanVO cVO:plans.getRows()){
					MyPlanVO myplanVO = new MyPlanVO();
					myplanVO.setId(""+cVO.getId());
					myplanVO.setPlanId(cVO.getPlanId());
					myplanVO.setName(cVO.getName());  
					//myplanVO.setDone(cVO.getHasDone()==1); 
					myplanVO.setIsPay(cVO.getIsPay());
					myplanVO.setLocalPrice(cVO.getLocalPrice());
					myplanVO.setListImage(cVO.getImageWebList());
					myplanVO.setUserStatus(cVO.getStatus());
					
					PlanUserStatisticVO userStatitic = cVO.getUserStatitic();
					PlanDayDefaultVisitVO visitVO = null;
					if(userStatitic!=null){
						visitVO = userStatitic.getPlanDayDefaultVisitVO();
					}
					if(visitVO!=null){ 
						myplanVO.setCurrentDayNumber(visitVO.getLastDayNumber());
						myplanVO.setCurrentDayId(""+visitVO.getLastVisitDayId());
						myplanVO.setCurrentDayName(visitVO.getLastDayName());
						myplanVO.setLastDoTimeLong(TimeUtil.timeLongToString(visitVO.getLastTotalTime()/1000));
						
						myplanVO.setLastDoTime(visitVO.getLastPracticeTime());
					}
					//myplanVO.setImageColor(cVO.getImageWebColor());
					//myplanVO.setTotalDay(cVO.getTotalDay());
					//myplanVO.setTotalExercises(cVO.getTotalExercises()); 
					//						PlanUserStatisticVO statistic = cVO.getUserStatitic();
					//						if(statistic!=null){
					//							myplanVO.setHasDoneDay(statistic.getDayCount());
					//							myplanVO.setHasDoneExercises(statistic.getFinishExerciseCount());
					//							myplanVO.setHasDoneTime(TimeUtil.timeLongToString(statistic.getTotalDoneTime()));
					//							
					//							myplanVO.setUserStatus(statistic.getUserStatus());
					//							myplanVO.setExperienceEndTime(statistic.getExperienceEndTime());
					//							myplanVO.setExperienceStartTime(statistic.getExperienceStartTime());
					//							myplanVO.setUseStartTime(statistic.getUseStartTime());
					//							myplanVO.setUseEndTime(statistic.getUseEndTime());
					//						}
					myplans.add(myplanVO);
				}
				total = plans.getTotal();
				model.addAttribute("plans", myplans);
			}  

		}
		YzPagingInfo paddingInfo = new YzPagingInfo(request,total);
		model.addAttribute("paddingInfo",paddingInfo);

		return "/learnplan/plan_user";
	}

	@RequestMapping(value="/plans")
	public String planList(HttpServletRequest request,Model model,Integer page_size,Integer page,String lId,Integer labelId,String newType,String hotType){
		model.addAttribute("planActive", "active");
		try{
			if(page_size==null){
				page_size = YzPagingInfo.PAGE_SIZE_DEFAULT;
			}

			if(page==null){
				page = 1;
			}

			PlanInfosVO plans = planService.getAllPlan(request,page_size, page,labelId,newType,hotType); 
			if(plans!=null){
				model.addAttribute("plans", plans.getRows());  
				YzPagingInfo paddingInfo = new YzPagingInfo(request,plans.getTotal());
				model.addAttribute("paddingInfo",paddingInfo);
				model.addAttribute("labels",plans.getLabels());
			}
			if(StringUtils.isNotBlank(lId)){
				model.addAttribute("lId",lId);
			}else{
				model.addAttribute("lId","0");
			}
			if(StringUtils.isNotBlank(newType)){
				model.addAttribute("newType",newType);
			}
			if(StringUtils.isNotBlank(hotType)){
				model.addAttribute("hotType",hotType);
			}

		}catch(Exception e){
			e.getStackTrace();
			logger.debug( e.getStackTrace().toString()); 
		}
		return "learnplan/plan_list";
	}

	@RequestMapping(value="/plans/{planid}")
	public String planInfo(HttpServletRequest request,Model model,@PathVariable String planid,String buyend){

		try{
			//计划
			PlanDetailVO planDetail = planService.getPlanDetail(request,planid); 
			PlanDetailInfoVO detailVO = new PlanDetailInfoVO();
			boolean useEndTip = false;
			int userBuyStatus = 0;
			if(planDetail!=null){
				TeacherInfo teacher = planDetail.getTeacher();
				PlanUserStatisticVO statistic = planDetail.getUserStatitic();
				detailVO.setId(""+planDetail.getId());
				detailVO.setName(planDetail.getName());
				detailVO.setPlanSummary(planDetail.getPlanSummary());
				detailVO.setLearnPersonsCount(planDetail.getLearnNumber());
				detailVO.setDone(planDetail.getHasDone()==1); 
				detailVO.setIsPay(planDetail.getIsPay());
				detailVO.setBigImage(planDetail.getImageWebDetail());
				detailVO.setImageColor(planDetail.getImageWebColor());
				detailVO.setLocalPrice(planDetail.getLocalPrice());
				detailVO.setUserStatus(planDetail.getPlanStatus());
				detailVO.setIsFollowTime(planDetail.getIsFollowTime());
				detailVO.setDayFollowNumber(planDetail.getDayFollowNumber());
				detailVO.setDefaultFollowDayId(planDetail.getDefaultFollowDayId());
				detailVO.setPlanSummaryShare(planDetail.getPlanSummaryShare());
				detailVO.setIsPublish(planDetail.getIsPublish());
				detailVO.setAudioCourseId(planDetail.getAudioCourseId());
			 
				detailVO.setTotalDay(planDetail.getTotalDay());
				detailVO.setTotalExercises(planDetail.getTotalExercises()); 
				PlanDayDefaultVisitVO visitVO = null;
				HashMap<Integer,PlanDayInfoStatisticVO> dayStatisticMap = new HashMap<Integer,PlanDayInfoStatisticVO>();
				if(statistic!=null){
					userBuyStatus = statistic.getUserStatus();
					detailVO.setHasDoneDay(statistic.getDayCount());
					detailVO.setHasDoneExercises(statistic.getFinishExerciseCount());
					detailVO.setHasDoneTime(TimeUtil.timeLongToString(statistic.getTotalDoneTime()/1000));

					//detailVO.setUserStatus(statistic.getUserStatus());
					detailVO.setExperienceEndTime(statistic.getExperienceEndTime());
					detailVO.setExperienceStartTime(statistic.getExperienceStartTime());
					detailVO.setUseStartTime(statistic.getUseStartTime());
					detailVO.setUseEndTime(statistic.getUseEndTime());
					detailVO.setDelete(statistic.getIsDelete()==1);
					visitVO = statistic.getPlanDayDefaultVisitVO();
					if(detailVO.getUserStatus()==13){
						Date dateNow = new Date(); 
						long tempLong = (detailVO.getUseEndTime().getTime()-dateNow.getTime())/1000/60/60/24;
						if(tempLong<=3){
							useEndTip = true;
						}
					}
					List<PlanDayInfoStatisticVO> dataStatisticList = statistic.getDayStatitic();
					for(PlanDayInfoStatisticVO statisticDayVO:dataStatisticList){
						dayStatisticMap.put(statisticDayVO.getDayId(), statisticDayVO); 
					}
				}
				if(visitVO!=null){ 
					detailVO.setCurrentDayId(""+visitVO.getLastVisitDayId());
					detailVO.setCurrentDayName(visitVO.getLastDayName());
					detailVO.setCurrentDayNumber(visitVO.getLastDayNumber());
					detailVO.setLastDoTime(visitVO.getLastPracticeTime()); 
					detailVO.setCurrentDayNumber(visitVO.getLastDayNumber());
				}
 
				List<PlanDayInfoVO>  planDayInfoList = planDetail.getPlanDays(); 
				List<PlanDayVO>  planDayList1 = new ArrayList<PlanDayVO>();
				List<PlanDayVO>  planDayList2 = new ArrayList<PlanDayVO>();

				Date now = new Date();
				if(planDayInfoList!=null){
					for(PlanDayInfoVO planDay:planDayInfoList){
						PlanDayVO dayVO = new PlanDayVO();
						dayVO.setId(planDay.getDayId());
						dayVO.setDayNumName(LearnplanUtil.getDayNumNmme(planDay.getDayNumber()));
						dayVO.setDayName(planDay.getDayName());
						dayVO.setUnlock(planDay.getLockedNew()==1);
					  
						
						boolean finish = false;
						long doneTime = 0;
						int doneExerciseCount = 0;
						PlanDayInfoStatisticVO dataStatisticVO = dayStatisticMap.get(dayVO.getId());
						if(dataStatisticVO != null){
							doneTime = dataStatisticVO.getHasDoneTime();
							doneExerciseCount = dataStatisticVO.getDoneExerciseCount();
							finish = (dataStatisticVO.getFinish()==1);
						}
						dayVO.setExercisesString(doneExerciseCount + "/" + planDay.getExerciseCount()+"题");

						if(finish){
							dayVO.setIconType(3);	
						}else if(doneExerciseCount>0){
							dayVO.setIconType(2);	
						}else{
							dayVO.setIconType(1);	
						}
						String timeString = TimeUtil.timeLongToString(doneTime/1000) + "/" + TimeUtil.timeLongToString(planDay.getLearnTimeLong()*60);
						dayVO.setTimeString(timeString);
						if(planDetail.getIsFollowTime()==1 && planDay.getLearnDate()!=null && (planDay.getLearnDate().getTime()+86400000)<now.getTime()){
							planDayList1.add(dayVO);
						}else{
							planDayList2.add(dayVO);
						}
						
					}
				}
 
				//直播课
				List<LivelessionVO>  livelessionList = livelessionService.getLivelessionsByProductId(planDetail.getLiveProductId(), 50);
				List<PlanLiveLessionVO> planLivelessionList = new ArrayList<PlanLiveLessionVO>();
				if(livelessionList!=null){
					for(LivelessionVO liveLessionVO:livelessionList){
						PlanLiveLessionVO planLiveLessionVO = new PlanLiveLessionVO();
						planLiveLessionVO.setId(liveLessionVO.getId());
						planLiveLessionVO.setName(LearnplanUtil.getLiveLessionName(liveLessionVO.getCategoryName(), liveLessionVO.getName()));
						planLiveLessionVO.setPlaying(liveLessionVO.getStatus()==2); //状态（1回播，2直播，3今天未开始，4未开始）
						planLiveLessionVO.setStartEndTime(LearnplanUtil.getStartEndTime(liveLessionVO.getStartTime(), liveLessionVO.getEndTime()));
						planLiveLessionVO.setActionName(LearnplanUtil.getActionName(liveLessionVO.getStatus()==null?0:liveLessionVO.getStatus()));
						planLivelessionList.add(planLiveLessionVO);
					}
				}

				//大家都在做
				PlanUsersVO usersVO = planService.getPlanUsers(request,planid); 
				//资料下载
				List<PlanInformationVO> informationList = new ArrayList<PlanInformationVO>();
				List<InformationVO> infoList = planDetail.getInformations();
				if(infoList!=null){
					for(InformationVO infoVO:infoList){
						PlanInformationVO info = new PlanInformationVO();
						info.setInformationId(infoVO.getId());
						info.setIcon(infoVO.getFileContentType());
						info.setName(infoVO.getName());
						info.setPlanId(planDetail.getId());
						info.setUploadData(LearnplanUtil.getDateString(infoVO.getYear(), infoVO.getMonth(), infoVO.getDay()));
						informationList.add(info);
					}
				}

				if(usersVO!=null){
					model.addAttribute("planUsers", usersVO.getResults()); 
				}
				
				String shareValue = "?source=weixin&medium=weixinfriend&campaign="+detailVO.getName()+"计划";
				//判断用户是否登录, 如果没有跳转到登录界面
				UserVO user = (UserVO) UniverseSession.getAttribute("userInfo");
				if(user != null){ 
					shareValue = shareValue + "&campaignContent=uid"+user.getId();
				}
				//是否是购买结束
				if("1".equals(buyend) && userBuyStatus!=1 && userBuyStatus!=5){
					model.addAttribute("isBuyEnd",1);
				}else{
					model.addAttribute("isBuyEnd",0);
				}

				//视频

				List<VideosVO> videoList = new ArrayList<>();
				if(planDetail.getVideosVO()!=null && planDetail.getVideosVO().size()>0){
					for(VideosVO video:planDetail.getVideosVO()){
						videoList.add(video);
						System.out.println(""+video.getCourseId() + " " +video.getLessionId() + " "+ video.getVideoId());
						if(videoList.size()>3){
							break;
						}
					}
				}
				VideoUserStatus videoUserStatus = planDetail.getVideoUserStatus();
				//音频
				List<AudiosVO> audioList = new ArrayList<>();
				if(planDetail.getAudios()!=null && planDetail.getAudios().size()>0){
					for (AudiosVO audio : planDetail.getAudios()) {
						audioList.add(audio);
						if(audioList.size()>3){
							break;
						}
						
					}
				}
                System.out.println(userBuyStatus+"这个状态是怎么回事");
                model.addAttribute("teacher", teacher);
				model.addAttribute("useEndTip", useEndTip);
				model.addAttribute("shareValue",URLEncoder.encode(shareValue,"UTF-8"));
				model.addAttribute("livelessions",planLivelessionList);
				model.addAttribute("plan", detailVO); 
				model.addAttribute("planDayList1", planDayList1);
				model.addAttribute("planDayList2", planDayList2);
				model.addAttribute("informationList", informationList);
				model.addAttribute("videoList", videoList);
                model.addAttribute("audioList", audioList);
                model.addAttribute("audioStatus",userBuyStatus);
				model.addAttribute("videoUserStatus", videoUserStatus);
			}

		}catch(Exception e){
			e.getStackTrace();
			e.printStackTrace();
			logger.debug( e.getStackTrace().toString()); 
		}
		return "learnplan/plan_detail";
	}
	
	
	public static byte[] readInputStream(InputStream inStream) throws Exception {
		ByteArrayOutputStream outStream = new ByteArrayOutputStream();
		// 创建一个Buffer字符串
		byte[] buffer = new byte[1024];
		// 每次读取的字符串长度，如果为-1，代表全部读取完毕
		int len = 0;
		// 使用一个输入流从buffer里把数据读取出来
		while ((len = inStream.read(buffer)) != -1) {
			// 用输出流往buffer里写入数据，中间参数代表从哪个位置开始读，len代表读取的长度
			outStream.write(buffer, 0, len);
		}
		// 关闭输入流
		inStream.close();
		// 把outStream里的数据写入内存
		return outStream.toByteArray();

	}
	@RequestMapping(value="/course/audio/{planId}")
	public String planInfoAudio(HttpServletRequest request,Model model,@PathVariable String planId,Integer audioId){
		//计划
		PlanDetailVO planDetail = planService.getPlanDetail(request,planId); 
		PlanDetailInfoVO detailVO = new PlanDetailInfoVO();
		int userBuyStatus = 0;
		if(planDetail!=null){
			PlanUserStatisticVO statistic = planDetail.getUserStatitic();
			detailVO.setId(""+planDetail.getId());
			detailVO.setName(planDetail.getName());
			detailVO.setIsPay(planDetail.getIsPay());
			detailVO.setAudioCourseId(planDetail.getAudioCourseId());
			if(statistic!=null){
				userBuyStatus = statistic.getUserStatus();
			}
		}
		//音频
		if(planDetail.getAudios()!=null && planDetail.getAudios().size()>0){
			List<AudiosVO> audioList = planDetail.getAudios();
			model.addAttribute("audioList", audioList);
		}
		if(audioId==null){
			audioId=0;
		}
		model.addAttribute("audioId", audioId);
		model.addAttribute("plan", detailVO);
		model.addAttribute("audioStatus", userBuyStatus);
		return "learnplan/audio_course";
		
	
   }
}
