//objetivo dos generators:
// fazer com que as funções virem listas
// entregando dados sob demanda e não todos de uma vez

// Os itens abaixo foram fornecidos pelo Copilot
// 1. simplificar a criação de iteradores
// 2. simplificar a criação de iteráveis
// 3. simplificar a criação de funções assíncronas

const assert = require('assert');

function* calculation(arg1, arg2) {
    yield arg1 * arg2;
}

function* main() {
    yield 'Hello';
    yield '-';
    yield 'World';
    // precisa do * pra delegar a execução para a função calculation
    yield* calculation(20, 10);
}

const generator = main();
// console.log(generator.next());
// console.log(generator.next());
// console.log(generator.next());
// console.log(generator.next());

assert.deepStrictEqual(generator.next(), { value: "Hello", done: false });
assert.deepStrictEqual(generator.next(), { value: "-", done: false });
assert.deepStrictEqual(generator.next(), { value: "World", done: false });
assert.deepStrictEqual(generator.next(), { value: 200, done: false });
assert.deepStrictEqual(generator.next(), { value: undefined, done: true });

assert.deepStrictEqual(Array.from(main()), ['Hello', '-', 'World', 200]);
assert.deepStrictEqual([...main()], ['Hello', '-', 'World', 200]);

// async iterators

const { readFile, stat, readdir } = require('fs/promises');

function* promisified() {
    yield readFile(__filename);
    yield Promise.resolve('Hey Dude');
}

// console.log([...promisified()]);
// Promise.all([...promisified()]).then(results => {
//     console.log('promisified', results);
// })

// ;(async () => {
//     for await (const item of promisified()) {
//         console.log('for await', item.toString());
//     }
// }
// )();


async function* systemInfo() {
    const file = await readFile(__filename);
    yield { file: file.toString() };

    const { size } = await stat(__filename);
    yield { size };

    const dir = await readdir(__dirname);
    yield { dir };
}

;(async () => {
    for await (const item of systemInfo()) {
        console.log('for await', item);
    }
}
)();