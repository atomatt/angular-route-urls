describe("urls service", function() {

    var urls;

    beforeEach(function() {
        module("routeUrls", function($routeProvider) {
            $routeProvider.when("/product/:product", {
                name: "product"
            });
            $routeProvider.when("/product/:product/store/:store", {
                name: "product:stock"
            });
        });
        inject(function(_urls_) {
            urls = _urls_;
        });
    });

    it("has expected methods", function() {
        expect(angular.isFunction(urls.path));
        expect(angular.isFunction(urls.href));
    });

    it("returns root path by default", function() {
        expect(urls.path("missing")).toBe("/");
    });

    it("constructs correct paths from params obj", function() {
        expect(urls.path("product", {product: "xyz"})).toBe("/product/xyz");
        expect(urls.path("product:stock", {product: "xyz", store: "leeds"})).toBe("/product/xyz/store/leeds");
    });

    it("constructs correct paths from positional params", function() {
        expect(urls.path("product", "xyz")).toBe("/product/xyz");
        expect(urls.path("product:stock", "xyz", "leeds")).toBe("/product/xyz/store/leeds");
    });

    it("ignores additional positional params", function() {
        expect(urls.path("product", "xyz", "some", "more")).toBe("/product/xyz");
    });
});
