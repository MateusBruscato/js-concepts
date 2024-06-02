const { describe, it } = require("mocha");
const { expect } = require("chai");
const { InvalidRegexError, evaluateRegex } = require("../src/util");

describe("Util test suite", () => {
  it("#evaluateRegex should throw an InvalidRegexError", () => {
    const unsafeRegex = /^([a-z|A-Z|0-9]+\s?)+$/;
    /* time \
    node --eval "/^([a-z|A-Z|0-9]+\s?)+$/.test('eaaae man como vai voce e como vai voce?') && console.log('legalzin')"
    catastrophic backtracking
    */
    expect(() => evaluateRegex(unsafeRegex)).to.throw(InvalidRegexError, `This ${unsafeRegex} is unsafe!`);
  });

  it("#evaluateRegex should return the regex", () => {
    const safeRegex = /^([a-z])$/;
    const result = evaluateRegex(safeRegex);
    expect(()=> evaluateRegex(safeRegex)).to.not.throw();
    expect(result).to.be.equal(safeRegex);
  });
});
