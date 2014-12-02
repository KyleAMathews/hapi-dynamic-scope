var deep = require('deep-get-set');

exports.register = function(plugin, options, next) {
  plugin.servers[0].ext('onPreAuth', function(request, next) {
    var i, matches, result, scope, _i, _len, _ref;
    if (request.route.auth.scope !== null) {
      _ref = request.route.auth.scope;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        scope = _ref[i];
        matches = scope.match(/{(.*)}/);
        if (matches !== null) {
          result = deep(request, matches[1]);
          scope = scope.replace(/{.*}/, result);
          request.route.auth.scope[i] = scope;
        }
      }
    }
    return next();
  });

  next();
};

exports.register.attributes = {
  pkg: require('./package.json')
};
