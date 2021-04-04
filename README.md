# API

## Project setup
```
npm install
```

## Run
```
npm start
```

## Sobre
1. O arquivo index.js contém a Api

* A configuração do banco vai aqui, cuidar para rodar no localhost, pois o front está requisitando neste host.

* Adicionar configurações do seu banco local

```
const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : '',
      database : 'goomer'
    },
    acquireConnectionTimeout: 10000
});
```
2. O arquivo updateRestStatus.js é um módulo responsável por atualizar se o restaurante está ou não aberto.

3. Para realizar testes na API siga a nomenclatura das colunas da tabela, como o exemplo abaixo:
* Utilizei o Insomnia para testar as requisições, porém, isso fica à critério de vocês! 
* Nesse exemplo utilizei a rota que cria e vincula um horário de funcionamento a um restaurante (horario_restaurante atua como uma chave estrangeira)
* Para mais informações a respeito do banco leia o README do banco de dados
```
URL: http://localhost:8080/create/times

{
	"horario_restaurante":"6",
	"horario_inicio":"14:10:00",
	"horario_fim":"18:30:00",
	"horario_semana":"0"
}
```
## Como melhorar a API

1. Criar token para o usuário.
2. Criar Models e Controllers para as ações (Fiz a API assim pois era mais prático nesse momento, sendo que não tinha muito tempo para perder).
3. Configurar politicas de Cors.
