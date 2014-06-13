angular.module("routeUrls", [])

.factory("urls", function($route) {

    // Cache the routing paths for any named routes.
    var pathsByName = {};
    angular.forEach($route.routes, function (route, path) {
        if (route.name) {
            pathsByName[route.name] = path;
        }
    });

    // Param name to replacement regex cache.
    var regexs = {};

    // Build a path for the named route from the route's URL and the given
    // params.
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
