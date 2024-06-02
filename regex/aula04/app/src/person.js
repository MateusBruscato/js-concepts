const { evaluateRegex } = require("./util");

class Person {
  // (\w+):\s.*,
  // $1

  constructor([
    nome,
    nacionalidade,
    estadoCivil,
    documento,
    rua,
    numero,
    bairro,
    cidade,
  ]) {
    // (\w+),
    // this.$1 = $1
    const firstLetterExp = evaluateRegex(/^(\w{1})([a-z|A-Z]+$)/g);
    const formatFirstLetter = (prop) => {
        return prop.replace(firstLetterExp, (match, grupo1, grupo2) => {
            return `${grupo1.toUpperCase()}${grupo2.toLowerCase()}`;
        });
    }

    const nonDigitExp = evaluateRegex(/\D/g);
    const formatDocument = (prop) => {
        return prop.replace(nonDigitExp, '');
    }

    this.nome = nome;
    this.nacionalidade = formatFirstLetter(nacionalidade);
    this.estadoCivil = formatFirstLetter(estadoCivil);
    this.documento = formatDocument(documento);

    // começa a procurar depois do " a " e pega tudo que tem a frente
    // (?<=  faz com que ignore tudo que estiver antes desse match)
    // conhecido como positive look behind
    this.rua = rua.match(evaluateRegex(/(?<=\sa\s).*$/)).join();
    this.numero = numero;
    this.bairro = bairro.replace(evaluateRegex(/^bairro\s?/i), "");
    this.cidade = cidade.replace(evaluateRegex(/\.$/), "");
  }
}

module.exports = Person;
