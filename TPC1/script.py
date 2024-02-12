import os
import xml.etree.ElementTree as ET

html = '''
<!DOCTYPE html>
<html>
<head>
    <title>EngWeb2024</title>
    <meta charset="UTF-8">
    <style>
        img {
            max-width: 60%; /* Garante que a imagem não ultrapasse a largura do seu contêiner */
            height: auto; /* Mantém a proporção da imagem */
        }
    </style>
</head>
<body>
'''
# templateCidade += f"<h6><a href='../mapa_sorted_linked.html'>Voltar</a></h6>"

template = html

def percorrer_pastaXML(directory):
    ruas = set() # usei set para não haver ruas duplicadas
    
    for filename in os.listdir(directory):
        if filename.endswith('.xml'): 
            tree = ET.parse(os.path.join(directory, filename))
            root = tree.getroot()
            
            rua_nome = None
            imagens = []
            descricao = [] # Lista para armazenar as descrições
            casas = [] # Lista para armazenar as informações das casas
            
            html_rua = template
            
            for rua in root.iter('nome'):
                rua_nome = rua.text
            
                
            for figura in root.iter('figura'):
                imagem_path = figura.find('imagem').attrib['path']
                imagem_path = f"../MapaRuas-materialBase/texto/{imagem_path}"
                imagens.append(imagem_path)
            
            if rua_nome:
                html_rua += f"<h1>{rua_nome}</h1>"
                
            html_rua += "<div>"
            html_rua += f"<h2>Informações sobre a rua:</h2>"
            
            for para in root.iter('para'):
                descricao.append(ET.tostring(para, encoding='unicode'))
                html_rua += f"{ET.tostring(para, encoding='unicode')}"
                print(f"Informações desta rua\n: {ET.tostring(para, encoding='unicode')}")
            
            html_rua += "<br>"
            html_rua += "</div>"
            html_rua += "<br>"
            
            for casa in root.iter('casa'):
                casa_info = {}
                for child in casa:
                    if child.tag == 'número':
                        casa_info['número'] = child.text
                    else:
                        casa_info[child.tag] = child.text
                casas.append(casa_info)
                        
            html_rua += "<div>"
            html_rua += "<h2>Casas: </h2>"
            html_rua += "<ul>"
            for casa in casas:
                html_rua += "<li>"
                html_rua += f"Número: {casa['número']}<br>"
                html_rua += f"Enfiteuta: {casa.get('enfiteuta', '')}<br>"
                html_rua += f"Foro: {casa.get('foro', '')}<br>"
                html_rua += f"Descrição: {casa.get('desc', '')}"
                html_rua += "</li>"
            html_rua += "</ul>"
            html_rua += "</div>"
            html_rua += "<br>"
              
            if rua_nome:
                html_rua += "<div>"
                
                for imagem in imagens:
                    html_rua += f"<img src='{imagem}' alt='Imagem'>"
                    print(imagem)
                html_rua += "</div>"    
                html_rua += "<br>"
                html_rua += "<div>"
                html_rua += f"<h2><a href='../ruas.html'>Voltar</a></h2>"
                html_rua += "</br>"
                html_rua += "</div>"
                
                html_rua += "</body>"
                html_rua += "</html>"

                if not os.path.exists('html'):
                    os.mkdir('html')
                
                # templateCidade += f"<h6><a href='../mapa_sorted_linked.html'>Voltar</a></h6>"
                
                with open(f"html/{rua_nome}.html", "w", encoding="utf-8") as file:
                    file.write(html_rua)
                    
                ruas.add(rua_nome)

    return sorted(ruas)


pasta_xmlInfo = './MapaRuas-materialBase/texto'

ruas = percorrer_pastaXML(pasta_xmlInfo)

html += "<ul>"

print(f"Número de ruas encontrado: {len(ruas)}")
for rua in ruas:
    print(rua)
    
    html += f"<li><a href='html/{rua}.html'>{rua}</a></li>"
    
html += "</ul>"
html += "</body>"
html += "</html>"

file = open("ruas.html", "w", encoding="utf-8")
file.write(html)
file.close()
