/*
*20161111
*Evelyn
* */
//redpacket
;(function(){
    'use strict';
    var controller = function(){
        this.moneyVal = 111;
        this.isGetCoupon = false;
    };
    controller.prototype.init = function(){
        var self = this;

        Api.isLogin(function(data){
            //has get money
            if(data.status==1){
                if(data.msg){
                    self.updateCouponNumber(data.msg);
                    $('.btn-collection .btn').removeClass('disabled');
                    self.isGetCoupon = true;
                }else{
                    //    data msg is null or 0
                    self.initCanvas();
                }
            }else{
            //   not login,go auth page
                window.location.href = 'http://coach.samesamechina.com/api/wechat/oauth/auth/d6877db5-774d-43a3-8018-14b6b8a42b52';
            }
        });
        self.bindEvent();

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
            if(!self.isGetCoupon) return;
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
            self.hideSharePop();
        });


    };
    controller.prototype.updateCouponNumber=function(val){
        var self = this;
        //show the money in site
        self.moneyVal = val;
        $('.prize').addClass('show');
        $('.prize .num').html(val);
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
        var enableSave = true;
        paintCanvas.addEventListener('touchstart',function(ev){
            ctx.moveTo(ev.changedTouches[0].clientX-offLeft,ev.changedTouches[0].clientY)-offTop;
            if(enableSave){
                Api.saveTheMoney(function(data){
                    if(data.status){
                        self.updateCouponNumber(data.msg);
                    }
                });
                enableSave = false;
            }

        });

        var enableRub = true;
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
                console.log('yes');
                enableRub = false;
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
                title: 'COACH双十一献礼',
                desc: 'COACH双十一献礼',
                link: 'http://ownthisday.samesamechina.com',
                imgUrl: 'http://ownthisday.samesamechina.com/dist/images/logo.png',
                type: '',
                dataUrl: '',
                success: function () {
                    self.shareSuccessCallback();
                },
                cancel: function () {

                }
            });
            wx.onMenuShareTimeline({
                title: 'COACH双十一献礼',
                link: 'http://ownthisday.samesamechina.com/',
                imgUrl: 'http://ownthisday.samesamechina.com/dist/images/logo.png',
                success: function () {
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
        self.updateCouponNumber('333');
        self.hideSharePop();
        Api.isShare(function(data){
            console.log(data);
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


