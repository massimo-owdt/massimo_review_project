/**
 * Created by massimo on 7/29/15.
 *//*



var temp = $.ajax(
    {
        url:"http://eda.owdt.com//wordpress_1/oauth1/request",
        type: 'POST',
        dataType: 'json', // the type of data you are expecting from the server
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "OAuth"
        },
        data: {                 //  parameters to be sent with the request
            realm: "example",
            oauth_consumer_key: "jd83jd92dhsh93js",
            oauth_signature_method: "PLAINTEXT",
            oauth_callback: "http://google.com",
            oauth_signature: "ja893SD9%26",
            oauth_timestamp: "1318622958",
            oauth_nonce: "kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg"
        }
    }
);

temp.done(function(data){
    JSON.stringify(data);
});











//create a new oauth instance

var oauth = new Backbone.OAuth({
    consumerKey : "0nk0GoMuAQmRsAVFXhDafAKHu5TSWl",
    consumerSecret: "aXIvXoTKTuBfm3QiINzmYPXJxrOqkL",
    requestURL : "http://eda.owdt.com/wordpress_1/oauth1/request",
    authURL : "http://eda.owdt.com/wordpress_1/oauth1/authorize",
    accessURL : "http://eda.owdt.com/wordpress_1/oauth1/access"
});


var atoken = oauth.getRequestToken();

var f = oauth.apiRequest(
    "http://eda.owdt.com/massimo_review_project/wp-json/posts"


);




*/
/*
 var atoken = window.localStorage.getItem("accessToken");

 if(!(atoken)){
 if(location.href.indexOf("oauth_verifier")>-1){
 atoken = oauth.getAccessToken(window.localStorage.getItem("tokenSecret"));
 } else{
 atoken = oauth.getRequestToken();
 }
 window.localStorage.setItem("accessToken", atoken);
 }
 *//*


console.log('test');


*/
