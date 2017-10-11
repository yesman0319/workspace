/**
 * 
 */
package microcourse;

import java.util.Map;

import com.xiaoma.universe.common.api.ApiClient;
import com.xiaoma.universe.common.api.JsonUtil;
import com.xiaoma.universe.common.utils.ResponseData;
import com.xiaoma.universe.microcourse.domain.vo.MicroArticleDetailVO;

/**
 * @author xiaoma
 *
 */
public class jsonTest {

	/**
	 * @param args void
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		try {
			MicroArticleDetailVO VO  = (MicroArticleDetailVO) JsonUtil.jsonToBean("{\"message\":\"aaaa\"}", MicroArticleDetailVO.class);
			System.out.println("aaaaaaa");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	
	}

}
