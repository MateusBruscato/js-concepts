'use strict';

const Event = require('events');

const event = new Event();

const eventName = 'counter';

event.on(eventName, (msg) => console.log('counter updated', msg));

const myCounter = {
    counter: 0
};

const proxy = new Proxy(myCounter, {
    set(target, propertyKey, newValue) {
        event.emit(eventName, { newValue, key: target[propertyKey] });
        target[propertyKey] = newValue;
        return true;
    },
    get(target, propertyKey) {
        // console.log('passou no get');
        return target[propertyKey];
    }
});

setInterval(function () {
    console.log('[3]: setInterval' );
    proxy.counter += 1;
    if (proxy.counter === 10) {
        clearInterval(this);
    }
}
, 500);

// ----

// executa agora, mas acaba com o ciclo de vida do node
process.nextTick(() => {
    proxy.counter = 3;
    console.log('[0]: nextTick' )
});

setImmediate(() => {
    console.log('[1]: setImmediate' );
    console.log('counter', proxy.counter);
}
);

setTimeout(() => {
    console.log('[2]: setTimeout' );
    console.log('counter', proxy.counter);
}
, 100);

