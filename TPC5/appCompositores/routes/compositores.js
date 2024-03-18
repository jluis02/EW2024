var express = require('express');
var router = express.Router();
var axios = require('axios')

// GET compositores listing
router.get('/', function(req, res, next) {
    axios.get('http://localhost:3000/compositores?_sort=nome')
      .then(resp => {
          var compositores = resp.data
          res.status(200).render("compositoresListPage", {title: "Compositores","Compositores": compositores})
      })
      .catch(erro => {
          res.status(501).render("error", {error: erro})
      })
  });

// GET /compositores/add
router.get('/add', function(req, res, next) {
    res.status(200).render("compositorForm", {title: "Adicionar Compositor"})
});

// POST /compositores/add
router.post('/add', function(req, res, next) {
    axios.post('http://localhost:3000/compositores', req.body)
      .then(resp => {
          res.redirect('/compositores')
      })
      .catch(erro => {
          res.status(501).render("error", {error: erro})
      })
});

// GET /compositores/delete/:id
router.get('/delete/:id', function(req, res, next) {
    axios.delete('http://localhost:3000/compositores/' + req.params.id)
      .then(resp => {
          res.redirect('/compositores')
      })
      .catch(erro => {
          res.status(501).render("error", {error: erro})
      })
});

// GET /compositores/edit/:id
router.get('/edit/:id', function(req, res, next) {
    axios.get('http://localhost:3000/compositores/' + req.params.id)
      .then(resp => {
          var compositor = resp.data
          res.status(200).render("compositorEditForm", {title: "Editar Compositor", "compositor": compositor})
      })
      .catch(erro => {
          res.status(501).render("error", {error: erro})
      })
});

// POST /compositores/edit/:id
router.post('/edit/:id', function(req, res, next) {
    axios.put('http://localhost:3000/compositores/' + req.params.id, req.body)
      .then(resp => {
          res.redirect('/compositores')
      })
      .catch(erro => {
          res.status(501).render("error", {error: erro})
      })
});

// GET /compositores/:id
router.get('/:id', function(req, res, next) {
    axios.get('http://localhost:3000/compositores/' + req.params.id)
      .then(resp => {
          var compositor = resp.data
          res.status(200).render("compositorPage", {title: "Compositor", "compositor": compositor})
      })
      .catch(erro => {
          res.status(501).render("error", {error: erro})
      })
});

module.exports = router;