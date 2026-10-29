# Agenda Certa

Protótipo de uma plataforma de gestão para barbearias, salões, trancistas, nail designers e outros profissionais de beleza.

## Demonstração

A interface reúne uma página inicial comercial e telas demonstrativas de agenda, atendimentos, clientes, fidelização, equipe, financeiro, estoque, relatórios e agendamento público. Os indicadores e registros exibidos são fictícios; ações de demonstração não alteram dados reais nem enviam mensagens.

## Executar localmente

Requer Node.js 22+ e pnpm.

```sh
pnpm install
pnpm dev
```

A aplicação inicia em `http://localhost:3200`. Para configurar os fluxos de autenticação, copie `.env.example` para `.env.local` e preencha as variáveis públicas do Supabase. Não coloque chaves secretas no cliente.
