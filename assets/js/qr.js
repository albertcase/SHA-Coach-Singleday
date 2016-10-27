$(document).ready(function(){

    /*Next btn*/
    $('.next a').on('touchstart',function(e){
        e.preventDefault();
        _hmt.push(['_trackEvent', 'next', 'click', 'GoNextPage']);
        window.location.href = '/member';

    });

});