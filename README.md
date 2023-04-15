# Curso Full Cycle 3.0 - Módulo Docker

<div>
    <img alt="Criado por Alcir Junior [Caju]" src="https://img.shields.io/badge/criado%20por-Alcir Junior [Caju]-%23f08700">
    <img alt="License" src="https://img.shields.io/badge/license-MIT-%23f08700">
</div>

---

## Descrição

O Curso Full Cycle é uma formação completa para fazer com que pessoas desenvolvedoras sejam capazes de trabalhar em projetos expressivos sendo capazes de desenvolver aplicações de grande porte utilizando de boas práticas de desenvolvimento.

---

## Repositório Pai
https://github.com/alcir-junior-caju/study-full-cycle-3-0

---

## Visualizar o projeto na IDE:

Para quem quiser visualizar o projeto na IDE clique no teclado a tecla `ponto`, esse recurso do GitHub é bem bacana

---
### Principais conceitos de Docker e Containers

#### O que são Containers?
Por definição, o container é um padrão de unidade de software que empacota o código e todas as dependências de uma aplicação, fazendo com que a mesma seja executada de forma rápida e confiável de um ambiente computacional para o outro.

Em outras palavras, o container é uma forma de conseguirmos rodar as nossas aplicações entre sistemas num padrão mais uniforme.

#### Como funcionam os Containers?
Sendo um processo que roda no seu sistema operacional, o container tem como base três pilares:

#### Namespaces
Os `Namespaces` isolam os processos e evitam conflitos quando outras partes do nosso sistema operacional geram o risco de afetar o que nós planejamos utilizar.

#### CGroups
O `CGroups` evita a sobrecarga dos processos para que os recursos do nosso sistema não prejudiquem toda a operação.

#### OFS (OVERLAY FILE SYSTEM)
Com o `OFS` o `container` pode criar camadas de arquivos reutilizáveis em outros containers, tornando todo o processo mais leve devido ao reaproveitamento dos arquivos.

Se o seu container utiliza Ubuntu, por exemplo, que baixou várias camadas de código nele, assim que houver um outro container rodando Ubuntu ele reaproveita as mesmas camadas para evitar que tudo fique saturado.

#### Sistema Operacional
Como um processo atribuído, o container é uma instância que nós colocamos para rodar com base numa imagem. E a imagem é basicamente uma cópia, como um snapshot da aplicação ou de qualquer outra coisa que você criou. Mas essa imagem também é imutável, então você não consegue modificá-la enquanto ela estiver rodando dentro do container.

Isso significa que ao subir o container você vai ter uma imagem que não é alterada, apesar de ser possível gravar informações dentro dos containers, já que esse padrão oferece uma camada de leitura e escrita para guardarmos informações. Porém, se o container morrer, você também vai perder tudo o que você escreveu.

Por isso é importante trabalhar com boas práticas para garantir que você não vai salvar novas imagens dentro dos containers, ou arquivos que você deveria ter utilizado. Então você já deve considerar que um container é efêmero, e as informações que você grava nele serão perdidas uma vez que a imagem é inalterável.

`Dockerfile`
Para gerar uma nova imagem você pode trabalhar normalmente com um arquivo chamado `Dockerfile`, que sempre cria uma imagem a partir de outra imagem.

Pelo comando FROM: “ImageName” – FROM: Ubuntu, por exemplo – ele vai criar a imagem a partir da imagem do Ubutu, que vai rodar os comandos para instalar alguma coisa e vai expor, por exemplo, a porta 8000 para deixá-lo trabalhar.

Ao fazer o Dockerfile você gera um build, que vai gerar a imagem. Então no final das contas você gera um build a partir do próprio Dockerfile.

#### Repositórios de imagens
É importante destacar que ao gerar uma build você também pode pegar a imagem e guardá-la num registro de imagens. Você pode trabalhar com isso da seguinte forma:

Se você solicitar uma imagem de Ubuntu, por exemplo, o Dockerfile inicia um processo de pull para trazer essa imagem do registro. E ao fazer isso ele roda todos os comandos necessários para que você faça o push e comece a utilizá-lo, basicamente.

