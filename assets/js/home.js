/*
*20161111
*Evelyn
* */
//redpacket
;(function(){
    'use strict';
    var controller = function(){
        this.moneyVal = 111;
        /*我要翻倍按钮*/
        this.isGetCoupon = false;
        /*我要领取按钮*/
        this.isGetDouble = false;
    };
    controller.prototype.init = function(){
        var self = this;

        var baseurl = ''+'/dist/images/';
        var imagesArray = [
            baseurl + 'bg.jpg',
            baseurl + 'coupon.png',
            baseurl + 'btns.png',
            baseurl + 'cbg.png',
            baseurl + 'logo.png',
            baseurl + 'mask.jpg',
            baseurl + 'prize-bg.png',
            baseurl + 'qrcode.jpg',
            baseurl + 'share-tips.png',
            baseurl + 'share.jpg',
        ];
        var i = 0;
        new preLoader(imagesArray, {
            onProgress: function(){
                Common.msgBox.add('loading...');
            },
            onComplete: function(){
                Api.isLogin(function(data){
                    //has get money
                    if(data.status==1){
                        if(data.msg){
                            self.updateCouponNumber(data.msg);
                            $('.btn-collection .btn-get').removeClass('disabled');
                            self.isGetCoupon=true;
                            if(data.msg==333){
                                self.isGetDouble = false;
                                $('.btn-collection .btn-getdouble').addClass('disabled');
                            }else{
                                self.isGetDouble = true;
                                $('.btn-collection .btn-getdouble').removeClass('disabled');
                            }
                            self.shareSuccess();

                        }else{
                            //    data msg is null or 0
                            self.initCanvas();
                            self.GenerateCouponNumber();
                        }
                    }else{
                        //   not login,go auth page
                        window.location.href = 'http://coach.samesamechina.com/api/wechat/oauth/auth/d6877db5-774d-43a3-8018-14b6b8a42b52';
                    }
                });
                self.bindEvent();
            }
        });


    };

    /*==================================
    * Events
    * ==================================*/
    controller.prototype.bindEvent=function(){
        var self = this;

        /*====
        * get the card
        * 我要领取
        * ===*/
        var enableGet = true;
        $('.btn-get').on('touchstart',function(){
            _hmt.push(['_trackEvent', 'buttons', 'click', 'BtnGetCoupon']);
            if(!(self.isGetCoupon && enableGet)) return;
            enableGet = false;
            Api.card(function(data){
                enableGet = true;
                var cardListJSON = data.msg;
                var i=1;
                if(self.moneyVal==222){
                    i=2;
                }else if(self.moneyVal==333){
                    i=3;
                }else{
                    i=1;
                }
                wx.addCard({
                    cardList: [{
                        cardId: cardListJSON[i-1].cardId,
                        cardExt: '{"timestamp":"'+cardListJSON[i-1].cardExt.timestamp+'","signature":"'+cardListJSON[i-1].cardExt.signature+'","openid":"'+cardListJSON[i-1].cardExt.openid+'","code":"'+cardListJSON[i-1].cardExt.code+'"}'
                    }],
                    success: function(res) {
                        var cardList = res.cardList;
                        //alert(JSON.stringfiy(res));
                    },
                    fail: function(res) {
                        //alert(JSON.stringfiy(res));
                    },
                    complete: function(res) {
                        //alert(JSON.stringfiy(res));
                    },
                    cancel: function(res) {
                        //alert(JSON.stringfiy(res));
                    },
                    trigger: function(res) {
                        //alert(JSON.stringfiy(res));
                    }
                });
            });
        });

        /*====
         * share to get double
         * 我要翻倍
         * ===*/
        //var enableDouble = true;
        $('.btn-getdouble').on('touchstart',function(){
            _hmt.push(['_trackEvent', 'buttons', 'click', 'BtnGetDoubleCoupon']);
            if(!self.isGetDouble) return;
            //if(!enableDouble) return;
            //enableDouble = false;
            $('.pop-share').addClass('show');

            self.shareSuccess();
            /*for test*/
            //self.shareSuccessCallback();
        });

        /*====
         * Hide the pop share overlay
         * ===*/
        $('.pop-share').on('touchstart',function(){
            _hmt.push(['_trackEvent', 'buttons', 'click', 'CloseSharePop']);
            self.hideSharePop();
        });


        /*Show Rule Pop*/
        $('.btn-rule').on('touchstart',function(){
            _hmt.push(['_trackEvent', 'buttons', 'click', 'OpenRulePop']);
            $('.pop-rules').addClass('show');
        });

        /*Btn go to offical site*/
        $('.btn-toofficial a').on('click',function(e){
            e.preventDefault();
            _hmt.push(['_trackEvent', 'link', 'click', 'GoOfficialSite']);
            var redirectUrl = 'http://m.china.coach.com/shop/singlesday-hotsale.htm';
            window.location.href = redirectUrl;
        });


        /*Close rule pop*/
        $('.popup').on('touchstart',function(e){
            e.stopPropagation();
            if($(e.target).hasClass('pop-rules') || $(e.target).hasClass('btn-close')){
                _hmt.push(['_trackEvent', 'buttons', 'click', 'CloseRulePop']);
                $('.pop-rules').removeClass('show');
            }

        });


    };

    controller.prototype.updateCouponNumber=function(val){
        var self = this;
        //show the money in site
        self.moneyVal = val;
        $('.prize').addClass('show');
        $('.prize .num').addClass('coupon-'+val);
        // if value is 333,show go official site link
        if(val==333){
            $('.btn-rule').addClass('hide');
            $('.btn-toofficial').addClass('show');
        }
    };

    /*==================================
     * Generate number between 111 and 222 by random
     * ==================================*/
    controller.prototype.GenerateCouponNumber=function(){
        var self = this;
        var newMoney = Math.floor(Math.random()*111)+111;
        var average = 166;
        newMoney = (newMoney>average)?222:111;
        self.moneyVal = newMoney;
        $('.prize').addClass('show');
        $('.prize .num').addClass('coupon-'+newMoney);
    };
    /*==================================
     * hide pop share
     * ==================================*/
    controller.prototype.hideSharePop=function(val){
        var self = this;
        $('.pop-share').removeClass('show');
    };

    controller.prototype.getTransparentPercent=function(ctx, width, height) {
        var imgData = ctx.getImageData(0, 0, width, height),
            pixles = imgData.data,
            transPixs = [];
        for (var i = 0, j = pixles.length; i < j; i += 4) {
            var a = pixles[i + 3];
            if (a < 128) {
                transPixs.push(i);
            }
        }
        return (transPixs.length / (pixles.length / 4) * 100).toFixed(2);
    };

    /*==================================
     * load canvas
     * ==================================*/
    controller.prototype.initCanvas=function(){
        var self=this;
        var ratio = window.innerWidth/750;

        var paintCanvas = document.getElementById('lottery');
        paintCanvas.width = parseInt(450*ratio);
        paintCanvas.height = parseInt(228*ratio);
        var ctx = paintCanvas.getContext('2d');

        var img = new Image();
        img.src = '/dist/images/mask.jpg';
        img.width = parseInt(450*ratio);
        img.height = parseInt(228*ratio);
        img.onload = function(){
            ctx.drawImage(img,0,0,paintCanvas.clientWidth,paintCanvas.clientHeight);

        };
        var offLeft  = $('#lotteryContainer').offset().left;
        var offTop  = $('#lotteryContainer').offset().top;

        ctx.beginPath();
        ctx.lineWidth = 30;
        //ask api just first time

        paintCanvas.addEventListener('touchstart',function(ev){
            _hmt.push(['_trackEvent', 'buttons', 'click', 'PaintCoupon']);
            ctx.moveTo(ev.changedTouches[0].clientX-offLeft,ev.changedTouches[0].clientY)-offTop;

        });

        var enableRub = true;
        var enableSave = true;
        paintCanvas.addEventListener('touchmove', function(ev) {
            if(!enableRub) return;
            ctx.globalCompositeOperation = 'destination-out';
            ctx.strokeStyle = '#000';
            ctx.lineTo(ev.changedTouches[0].clientX-offLeft,ev.changedTouches[0].clientY-offTop);
            ctx.stroke();
            var percent = self.getTransparentPercent(ctx,paintCanvas.width,paintCanvas.height);

            if(percent>80){
                ctx.clearRect(0,0, parseInt(450*ratio), parseInt(228*ratio));
                $('.btn-collection .btn').removeClass('disabled');
                self.isGetCoupon = true;
                self.isGetDouble = true;
                enableRub = false;
                if(enableSave){
                    enableSave = false;
                    Api.saveTheMoney(self.moneyVal,function(data){
                        if(data.status){
                            console.log('yes');
                        }
                    });
                }
                self.shareSuccess();
            }
        });
    };

    /*==================================
     * Share success,double money
     * ==================================*/
    controller.prototype.shareSuccess=function(){
        var self = this;
        wx.ready(function(){
            wx.onMenuShareAppMessage({
                title: 'COACH双十一电子礼券',
                desc: '电子礼券请收好，刮开还有机会把金额翻倍！尽情今日！',
                link: 'http://ownthisday.samesamechina.com',
                imgUrl: 'http://ownthisday.samesamechina.com/dist/images/share.jpg',
                type: '',
                dataUrl: '',
                success: function () {
                    _hmt.push(['_trackEvent', 'buttons', 'click', 'DoubleShareAppMessage']);
                    self.shareSuccessCallback();
                },
                cancel: function () {

                }
            });
            wx.onMenuShareTimeline({
                title: 'COACH双十一电子礼券',
                link: 'http://ownthisday.samesamechina.com/',
                imgUrl: 'http://ownthisday.samesamechina.com/dist/images/share.jpg',
                success: function () {
                    _hmt.push(['_trackEvent', 'buttons', 'click', 'DoubleShareTimeline']);
                    self.shareSuccessCallback();
                },
                cancel: function () {

                }
            });
        });
    };

    /*==================================
     * Share success callback,double money
     * ==================================*/
    controller.prototype.shareSuccessCallback=function(){
        var self = this;
        self.hideSharePop();
        Api.isShare(function(data){
            self.updateCouponNumber('333');
            self.isGetDouble = false;
            $('.btn-collection .btn-getdouble').addClass('disabled');
        });
    };

    if (typeof define === 'function' && define.amd){
        // we have an AMD loader.
        define(function(){
            return controller;
        });
    }
    else {
        this.controller = controller;
    }

}).call(this);

$(document).ready(function(){

    var redpacket= new controller();
    redpacket.init();



});


