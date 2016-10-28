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
		if (isset($_COOKIE['user_card'])) {
			return $this->statusPrint(1, $_COOKIE['user_card']);
		}
		$databaseapi = new \Lib\DatabaseAPI();
		$rs = $databaseapi->getsharelog($user);
		if ($rs) {
			return $this->dataPrint(array("status"=>1, "msg" => '333'));
		}
		$rs = $databaseapi->getCardLog($user);
		return $this->dataPrint(array("status"=>1, "msg" => $rs));
	}

	public function savecardAction() {
		if (isset($_COOKIE['user_card'])) {
			return $this->statusPrint(1, $_COOKIE['user_card']);
		}
		$UserAPI = new \Lib\UserAPI();
		$user = $UserAPI->userLoad(true);
		if (!$user) {
			return $this->statusPrint(0, '未登录');
		}
		// $number = rand(1,2);
		// $card = $number*111;
		$request = $this->Request();
		$fields = array(
			'card' => array('notnull', '3')
		);
		$request->validation($fields);
		$card = $request->request->get('card');

		$databaseapi = new \Lib\DatabaseAPI();	
		$rs = $databaseapi->saveCard($user, $card);
		setcookie('user_card', $rs, time()+3600*24*365);
		$_COOKIE['user_card'] = $rs;
		return $this->statusPrint(1, $rs);
	}

	public function shareAction() {
		$UserAPI = new \Lib\UserAPI();
		$user = $UserAPI->userLoad(true);
		if (!$user) {
			return $this->statusPrint(0, '未登录');
		}
		$databaseapi = new \Lib\DatabaseAPI();
		$databaseapi->shareLog($user);
		setcookie('user_card', 333, time()+3600*24*365);
		$_COOKIE['user_card'] = 333;
		return $this->statusPrint(1, '分享成功');
	}

	public function cardAction() {
		$wechatapi = new \Lib\WechatAPI();
		$list = $wechatapi->cardList();
		return $this->statusPrint(1, $list);
	}
}
