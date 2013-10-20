ngraph.events
=============

Small and powerful eventing in node and browser

Example
=======

``` js
var eventify = require('ngraph.events');
var yourObject = {}; // any javascript object

eventify(yourObject);

// now your object can listen events from your object
yourObject.on('beep', function(name) { console.log("Hello " + name); });

// and you can fire events from your object:
yourObject.fire('beep', "World!"); // prints "Hello World!"

// stop listen to events:
yourObject.off('beep');
```

More advanced examples:

``` js
var eventify = require('ngraph.events');
var yourObject = eventify({});

// Pass context to event handler as last argument:
yourObject.on('beep', function () { console.log(this === yourObject); }, yourObject);
yourObject.fire('beep'); // prints true;

// Pass additional arguments to fire:
var onBop = function (x, y) { console.log(x + y); };
yourObject.on('bop', onBop);
yourObject.fire('bop', 40, 2); // prints 42;

// Remove specific listeners to 'bop'
yourObject.off('bop', onBop);

// Remove all event listeners from your object:
yourObject.off();
```

install
=======

With [npm](http://npmjs.org) do:

```
npm install ngraph.events
```

License
=======

BSD 3-Clause