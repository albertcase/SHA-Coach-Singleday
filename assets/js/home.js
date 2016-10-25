/*
*20161111
*Evelyn
* */
//redpacket
;(function(){
    'use strict';
    var controller = function(){
        //if user is logged
        this.isLogged = false;

        //if user follow coach weixin public account
        this.isFollow = true;
        //is get the first coupon,111 or 222
        this.isGetFirst = false;
        //is get the double coupon,333
        this.isGetDouble = false;
        this.couponValue = 111;
    };
    controller.prototype.init = function(){
        var self = this;

        Api.isLogin(function(data){
            //has get money
            if(data.status==1){
                if(data.msg){
                    self.updateCouponNumber(data.msg);
                }else{
                    //    data msg is null or 0
                    self.initCanvas();
                }
            }else{
            //   not login,go auth page
                window.location.href = 'http://coach.samesamechina.com/api/wechat/oauth/auth/d6877db5-774d-43a3-8018-14b6b8a42b52';
                console.log('未登录跳转到其他页面');
            }
        });
        self.bindEvent();

    };

    /*==================================
    * Events
    * ==================================*/
    controller.prototype.bindEvent=function(){
        var self = this;

        //next button to paint page
        $('.next').on('touchstart',function(){
            self.initCanvas();
        });

        $('.btn-getdouble').on('touchstart',function(){
            self.initCanvas();
        });

    };
    controller.prototype.updateCouponNumber=function(val){
        var self = this;
        //show the money in site
        $('.prize').addClass('show');
        $('.prize .num').html(val);
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
                    console.log(data);
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
            //times++;
            if(percent>80){
                ctx.clearRect(0,0, parseInt(450*ratio), parseInt(228*ratio));
                $('.btn-collection .btn').removeClass('disabled');
                console.log('yes');
                enableRub = false;
            }
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


