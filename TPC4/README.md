# TPC4: Compositores e diversos períodos
## 10-03-2024

## Autor:
- A100749
- José Luís Fraga Costa

## Resumo:

Este projeto concentra-se no desenvolvimento de um sistema de gerenciamento dedicado a compositores e períodos musicais, visando facilitar a organização e visualização de informações relacionadas a esses artistas e suas respectivas épocas históricas.

## Objetivos:

Implementação de um dataset no JSON-server para armazenar dados sobre compositores e períodos musicais, disponibilizando acesso a essas informações por meio de um servidor JSON para a aplicação web.

Criação de rotas essenciais, incluindo:
    - `/compositores:` listar os compositores.
    - `/compositores{id}:` informações detalhadas de um compositor.
    - `/compositores?periodo={periodo}:` listar compositores de um determinado período.
    - `/periodos:` listar todos os períodos musicais.
    - `/periodos/{id}:` informações detalhadas sobre um determinado período musical.

Implementação de um serviço com operações CRUD (Create, Read, Update, Delete) para a manipulação de dados relacionados a compositores e períodos musicais.