/*All the api collection*/
Api = {
//{
//    msg:{
//        mobile:’’,
//        money:''
//    },
//    status:1
//}
    isLogin:function(callback){
        $.ajax({
            url:'/api/islogin',
            type:'POST',
            dataType:'json',
            success:function(data){
                return callback(data);
            }
        });
    },
    isFollow:function(callback){
        $.ajax({
            url:'/api/islogin',
            type:'POST',
            dataType:'json',
            success:function(data){
                return callback(data);
            }
        });
    },
    isGetFirstCoupon:function(){

    }



};