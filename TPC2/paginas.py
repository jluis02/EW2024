import json
import random

file = open("mapa.json", "r", encoding="utf-8")
data = json.load(file)
file.close()

cidades = data.get("cidades", [])
ligacoes = data.get("ligacoes", [])

id_cidade = {}
for cidade in cidades:
	id_cidade[cidade["id"]] = cidade["nome"]

link_base = "/"
def geraLigacoes(ligacoes, id_origem):
	ligacoesHTML = ""
	for ligacao in ligacoes:
		if ligacao["origem"] == id_origem:
			id_destino = ligacao["destino"]
			ligacoesHTML += f"""
			<div style="animation: w3-spin 0.5s linear; animation-delay: {random.uniform(0, 0.75)}s" class="map-grid-wrapper w3-col m3 l2 w3-center w3-border-teal w3-margin-top">
				<a href="{link_base}{id_destino}">
					<div class="map-grid-content w3-border-teal">
						<p>Para: {id_cidade[id_destino]}</p>
						<p>Distância: {ligacao["distância"]}</p>
					</div>
				</a>
			</div>
			"""
		elif ligacao["destino"] == id_origem:
			ligacoesHTML += f"""
			<div style="animation: w3-spin 0.5s linear; animation-delay: {random.uniform(0, 0.75)}s" class="map-grid-wrapper w3-col m3 l2 w3-center w3-border-teal w3-margin-top">
				<a href="{link_base}{ligacao["origem"]}">
					<div class="map-grid-content w3-border-teal">
							<p>Para: {id_cidade[ligacao["origem"]]}</p>
							<p>Distância: {ligacao["distância"]}</p>
					</div>
				</a>
			</div>
			"""
		# i += 1
	return ligacoesHTML

for cidade in cidades:
	nome = cidade["nome"]
	preHTML = f"""
<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Mapa virtual: {nome}</title>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" href="w3.css">
		<link rel="stylesheet" href="custom.css">
	</head>

	<body>

		<header class="w3-container w3-teal">
			<h3>Mapa virtual: {nome}</h3>
		</header>
	"""

	cidadeHTML = f"""
		<ul class="w3-ul w3-margin-top">
			<li><b>Nome:</b> {nome}</li>
			<li><b>População:</b> {cidade["população"]}</li>
			<li><b>Descrição:</b> {cidade["descrição"]}</li>
			<li><b>Distrito:</b> {cidade["distrito"]}</li>
		</ul>

		<div class="w3-row-padding w3-center">
	"""

	ligacoesHTML = geraLigacoes(ligacoes, cidade["id"])

	posHTML = """
		</div>
	</body>
</html>
	"""

	with open("./pag/" + cidade["id"] + ".html", "w") as outfile:
		outfile.write(preHTML + cidadeHTML + ligacoesHTML + posHTML)
