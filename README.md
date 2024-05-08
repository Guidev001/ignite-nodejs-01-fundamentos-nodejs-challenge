# API de Gerenciamento de Tasks 📝

Este é um projeto de API para gerenciamento de *tasks* (tarefas) com funcionalidades CRUD (Criar, Ler, Atualizar e Deletar), além da capacidade de marcar tarefas como completas ou não. Também foi implementada a importação de tarefas em massa através de um arquivo CSV.

Este desafio foi realizado como parte do curso de Node.js do Ignite da Rocketseat, sendo o primeiro desafio de Node.js. 🚀

## Funcionalidades

- **Criação de tasks**: Rota para criar novas tarefas com preenchimento automático de campos como `id`, `created_at`, `updated_at` e `completed_at`.

- **Listagem de tasks**: Rota para listar todas as tarefas salvas no banco de dados, incluindo busca por `title` e `description`.

- **Atualização de tasks**: Rota para atualizar uma task existente pelo `id`, aceitando alterações no `title` e/ou `description`. Implementada validação para garantir atualização correta.

- **Remoção de tasks**: Rota para remover uma task pelo `id`, com validação para verificar existência do `id` no banco de dados.

- **Marcação de tasks como completa**: Rota para marcar uma task como completa ou não, revertendo para o estado "normal" se já estiver concluída. Validado `id` da task no banco de dados.

- **Importação de tasks via CSV**: Implementada a importação de tarefas em massa através de um arquivo CSV, seguindo o método especificado.

## Melhorias Implementadas

- **Validação de propriedades**: Garantia de que as propriedades `title` e `description` estejam presentes no `body` da requisição nas rotas `POST` e `PUT`.

- **Tratamento de erros**: Aprimorado tratamento de erros nas rotas que recebem `/:id`, incluindo validação da existência do `id` no banco de dados e retorno de mensagem apropriada caso o registro não seja encontrado.

Com essas implementações, a API está mais robusta e pronta para lidar com diversas situações de uso, proporcionando uma experiência mais completa e confiável para os usuários. ✨
