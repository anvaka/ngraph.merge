var test = require('tap').test,
  merge = require('..');

test('Should not touch properties when types match', function(t) {
  var options = {
    age: 42
  };
  merge(options, {
    age: 24
  });

  t.equal(options.age, 42);
  t.end();
});

test('Should extend, because types are different', function(t) {
  var options = {
    age: '42'
  };
  merge(options, {
    age: 24
  });

  t.equal(options.age, 24);
  t.end();
});

test('Should augment with new properties', function(t) {
  var options = {
    age: 42
  };
  merge(options, {
    newproperty: 24
  });

  t.equal(options.age, 42);
  t.equal(options.newproperty, 24);
  t.end();
});

test('goes deep', function(t) {
  var options = {
    age: 42
  };
  merge(options, {
    nested: {
      name: 'deep'
    }
  });

  t.equal(options.age, 42);
  t.equal(options.nested.name, 'deep');
  t.end();
});

test('goes deep avoids conflicts', function(t) {
  var options = {
    age: 42,
    user: {
      firstName: 'John'
    }
  };
  merge(options, {
    user: {
      lastName: 'Smith'
    }
  });

  t.equal(options.age, 42);
  t.equal(options.user.firstName, 'John');
  t.equal(options.user.lastName, 'Smith');
  t.end();
});

test('Initializes with default object', function(t) {
  var options = {
    age: '42'
  };
  var result = merge(undefined, options);
  t.same(result, options);

  var onlyOptions = merge(options);
  t.same(onlyOptions, options);

  t.end();
});

test('Do not copy prototype', function(t) {
  function Options() {
    this.age = 42;
  }
  Options.prototype.foo = 'foo';

  var options = new Options();
  var result = merge({}, options);
  t.equal(result.age, 42);
  t.ok(result.foo === undefined);

  t.end();
});
