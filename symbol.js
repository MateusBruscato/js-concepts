const assert = require('assert');

// -- keys
const uniqueKey = Symbol('uniqueKey');
const user = {};

user["uniqueKey"] = 'value for normal Object';
user[uniqueKey] = 'value for symbol';

console.log('getting from normal object:', user.uniqueKey);
// sempre único em nível de endereço de memória
// console.log('getting from symbol:', user[Symbol('uniqueKey')]);
// console.log('getting from normal object:', user[uniqueKey]);

assert.deepStrictEqual(user.uniqueKey, 'value for normal Object');

assert.deepStrictEqual(user[Symbol("uniqueKey")], undefined);
assert.deepStrictEqual(user[uniqueKey], 'value for symbol');

// console.log('symbols', Object.getOwnPropertyNames(user));
// console.log('symbols', Object.getOwnPropertySymbols(user));

// é difícil de pegar mas não é secreto
console.log('symbols', Object.getOwnPropertySymbols(user));
assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey);

// byPass - máa prática
user[Symbol.for('password')] = 123;
assert.deepStrictEqual(user[Symbol.for('password')], 123);

// Well-known Symbols

const obj = {
    // iterator: 1,
    // é o que o * faz por debaixo dos panos
    [Symbol.iterator]: () => ({
        items: ['c', 'b', 'a'],
        next() {
            return {
                done: this.items.length === 0,
                //remove o último item e retorna
                value: this.items.pop()
            }
        }
    })
}

// for (const item of obj) {
//     console.log('item:', item);
// }

// console.log('spread', [...obj]);
assert.deepStrictEqual([...obj], ['a', 'b', 'c']);

const kItems = Symbol('kItems');

class MyDate {
    constructor(...args) {
        this[kItems] = args.map(arg => new Date(...arg));
    }

    // *[Symbol.iterator]() {
    //     for (const item of this[kItems]) {
    //         yield item;
    //     }
    // }

    [Symbol.toPrimitive](coercionType) {
        if (coercionType !== 'string') throw new TypeError();

        const items = this[kItems]
            .map(item => new Intl.DateTimeFormat('pt-BR', { month: 'long', day: '2-digit', year: 'numeric' }).format(item));

        return new Intl.ListFormat('pt-BR', { type: 'conjunction' }).format(items);
    }

    get [Symbol.toStringTag]() {
        return 'MyDate';
    }

    *[Symbol.iterator]() {
        for (const item of this[kItems]) {
            yield item;
        }
    }

    async *[Symbol.asyncIterator]() {
        const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));
        for (const item of this[kItems]) {
            await timeout(1000);
            yield item.toISOString();
        }
    }
}

const myDate = new MyDate([2020, 0o3, 0o1], [2019, 0o2, 0o1]);

const expectedDates = [new Date(2020, 0o3, 0o1), new Date(2019, 0o2, 0o1)];

// console.log('myDate', myDate);

assert.deepStrictEqual(Object.prototype.toString.call(myDate), '[object MyDate]');
assert.throws(() => myDate + 1, TypeError);

assert.deepStrictEqual(String(myDate), '01 de abril de 2020 e 01 de março de 2019');

assert.deepStrictEqual([...myDate], expectedDates);

;(async () => {
    for await (const item of myDate) {
        console.log('asyncIterator', item);
    }
})()

;(async () => {
    const dates = await Promise.all([...myDate])
    assert.deepStrictEqual(dates, expectedDates);
})()