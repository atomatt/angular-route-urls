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
            $routeProvider.when("/weird/:0!6&x/:$$", {
                name: "weird"
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

    it("retains group names for missing params", function() {
        expect(urls.path("product:stock", {product: "xyz"})).toBe("/product/xyz/store/:store");
        expect(urls.path("product:stock")).toBe("/product/:product/store/:store");
        expect(urls.path("product:stock", "xyz")).toBe("/product/xyz/store/:store");
        expect(urls.path("product:stock")).toBe("/product/:product/store/:store");
    });

    it("handles replacement value containing group name prefix", function() {
        expect(urls.path("product:stock", "a:b", "c:d")).toBe("/product/a:b/store/c:d");
    });

    it("replaces non-alpha params", function() {
        expect(urls.path("weird", {"0!6&x": "xyz", "$$": "abc"})).toBe("/weird/xyz/abc");
        expect(urls.path("weird", "xyz", "abc")).toBe("/weird/xyz/abc");
    });
});
