# Sistema de Gerenciamento de Pessoas e Contatos

Este projeto é um sistema simples que gerencia informações de pessoas e suas listas de contatos. Ele permite adicionar, editar, visualizar e deletar dados de pessoas, além de gerenciar contatos associados a cada pessoa.

## Tecnologias Utilizadas

- **Vue.js**: Framework progressivo utilizado para construir a interface do usuário.
- **Vuex**: Biblioteca de gerenciamento de estado para Vue.js, usada para gerenciar o estado dos dados através da aplicação.
- **Vue Router**: Biblioteca de roteamento para Vue.js, utilizada para gerenciar as rotas da aplicação.
- **Axios**: Cliente HTTP baseado em promessas para fazer requisições HTTP.
- **Tailwind CSS**: Framework CSS para design rápido e responsivo, utilizado para estilizar a aplicação.

## Arquitetura e Organização dos Arquivos

O projeto segue uma estrutura modular, organizada da seguinte forma:

- `src/components`: Contém todos os componentes Vue reutilizáveis.
- `src/views`: Contém as telas da aplicação.
    - `src/views/dashboard/DashboardView.vue`: Contém a tela principal, todas as demais telas do sistema (com usuário logado) são "filhas" de `DashboardView.vue`.
- `src/store`: Contém os módulos Vuex para gerenciamento de estado.
- `src/router`: Define as rotas da aplicação utilizando Vue Router.
- `src/service`: Camada de serviço para comunicação com APIs externas.
- `src/utils`: Funções utilitárias que podem ser usadas em várias partes do projeto.

## Rotas Definidas no Sistema

O sistema utiliza o Vue Router para gerenciar as rotas da aplicação. Abaixo estão listadas as principais rotas e seus respectivos componentes associados:

- **`/`**: Rota principal que redireciona para `/dashboard`.
- **`/login`**: Rota para a página de login, associada ao componente `Login.vue`.
- **`/dashboard`**: Rota para o painel principal, associada ao componente `Dashboard.vue`.
- **`/persons`**: Rota para a listagem de pessoas, associada ao componente `PersonsList.vue`.
- **`/persons/:id`**: Rota para visualizar os detalhes de uma pessoa específica, associada ao componente `PersonDetail.vue`.
- **`/contacts`**: Rota para a listagem de contatos, associada ao componente `ContactsList.vue`.
- **`/contacts/:id`**: Rota para visualizar os detalhes de um contato específico, associada ao componente `ContactDetail.vue`.

Essas rotas ajudam na navegação e organização do sistema, garantindo que cada componente seja responsável por uma parte específica da funcionalidade da aplicação.


## Arquitetura do Store

O Vuex é utilizado para gerenciar o estado global da aplicação. A store é dividida em módulos, cada um responsável por uma parte específica do estado. Utilizamos a store como cache para evitar requisições repetidas (principalmente de obtenção de imagens), armazenando dados que não mudam frequentemente e podem ser reutilizados em diferentes componentes da aplicação.

## Interface do Usuário

O sistema possui uma interface amigável e responsiva, adaptando-se bem a diferentes tamanhos de tela, desde dispositivos móveis a desktops. Além disso, suporta temas claro e escuro, que podem ser alternados conforme a preferência do usuário.

### Capturas de Tela

Abaixo estão algumas capturas de tela que ilustram a interface do sistema em diferentes configurações e temas:
#### Tema Claro
![Tela de Login - Tema Claro](/public/claro-1.png)
![Dashboard - Tema Claro](/public/claro-2.png)

#### Tema Escuro
![Tela de Login - Tema Escuro](/public/escuro1.png)
![Dashboard - Tema Escuro](/public/escuro2.png)

#### Responsividade
![Tela de Login em Dispositivo Móvel](/public/claro-mobile1.png)
![Dashboard em Dispositivo Móvel](/public/escuro-mobile1.png)

Essas imagens demonstram a flexibilidade e a adaptabilidade do design do sistema, garantindo uma experiência de usuário consistente e agradável em qualquer dispositivo ou preferência de tema.


## Como Rodar o Projeto

### Ambiente de Desenvolvimento

Para rodar o projeto em ambiente de desenvolvimento, siga os passos abaixo:

1. Clone o repositório do projeto.
2. Instale as dependências com `npm install`.
3. Inicie o servidor de desenvolvimento com `npm run serve`.

### Ambiente de Produção

Para rodar o projeto em ambiente de produção, siga os passos abaixo:

1. Construa a aplicação para produção com `npm run build`.
2. Sirva os arquivos da pasta `dist` com um servidor HTTP de sua escolha.
