//herança é dada pelo prototype
const assert = require('assert');
const obj = {};
const arr = [];
const func = () => {};

//internamente, objetos literais viram funções explicitas
console.log('new Object() is {}?', new Object().__proto__ === {}.__proto__);
assert.deepStrictEqual(new Object().__proto__, {}.__proto__);

// __proto__ é a referência do objeto que posssui as propriedades nele
console.log("obj.__proto__ === Object.prototype", obj.__proto__ === Object.prototype);
assert.deepStrictEqual(obj.__proto__, Object.prototype);

console.log("arr.__proto__ === Array.prototype", arr.__proto__ === Array.prototype);
assert.deepStrictEqual(arr.__proto__, Array.prototype);

console.log("func.__proto__ === Function.prototype", func.__proto__ === Function.prototype);
assert.deepStrictEqual(func.__proto__, Function.prototype);

// o __proto__ de Object.prototype é null
console.log("obj.__proto__.__proto__ === null", obj.__proto__.__proto__ === null);

//antes das classes do ES6, herança era feita via função, e não via __proto__

function Employee() {}
Employee.prototype.salary = () => "salary**";

console.log('Employee.prototype.salary()', Employee.prototype.salary());

function Supervisor() {}
// herda a instância de Employee
Supervisor.prototype = Object.create(Employee.prototype);
console.log('Supervisor.prototype.salary()', Supervisor.prototype.salary());

// especialização Supervisor
Supervisor.prototype.profitShare = () => "profitShare**";
console.log('Supervisor.prototype.profitShare()', Supervisor.prototype.profitShare());

function Manager() {}
Manager.prototype = Object.create(Supervisor.prototype);

// herda a instância de Supervisor
console.log('Manager.prototype.profitShare()', Manager.prototype.profitShare());

Manager.prototype.monthlyBonuses = () => "monthlyBonuses**";

// podemos cahamar via prototype, mas se tentar chamar direto dá erro
console.log('Manager.prototype.salary()', Manager.prototype.salary());
// console.log('Manager.salary()', Manager.salary()); // erro

// se não chamar o new, o primeiro __proto__ vai ser sempre
// a instância de Function, sem herdar nossas funções
// Para acessar as funções sem o new, pode acessar diretamente via prototype

console.log("Manager.prototype.__proto__ === Supervisor.prototype", Manager.prototype.__proto__ === Supervisor.prototype); // true
assert.deepStrictEqual(Manager.prototype.__proto__, Supervisor.prototype);

// quando chamamos com o `new`, o __proto__ recebe o prototype como referencia
console.log("new Manager().__proto__", new Manager().__proto__);
console.log("new Manager().salary()", new Manager().salary());

// console.log(new Manager().prototype); // undefined
// console.log(Manager.prototype); // Manager {}
// console.log(new Manager().__proto__); // Manager {}
// Se não chamar o `new`, não tem herança, só o que está em Manager.prototype

console.log("Supervisor.prototype === new Manager().__proto__.__proto__", Supervisor.prototype === new Manager().__proto__.__proto__); // true
assert.deepStrictEqual(Supervisor.prototype, new Manager().__proto__.__proto__); // true

const manager = new Manager();
console.log('manager.salary()', manager.salary());
console.log('manager.profitShare()', manager.profitShare());
console.log('manager.monthlyBonuses()', manager.monthlyBonuses());

// console.log('manager.__proto__', manager.__proto__);
// console.log('manager.__proto__.__proto__', manager.__proto__.__proto__);
// console.log('manager.__proto__.__proto__.__proto__', manager.__proto__.__proto__.__proto__);
// console.log('manager.__proto__.__proto__.__proto__.__proto__', manager.__proto__.__proto__.__proto__.__proto__);
// console.log('manager.__proto__.__proto__.__proto__.__proto__.__proto__', manager.__proto__.__proto__.__proto__.__proto__.__proto__);

assert.deepStrictEqual(manager.__proto__, Manager.prototype);
assert.deepStrictEqual(manager.__proto__.__proto__, Supervisor.prototype);
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__, Employee.prototype);
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__.__proto__, Object.prototype);
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__.__proto__.__proto__, null);

//--------------------------------------------

class T1 {
  ping() { return "ping"; }
}

class T2 extends T1 {
  pong() { return "pong"; }
}

class T3 extends T2 {
  shoot() { return "shoot"; }
}

// com new o __proto__ aponta para o prototype
// sem o new, o __proto__ aponta para a função em si


const t3 = new T3();

console.log('t3 inherits null?', t3.__proto__.__proto__.__proto__.__proto__.__proto__ === null);
console.log(t3.ping());
console.log(t3.pong());
console.log(t3.shoot());

assert.deepStrictEqual(t3.__proto__, T3.prototype);
assert.deepStrictEqual(t3.__proto__.__proto__, T2.prototype);
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__, T1.prototype);
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__.__proto__, Object.prototype);
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__.__proto__.__proto__, null);
