<?php
namespace Lib;

class DatabaseAPI extends Base {

	private $db;

	public function __construct() {
		$connect = new \mysqli(DBHOST, DBUSER, DBPASS, DBNAME);
		$this->db = $connect;
		$this->db->query("set names utf8");
	}

	public function insertCurio($result) {
		$sql = "INSERT INTO `curio_result` SET `result` = ?";
		$res = $this->db->prepare($sql); 
		$res->bind_param("s", $result);
		if ($res->execute()) {
			return TRUE;
		} else {
			return FALSE;
		}
	}

	public function insertUser($openid) {
		$user = $this->findUserByOpenid($openid);
		if ($user) {
			return $user;
		}
		$sql = "INSERT INTO `coach_info` SET `openid` = ?";
		$res = $this->db->prepare($sql); 
		$res->bind_param("s", $openid);
		if ($res->execute()) {
			return $this->findUserByOpenid($openid);
		} else {
			return FALSE;
		}
	}

	public function findUserByOpenid($openid) {
		if (isset($_COOKIE['user_id'])) {
			return $_COOKIE['user_id'];
		}
		$sql = "SELECT `id` FROM `coach_info` WHERE `openid` = ?"; 
		$res = $this->db->prepare($sql);
		$res->bind_param("s", $openid);
		$res->execute();
		$res->bind_result($uid);
		if($res->fetch()) {		
			setcookie('user_id', $uid, time()+3600*24*365);
			$_COOKIE['user_id'] = $uid;
			return $uid;
		}
		return NULL;
	}

	public function getCardLog($uid) {
		$sql = "SELECT `type` FROM `coach_card` WHERE `uid` = ?"; 
		$res = $this->db->prepare($sql);
		$res->bind_param("s", $uid);
		$res->execute();
		$res->bind_result($type);
		if($res->fetch()) {	
			return $type;
		}
		return 0;
	}

	public function saveCard($uid, $card) {
		$sql = "INSERT INTO `coach_card` SET `uid` = ?, `type` = ?";
		$res = $this->db->prepare($sql); 
		$res->bind_param("ss", $uid, $card);
		if ($res->execute()) {
			return $card;
		} else {
			return $this->getCardLog($uid);
		}
	}

	public function shareLog($uid) {
		$sql = "INSERT INTO `coach_share` SET `uid` = ?";
		$res = $this->db->prepare($sql); 
		$res->bind_param("s", $uid);
		if ($res->execute()) {
			return TRUE;
		} else {
			return FALSE;
		}
	}

	public function getsharelog($uid) {
		$sql = "SELECT `id` FROM `coach_share` WHERE `uid` = ?"; 
		$res = $this->db->prepare($sql);
		$res->bind_param("s", $uid);
		$res->execute();
		$res->bind_result($id);
		if($res->fetch()) {	
			return $id;
		}
		return 0;
	}
	

}
