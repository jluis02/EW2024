var express = require('express');
var router = express.Router();
var axios = require('axios')

// GET periodos listing.
router.get('/', function(req, res, next) {
    axios.get('http://localhost:3000/periodos?_sort=nome')
      .then(resp => {
          var periodos = resp.data
          res.status(200).render("periodosListPage", {title: "Periodos", "Periodos": periodos})
      })
      .catch(erro => {
          res.status(501).render("error", {error: erro})
      })
  });

// GET /periodos/add

router.get('/add', function(req, res, next) {
    res.status(200).render("periodoForm", {title: "Adicionar Periodo"})
});

// POST /periodos/add
router.post('/add', function(req, res, next) {
    axios.post('http://localhost:3000/periodos', req.body)
      .then(resp => {
          res.redirect("/periodos")
      })
      .catch(erro => {
          res.status(502).render("error", {error: erro})
      })
  });

// Get /peridoos/delete/:nome
router.get('/delete/:nome', function(req, res, next) {
    axios.delete('http://localhost:3000/periodos/' + req.params.nome)
      .then(resp => {
          res.redirect("/periodos")
      })
      .catch(erro => {
          res.status(503).render("error", {error: erro})
      })
  });

// GET periodo
router.get('/:nome', function(req, res, next) {
    axios.get('http://localhost:3000/compositores?_sort=nome')
      .then(resp => {
          var periodo = req.params.nome
          var compositores = resp.data.filter(compositor => compositor.periodo == periodo)          
          res.status(200).render("periodoPage", {title: "Periodo", "periodo": periodo, "compositores": compositores})
      })
      .catch(erro => {
          res.status(501).render("error", {error: erro})
      })
  });

module.exports = router;