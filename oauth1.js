/**
 * Created by massimo on 7/29/15.
 */

//create a new oauth instance
var oauth = new Backbone.OAuth({
    consumerKey : "0nk0GoMuAQmRsAVFXhDafAKHu5TSWl",
    consumerSecret: "aXIvXoTKTuBfm3QiINzmYPXJxrOqkL",
    requestURL : "http://eda.owdt.com/wordpress_1/oauth1/request",
    authURL : "http://eda.owdt.com/wordpress_1/oauth1/authorize",
    accessURL : "http://eda.owdt.com/wordpress_1/oauth1/access"
});


var atoken = oauth.getRequestToken();




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
*/

console.log('test');


