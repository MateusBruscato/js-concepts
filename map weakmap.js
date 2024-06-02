const assert = require('assert');
const myMap = new Map();

//pode ter qualquer coisa como chave
myMap
    .set(1, 'one')
    .set('string', 'two')
    .set(true, ()=>'three');

// console.log('myMap', myMap);

// usando construtor
const myMapWithConstructor = new Map([
    [1, 'one'],
    ['string', 'two'],
    [true, 'three']
]);


assert.deepStrictEqual(myMap.get(1), 'one');
assert.deepStrictEqual(myMap.get('string'), 'two');
assert.deepStrictEqual(myMap.get(true)(), 'three');


// em objetos a chave só pode ser string ou symbol (number é convertido para string)

const onlyReferenceWorks = { id: 1 };
myMap.set(onlyReferenceWorks, { name: 'Mateus' });
// console.log('myMap', myMap.get({ id: 1 }));
// console.log('myMap', myMap.get(onlyReferenceWorks));

assert.deepStrictEqual(myMap.get({ id: 1 }), undefined);
assert.deepStrictEqual(myMap.get(onlyReferenceWorks), { name: 'Mateus' });

//utilitários
// em um Object para pegar o length seria Object.keys().length
// em um Map é só .size
assert.deepStrictEqual(myMap.size, 4);

// para verificar se um item existe
// uma maneira
// item.key = se não existe retorna undefined
// if() = coerção implicita para boolean e retorna false
// outra maneira
// Object tem o hasOwnProperty
assert.ok(myMap.has(onlyReferenceWorks));
assert.ok(myMap.has(1));

// para remover
// no Object
// delete item.key
// no Map
// map.delete(key)
assert.ok(myMap.delete(onlyReferenceWorks));

//Não dá para iterar em um Object
// tem que converter para array com Object.entries
// ou usar for in
// console.log([...myMap]);
assert.deepStrictEqual(
    JSON.stringify([...myMap]),
    JSON.stringify([[1, 'one'], ['string', 'two'], [true, () => 'three']])
);

// for (const [key, value] of myMap) {
//     console.log({ key, value });
// }

// Object é inseguro, pois dependendo do nome da chave pode sobrescrever um método padrão
// ({ }).toString() === '[object Object]'
// ({ toString: () => 'Hey' }).toString() === 'Hey'

// qualquer chave pode colidir com as propriedades herdadas do objeto, como
// constructor, toString, hasOwnProperty, valueOf, etc

// Map é mais seguro

const actor = {
    name: 'Xuxa da Silva',
    toString: 'Queen: Xuxa'
}

myMap.set(actor);

assert.ok(myMap.has(actor));

assert.deepStrictEqual(myMap.get(actor), undefined);
assert.throws(() => myMap.get(actor).toString, TypeError);

// Não dá pra limpar um Object sem recriá-lo/reassina-lo

myMap.clear();
assert.deepStrictEqual([...myMap.keys()], []);

// WeakMap
// Só aceita objetos como chave
// não é enumerável
// não tem como limpar o WeakMap
// não tem como saber o tamanho
// não tem como iterar

// pode ser coletado pelo garbage collector se não tiver mais referência
// mais leve e preve a vazamento de memória, pq depois que as instancias são destruídas
// o WeakMap é destruído junto

const weakMap = new WeakMap();
const hero = { name: 'Flash' };

weakMap.set(hero, 'Barry Allen');
// console.log(weakMap.get(hero));
// console.log(weakMap.delete(hero ));
// console.log(weakMap.has(hero));

assert.deepStrictEqual(weakMap.has(hero), true);
assert.deepStrictEqual(weakMap.get(hero), 'Barry Allen');
assert.deepStrictEqual(weakMap.delete(hero), true);