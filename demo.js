var m = angular.module("Demo", ["routeUrls"]);

m.config(function($routeProvider) {
    $routeProvider.when("/", {
        name: "home",
        controller: "Home",
        templateUrl: "home.html"
    });
    $routeProvider.when("/product/:id", {
        name: "product",
        controller: "Product",
        templateUrl: "product.html"
    });
    $routeProvider.when("/product/:id/stock/:store", {
        name: "product:stock",
        controller: "ProductStock",
        templateUrl: "product-stock.html"
    });
    $routeProvider.otherwise({redirectTo: "/"});
});

m.run(function($rootScope, $route, urls) {
    $rootScope.urls = urls;
});

m.controller("Home", function() {
});

m.controller("Product", function($scope, $routeParams) {
    $scope.id = $routeParams.id;
});

m.controller("ProductStock", function($scope, $routeParams) {
    $scope.id = $routeParams.id;
    $scope.store = $routeParams.store;
});
