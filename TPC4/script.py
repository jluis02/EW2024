import sys
import json

def extract_periodos(data):
    periodos = set()

    for compositor in data["compositores"]:
        if "periodo" in compositor and compositor["periodo"] != "":
            periodos.add(compositor["periodo"])

    periodos = [{"nome": periodo} for periodo in periodos]
        

    return periodos

def main(imp):
    with open(imp, "r", encoding="utf-8") as file:
        data = json.load(file)

    periodos = extract_periodos(data)

    new_json = data

    new_json["periodos"] = periodos

    with open("new_dataset.json", "w", encoding="utf-8") as file:
        json.dump(new_json, file, indent=2)

if __name__ == "__main__":
    main(sys.argv[1])