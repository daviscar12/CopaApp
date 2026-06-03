# Projeto: Álbum de Figurinhas (Simulado)

- **Nome do aluno:** Davi herique Scartezini
- **Nome do curso:** Tecnico para informatica
- **Unidade curricular:** 

Descrição
---------

Este repositório contém uma aplicação front-end em Vue + Ionic que simula um álbum digital de figurinhas da Copa do Mundo. Todos os dados são mantidos em memória sem persistência externa (como foi pedido no documento). O objetivo é demonstrar componentização e uso de composables dentro do projeto criado.

Conteúdo do repositório
-----------------------

- `src/components/` — componentes reutilizáveis: formulários (`LoginForm`, `RegisterForm`, `ResetPasswordForm`), cartões de figurinha (`StickerCard`) e lista (`StickerList`) e `AppHeader`.
- `src/composables/` — composables que encapsulam lógica de autenticação (`useAuth`) e gestão do álbum (`useAlbum`).
- `src/views/` — páginas: `LoginPage`, `RegisterPage`, `ResetPasswordPage`, `AlbumPage`.
- `src/router/index.ts` — rotas da aplicação.

Como usar
---------

Instale dependências e rode o servidor de desenvolvimento (Node.js requerido):

```bash
npm install
npm run dev
```

Observações
-----------

- A autenticação e recuperação de senha são simuladas em memória.
- O jogaadores são separados por seleção
- Para entrar no projeto apenas no registro, pois no login dá "credenciais inválidas" por conta que não tem banco de dados, mas se quiser entrar é pelo registro.

