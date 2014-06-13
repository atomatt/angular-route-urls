angular.module("routeUrls", [])

.factory("urls", function($route) {

    var pathsByName = {};
    angular.forEach($route.routes, function (route, path) {
        if (route.name) {
            pathsByName[route.name] = path;
        }
    });

    var regexs = {};

    var path = function (name, params) {
        var url = pathsByName[name] || "/";
        angular.forEach(params || {}, function (value, key) {
            var regex = regexs[key];

            if (regex === undefined) {
              regex = regexs[key] = new RegExp(":" + key + "(?=/|$)");
            }
            url = url.replace(regex, value);
        });
        return url;
    };

    return {
        path: path,

        href: function (name, params) {
            return "#" + path(name, params);
        }
    };
});
