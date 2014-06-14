angular-route-urls
==================

Example of a simple service (see route-urls.js) to construct application URLs
from Angular's standard routing configuration.

Most of the other files in the repo are an example of how it might be used, but
basically:

1. Give each route a name that is meaningful to your application, e.g.

    ```
    $routeProvider.when("/product/:id/stock/:store", {
        name: "product:stock",
        ... usual stuff ...
    });
    ```

2. Put the `urls` service in the root scope so it's available application-wide.

3. Reference pages by name, together with any params needed to build the URL, e.g.

    ```
    <a href="{{ urls.href('product:stock', {id: 1, store: 'Leeds'}) }}">
        Product 1, Leeds
    </a>
    ```

In the case where each named group in a route URL has a unique name and the
order of the named groups is well known, paths can also be constructed by
passing replacement values as positional args instead of a {name: value} map,
e.g.

    ```
    <a href="{{ urls.href('product:stock', 1, 'Leeds') }}">Product 1, Leeds</a>
    ```
