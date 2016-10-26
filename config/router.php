<?php

$routers = array();
$routers['/'] = array('CoachBundle\Site', 'index');
$routers['/member'] = array('CoachBundle\Site', 'member');
$routers['/scan'] = array('CoachBundle\Api', 'qrcode');
$routers['/getdata'] = array('CoachBundle\Api', 'getdata');
$routers['/callback'] = array('CoachBundle\Api', 'callback');
$routers['/api/test'] = array('CoachBundle\Api', 'test');
$routers['/api/islogin'] = array('CoachBundle\Api', 'islogin');
$routers['/api/savecard'] = array('CoachBundle\Api', 'savecard');
$routers['/api/share'] = array('CoachBundle\Api', 'share');
$routers['/api/card'] = array('CoachBundle\Api', 'card');
$routers['/oauth'] = array('CoachBundle\Api', 'oauth');