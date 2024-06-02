const assert = require('assert');

//usado na maioria das vezes para listas de items únicos


const arr1 = ["0", "1", "2"];
const arr2 = ["2", "3", "4"];
const arr3 = arr1.concat(arr2);
// console.log('arr3', arr3.sort())

const set = new Set(arr3);
set.add("4");
set.add("5");
assert.deepStrictEqual(Array.from(set), ["0", "1", "2", "3", "4", "5"]);

// console.log('set.keys()', set.keys())
// console.log('set.values()', set.values()) // existe pela consistência com map

assert.deepStrictEqual(set.keys(), set.values());

// no array para saber se existe um item
// [1, 2, 3].includes(3)
// com set é has
assert.ok(set.has("3"));

// mesma "teoria" do map, mas vc trabalha com a lista toda
// como não tem chave e valor, você precisa saber o que está buscando


const users01 = new Set([
    'erick',
    'mariazinha',
    'joaozinho'
]);

const users02 = new Set([
    'erick',
    'joaozinho',
    'gabriel'
]);

const intersection = new Set([...users01].filter(user => users02.has(user)));
// console.log('intersection', intersection)
assert.deepStrictEqual(Array.from(intersection), ['erick', 'joaozinho']);

const diffOneFromTwo = new Set([...users01].filter(user => !users02.has(user)));
// console.log('diffOneFromTwo', diffOneFromTwo)
assert.deepStrictEqual(Array.from(diffOneFromTwo), ['mariazinha']);

const diffTwoFromOne = new Set([...users02].filter(user => !users01.has(user)));
// console.log('diffTwoFromOne', diffTwoFromOne)
assert.deepStrictEqual(Array.from(diffTwoFromOne), ['gabriel']);


// weakset
// mesmo conceito de weakmap
// não é iterável
// só trabalha com chaves como referência
// só tem métodos simples
// não tem size, clear, keys, values, entries

const user = { id: 123 };
const user2 = { id: 456 };

// só aceita objetos assim como o weakmap
const weakset = new WeakSet([user]);
weakset.add(user2);
console.log(weakset);
// console.log(weakset.has(user));
// console.log(weakset.delete(user));
// console.log(weakset.has(user));
