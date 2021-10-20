const express = require('express');
require('express-async-errors');

const routes = require('./routes');
const cors = require('./app/middlewares/cors');
const errorHandler = require('./app/middlewares/error-handler');

const app = express();

app.use(express.json());
// CORS
app.use(cors);
app.use(routes);
// Error Handler (Middleware express) -> manipulador de erros nativo do express
app.use(errorHandler);

app.listen(3001, () => console.log('🔥 Server started at http://localhost:3001'));

// lifecicle de uma request
// request -> controller(method) -> response

// Middlewares
// manipular os objs de request e response, de uma forma que fique disponivel em todos controllers da aplicação, ou ter um controle mais minucioso, executar apenas para um grupo de rotas, ou uma rota específica
// tem o poder de controlar o lifecicle de uma request
// request -> Middlewares -> controller(method) -> response