As imagens ficam armazenadas no Docker Hub, que é o Container Registry da Docker, mas existe outros Containers como da Amazon, Google Cloud Plataform, Azure, etc, no caso essas imagens são privadas pois você vai estar autenticado nesses serviços.

Imagens sempre trabalham com TAGS que são versões de cada imagem.

#### Comandos básicos:

Para executar um `Container`:
```shell
docker run hello-world
```
Pode se usar o `--name` para definir um nome para o `Container`.

Ao executar algum `Container` pode se usar o `--rm` para excluir após a execução.

Para listar os `Containers` em execução:
```shell
docker ps
```

Para listar os `Containers` que foram executados:
```shell
docker ps -a
```

Pode limpar essa lista usando o `rm` mais o `CONTAINER ID` ou o `NAME`:
```shell
docker rm hello-world
```
Pode se usar o `-f` para forçar a remoção.

Para iniciar `Containers` que já foram executados:
```shell
docker start hello-world
```

Para parar `Containers` que já foram executados:
```shell
docker stop hello-world
```

Para executar um `Container` em modo interativo:
```shell
docker run -i -t ubuntu:latest bash
```
- Onde `-i` é o modo interativo, ele mantém o `stdin` ativo, com isso ele atacha o terminal ao `Container`.
- Onde `-t` é o `tty` que permite poder digitar os comandos.
- Onde `bash` é o comando executado no container.

Publicando portas em `Containers`:
```shell
docker run -p 8080:80 nginx
```
O `Container` acima prende o terminal e fica logando as interações, para poder deixar executando em segundo plano basta usar `-d`.

Para executar um comando quando o `Container` já está em execução:
```shell
docker exec nginx ls
```
- Onde `nginx` é o nome do `Container`.

Caso precise acessar o `Bash do Container` basta usar `-it` em conjunto com `bash`.

Para executar um `Container` com `Bind Mounts`:
```shell
docker run -d --name server -p 80:80 -v ~/path-local-files/:path-container-files nginx
```
- Onde o `-v` monta um volume local em um `Container`. Mas esse comando é um comando antigo.

Para executar um `Container` com `Bind Mounts` atualizado:
```shell
docker run -d --name server -p 80:80 --mount type=bind,source="$(pwd)",target=path-container-files nginx
```
- Onde `$(pwd)` é um atalho para o caminho de onde você está.

A diferença entre `-v` e `--mount` é que se o source não existir o `--mount` retorna um erro, já o `-v` cria a pasta no `Container`.

Volumes no `Docker`:
```shell
docker volume
```
- create;
- inspect;
- ls;
- prune;
- rm;

Criando um volume:

```shell
docker volume create meuvolume
```

Mapeando volumes em `Containers`:
```shell
docker run -d --name server -p 80:80 --mount type=volume,source=meuvolume,target=path-container-files nginx
```

Baixar uma imagem:
```shell
docker pull ubuntu
```
Como o docker trabalha com camadas, ele baixa apenas o que for necessário, caso exista uma imagem que possua uma camada em comum com outra imagem não é necessário baixar novamente, pois o uso é compartilhado.


Listar imagens:
```shell
docker images
```

Removendo imagens:
```shell
docker rmi php:latest
```

Criando uma imagem a partir do Dockerfile:
```shell
docker build -t webcaju/nginx-vim:latest ./01-docker
```
- Onde `-t` é para o nome da tag da imagem;
- Onde `webcaju` é o meu usário no Docker Hub;
- Onde `nginx-vim:latest` é o nome e a tag;
- Onde `./01-docker` o diretório onde está meu `dockerfile`.

Removendo todos containers:
```shell
docker rm $(docker ps -a -q) -f
```

Substituindo comandos do dockerfile por parâmetros:
```shell
docker run --rm webcaju/hello:latest echo "oi"
```

- A diferença entre o `CMD` e o `ENTRYPOINT` é que `CMD` entra como parâmetro e o `ENTRYPOINT` é um comando fixo.
