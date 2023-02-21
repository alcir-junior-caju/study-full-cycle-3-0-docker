# Módulo Docker

Comandos básicos:

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
