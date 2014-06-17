angular.module("routeUrls", ["ngRoute"])

.provider("urls", function($locationProvider) {

    // Create a regex to match a named group in a route URL.
    var makeNamedGroupRegex = function(inner) {
        return new RegExp(":" + inner + "(?=/|$)");
    };

    // Regex that matches any named group.
    var anyNamedGroup = makeNamedGroupRegex(".*?");

    return {
        $get: function($route) {

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
                if (angular.isObject(params)) {
                    angular.forEach(params || {}, function (value, key) {
                        var regex = regexs[key];
                        if (regex === undefined) {
                            regex = regexs[key] = makeNamedGroupRegex(key);
                        }
                        url = url.replace(regex, value);
                    });
                } else {
                    params = Array.prototype.slice.call(arguments, 1);
                    angular.forEach(params, function(param) {
                        url = url.replace(anyNamedGroup, param);
                    });
                }
                return url;
            };

            // Query $locationProvider for its configuration.
            var html5Mode = $locationProvider.html5Mode();
            var hashPrefix = $locationProvider.hashPrefix();

            return {
                path: path,
                href: function (name, params) {
                    var url = path.apply(this, arguments);
                    if (html5Mode) {
                        return url;
                    }
                    return "#" + hashPrefix + url;
                }
            };
        }
    };
});
