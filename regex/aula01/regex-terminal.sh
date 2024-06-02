# a partir da pasta raiz

find . -name *.test.js

find . -name *.test.js -not -path '*node_modules**'

fin . -name *.js -not -path '*node_modules**'

npm i -g ipt

find . -name *.js -not -path '*node_modules**' | ipt

cp -r ../../modulo01/aula05-tdd-desafio-resolvido

CONTENT="'use strict';"

find . -name *.js -not -path '*node_modules**' \
| ipt -o \
| xargs -I '{file}' sed -i "" -e '1s/^/\'$CONTENT'\
\g' {file}

#1s => primeira linha
#^ => inicio da linha
# substituir por $CONTENT
# quebrou a linha par adiconar um \n implicito

#substitui tudo
find . -name *.js -not -path '*node_modules**' \
| xargs -I '{file}' sed -i "" -e '1s/^/\'$CONTENT'\
\g' {file}

