const { Router } = require('express');

const ContactController = require('./app/controllers/ContactController');
const CategoryController = require('./app/controllers/CategoryController');

const router = Router();

// Rotas de contatos
router.get('/contacts', ContactController.index);
router.get('/contacts/:id', ContactController.show);
router.delete('/contacts/:id', ContactController.delete);
router.post('/contacts', ContactController.store);
router.put('/contacts/:id', ContactController.update);

// Rotas de categorias
router.get('/categories', CategoryController.index);
router.get('/categories/:id', CategoryController.show);
router.put('/categories/:id', CategoryController.update);
router.post('/categories', CategoryController.store);
router.delete('/categories/:id', CategoryController.delete);

module.exports = router;

// iniciar docker
// 1º - iniciar: docker start pg
// 2º - docker exec -it pg bash
// 3º - psql -U root
// 4º - \c mycontacts
// 5º - parar: docker stop pg
