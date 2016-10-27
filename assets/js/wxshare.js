$(document).ready(function(){
    function weixinshare(obj){
        wx.ready(function(){
            wx.onMenuShareAppMessage({
                title: obj.title1,
                desc: obj.des,
                link: obj.link,
                imgUrl: obj.img,
                type: '',
                dataUrl: '',
                success: function () {
                    _hmt.push(['_trackEvent', 'buttons', 'click', 'onMenuShareAppMessage']);

                },
                cancel: function () {

                }
            });
            wx.onMenuShareTimeline({
                title: obj.title1,
                link: obj.link,
                imgUrl: obj.img,
                success: function () {
                    _hmt.push(['_trackEvent', 'buttons', 'click', 'onMenuShareTimeline']);
                },
                cancel: function () {

                }
            });


        })
    }

    weixinshare({
        title1: 'COACH双十一献礼',
        des: 'COACH双十一献礼',
        link: 'http://ownthisday.samesamechina.com',
        img: 'http://ownthisday.samesamechina.com/dist/images/logo.png'
    })

});