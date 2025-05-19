# Sistema de Moeda Estudantil

Um sistema web completo para reconhecimento de mérito estudantil utilizando uma moeda virtual. A plataforma permite que professores distribuam moedas virtuais aos alunos como forma de reconhecimento, e que os alunos possam trocar essas moedas por vantagens oferecidas por empresas parceiras.

## Funcionalidades

### Cadastro e Autenticação
- **Alunos**: Cadastro com nome, email, CPF, RG, endereço, instituição de ensino e curso.
- **Professores**: Pré-cadastrados pelas instituições com nome, CPF, departamento e vínculo à instituição.
- **Empresas Parceiras**: Cadastro com nome, email, CNPJ, descrição da empresa e produtos/ofertas (vantagens).

### Moeda Virtual - Distribuição e Controle
- Professores recebem 1.000 moedas virtuais por semestre, com saldo acumulativo.
- Professores podem enviar moedas para alunos cadastrados, especificando a quantidade e uma mensagem com o motivo do reconhecimento.
- Professores e alunos têm extratos de transações.

### Troca de Moedas por Vantagens
- Alunos podem visualizar e resgatar vantagens com moedas, que são cadastradas pelas empresas parceiras.
- Ao resgatar, as moedas são debitadas do saldo do aluno, e um código de cupom é gerado.

### Gerenciamento
- Painéis distintos para alunos, professores e empresas parceiras, permitindo a visualização de saldos, extratos e gerenciamento de vantagens.

## Tecnologias Utilizadas

- **Frontend**: Next.js 14, React 18, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes
- **Banco de Dados**: PostgreSQL com Prisma ORM
- **Autenticação**: Sistema de autenticação personalizado

## Como Executar o Projeto

### Pré-requisitos

- Node.js (versão 18 ou superior)
- PostgreSQL

### Configuração

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/sistema-moeda-estudantil.git
cd sistema-moeda-estudantil
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o banco de dados:
   - Crie um arquivo `.env` na raiz do projeto com a seguinte variável:
   ```
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/moeda_estudantil"
   ```
   - Substitua `usuario`, `senha` e `moeda_estudantil` pelos seus dados de conexão com o PostgreSQL.

4. Execute as migrações do Prisma:
```bash
npx prisma migrate dev --name init
```

5. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

6. Acesse a aplicação em `http://localhost:3000`

## Estrutura do Projeto

- `/app`: Páginas e rotas da aplicação
- `/components`: Componentes React reutilizáveis
- `/prisma`: Schema e migrações do banco de dados
- `/lib`: Utilitários e funções auxiliares
- `/public`: Arquivos estáticos

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

## Licença

Este projeto está licenciado sob a licença MIT.