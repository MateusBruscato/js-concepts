const item = {
    name: "Mateus Bruscato",
    age: 28,
    //string: se não for tipo primitivo, o valueOf é chamado
    toString: function() {
        return `Name: ${this.name}, Age: ${this.age}`
    },
    //number: se não for tipo p rimitivo, o toString é chamado
    valueOf: function() {
        // return this.age
        return { name: 'hey' }
    },
    //tem prioridade sobre os outros dois
    [Symbol.toPrimitive]: function(coercionType) {
        // console.log('Trying to convert to', coercionType)
        const types = {
            string: JSON.stringify(this),
            number: 1050
        }
        return types[coercionType] || types.string
    }
}

// //coerção implícita toString
// console.log('item', item + 0)

// //valueOf vem antes de toString, se valueOf não retornar nenhum tipo primitivo, o toString é chamado
// console.log('item', item + 1)

// //vai chamar o toString
// console.log('item', ''.concat(item))

// //coerção explícita
console.log('toString', String(item))
// console.log('valueOf', Number(item))

//se valueOf retornar um objeto, o toString é chamado
//vai retornar Nan pois o toString retorno uma string
console.log('valueOf', Number(item))

//Data
//no Symbol.toPrimitive, o tipo de coerção seria "boolean" ou deafault
console.log('valueOf', new Date(item))

console.assert(item + 0 === '{"name":"Mateus Bruscato","age":28}0')

// converting to default
// console.log('!!item', !!item)
console.assert(!!item)


// toString
console.log('string.concat', 'ae'.concat(item))
console.assert('ae{"name":"Mateus Bruscato","age":28}')

console.log('coerção explicita e implicita usando ==', item == String(item))
console.assert(item == String(item))

const item2 = { ...item, name: "outro nome", age: 20 }
console.log('item2', item2)

console.assert(item2.age === 20 && item2.name === 'outro nome')

// let myObject = {
//     valueOf: function() {
//         return 42; // returning a primitive value
//     },
//     toString: function() {
//         return "3.14"; // returning a string
//     }
// };

// console.log(Number(myObject)); // Output: 42

// In this example, valueOf() returns the number 42, so Number(myObject) will simply return 42. The toString() method is not called in this case.




