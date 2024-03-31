var express = require('express');
var router = express.Router();
var Compositor = require("../controllers/compositores");
const compositor = require('../models/compositor');

// Get /compositores/periodos
router.get('/periodos', function(req, res, next) {
  Compositor.list()
    .then(compositores => {
      const periodosDict = getPeriodos(compositores);
      res.render('periodosListPage', {title: 'Lista de periodos', periodos: periodosDict});
    }).catch(erro => {
      res.render('error', {error: erro, message: 'Erro ao obter a lista de periodos'});
    });
});

// GET /compositores
router.get('/', function(req, res, next) {
  Compositor.list(req, res)
    .then(compositores => {
      res.render('compositoresListPage', { title: 'Compositores', compositores: compositores });
    }).catch(err => {
      res.render('error', { error: err });
    });
});

// GET /compositoes/Add
router.get('/add', function(req, res, next) {
  res.render('compositorForm', {title: 'Adicionar Compositor' });
});

// GET /compositores/:id
router.get('/:id', function(req, res, next) {
  Compositor.findById(req.params.id)
    .then(compositor => {
      res.render('compositorPage', {title: 'Compositor', compositor: compositor});
    }).catch(err => {
      res.render('error', { error: err });
    });
});

// GET /composites/edit/:id
router.get('/edit/:id', function(req, res, next) {
  Compositor.findById(req.params.id).then(compositor => {
    res.render('compositorEditForm', { title: 'Editar Compositor', compositor: compositor, id_changeable: false});
  }).catch(err => {
    res.render('error', { error: err });
  });
});

// GET /compositoes/delete/:id
router.get('/delete/:id', function(req, res, next) {
  Compositor.removeById(req.params.id)
    .then(() => {
      res.redirect('/compositores');
    }).catch(err => {
      res.render('error', { error: err });
    });
});

// POST /compositores/add
router.post('/add', function(req, res, next) {
  Compositor.insert(req.body).then(() => {
    res.redirect('/compositores');
  }).catch(err => {
    res.render('error', { error: err});
  });
});

// POST /compositores/edit/:id
router.post('/edit/:id', function(req, res, next) {
  Compositor.update(req.params.id, req.body).then(() => {
    res.redirect('/compositores');
  }).catch(err => {
    res.render('error', { error: err });
  });
});

// POST /compositores/delete/:id
router.post('/delete/:id', function(req, res, next) {
  Compositor.removeById(req.params.id).then(() => {
    res.redirect('/compositores');
  }).catch(err => {
    res.render('error', { error: err });
  });
})

// Função para obter os períodos
function getPeriodos(compositores) {
  const periodosDict = {};
  compositores.forEach(compositor => {
    if(!periodosDict[compositor.periodo]) {
      periodosDict[compositor.periodo] = [];
    }
    periodosDict[compositor.periodo].push(compositor);
  });
  return periodosDict;
}

module.exports = router;