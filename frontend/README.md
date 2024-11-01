# TODO List Application - Segurança e Funcionalidades

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

## Implementação de MFA (Autenticação de Múltiplos Fatores)

A segurança da sua conta é nossa prioridade! Para garantir uma camada extra de proteção, implementamos a <br> Autenticação de Múltiplos Fatores (MFA). Com o MFA, além de fornecer suas credenciais de login (email e senha),<br> você receberá um código de verificação único por email, que deverá ser inserido para concluir o processo de login. <br>

### Requisitos

Para que a funcionalidade de MFA funcione corretamente, você precisará instalar a biblioteca Nodemailer. <br>
O Nodemailer é uma ferramenta que permite o envio de emails de forma fácil e eficiente a partir do seu aplicativo Node.js.

### Instalando o Nodemailer

Você pode instalar o Nodemailer usando npm ou yarn. <br>
Execute um dos seguintes comandos no terminal do seu projeto:

```bash
npm install nodemailer
```

Ou então:

```bash
yarn add nodemailer
```

**Configuração do Maildev**

Para visualizar os emails enviados, você precisa ter o Maildev em execução.<br>
O Maildev é uma ferramenta simples para testar emails durante o desenvolvimento.

Certifique-se de que o container do Docker com o Maildev esteja rodando. Se ainda não o fez, você pode iniciar o Maildev com o seguinte comando:

```bash
docker run -p 1080:1080 -p 25:25 maildev/maildev
```

**Após iniciar o container, você poderá acessar a interface do Maildev através do seu navegador em http://localhost:1080.
Visualizando os Emails Enviados.<br>
Uma vez que o Maildev esteja em execução e o Nodemailer configurado corretamente na sua aplicação,<br>
todos os emails enviados serão capturados pelo Maildev. Você poderá visualizá-los na interface da web do Maildev. <br>
Isso facilita a verificação e depuração dos emails que estão sendo enviados pela sua aplicação.**

Nota
Certifique-se de que o container do Docker com o Maildev esteja sempre ativo enquanto estiver testando o envio de emails.<br>
Caso contrário, os emails não serão enviados corretamente.

### Como Funciona a MFA na Aplicação

1. Quando um usuário tenta fazer login, o sistema verifica suas credenciais (email e senha).
2. Se as credenciais estiverem corretas, um código de verificação aleatório de 6 dígitos será gerado e enviado ao email do usuário.
3. O usuário receberá um email contendo o código e deverá inseri-lo na aplicação para concluir o login.
4. O código de verificação terá um tempo de expiração de 10 minutos para aumentar a segurança.
