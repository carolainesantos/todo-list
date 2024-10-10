# TODO LIST Application - Segurança e Funcionalidades 💡

Visão Geral do Projeto
Este projeto é uma aplicação de gerenciamento de tarefas (TODO List) com sistema de login, desenvolvida com Node.js no backend e React com Vite no frontend.

Utilizamos o Sequelize como ORM para interagir com o banco de dados e o bcrypt para garantir a segurança das senhas dos usuários.

A aplicação foi construída com foco em segurança, implementando proteções contra as seguintes ameaças comuns em aplicações web:

SQL Injection <br>
Cross-Site Scripting (XSS) <br>
Cross-Site Request Forgery (CSRF) <br>

Abaixo, detalho as medidas de proteção implementadas em cada uma dessas áreas.

## Proteções Implementadas

<strong>1 - SQL Injection </strong> <br><br>
↪ Utilizando Sequelize: <br>
O Sequelize foi utilizado como ORM, o que automaticamente previne SQL Injection ao parametrizar todas as consultas ao banco de dados. <br>
Ele é um ORM (Object-Relational Mapper) que ajuda a interagir com o banco de dados de forma mais segura, convertendo as consultas SQL <br> para uma linguagem de objetos em JavaScript. <br>
Um dos principais benefícios do Sequelize é a proteção automática contra SQL Injection, que é uma das formas mais comuns de ataque. <br>

<strong>Como o Sequelize Protege Contra SQL Injection: </strong> <br>

Escapando de valores: <br>
Quando você usa Sequelize para fazer consultas, ele automaticamente escapa os valores passados nas queries.<br>
Isso significa que qualquer dado do usuário será tratado como uma string, impedindo que comandos maliciosos SQL sejam executados.

Consultas parametrizadas: Ao invés de você criar strings manuais de SQL como "SELECT \* FROM users WHERE name = '" + userInput + " ' ",<br>
que é vulnerável a injeções, o Sequelize permite que você passe os parâmetros de forma segura.

<br><strong>2 - Utilizando Bcrypt:</strong> <br>

Quando o usuário cria uma senha, o bcrypt gera um salt e usa esse salt para transformar a senha em um hash. <br>
Isso significa que, mesmo que dois usuários usem a mesma senha, os hashes gerados serão
diferentes porque o salt será único para cada senha.

Verificação segura: Ao logar, bcrypt faz o hash da senha que o usuário inseriu e compara com o hash
armazenado no banco de dados.
<br>
Isso garante que o servidor nunca armazene senhas em texto puro e dificulta muito para os atacantes tentarem descobrir a senha original a partir do hash.

Proteção contra força bruta: bcrypt é intencionalmente lento. <br>
Isso significa que, mesmo que um atacante tenha um hash, o processo para testar muitas senhas possíveis <br>(ataques de força bruta) é muito mais demorado do que com algoritmos de hash mais rápidos.
