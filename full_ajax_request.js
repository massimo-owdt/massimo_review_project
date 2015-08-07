/**
 * Created by massimo on 8/7/15.
 */

var jqXHR2 = $.ajax("http://api.openweathermap.org/data/2.5/weather?q=London,uk", {
    accepts: {},
    async: true,
    beforeSend: function(){},
    cache: true,
    complete: function(){},
    contents: {},
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    context: {},
    converters: {"* text": window.String, "text html": true, "text json": jQuery.parseJSON, "text xml": jQuery.parseXML},
    crossDomain: false,
    data: {},
    dataFilter: function(){},
    /*dataType: "xml",*/
    /*dataType: "html",*/
    /*dataType: "script",*/
    dataType: "json",
    /*dataType: "jsonp",*/
    /*dataType: "text",*/
    error: function(){},
    global: true,
    headers: {},
    ifModified: false,
    isLocal: true,
    jsonp: "onJSONPLoad",
    jsonpCallback: function(){},
    method:"GET",
    mimeType: "",
    username: "",
    password: "",
    processData: true,
    scriptCharset: "",
    statusCode: {
        /*informational responses*/
        100: function(){},
        101: function(){},

        /*successful responses*/
        200: function(){},
        201: function(){},
        202: function(){},
        203: function(){},
        204: function(){},
        205: function(){},
        206: function(){},

        /*redirection messages*/
        300: function(){},
        301: function(){},
        302: function(){},
        303: function(){},
        304: function(){},
        305: function(){},
        306: function(){},
        307: function(){},
        308: function(){},

        /*client error responses*/
        400: function(){},
        401: function(){},
        402: function(){},
        403: function(){},
        404: function(){},
        405: function(){},
        406: function(){},
        407: function(){},
        408: function(){},
        409: function(){},
        410: function(){},
        411: function(){},
        412: function(){},
        413: function(){},
        414: function(){},
        415: function(){},
        416: function(){},
        417: function(){},

        /*server error responses*/
        500: function(){},
        501: function(){},
        502: function(){},
        503: function(){},
        504: function(){},
        505: function(){}
    },
    success: function(){},
    timeout: 500
});


jqXHR2.done(function(data){
    console.log(JSON.stringify(data));
});





