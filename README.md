###Como criar tabelas novas no jhipstewr

digite:

jhipster entity tabela2

Do you want to add a field to your entity? (Y/n)
tecle ENTER

What is the name of your field?
nome_do_campo

What is the type of your field? (Use arrow keys)
String
Integer
Long
Float
Double
BigDecimal
LocalDate

Do you want to add validation rules to your field? (y/N)
tecle ENTER

repete para todos os campos

ao final dos campos tecle `n`

Do you want to add a relationship to another entity? (Y/n) n

Overwrite src/main/resources/config/liquibase/master.xml? (ynaxdH) a

Abrir o arquivo `src/main/resources/config/application-dev.yml`

Colar o csv daquela tabela

DIGITAR NO PROMPT mvn
