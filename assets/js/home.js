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
    };
    controller.prototype = {
        init:function(){
            var self = this;
            self.initCanvas();
        },
        //bind all element event,such as click, touchstart
        bindEvent:function(){
            var self = this;

        },

        //paint the canvas and then show the money,such as 111,222,and then share success,show 333
        paintCanvas:function(){

            var id = $('#lottery');
            console.log(id);

        },
        getTransparentPercent: function(ctx, width, height) {
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
        },
        initCanvas:function(tEle,tImg,bEle,bImg){
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
            paintCanvas.addEventListener('touchstart',function(ev){
                //console.log(ev);
                ctx.moveTo(ev.changedTouches[0].clientX-offLeft,ev.changedTouches[0].clientY)-offTop;
            });

            var times = 0,
                enableRub = true;
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
                    console.log('yes');
                    enableRub = false;
                }
            });
        },

        compareCommand:function(commandline){
            /*
             * If the input command is right, then upload the command to server.
             * Show different message according input command.
             * The commandline is input value
             * */
            var self = this;
        },


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


