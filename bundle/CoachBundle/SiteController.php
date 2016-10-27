<?php
namespace CoachBundle;

use Core\Controller;


class SiteController extends Controller {

	public function indexAction() {	
		$UserAPI = new \Lib\UserAPI();
		$user = $UserAPI->userLoad(true);
		if (!$user) {
			$parameterAry = $_GET;
			if(count($parameterAry)>0)
				$url = "/?".http_build_query($parameterAry);
			else
				$url = "/";
			setcookie('redirect_url', $url, time()+3600);
			$_COOKIE['redirect_url'] = $url;
			$WechatAPI = new \Lib\WechatAPI();
			$WechatAPI->wechatAuthorize();
		}
		$wechatapi = new \Lib\WechatAPI();
		$rs = $wechatapi->isSubscribed($_COOKIE['user_openid']); 
		if ($rs) {
			$this->redirect('/member');
			exit;
		}
		$this->render('qrcode');
		exit;
	}

	public function memberAction() {
		$UserAPI = new \Lib\UserAPI();
		$user = $UserAPI->userLoad(true);
		if (!$user) {
			$parameterAry = $_GET;
			if(count($parameterAry)>0)
				$url = "/member?".http_build_query($parameterAry);
			else
				$url = "/member";
			setcookie('redirect_url', $url, time()+3600);
			$_COOKIE['redirect_url'] = $url;
			$WechatAPI = new \Lib\WechatAPI();
			$WechatAPI->wechatAuthorize();
		}
		$this->render('index');
		exit;
	}

	public function cookieAction() {
		setcookie('user_id', '');
		unset($_COOKIE['user_id']);
		setcookie('user_openid', '');
		unset($_COOKIE['user_openid']);
		setcookie('user_card', '');
		unset($_COOKIE['user_card']);
		echo 'cookie unset';
		exit;
	}

}
