"use strict";

const {
  watch,
  promises: { readFile },
} = require("fs");

class File {
  watch(event, filename) {
    console.log("this", this);
    // console.log("arguments", arguments);
    console.log('arguments', Array.prototype.slice.call(arguments));
    this.showContent(filename);
  }

  async showContent(filename) {
    console.log((await readFile(__filename)).toString());
  }
}

const file = new File();
// ignora o this da classe File
// herda o this do watch
// porém queremos o this da classe file
// watch(__filename, file.watch);

// alternativa para não herdar o this do watch
// watch(__filename, (event, filename) => file.watch(event, filename));

// deixar explícito qual é o contexto que a função deve ter

// delegar função para que outra execute, usar o bind com o contexto desejado
// o bind retorna uma função com o this que se mantém de file, ignorando o do watch
// watch(__filename, file.watch.bind(file));

file.watch.call({ showContent: () => console.log("call: hey!") }, null, __filename);
file.watch.apply({ showContent: () => console.log("call: hey!") }, [null, __filename]);




// watch(__filename, async (event, filename) => {
//     }
// )
