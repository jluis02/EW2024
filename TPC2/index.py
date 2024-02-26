import json

file = open("mapa.json", "r", encoding="utf-8")
data = json.load(file)
file.close()

cidades = data.get("cidades", [])

def chaveOrd(cidade):
	return cidade["nome"]

cidades.sort(key=chaveOrd)

preHTML = """
<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Mapa virtual</title>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" href="w3.css">
	</head>

	<body>

		<div class="w3-card-4">

			<header class="w3-container w3-teal">
				<h3>Mapa virtual</h3>
			</header>

			<div class="w3-container">
				<ul class="w3-ul w3-card-4" style="width:50%">
"""	

posHTML = """
				</ul>
			</div>
		</div>
	</body>
</html>
"""

conteudoHTML = ""

link_base = "/"

for cidade in cidades:
	conteudoHTML += f"""
	<li>
		<a href="{link_base}{cidade["id"]}">{cidade["nome"]}</a>
	</li>
	"""

pagHTML = preHTML + conteudoHTML + posHTML

outFile = open("./pag/index.html", "w")
outFile.write(pagHTML)
outFile.close()
