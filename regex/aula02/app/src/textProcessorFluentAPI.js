// o objetivo do fluent API é executar tarefas
// como um pipeline, step by step
// e no final, chama o build. MUITO similar ao padrão Builder
// a diferença é que aqui é sobre o processos, o Builder sobre construção
// de objetos

class TextProcessorFluentAPI {
    //propriedade privada
    #content;
    constructor(content) {
        this.#content = content;
    }

    extractPeopleData() {
        // ?<= fala que extrair os dados que virão depois desse grupo (lookbehind)
        // [contratante|contratado] fala que pode ser contratante ou contratado e tem a flag i no fim para ser case insensitive (acho que não é totalmente verdade)
        // :\s{1} fala que tem que ter um : e um espaço
        // tudo acima fica dentro de um parenteses para ser um grupo e dizer "vamos pegar daí para frente"
        
        // (?!\s) (negative look around) fala que não pode ter um espaço em branco, para ignorarmos os contratantes no fim do documento
        // .*\n pega tudo até o primeiro \n
        // .*? (non greety), o ? faz com que ele pare na primeira recorrencia, assim evitar ficar em loop
        
        // $ informa que a pesquisa acaba no fim da linha

        // g -> global
        // m -> multiline
        // i -> case insensitive
        
        const matchPerson = /(?<=[contratante|contratado]:\s{1})(?!\s)(.*\n.*)$/gmi;
        
        //faz o match para encontrar a string inteira que contem o dado e vai retornar como array
        const onlyPerson = this.#content.match(matchPerson);
        this.#content = onlyPerson;
        return this;
    }

    build(){
        return this.#content;
    }
}

module.exports = TextProcessorFluentAPI;