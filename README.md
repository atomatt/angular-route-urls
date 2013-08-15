angular-route-urls
==================

Example of a simple service (see route-urls.js) to construct application URLs
from Angular's standard routing configuration.

Most of the other files in the repo are an example of how it might be used, but
basically:

1. Give each route a name that is meaningful to your application, e.g.

    ```
    $routeProvider.when("/product/:id", {
        name: "product",
        ... usual stuff ...
    });
    ```

2. Put the `urls` service in the root scope so it's available application-wide.

3. Reference pages by name, together with any params needed to build the URL, e.g.

    ```
    <a href="{{ urls.href('product', {id: 1}) }}">Product 1</a>
    ```
