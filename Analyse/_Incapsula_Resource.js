/**
 * Created by xyj on 10/11/2014.
 */
(function() {
    function getSessionCookies() {
        cookieArray = new Array();
        var cName = /^\s?incap_ses_/;
        var c = document.cookie.split(";");
        for (var i = 0; i < c.length; i++) {
            key = c[i].substr(0, c[i].indexOf("="));
            value = c[i].substr(c[i].indexOf("=") + 1, c[i].length);
            if (cName.test(key)) {
                cookieArray[cookieArray.length] = value
            }
        }
        return cookieArray
    }
    function setIncapCookie(vArray) {
        try {
            cookies = getSessionCookies();
            digests = new Array(cookies.length);
            for (var i = 0; i < cookies.length; i++) {
                digests[i] = simpleDigest((vArray) + cookies[i])
            }
            res = vArray + ",digest=" + (digests.join())
        } catch (e) {
            res = vArray + ",digest=" + (encodeURIComponent(e.toString()))
        }
        createCookie("___utmvc", res, 20)
    }
    function simpleDigest(mystr) {
        var res = 0;
        for (var i = 0; i < mystr.length; i++) {
            res += mystr.charCodeAt(i)
        }
        return res
    }
    function createCookie(name, value, seconds) {
        if (seconds) {
            var date = new Date();
            date.setTime(date.getTime() + (seconds * 1000));
            var expires = "; expires=" + date.toGMTString()
        } else {
            var expires = ""
        }
        document.cookie = name + "=" + value + expires + "; path=/"
    }
    function test(o) {
        var res = "";
        var vArray = new Array();
        for (test in o) {
            switch (o[test]) {
                case "exists":
                    try {
                        vArray[vArray.length] = encodeURIComponent(test + "=" + typeof(eval(test)))
                    } catch (e) {
                        vArray[vArray.length] = encodeURIComponent(test + "=" + e)
                    }
                    break;
                case "value":
                    try {
                        vArray[vArray.length] = encodeURIComponent(test + "=" + eval(test).toString())
                    } catch (e) {
                        vArray[vArray.length] = encodeURIComponent(test + "=" + e)
                    }
                    break;
                case "plugins":
                    try{
                        p=navigator.plugins
                        pres=""
                        for (a in p){pres+=(p[a]['description']+" ").substring(0,20)}
                        vArray[vArray.length] = encodeURIComponent("plugins=" + pres);
                    }
                    catch(e){
                        vArray[vArray.length] = encodeURIComponent("plugins=" +e);
                    }
                    break;
                case "plugin":
                    try {
                        a = navigator.plugins;
                        for (i in a) {
                            f = a[i]["filename"].split(".");
                            if (f.length == 2) {
                                vArray[vArray.length] = encodeURIComponent("plugin=" + f[1]);
                                break
                            }
                        }
                    } catch (e) {
                        vArray[vArray.length] = encodeURIComponent("plugin=" + e)
                    }
                    break
            }
        }
        vArray = vArray.join();
        return vArray
    }
    var o = {
        navigator: "exists",
        "navigator.vendor": "value",
        opera: "exists",
        ActiveXObject: "exists",
        "navigator.appName": "value",
        platform: "plugin",
        webkitURL: "exists",
        "navigator.plugins.length==0": "value"
    };
    try {
        setIncapCookie(test(o));
        document.createElement("img").src = "/_Incapsula_Resource?SWKMTFSR=1&e=" + Math.random()
    } catch (e) {
        img = document.createElement("img");
        img.src = "/_Incapsula_Resource?SWKMTFSR=1&e=" + e
    }
})();