var m = angular.module("routeUrls", []);

m.factory("urls", function($route) {

    var pathsByName = {};
    angular.forEach($route.routes, function(route, path) {
        if (route.name) {
            pathsByName[route.name] = path;
        }
    });

    return {
        href: function(name, params) {
            var url = pathsByName[name] || "/";
            angular.forEach(params || {}, function(value, key) {
                url = url.replace(new RegExp(":" + key + "(?=/|$)"), value);
            });
            return "#" + url;
        }
    };
});
