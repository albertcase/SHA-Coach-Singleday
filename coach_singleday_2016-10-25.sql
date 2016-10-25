# ************************************************************
# Sequel Pro SQL dump
# Version 4096
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.6.19-0ubuntu0.14.04.4)
# Database: coach_singleday
# Generation Time: 2016-10-25 08:26:25 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table coach_card
# ------------------------------------------------------------

DROP TABLE IF EXISTS `coach_card`;

CREATE TABLE `coach_card` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `createtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uid` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `coach_card` WRITE;
/*!40000 ALTER TABLE `coach_card` DISABLE KEYS */;

INSERT INTO `coach_card` (`id`, `uid`, `type`, `createtime`)
VALUES
	(1,1,222,'2016-10-25 04:10:43');

/*!40000 ALTER TABLE `coach_card` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table coach_info
# ------------------------------------------------------------

DROP TABLE IF EXISTS `coach_info`;

CREATE TABLE `coach_info` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `openid` varchar(100) NOT NULL DEFAULT '',
  `createtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `coach_info` WRITE;
/*!40000 ALTER TABLE `coach_info` DISABLE KEYS */;

INSERT INTO `coach_info` (`id`, `openid`, `createtime`)
VALUES
	(1,'oKCDxjifM1kEMt1BY5O9NbYtz3rQ','2016-10-25 03:13:52'),
	(2,'123','2016-10-25 03:25:10');

/*!40000 ALTER TABLE `coach_info` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table coach_share
# ------------------------------------------------------------

DROP TABLE IF EXISTS `coach_share`;

CREATE TABLE `coach_share` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `createtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `coach_share` WRITE;
/*!40000 ALTER TABLE `coach_share` DISABLE KEYS */;

INSERT INTO `coach_share` (`id`, `uid`, `createtime`)
VALUES
	(1,1,'2016-10-25 04:07:17');

/*!40000 ALTER TABLE `coach_share` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
