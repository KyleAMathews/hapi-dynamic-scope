hapi-dynamic-scope
==================

## DEPRECATED: Functionality added to core Hapi.js in 8.5 https://github.com/hapijs/hapi/pull/2532

Create dynamic route scopes based on information in the request.

Configuration > code.

## Examples

When authenticating a user, add to their scopes `user-123` (where 123 is their user id). Then when defining user routes, define scopes like the following:

```javascript
  plugin.route({
    method: "GET",
    path: "/users/{id}",
    config: {
      auth: {
        scope: ['user-{params.id}']
      }
    }
  });
```

This plugin looks for `{}` in scopes and then replaces the path within with the value set on the request object. So for a request to `users/123`, `user-{params.id}` becomes `user-123`. On a request to `users/456`, the scope is then dynamically changed to `user-456`.

This works for any property defined on the request object e.g. payload, queries, and params.
