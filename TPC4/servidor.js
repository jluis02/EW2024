var http = require('http')
var axios = require('axios')
const { parse } = require('querystring');

var templates = require('./templates')
var static = require('./static.js')

function collectRequestBodyData(request, callback) {
    if (request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

var servidor = http.createServer((req, res) => {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if (static.staticResource(req)){
        static.serveStaticResource(req, res)
    }

    else {
        switch(req.method) {
            case "GET":
                // GET / --------------------------------------------------------------------
                if (req.url == "/") {
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write(templates.mainPage(d))
                    res.end()
                }

                // GET /compositores --------------------------------------------------------------------
                else if (req.url == "/compositores") {
                    axios.get('http://localhost:3000/compositores?_sort=nome')
                        .then(resp => {
                            compositores = resp.data
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write(templates.compositoresListPage(compositores, d))
                            res.end()
                        })
                        .catch(erro => {
                            res.writeHead(503, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write("<p>Não foi possível obter a lista de compositores..." + erro + "</p>")
                            res.end()
                        })
                }

                // GET /compositores/:id --------------------------------------------------------------------
                else if (/\/compositores\/C[0-9]+/.test(req.url)) {
                    var id = req.url.split("/")[2]
                    axios.get('http://localhost:3000/compositores/' + id)
                        .then(resp => {
                            compositor = resp.data
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write(templates.compositorPage(compositor, d))
                            res.end()
                        })
                        .catch(erro => {
                            res.writeHead(504, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write("<p>Não foi possível obter o compositor..." + erro + "</p>")
                            res.end()
                        })
                }

                // GET /compositores/edit/:id --------------------------------------------------------------------
                else if (/\/compositores\/edit\/C[0-9]+/.test(req.url)) {
                    var id = req.url.split("/")[3]
                    axios.get('http://localhost:3000/compositores/' + id)
                        .then(resp => {
                            compositor = resp.data
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write(templates.compositorEditForm(compositor, d))
                            res.end()
                        })
                        .catch(erro => {
                            res.writeHead(504, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write("<p>Não foi possível obter o compositor..." + erro + "</p>")
                            res.end()
                        })
                }

                // GET /compositores/delete/:id --------------------------------------------------------------------
                else if (/\/compositores\/delete\/C[0-9]+/.test(req.url)) {
                    var id = req.url.split("/")[3]
                    axios.delete('http://localhost:3000/compositores/' + id)
                        .then(resp => {
                            res.writeHead(301, {'Location': 'http://localhost:7777/compositores'})
                            res.end()
                        })
                        .catch(erro => {
                            res.writeHead(505, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write("<p>Não foi possível apagar o compositor..." + erro + "</p>")
                            res.end()
                        })
                }

                // GET /compositores/add
                else if (req.url == "/compositores/add") {
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write(templates.compositorFormPage(d))
                    res.end()
                }

                // GET /periodos --------------------------------------------------------------------
                else if (req.url == "/periodos") {
                    axios.get('http://localhost:3000/periodos?_sort=nome')
                        .then(resp => {
                            pedidos = resp.data
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write(templates.periodosListPage(pedidos, d))
                            res.end()
                        })
                        .catch(erro => {
                            res.writeHead(506, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write("<p>Não foi possível obter a lista de pedidos..." + erro + "</p>")
                            res.end()
                        })
                }

                // GET /periodos/delete/:id --------------------------------------------------------------------
                else if (/\/periodos\/delete\/\w+/.test(req.url)) {
                    var id = req.url.split("/")[3]
                    axios.delete('http://localhost:3000/periodos/' + id)
                        .then(resp => {
                            res.writeHead(301, {'Location': 'http://localhost:7777/periodos'})
                            res.end()
                        })
                        .catch(erro => {
                            res.writeHead(507, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write("<p>Não foi possível apagar o periodo..." + erro + "</p>")
                            res.end()
                        })
                }

                // GET /periodos/add
                else if (req.url == "/periodos/add") {
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write(templates.periodoFormPage(d))
                    res.end()
                }

                // GET /periodos/nome --------------------------------------------------------------------
                else if (/\/periodos\/[A-Za-z]+/.test(req.url)) {
                    var nome = req.url.split("/")[2]
                    axios.get('http://localhost:3000/compositores/')
                        .then(resp => {
                            periodo = resp.data
                            compositores = periodo.filter(compositor => compositor.periodo == nome)
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write(templates.periodoPage(nome, compositores))
                            res.end()
                        })
                        .catch(erro => {
                            res.writeHead(507, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write("<p>Não foi possível obter o periodo..." + erro + "</p>")
                            res.end()
                        })
                }
                
                // GET ? -> lançar um erro
                else {
                    res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write("<h1>Erro: " + req.url + " GET request não suportado.</h1>")
                    res.end()
                }

                break

            case "POST":
                // POST compositores/edit/:id --------------------------------------------------------------------
                if (/\/compositores\/edit\/C[0-9]+/.test(req.url)) {
                    var id = req.url.split("/")[3]
                    collectRequestBodyData(req, result => {
                        axios.put('http://localhost:3000/compositores/' + id, result)
                            .then(resp => {
                                res.writeHead(301, {'Location': 'http://localhost:7777/compositores/' + id})
                                res.end()
                            })
                            .catch(erro => {
                                res.writeHead(502, {'Content-Type': 'text/html; charset=utf-8'})
                                res.write("<p>Não foi possível editar o compositor..." + erro + "</p>")
                                res.end()
                            })
                    })
                }

                // POST /compositores/delete/:id --------------------------------------------------------------------
                else if (/\/compositores\/delete\/C[0-9]+/.test(req.url)) {
                    var id = req.url.split("/")[3]
                    axios.delete('http://localhost:3000/compositores/' + id)
                        .then(resp => {
                            res.writeHead(301, {'Location': 'http://localhost:7777/compositores'})
                            res.end()
                        })
                        .catch(erro => {
                            res.writeHead(503, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write("<p>Não foi possível apagar o compositor..." + erro + "</p>")
                            res.end()
                        })
                }

                // POST /compositores/add --------------------------------------------------------------------
                else if (req.url == "/compositores/add") {
                    collectRequestBodyData(req, result => {
                        axios.post('http://localhost:3000/compositores', result)
                            .then(resp => {
                                res.writeHead(301, {'Location': 'http://localhost:7777/compositores/' + resp.data.id})
                                res.end()
                            })
                            .catch(erro => {
                                res.writeHead(504, {'Content-Type': 'text/html; charset=utf-8'})
                                res.write("<p>Não foi possível adicionar o compositor..." + erro + "</p>")
                                res.end()
                            })
                    })
                }

                // POST /periodos/add --------------------------------------------------------------------
                else if (req.url == "/periodos/add") {
                    collectRequestBodyData(req, result => {
                        axios.post('http://localhost:3000/periodos', result)
                            .then(resp => {
                                res.writeHead(301, {'Location': 'http://localhost:7777/periodos/' + resp.data.nome})
                                res.end()
                            })
                            .catch(erro => {
                                res.writeHead(505, {'Content-Type': 'text/html; charset=utf-8'})
                                res.write("<p>Não foi possível adicionar o periodo..." + erro + "</p>")
                                res.end()
                            })
                    })
                }

                // POST ? -> Lancar um erro 
                else {
                    res.writeHead(502, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write("<h1>Erro: " + req.url + " POST request não suportado.</h1>")
                    res.end()
                }

                break

            default: 
                // Outros metodos nao sao suportados
                res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                res.write("<h1>Erro: " + req.method + " não suportado.</h1>")
                res.end()
                break
        }   
    }
})

servidor.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
    console.log("check http://localhost:7777")
})