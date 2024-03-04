import re

def main():
    f = open("filmes.json")    
    content = f.read()
    f.close()
    content = re.sub(r"\"_id\":{\"\$oid\":\"(\w+)\"}", "\"id\":\"\\1\"", content)
    content = re.sub(r"}\n{", r"},\n{", content)
    content = re.sub(r"{\"id\"", "\t\t{\"id\"", content)
    nf = open("filmesNorm.json", "w")
    nf.write("{\n\t\"filmes\": [\n" + content + "\t]\n}")
    nf.close()

main()
