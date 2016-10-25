/*All the api collection*/
Api = {

//{"status":1,"msg":null}
//{"status":1,"msg":111}
//{"status":1,"msg":222}
    /*
    * logged,status is 0 or 1,and then show different msg,'111','222','333'
    * */
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
//{"status":1,"msg":[{"cardId":"pKCDxjjMu_A_OlyidjNNeQ2Hqdrk","cardExt":{"code":"","openid":"","timestamp":1477367798,"signature":"444050b2c89f478544e5ab5ef4ed63d3b9337f89"}}]}
    /*
    * get the coupon card
    * */
    card:function(callback){
        $.ajax({
            url:'/api/card',
            type:'POST',
            dataType:'json',
            success:function(data){
                return callback(data);
            }
        });
    },
    /*
    * when start paint the canvas, sent the money from backend
    * */
    saveTheMoney:function(callback){
        $.ajax({
            url:'/api/savecard',
            type:'POST',
            dataType:'json',
            success:function(data){
                return callback(data);
            }
        });
    },
    /*
    * if shared,show 333
    * */
    isShare:function(callback){
        $.ajax({
            url:'/api/share',
            type:'POST',
            dataType:'json',
            success:function(data){
                return callback(data);
            }
        });
    },



};