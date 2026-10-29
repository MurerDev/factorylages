# Factory Açaí Delivery

Site completo e responsivo para delivery de uma loja de açaí, feito com HTML, CSS e JavaScript puro (sem dependências externas). Inclui painel administrativo com CRUD.

## Estrutura

- `index.html` — página principal do cliente
- `style.css` — estilos do site (tema roxo/rosa, responsivo)
- `script.js` — lógica do cardápio, fluxo de compra, carrinho e checkout
- `admin.html` — painel administrativo (login com senha `factory123`)
- `admin.css` — estilos do painel admin
- `admin.js` — lógica CRUD do admin (produtos e acompanhamentos pré-carregados)
- `logo.png` — **coloque aqui a imagem da logo da Factory Açaí**
- `cardapio.png` — **coloque aqui a imagem do cardápio**

## Funcionalidades (Cliente)

- Cardápio com imagem e botão "Fazer Pedido"
- Fluxo de compra por seções:
  1. Tamanho (Mini Fábrica 300ml, Alta Produção 500ml, Potência Máxima 700ml)
  2. Complementos (frutas, chocolates, doces, mousses, caldas)
  3. Observação (opcional)
  4. Quantidade
- Carrinho lateral com resumo e total
- Checkout simulado (nome, endereço, forma de pagamento)
- Botão Admin para acessar o painel gerencial
- Design responsivo para celular e desktop

## Funcionalidades (Painel Admin - CRUD)

- Dashboard com estatísticas (produtos, acompanhamentos, pedidos, receita)
- Gerenciar Produtos (adicionar, editar, excluir)
- Gerenciar Acompanhamentos (adicionar, editar, excluir)
- Visualizar Pedidos (cliente, endereço, pagamento, total, status)
- Dados salvos no localStorage (persistem ao fechar o navegador)

## Como usar

1. Abra a pasta `delivery-acai`.
2. Clique duas vezes no arquivo `index.html` para o site do cliente.
3. Clique no botão "🔐 Admin" no header para acessar o painel (senha: `factory123`).
4. Ou abra diretamente `admin.html`.

## Personalização rápida

- **Senha do admin**: altere `SENHA_ADMIN` em `script.js`.
- **Produtos iniciais**: edite o array `estado.produtos` em `admin.js`.
- **Acompanhamentos iniciais**: edite o array `estado.acompanhamentos` em `admin.js`.
- **Cores**: altere as variáveis CSS em `:root` nos arquivos CSS.
- **Contato**: atualize endereço, telefone e WhatsApp em `index.html`.
