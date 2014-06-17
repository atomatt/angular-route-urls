angular.module("routeUrls", ["ngRoute"])

.provider("urls", function($locationProvider) {

    return {
        $get: function($route) {

            // Cache the routing paths for any named routes.
            var pathsByName = {};
            angular.forEach($route.routes, function (route, path) {
                if (route.name) {
                    pathsByName[route.name] = path;
                }
            });

            // Build a path for the named route from the route's URL and the given
            // params.
            var path = function (name, params) {

                // Accept an object or array of params.
                var isObject = angular.isObject(params);
                if (!isObject) {
                    params = Array.prototype.slice.call(arguments, 1);
                }

                // Iterate the path segments replacing named groups.
                var path = (pathsByName[name] || "/").split("/");
                for (var i=0, idx=0; i<path.length; i++) {
                    if (path[i] && path[i][0] === ":") {
                        value = isObject ? params[path[i].substring(1)] : params[idx++];
                        if (value) {
                            path[i] = value;
                        }
                    }
                }
                return path.join("/");
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
