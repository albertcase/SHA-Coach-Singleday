<?php
namespace CoachBundle;

use Core\Controller;


class ApiController extends Controller {

	public function testAction() {
		set_time_limit(0);
		$userapi = new \Lib\RedpacketAPI();
		$DatabaseAPI = new \Lib\DatabaseAPI();
		$rs = $DatabaseAPI->findUserOverRedpacket();
		echo "<pre>";
		for ($i = 0; $i < count($rs); $i++) {
			var_dump($userapi->sendredpack($rs[$i]['openid']));
		}		
		exit;		
	}

	public function oauthAction() {
		$request = $this->Request();
		$fields = array(
			'callback' => array('url', '3')
		);
		$request->validation($fields);
		$url = $request->query->get('callback');
		$_SESSION['redirect_url'] = $url;
		$WechatAPI = new \Lib\WechatAPI();
		$WechatAPI->wechatAuthorize();
		exit;
	}

	public function callbackAction() {
		$request = $this->Request();
		$fields = array(
			'openid' => array('notnull', '3')
		);
		$request->validation($fields);
		$openid = $request->query->get('openid');
		$userapi = new \Lib\UserAPI();
		$userapi->userLogin($openid);
		$url = isset($_COOKIE['redirect_url']) ? $_COOKIE['redirect_url'] : "/";
		$this->redirect($url);
		exit;
	}

	public function getdataAction() {
		$data = $GLOBALS['HTTP_RAW_POST_DATA'];	
		$data = json_decode($data, true);
		$databaseapi = new \Lib\DatabaseAPI();
		$databaseapi->regUser($data['data']['openid'], $data['data']['nickname'], $data['data']['headimgurl']);
		$databaseapi->coachLog($GLOBALS['HTTP_RAW_POST_DATA']);
		exit;
	}

	public function isloginAction() {
		$UserAPI = new \Lib\UserAPI();
		$user = $UserAPI->userLoad(true);
		if (!$user) {
			return $this->statusPrint(0, '未登录');
		}
		$databaseapi = new \Lib\DatabaseAPI();
		$rs = $databaseapi->getCardLog($user);
		return $this->dataPrint(array("status"=>1, "msg" => $rs));
	}

	public function savecardAction() {
		$UserAPI = new \Lib\UserAPI();
		$user = $UserAPI->userLoad(true);
		if (!$user) {
			return $this->statusPrint(0, '未登录');
		}
		$number = rand(1,2);
		$card = $number*111;
		$databaseapi = new \Lib\DatabaseAPI();	
		$databaseapi->saveCard($user, $card);
		return $this->statusPrint(1, $card);
	}

	public function shareAction() {
		$UserAPI = new \Lib\UserAPI();
		$user = $UserAPI->userLoad(true);
		if (!$user) {
			return $this->statusPrint(0, '未登录');
		}
		$databaseapi = new \Lib\DatabaseAPI();
		$databaseapi->shareLog($user);
		return $this->statusPrint(1, '分享成功');
	}

	public function cardAction() {
		$wechatapi = new \Lib\WechatAPI();
		$list = $wechatapi->cardList();
		return $this->statusPrint(1, $list);
	}
}
