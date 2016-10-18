;(function(){
    //window.location.href = '/selectvideo.html?vid='+0+'&timestamp='+Math.round(new Date().getTime()/1000);
    if(Cookies.get('uuid') && Cookies.get('selectedid')){
        window.location.href = '/selectvideo.html?vid='+Cookies.get('selectedid')+'&timestamp='+Math.round(new Date().getTime());
    }
    //0:唐嫣
    //1:李微漪
    //2:谭元元
    //3:陈漫
    //4:欧铠淳
    //5:黄韵玲
    var videoName = ['唐嫣','李微漪','谭元元','陈漫','欧铠淳','黄韵玲'];

    var score = [
        {
            name:'tangyan',
            score:0
        },
        {
            name:'liweiyi',
            score:0
        },
        {
            name:'tanyuanyuan',
            score:0
        },
        {
            name:'chenman',
            score:0
        },
        {
            name:'oukaichun',
            score:0
        },
        {
            name:'huangyunling',
            score:0
        },
    ];

    var qlist = [
        {
            ask:'你觉得你更偏向以下哪种性格？',
            answer:[
                {
                    des:'热情浪漫',
                    tovideo:[0,1,5]
                },
                {
                    des:'稳重细腻',
                    tovideo:[2,3]
                },
                {
                    des:'腼腆内敛',
                    tovideo:[4]
                }
            ]
        },
        {
            ask:'当你前往派对或社交场合时，你的行为模式接近以下哪一种？',
            answer:[
                {
                    des:'安静现身，找相熟的朋友',
                    tovideo:[3,2]
                },
                {
                    des:'闪耀出场，吸引注意',
                    tovideo:[0,5]
                },
                {
                    des:'安静现身，在角落落座',
                    tovideo:[1,4]
                }
            ]
        },
        {
            ask:'当你需要在众人面前表达自己的观点时，你感到？',
            answer:[
                {
                    des:'落落大方',
                    tovideo:[1,2]
                },
                {
                    des:'拘谨害羞',
                    tovideo:[4]
                },
                {
                    des:'侃侃而谈',
                    tovideo:[0,5]
                }
            ]
        },
        {
            ask:'在工作中，你的处事特点是？',
            answer:[
                {
                    des:'不被条条框框束缚，富有创造力',
                    tovideo:[1,3]
                },
                {
                    des:'慢条斯理，严谨有耐心。',
                    tovideo:[2,4]
                },
                {
                    des:'善于倾听，吸收各方意见。',
                    tovideo:[0,5]
                }
            ]
        },
        {
            ask:'你更倾向从事哪种类型的工作？',
            answer:[
                {
                    des:'按部就班',
                    tovideo:[4]
                },
                {
                    des:'自我表达',
                    tovideo:[0,1]
                },
                {
                    des:'发挥创意',
                    tovideo:[2,3,5]
                }
            ]
        },

    ];

    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }


    $(document).ready(function(){

    //    load the question first
        var curAskIndex = 0;
        var curEle = $('.qa-list');
        var maxNum = qlist.length;

        //show current answer
        function loadAskAnswer(order){

            var AaContent = '';
            var Ele = $('.answer');
            var numSeries = ['A','B','C','D','E','F'];

            //answer html
            for(var i=0;i<qlist[order].answer.length;i++){
                AaContent = AaContent+'<li class="item"><span class="series font-en">'+numSeries[i]+')</span>'+qlist[order].answer[i].des+'</li>';
            }

            //innerHTML
            var qaInnerHtml = '<div class="ask">'+qlist[order].ask+'</div>'+
                '<div class="answer"><ul class="list">'+AaContent+'</ul></div>'+
                '<div class="btn btn-go">'+((order<maxNum-1)?'下一题':'查看结果')+'</div>';

            //append
            curEle.html(qaInnerHtml);

        };

        //    add score
        function addScore(arr){
            for(var j=0;j<arr.length;j++){
                score[arr[j]].score++;
            }
        };

        //compare
        function compareNum(obj){

            var a = [];
            var maxNum = 0;
            var scoreIndex;
            for(var i=0;i<obj.length;i++){
                //a.push(obj[i].score);
                if(obj[i].score>maxNum){
                    maxNum = obj[i].score;
                    scoreIndex = i;
                }
            }
            return scoreIndex;
            //console.log(maxNum+'hah'+scoreIndex);

        }

        //go question page
        $('.pin-welcome .btn-go').on('touchstart',function(){
            _hmt.push(['_trackEvent', 'buttons', 'click', 'GoQuestionPage']);
            $('.pin-welcome').remove();
            //load default question
            loadAskAnswer(curAskIndex);
            $('.qa-list').addClass('show');
        });

        //    open pop showrules
        $('.showrules').on('touchstart',function(){
            _hmt.push(['_trackEvent', 'buttons', 'click', 'OpenRulesPop']);
            $('.popup').addClass('show');
        });

    //    close pop
        $('.popup .btn-close').on('touchstart',function(){
            _hmt.push(['_trackEvent', 'buttons', 'click', 'CloseRulesPop']);
            $('.popup').removeClass('show');
        });


    //    select answer
        $('.qa-list').on('touchstart','.item', function(){
            //$('.qa-list .item').addClass('unselect').removeClass('selected');
            $(this).addClass('selected').removeClass('unselect').siblings().addClass('unselect').removeClass('selected');

        });


    //    go next question
        var isNext = true;
        var enableSubmitVideo = true;
        $('.qa-list').on('touchstart','.btn-go',function(){
            _hmt.push(['_trackEvent', 'buttons', 'click', 'nextButton']);
            var curAnswerIndex;
            //if selected
            if($('.qa-list .item').hasClass('selected')){
                isNext = true;
            }else{
                isNext = false;
                Common.alertBox.add('请选择答案');
            }

            if(isNext){
                //    go next
                curAnswerIndex = $('.item.selected').index();
                addScore(qlist[curAskIndex].answer[curAnswerIndex].tovideo);

                if(curAskIndex<qlist.length-1){
                    curAskIndex++;
                    loadAskAnswer(curAskIndex);
                    _hmt.push(['_trackEvent', 'buttons', 'click', 'BtnQue'+curAskIndex]);
                }else{
                    _hmt.push(['_trackEvent', 'buttons', 'click', 'BtnQue5']);
                    var uuid = guid();
                    if(!enableSubmitVideo) return;
                    enableSubmitVideo = false;
                    Common.msgBox('loading...');
                    //submit answer and uid
                    $.ajax({
                        url:'/api/submit',
                        type:'POST',
                        dataType:'json',
                        data:{
                            uuid:uuid,
                            video:videoName[compareNum(score)]
                        },
                        success:function(data){
                            Cookies.set('uuid', uuid,{ expires: 100 });
                            Cookies.set('selectedid', compareNum(score),{expires: 100});
                            var vid = compareNum(score);
                            window.location.href = '/selectvideo.html?vid='+vid;
                        }
                    });



                }
            }


        });

    });



})();