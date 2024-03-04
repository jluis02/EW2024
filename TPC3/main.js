var http = require("http")
var url = require("url")
var axios = require("axios")

function genMovieBlock(movie) {
    return `
    <a
        class="p-4 bg-neutral-800 rounded-lg w-[22rem] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all space-y-2"
        href="/filmes/${movie.id}"
    >                
        <div class="space-y-1">
            <p class="text-2xl font-bold text-neutral-100">${movie.title}</p>
            ${movie.genres && movie.genres.length > 0 ? `<p class="text-neutral-300">${movie.genres.join(", ")}</p>` : ''}
        </div>
        <div class="flex font-medium text-neutral-300 space-x-2 items-center">
            <i class="bi bi-calendar"></i>
            <span>${movie.year}</span>
        </div>
        ${movie.cast && movie.cast.length > 0 ? 
            `
            <div class="flex font-medium text-neutral-300 space-x-2 items-center">
                <i class="bi bi-people-fill"></i>
                <span>${movie.cast.slice(0, 2).join(", ")}${movie.cast.length > 2 ? ', ...' : ''}</span>
            </div>
            `
            : ''
        }                   
    </a>
    `
}

function genMoviesPage(movies) {
    return `
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <script src="https://cdn.tailwindcss.com"></script>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
            <title>American Movies</title>
        </head>
        <body class="flex flex-col h-screen justify-between bg-neutral-900" style="font-family: Inter, sans-serif;">
            <header class="w-full bg-neutral-800 shadow-sm text-red-500 font-medium text-3xl p-4 flex space-x-3 place-content-center items-center">
                <i class="bi bi-film"></i>
                <h1>American Movies</h1>
            </header>

            <main class="py-12 grid grid-cols-4 gap-4 mb-auto mx-auto overflow-y-scroll overflow-x-auto text-neutral-200">
                ${movies.length > 0 ? movies.map(m => genMovieBlock(m)).join("\n") : `<p>No movies found</p>`}
            </main>

        </body>
    </html>
    `
}

function genLink(name) {
    return name.replaceAll(" ", "_")
}

function getNameFromLink(link) {
    return link.replaceAll("_", " ")
}

function genMoviePage(movie) {
    return `
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <script src="https://cdn.tailwindcss.com"></script>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
            <title>American Movies</title>
        </head>
        <body class="flex flex-col h-screen justify-between bg-neutral-900" style="font-family: Inter, sans-serif;">
            <header class="w-full bg-neutral-800 shadow-sm text-red-500 font-medium text-3xl p-4 flex space-x-3 place-content-center items-center">
                <i class="bi bi-film"></i>
                <h1>American Movies</h1>
            </header>

            <main class="px-40 py-12 mb-auto mx-auto overflow-y-scroll overflow-x-auto space-y-12">
                <div class="space-y-8 border-b-4 border-red-500 pb-12">
                    <p class="text-6xl font-bold text-neutral-100">${movie.title}</p>
                    ${movie.genres.length > 0 ?
                        `
                        <div class="flex text-2xl text-neutral-300 place-content-between underline">
                            ${movie.genres.map(g => `<a href="/genres/${genLink(g)}">${g}</a>`).join("\n")}
                        </div>
                        `
                        : ''
                    }           
                </div>
                ${movie.cast.length > 0 ?
                    `
                    <div class="flex items-center space-x-4 text-4xl text-neutral-200 font-medium">
                        <i class="bi bi-people-fill"></i>
                        <p>Cast</p>
                    </div>
                    <div class="grid grid-cols-3 gap-6 underline text-xl text-center text-neutral-200">
                        ${movie.cast.map(cm => `<a href="/actors/${genLink(cm)}">${cm}</a>`).join("\n")}
                    </div>
                    `
                    : ''
                }
            </main>

        </body>
    </html>
    `
}

