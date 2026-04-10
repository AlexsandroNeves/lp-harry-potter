#  Harry Potter — Characters Encyclopedia

Enciclopédia de personagens do universo Harry Potter, construída com **React + TypeScript + Vite**, consumindo a [HP API](https://hp-api.onrender.com).

---

## 🚀 Tecnologias

- [React 19](https://react.dev/)
- [TypeScript 5](https://www.typescriptlang.org/)
- [Vite 8](https://vitejs.dev/)
- [SCSS Modules](https://sass-lang.com/)

---

## 📁 Estrutura de pastas

```
src/
├── services/
│   └── characterService.ts   # Chamadas à HP API + tipos (Character, Wand)
├── components/
│   ├── CharacterGrid/        # Grid principal com filtro, busca e paginação
│   ├── CharacterCard/        # Card individual de cada personagem
│   ├── CharacterModal/       # Modal com detalhes completos
│   ├── HouseFilter/          # Filtro por casa + busca por nome
│   ├── Pagination/           # Navegação entre páginas
│   ├── Header/               # Cabeçalho da aplicação
│   └── Footer/               # Rodapé da aplicação
├── styles/
│   ├── global.scss           # Estilos globais
│   └── _variables.scss       # Variáveis SCSS (cores, fontes, etc.)
├── App.tsx
└── main.tsx
```

---

## ⚙️ Como rodar

### Pré-requisitos

- Node.js 18+
- npm

### Instalação

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:5173](http://localhost:5173).

### Build para produção

```bash
npm run build
```

### Preview do build

```bash
npm run preview
```

---

## 🔌 API

Os dados são fornecidos pela **[HP API](https://hp-api.onrender.com)**


**Endpoint utilizado:**

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/characters` | Retorna todos os personagens |

---

## ✨ Funcionalidades

- Listagem de todos os personagens com foto, casa, patrono, ator e data de nascimento
- Filtro por casa (Gryffindor, Slytherin, Ravenclaw, Hufflepuff)
- Busca por nome em tempo real
- Paginação (12 personagens por página)
- Modal com informações completas do personagem
- Indicador de status (Vivo / Falecido)
- Tratamento de estados de loading e erro
- Layout responsivo

---

## 📜 Scripts disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção |
| `npm run preview` | Pré-visualiza o build localmente |
| `npm run lint` | Roda o ESLint |
