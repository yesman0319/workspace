package com.xiaoma.universe.wordschallenge.controller;

import java.util.Collection;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xiaoma.universe.wordschallenge.model.WordsChallengeShares;
import com.xiaoma.universe.wordschallenge.service.WordsChanllengeService;


/**
 * 用户登录
 * 
 * @ClassName: LoginController
 * @Description: TODO
 * @author langjun
 * @date 2016年6月28日 下午5:59:56
 *
 */
@Controller
@RequestMapping("/wordschallenge")
public class WordschallengeController {
	private static final Logger logger = LoggerFactory.getLogger(WordschallengeController.class);
	@Autowired
	private WordsChanllengeService wordsChanllengeService;
	
	@RequestMapping("/h5/getShareUrl")
	@ResponseBody
	public String getShareUrl(HttpServletRequest request, HttpServletResponse response,Model model) {
		WordsChallengeShares wordsChallengeShares = wordsChanllengeService.getShareUrl(request);
		return wordsChallengeShares.getUserUrl();
	}
	
	@RequestMapping("/h5/getShareUrl/{groupId}/{userId}")
	@ResponseBody
	public String getShareUrl(HttpServletRequest request, HttpServletResponse response,Model model,@PathVariable("groupId") Integer groupId,@PathVariable("userId") Integer userId) {
		String headers= request.getHeader("Authorization");
		WordsChallengeShares wordsChallengeShares = wordsChanllengeService.getShareUrl(request,groupId,userId);
		return wordsChallengeShares.getUserUrl();
	}
}