function genGenresPage(genres) {
    return `
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <script src="https://cdn.tailwindcss.com"></script>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
            <title>American Movies</title>
        </head>
        <body class="flex flex-col h-screen justify-between bg-neutral-900" style="font-family: Inter, sans-serif;">
            <header class="w-full bg-neutral-800 shadow-sm text-red-500 font-medium text-3xl p-4 flex space-x-3 place-content-center items-center">
                <i class="bi bi-film"></i>
                <h1>American Movies</h1>
            </header>

            <main class="grid grid-cols-4 gap-12 text-center font-medium text-lg py-12 mb-auto mx-auto overflow-y-scroll overflow-x-auto text-neutral-200 underline">
                ${genres.map(g => `<a href="/genres/${genLink(g)}">${g}</a>`).join("\n")}
            </main>

        </body>
    </html>
    `
}

function genActorsPage(actors) {
    return `
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <script src="https://cdn.tailwindcss.com"></script>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
            <title>American Movies</title>
        </head>
        <body class="flex flex-col h-screen justify-between bg-neutral-900" style="font-family: Inter, sans-serif;">
            <header class="w-full bg-neutral-800 shadow-sm text-red-500 font-medium text-3xl p-4 flex space-x-3 place-content-center items-center">
                <i class="bi bi-film"></i>
                <h1>American Movies</h1>
            </header>

            <main class="grid grid-cols-4 gap-12 text-center font-medium text-lg py-12 mb-auto mx-auto overflow-y-scroll overflow-x-auto text-neutral-200 underline">
                ${actors.map(a => `<a href="/actors/${genLink(a)}">${a}</a>`).join("\n")}
            </main>

        </body>
    </html>
    `
}

http.createServer((request, response) => {
    var q = url.parse(request.url, true)
    response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})

    if (q.pathname == "/filmes") {
        axios.get("http://localhost:3000/filmes?_sort=title")
            .then((resp) => {
                var data = resp.data
                response.write(genMoviesPage(data))
                response.end()
            })
            .catch((err) => {
                console.log("Erro: " + err)
                response.write("<p>" + err + "</p>")
            })
    }
    else if (q.pathname.startsWith("/filmes/")) {
        axios.get("http://localhost:3000/filmes?id=" + q.pathname.split("/")[2])
            .then((resp) => {
                var data = resp.data
                response.write(genMoviePage(data[0]))
                response.end()
            })
            .catch((err) => {
                console.log("Erro: " + err)
                response.write("<p>" + err + "</p>")
            })
    }
    else if (q.pathname == "/genres") {
        axios.get("http://localhost:3000/filmes")
            .then((resp) => {
                response.write(genGenresPage([...new Set(resp.data.flatMap(m => m.genres))].filter(g => g != undefined)))
                response.end()
            })
            .catch((err) => {
                console.log("Erro: " + err)
                response.write("<p>" + err + "</p>")
            })
    }
    else if (q.pathname.startsWith("/genres/")) {
        axios.get("http://localhost:3000/filmes")
            .then((resp) => {
                var data = resp.data
                response.write(genMoviesPage(data.filter(m => m.genres && m.genres.includes(getNameFromLink(q.pathname.split("/")[2])))))
                response.end()
            })
            .catch((err) => {
                console.log("Erro: " + err)
                response.write("<p>" + err + "</p>")
            })
    }
    else if (q.pathname == "/actors") {
        axios.get("http://localhost:3000/filmes")
            .then((resp) => {
                response.write(genActorsPage([...new Set(resp.data.flatMap(m => m.cast))].filter(a => a != undefined)))
                response.end()
            })
            .catch((err) => {
                console.log("Erro: " + err)
                response.write("<p>" + err + "</p>")
            })
    }
    else if (q.pathname.startsWith("/actors/")) {
        axios.get("http://localhost:3000/filmes")
            .then((resp) => {
                var data = resp.data
                console.log(data.filter(m => m.cast.includes(getNameFromLink(q.pathname.split("/")[2]))))
                response.write(genMoviesPage(data.filter(m => m.cast && m.cast.includes(getNameFromLink(q.pathname.split("/")[2])))))
                response.end()
            })
            .catch((err) => {
                console.log("Erro: " + err)
                response.write("<p>" + err + "</p>")
            })
    }
    else {
        response.write("Operação não suportada.")
        response.end()
    }
}).listen(1234)
