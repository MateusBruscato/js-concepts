'use strict';

const assert = require('assert');

const myObj = {
    add(myValue) {
        return this.arg1 + this.arg2 + myValue;
    }
};

// myObj.add.apply({ arg1: 10, arg2: 20 }, [30]); // 60

// assert.deepStrictEqual(myObj.add.apply({ arg1: 10, arg2: 20 }, [30]), 60);

// um problema que pode acontecer mas é raro
// Function.prototype.apply = () => { console.log('aquii') };

myObj.add.apply = function () { throw new TypeError('Não pode ser sobrescrito'); };

// myObj.add.apply({ arg1: 10, arg2: 20 }, [30]); // TypeError: myObj.add.apply is not a function

assert.throws(() => {
    myObj.add.apply({}, []);
}
, {
    name: 'TypeError',
    message: 'Não pode ser sobrescrito'
});

// função que vai ser chamada, dps o this e dps os argumentos
const result = Reflect.apply(myObj.add, { arg1: 10, arg2: 20 }, [30]);
assert.deepStrictEqual(result, 60);


// ----

function MyDate() { }

// object modificando função
Object.defineProperty(MyDate, 'withObject', { value: () => 'Hey there!' });

// mais semântico
Reflect.defineProperty(MyDate, 'withReflection', { value: () => 'Hey you!' });

assert.deepStrictEqual(MyDate.withObject(), 'Hey there!');
assert.deepStrictEqual(MyDate.withReflection(), 'Hey you!');
// ----


// ---- delete property

const withDelete = { user: 'will' };
// delete withDelete.user;
Reflect.deleteProperty(withDelete, 'user');

assert.deepStrictEqual(withDelete.hasOwnProperty('user'), false);

// ----

// ---- get

// deveríamos fazer get apenas em instâcia de referência

assert.deepStrictEqual(1['userName'], undefined);

// com reflection
assert.throws(()=> Reflect.get(1, 'userName'), TypeError);

// ---- has

assert.ok('superman' in { superman: '' });

// com reflection

assert.ok(Reflect.has({ batman: '' }, 'batman'));

// ----

// ---- ownKeys

const user = Symbol('user');
const databaseUser = {
    id: 1,
    [Symbol.for('password')]: 123,
    [user]:
    {
        name: 'willian'
    }
};

const objectKeys = [
    ...Object.getOwnPropertyNames(databaseUser),
    ...Object.getOwnPropertySymbols(databaseUser)
];

// não lista symbols
// console.log(objectKeys)

assert.deepStrictEqual(objectKeys, ['id', Symbol.for('password'), user]);

const objectAllKeys = Reflect.ownKeys(databaseUser);

assert.deepStrictEqual(objectAllKeys, ['id', Symbol.for('password'), user]);
assert.deepStrictEqual(objectAllKeys, objectKeys);
