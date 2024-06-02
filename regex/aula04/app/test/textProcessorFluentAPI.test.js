const { describe, it } = require("mocha");
const { expect } = require("chai");
const TextProcessorFluentAPI = require("../src/textProcessorFluentAPI");
const mock = require("./mock/valid");

describe("TextProcessorFluentAPI test suite", () => {
  it("#build", () => {
    const result = new TextProcessorFluentAPI(mock).build();
    expect(result).to.be.equal(mock);
  });

  it("#extractPeopleData", () => {
    const result = new TextProcessorFluentAPI(mock).extractPeopleData().build();

    const expected = [
      [
        "Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e ",
        "domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo. ",
      ].join("\n"),
      [
        "Júlia Menezes, brasileira, solteira, CPF 297.947.800-81, residente e ",
        "domiciliada a Av. dos Estados, 99, bairro Jardins, São Paulo. ",
      ].join("\n"),
    ];

    expect(result).to.be.deep.equal(expected);
  });

  it("#DivideTextInColumns", () => {
    const content = [
      [
        "Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e ",
        "domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo. ",
      ].join("\n"),
      [
        "Júlia Menezes, brasileira, solteira, CPF 297.947.800-81, residente e ",
        "domiciliada a Av. dos Estados, 99, bairro Jardins, São Paulo. ",
      ].join("\n"),
    ];

    const result = new TextProcessorFluentAPI(content)
      .divideTextInColumns()
      .build();

    const expected = [
      [
        "Xuxa da Silva",
        " brasileira",
        " casada",
        " CPF 235.743.420-12",
        " residente e \ndomiciliada a Rua dos bobos",
        " zero",
        " bairro Alphaville",
        " São Paulo. ",
      ],
      [
        "Júlia Menezes",
        " brasileira",
        " solteira",
        " CPF 297.947.800-81",
        " residente e \ndomiciliada a Av. dos Estados",
        " 99",
        " bairro Jardins",
        " São Paulo. ",
      ],
    ];

    expect(result).to.be.deep.equal(expected);
  });

  it('#removeEmptyValues', () => {
    const content = [
      [
        "Xuxa da Silva",
        " brasileira",
        " casada",
        " CPF 235.743.420-12",
        " residente e \ndomiciliada a Rua dos bobos",
        " zero",
        " bairro Alphaville",
        " São Paulo. ",
      ],
      [
        "Júlia Menezes",
        " brasileira",
        " solteira",
        " CPF 297.947.800-81",
        " residente e \ndomiciliada a Av. dos Estados",
        " 99",
        " bairro Jardins",
        " São Paulo. ",
      ],
    ];

    const result = new TextProcessorFluentAPI(content)
    .removeEmptyValues()
    .build();

    const expected = [
      [
        "Xuxa da Silva",
        "brasileira",
        "casada",
        "CPF 235.743.420-12",
        "residente e domiciliada a Rua dos bobos",
        "zero",
        "bairro Alphaville",
        "São Paulo.",
      ],
      [
        "Júlia Menezes",
        "brasileira",
        "solteira",
        "CPF 297.947.800-81",
        "residente e domiciliada a Av. dos Estados",
        "99",
        "bairro Jardins",
        "São Paulo.",
      ],
    ];

    expect(result).to.be.deep.equal(expected);
  });

  it("#mapPerson", () => {
    const content = [
      [
        "Xuxa da Silva",
        "brasileira",
        "casada",
        "CPF 235.743.420-12",
        "residente e domiciliada a Rua dos bobos",
        "zero",
        "bairro Alphaville",
        "São Paulo.",
      ],
      [
        "Júlia Menezes",
        "brasileira",
        "solteira",
        "CPF 297.947.800-81",
        "residente e domiciliada a Av. dos Estados",
        "99",
        "bairro Jardins",
        "São Paulo.",
      ],
    ];

    const result = new TextProcessorFluentAPI(content).mapPerson().build();

    const expected = [
      {
        nome: "Xuxa da Silva",
        nacionalidade: "Brasileira",
        estadoCivil: "Casada",
        documento: "23574342012",
        rua: "Rua dos bobos",
        numero: "zero",
        bairro: "Alphaville",
        cidade: "São Paulo",
      },
      {
        nome: "Júlia Menezes",
        nacionalidade: "Brasileira",
        estadoCivil: "Solteira",
        documento: "29794780081",
        rua: "Av. dos Estados",
        numero: "99",
        bairro: "Jardins",
        cidade: "São Paulo",
      },
    ];

    expect(result).to.be.deep.equal(expected);

  });

});
