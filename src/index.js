const express = require('express');
require('express-async-errors');

const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(routes);
app.listen(3000, () => console.log('🔥 Server started at http://localhost:3000'));

// Error Handler (Middleware express) -> manipulador de erros nativo do express
app.use((error, request, response, next) => {
  console.log(error);
  response.sendStatus(500);
});

// lifecicle de uma request
// request -> controller(method) -> response

// Middlewares
// manipular os objs de request e response, de uma forma que fique disponivel em todos controllers da aplicação, ou ter um controle mais minucioso, executar apenas para um grupo de rotas, ou uma rota específica
// tem o poder de controlar o lifecicle de uma request
// request -> Middlewares -> controller(method) -> response
