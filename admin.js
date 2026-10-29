// Painel Admin Factory Açaí - CRUD
// Versão simplificada com tudo no escopo global

const TIPOS = {
  produtos: 'produtos',
  acompanhamentos: 'acompanhamentos',
  pedidos: 'pedidos',
};

let estado = {
  produtos: [],
  acompanhamentos: [],
  pedidos: [],
  viewAtual: 'dashboard',
  itemEditando: null,
  tipoEditando: null,
};

// ---------- Helpers ----------
function formatarMoeda(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function mostrarToast(msg) {
  const toast = document.getElementById('toast');
  if (toast) {
    toast.textContent = msg;
    toast.classList.add('mostrar');
    setTimeout(() => toast.classList.remove('mostrar'), 3000);
  }
}

function salvarDados() {
  try {
    localStorage.setItem('factory_produtos', JSON.stringify(estado.produtos));
    localStorage.setItem('factory_acompanhamentos', JSON.stringify(estado.acompanhamentos));
    localStorage.setItem('factory_pedidos', JSON.stringify(estado.pedidos));
  } catch (e) {
    console.error('Erro ao salvar dados:', e);
  }
}

function carregarDados() {
  try {
    const prod = localStorage.getItem('factory_produtos');
    const acc = localStorage.getItem('factory_acompanhamentos');
    const ped = localStorage.getItem('factory_pedidos');

    if (prod) estado.produtos = JSON.parse(prod);
    if (acc) estado.acompanhamentos = JSON.parse(acc);
    if (ped) estado.pedidos = JSON.parse(ped);

    // Dados iniciais
    if (estado.produtos.length === 0) {
      estado.produtos = [
        { id: 1, nome: 'Mini Fábrica - 300 ml', categoria: 'acai', preco: 16.00, descricao: 'Tamanho pequeno.' },
        { id: 2, nome: 'Alta Produção - 500 ml', categoria: 'acai', preco: 19.00, descricao: 'Porção generosa.' },
        { id: 3, nome: 'Potência Máxima - 700 ml', categoria: 'acai', preco: 25.00, descricao: 'Tamanho grande.' },
      ];
    }
    if (estado.acompanhamentos.length === 0) {
      estado.acompanhamentos = [
        { id: 101, nome: 'Banana', categoria: 'complemento', preco: 3.00 },
        { id: 102, nome: 'Morango', categoria: 'complemento', preco: 4.00 },
        { id: 103, nome: 'Abacaxi', categoria: 'complemento', preco: 4.00 },
        { id: 104, nome: 'Maracujá', categoria: 'complemento', preco: 3.50 },
        { id: 105, nome: 'Uva verde', categoria: 'complemento', preco: 4.00 },
        { id: 201, nome: 'Leite condensado', categoria: 'complemento', preco: 3.50 },
        { id: 202, nome: 'Leite em pó', categoria: 'complemento', preco: 3.50 },
        { id: 203, nome: 'Bis branco', categoria: 'complemento', preco: 3.50 },
        { id: 204, nome: 'Bis preto', categoria: 'complemento', preco: 3.50 },
        { id: 205, nome: 'Paçoquinha', categoria: 'complemento', preco: 3.00 },
        { id: 206, nome: 'Amendoim granulado', categoria: 'complemento', preco: 3.00 },
        { id: 207, nome: 'Coco ralado', categoria: 'complemento', preco: 3.00 },
        { id: 208, nome: 'Bolacha Óleo', categoria: 'complemento', preco: 4.00 },
        { id: 209, nome: 'Confete', categoria: 'complemento', preco: 3.50 },
        { id: 210, nome: 'Ouro Branco', categoria: 'complemento', preco: 4.00 },
        { id: 211, nome: 'Sonho de Valsa', categoria: 'complemento', preco: 4.00 },
        { id: 212, nome: 'Nutella', categoria: 'complemento', preco: 7.00 },
        { id: 213, nome: 'Trento', categoria: 'complemento', preco: 4.00 },
        { id: 214, nome: 'Kit Kat', categoria: 'complemento', preco: 5.00 },
        { id: 215, nome: 'Aveia', categoria: 'complemento', preco: 3.00 },
        { id: 216, nome: 'Laka', categoria: 'complemento', preco: 5.00 },
        { id: 217, nome: 'Diamante Negro', categoria: 'complemento', preco: 5.00 },
        { id: 218, nome: 'Marshmallow', categoria: 'complemento', preco: 4.00 },
        { id: 219, nome: 'Ovomaltine', categoria: 'complemento', preco: 4.00 },
        { id: 220, nome: 'Creme de avelã', categoria: 'complemento', preco: 4.50 },
        { id: 221, nome: 'Chocolate branco', categoria: 'complemento', preco: 4.50 },
        { id: 222, nome: 'Leite condensado zero lactose', categoria: 'complemento', preco: 6.00 },
        { id: 223, nome: 'Leite em pó zero lactose', categoria: 'complemento', preco: 6.00 },
        { id: 224, nome: 'Mousse de maracujá', categoria: 'complemento', preco: 4.00 },
        { id: 225, nome: 'Mousse de morango', categoria: 'complemento', preco: 4.00 },
        { id: 226, nome: 'Mousse de leite em pó', categoria: 'complemento', preco: 4.00 },
        { id: 227, nome: 'Calda de chocolate', categoria: 'complemento', preco: 3.00 },
        { id: 228, nome: 'Calda de morango', categoria: 'complemento', preco: 3.00 },
      ];
    }
  } catch (e) {
    console.error('Erro ao carregar dados:', e);
  }
}

function renderDashboard() {
  const elProdutos = document.getElementById('stat-total-produtos');
  const elAcc = document.getElementById('stat-total-acompanhamentos');
  const elPedidos = document.getElementById('stat-total-pedidos');
  const elReceita = document.getElementById('stat-receita');

  if (elProdutos) elProdutos.textContent = estado.produtos.length;
  if (elAcc) elAcc.textContent = estado.acompanhamentos.length;
  if (elPedidos) elPedidos.textContent = estado.pedidos.length;

  const receita = estado.pedidos.reduce((s, p) => s + (p.total || 0), 0);
  if (elReceita) elReceita.textContent = formatarMoeda(receita);
}

function renderProdutos() {
  const tbody = document.getElementById('tbody-produtos');
  if (!tbody) return;
  tbody.innerHTML = '';
  estado.produtos.forEach((p) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>🫐</td>
      <td><strong>${p.nome}</strong></td>
      <td><span class="badge">${p.categoria}</span></td>
      <td>${formatarMoeda(p.preco)}</td>
      <td>${p.descricao || '-'}</td>
      <td>
        <div class="acoes-tabela">
          <button class="btn-editar" onclick="window.app.editar('produtos', ${p.id})">Editar</button>
          <button class="btn-excluir" onclick="window.app.excluir('produtos', ${p.id})">Excluir</button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function renderAcompanhamentos() {
  const tbody = document.getElementById('tbody-acompanhamentos');
  if (!tbody) return;
  tbody.innerHTML = '';
  estado.acompanhamentos.forEach((a) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${a.nome}</strong></td>
      <td><span class="badge">${a.categoria}</span></td>
      <td>${formatarMoeda(a.preco)}</td>
      <td>
        <div class="acoes-tabela">
          <button class="btn-editar" onclick="window.app.editar('acompanhamentos', ${a.id})">Editar</button>
          <button class="btn-excluir" onclick="window.app.excluir('acompanhamentos', ${a.id})">Excluir</button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function renderPedidos() {
  const tbody = document.getElementById('tbody-pedidos');
  if (!tbody) return;
  tbody.innerHTML = '';
  if (estado.pedidos.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" style="text-align:center; color:var(--texto-suave); padding:30px;">Nenhum pedido ainda.</td></tr>`;
    return;
  }
  estado.pedidos.slice().reverse().forEach((p) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>#${p.id}</td>
      <td><strong>${p.nome}</strong></td>
      <td>${p.telefone || '-'}</td>
      <td>${p.endereco}</td>
      <td>${p.pagamento}</td>
      <td>${formatarMoeda(p.total || 0)}</td>
      <td>
        <select class="status-select" data-pedido-id="${p.id}" onchange="window.app.atualizarStatusPedido(${p.id}, this.value)">
          <option value="Pendente" ${p.status === 'Pendente' ? 'selected' : ''}>Pendente</option>
          <option value="Em preparo" ${p.status === 'Em preparo' ? 'selected' : ''}>Em preparo</option>
          <option value="Saiu para entrega" ${p.status === 'Saiu para entrega' ? 'selected' : ''}>Saiu para entrega</option>
          <option value="Entregue" ${p.status === 'Entregue' ? 'selected' : ''}>Entregue</option>
          <option value="Cancelado" ${p.status === 'Cancelado' ? 'selected' : ''}>Cancelado</option>
        </select>
      </td>
      <td>${p.data}</td>
      <td>
        <button class="btn btn-outline btn-detalhes" onclick="window.app.verDetalhesPedido(${p.id})">Ver Detalhes</button>
        <button class="btn btn-outline btn-excluir" onclick="window.app.excluirPedido(${p.id})">Excluir</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function renderFechamento() {
  const pedidosEntregues = estado.pedidos.filter(p => p.status === 'Entregue');
  const totalEntregues = pedidosEntregues.length;
  const totalRecebido = pedidosEntregues.reduce((s, p) => s + (p.total || 0), 0);
  const media = totalEntregues > 0 ? totalRecebido / totalEntregues : 0;

  if (document.getElementById('stat-total-entregues')) {
    document.getElementById('stat-total-entregues').textContent = totalEntregues;
  }
  if (document.getElementById('stat-total-fechamento')) {
    document.getElementById('stat-total-fechamento').textContent = formatarMoeda(totalRecebido);
  }
  if (document.getElementById('stat-media-pedido')) {
    document.getElementById('stat-media-pedido').textContent = formatarMoeda(media);
  }
}

// ---------- Navegação ----------
function mudarView(view) {
  estado.viewAtual = view;

  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach((item) => {
    item.classList.toggle('active', item.dataset.view === view);
  });

  const views = document.querySelectorAll('.view');
  views.forEach((v) => {
    v.classList.toggle('active', v.id === `view-${view}`);
  });

  const pageTitle = document.getElementById('page-title');
  if (pageTitle) pageTitle.textContent = view.charAt(0).toUpperCase() + view.slice(1);

  if (view === 'dashboard') renderDashboard();
  if (view === 'produtos') renderProdutos();
  if (view === 'acompanhamentos') renderAcompanhamentos();
  if (view === 'pedidos') renderPedidos();
}

function charToUpper(c) {
  return c.toUpperCase();
}

// ---------- Modal Produtos/Acompanhamentos ----------
function abrirForm(tipo) {
  estado.tipoEditando = tipo;
  estado.itemEditando = null;

  const modalTitulo = document.getElementById('modal-titulo');
  const formCategoria = document.getElementById('form-categoria');

  document.getElementById('form-item').reset();
  document.getElementById('form-id').value = '';
  document.getElementById('form-tipo').value = tipo;

  if (tipo === TIPOS.produtos) {
    if (modalTitulo) modalTitulo.textContent = 'Novo Produto';
    if (formCategoria) formCategoria.style.display = 'block';
    if (formCategoria) formCategoria.parentElement.style.display = 'block';
  } else {
    if (modalTitulo) modalTitulo.textContent = 'Novo Acompanhamento';
    if (formCategoria) formCategoria.style.display = 'none';
    if (formCategoria) formCategoria.parentElement.style.display = 'none';
  }

  document.getElementById('modal-form').setAttribute('data-aberto', 'true');
  document.body.style.overflow = 'hidden';
}

function editar(tipo, id) {
  const lista = tipo === TIPOS.produtos ? estado.produtos : estado.acompanhamentos;
  const item = lista.find((x) => x.id === id);
  if (!item) return;

  estado.tipoEditando = tipo;
  estado.itemEditando = item;

  const modalTitulo = document.getElementById('modal-titulo');
  const formCategoria = document.getElementById('form-categoria');

  document.getElementById('form-id').value = item.id;
  document.getElementById('form-tipo').value = tipo;
  document.getElementById('form-nome').value = item.nome;
  document.getElementById('form-preco').value = item.preco;
  document.getElementById('form-descricao').value = item.descricao || '';
  document.getElementById('form-categoria').value = item.categoria;

  if (tipo === TIPOS.produtos) {
    if (modalTitulo) modalTitulo.textContent = 'Editar Produto';
    if (formCategoria) formCategoria.style.display = 'block';
    if (formCategoria) formCategoria.parentElement.style.display = 'block';
  } else {
    if (modalTitulo) modalTitulo.textContent = 'Editar Acompanhamento';
    if (formCategoria) formCategoria.style.display = 'none';
    if (formCategoria) formCategoria.parentElement.style.display = 'none';
  }

  document.getElementById('modal-form').setAttribute('data-aberto', 'true');
  document.body.style.overflow = 'hidden';
}

function salvarItem(e) {
  e.preventDefault();

  const id = document.getElementById('form-id').value;
  const tipo = document.getElementById('form-tipo').value;
  const nome = document.getElementById('form-nome').value;
  const preco = parseFloat(document.getElementById('form-preco').value);
  const descricao = document.getElementById('form-descricao').value;
  const categoria = document.getElementById('form-categoria').value;

  const novoItem = {
    id: id ? parseInt(id) : Date.now(),
    nome,
    preco,
    descricao,
    categoria,
  };

  const lista = tipo === TIPOS.produtos ? estado.produtos : estado.acompanhamentos;

  if (id) {
    const idx = lista.findIndex((x) => x.id === novoItem.id);
    if (idx !== -1) lista[idx] = novoItem;
  } else {
    lista.push(novoItem);
  }

  salvarDados();
  fecharModal('modal-form');

  if (tipo === TIPOS.produtos) renderProdutos();
  else renderAcompanhamentos();

  renderDashboard();
  mostrarToast('Item salvo com sucesso!');
}

function excluir(tipo, id) {
  estado.tipoParaExcluir = tipo;
  estado.idParaExcluir = id;

  const lista = tipo === TIPOS.produtos ? estado.produtos : estado.acompanhamentos;
  const item = lista.find((x) => x.id === id);
  document.getElementById('excluir-nome').textContent = item ? item.nome : 'este item';

  document.getElementById('modal-excluir').setAttribute('data-aberto', 'true');
  document.body.style.overflow = 'hidden';
}

function confirmarExclusao() {
  const tipo = estado.tipoParaExcluir;
  const id = estado.idParaExcluir;
  const lista = tipo === TIPOS.produtos ? estado.produtos : estado.acompanhamentos;

  estado[tipo === TIPOS.produtos ? 'produtos' : 'acompanhamentos'] = lista.filter((x) => x.id !== id);

  salvarDados();
  fecharModal('modal-excluir');

  if (tipo === TIPOS.produtos) renderProdutos();
  else renderAcompanhamentos();

  renderDashboard();
  mostrarToast('Item excluído com sucesso!');
}

function fecharModal(id) {
  const el = document.getElementById(id);
  if (el) {
    el.removeAttribute('data-aberto');
    document.body.style.overflow = '';
  }
}

function fecharModalPedidoDetalhes() {
  fecharModal('modal-pedido-detalhes');
}

function fecharModalForm() {
  fecharModal('modal-form');
}

function fecharModalExcluir() {
  fecharModal('modal-excluir');
}

// ---------- Modal Detalhes Pedido ----------
function verDetalhesPedido(id) {
  const pedido = estado.pedidos.find(p => p.id === id);
  if (!pedido) return;

  const itensHtml = pedido.itens.map((item) => {
    const complementosHtml = item.complementos && item.complementos.length
      ? `<div style="font-size:0.85rem; color:#6b5b95; margin-left:10px;">+ ${item.complementos.map(c => c.nome).join(', ')}</div>`
      : '';
    const obsHtml = item.observacao
      ? `<div style="font-size:0.85rem; font-style:italic; color:#d904c8; margin-left:10px;">Obs: ${item.observacao}</div>`
      : '';
    return `
      <div class="detalhe-item" style="display:flex; justify-content:space-between; padding:6px 0; border-bottom:1px solid #e9cff7;">
        <div>
          <strong>${item.qtd}x ${item.nome}${item.tamanho ? ' · ' + item.tamanho : ''}</strong>
          ${complementosHtml}
          ${obsHtml}
        </div>
        <span style="font-weight:800; color:#5b149a;">${formatarMoeda(item.preco)}</span>
      </div>
    `;
  }).join('');

  document.getElementById('detalhe-numero').textContent = pedido.id;
  document.getElementById('detalhe-cliente').textContent = pedido.nome;
  document.getElementById('detalhe-telefone').textContent = pedido.telefone || '-';
  document.getElementById('detalhe-endereco').textContent = pedido.endereco;
  document.getElementById('detalhe-pagamento').textContent = pedido.pagamento;
  document.getElementById('detalhe-data').textContent = pedido.data;
  document.getElementById('detalhe-total').textContent = formatarMoeda(pedido.total);
  document.getElementById('detalhe-status-select').value = pedido.status;
  document.getElementById('detalhe-itens').innerHTML = itensHtml;

  document.getElementById('modal-pedido-detalhes').setAttribute('data-aberto', 'true');
  document.body.style.overflow = 'hidden';
}

function atualizarStatusPedido(id, novoStatus) {
  const pedido = estado.pedidos.find(p => p.id === id);
  if (pedido) {
    pedido.status = novoStatus;
    salvarDados();
    renderPedidos();
    renderDashboard();
    mostrarToast('Status atualizado: ' + novoStatus);
  }
}

function excluirPedido(id) {
  if (!confirm('Tem certeza que deseja excluir este pedido #' + id + '?')) return;

  estado.pedidos = estado.pedidos.filter((p) => p.id !== id);
  salvarDados();
  renderPedidos();
  renderDashboard();
  mostrarToast('Pedido excluído com sucesso!');
}

// ---------- Utilitários ----------
function mostrarToast(msg) {
  const toast = document.getElementById('toast');
  if (toast) {
    toast.textContent = msg;
    toast.classList.add('mostrar');
    setTimeout(() => toast.classList.remove('mostrar'), 3000);
  }
}

// ---------- Eventos globais ----------
document.querySelectorAll('.modal-overlay').forEach((ov) => {
  ov.addEventListener('click', function() {
    const modal = ov.closest('.modal');
    if (modal) modal.removeAttribute('data-aberto');
  });
});

document.querySelectorAll('.fechar').forEach((btn) => {
  btn.addEventListener('click', () => {
    const modal = btn.closest('.modal');
    if (modal) modal.removeAttribute('data-aberto');
  });
});

// Botão salvar status no modal de detalhes
const btnSalvarStatus = document.getElementById('btn-salvar-status-detalhe');
if (btnSalvarStatus) {
  btnSalvarStatus.addEventListener('click', () => {
    const id = parseInt(document.getElementById('detalhe-numero').textContent);
    const novoStatus = document.getElementById('detalhe-status-select').value;
    atualizarStatusPedido(id, novoStatus);
    document.getElementById('modal-pedido-detalhes').removeAttribute('data-aberto');
    document.body.style.overflow = '';
  });
}

// ---------- Inicialização ----------
function initAdmin() {
  carregarDados();
  renderDashboard();
  renderProdutos();
  renderAcompanhamentos();
  renderPedidos();
  renderFechamento();

  // Navegação
  document.querySelectorAll('.nav-item').forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      if (item.id === 'btn-logout') {
        alert('Saindo do painel admin...');
        window.location.href = 'index.html';
        return;
      }
      const view = item.dataset.view;
      if (view) {
        // Atualiza classe ativa
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        // Esconde todos os views
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        // Mostra o selecionado
        const viewEl = document.getElementById('view-' + view);
        if (viewEl) viewEl.classList.add('active');

        // Atualiza título
        const pageTitle = document.getElementById('page-title');
        if (pageTitle) pageTitle.textContent = view.charAt(0).toUpperCase() + view.slice(1);

        if (view === 'dashboard') renderDashboard();
        if (view === 'produtos') renderProdutos();
        if (view === 'acompanhamentos') renderAcompanhamentos();
        if (view === 'pedidos') renderPedidos();
        if (view === 'fechamento') renderFechamento();
      }
    });
  });

  // Botão novo produto
  const btnNovoProduto = document.getElementById('btn-novo-produto');
  if (btnNovoProduto) btnNovoProduto.addEventListener('click', () => abrirForm(TIPOS.produtos));

  // Botão novo acompanhamento
  const btnNovoAcompanhamento = document.getElementById('btn-novo-acompanhamento');
  if (btnNovoAcompanhamento) btnNovoAcompanhamento.addEventListener('click', () => abrirForm(TIPOS.acompanhamentos));

  // Formulário
  document.getElementById('form-item').addEventListener('submit', salvarItem);
  document.getElementById('btn-cancelar-form').addEventListener('click', () => fecharModal('modal-form'));

  // Exclusão
  document.getElementById('btn-cancelar-excluir').addEventListener('click', () => fecharModal('modal-excluir'));
  document.getElementById('btn-confirmar-excluir').addEventListener('click', confirmarExclusao);
}

// Expor funções para onclick no HTML
window.app = {
  mudarView: function(view) {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    const itemAtivo = document.querySelector('.nav-item[data-view="' + view + '"]');
    if (itemAtivo) itemAtivo.classList.add('active');

    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    const viewEl = document.getElementById('view-' + view);
    if (viewEl) viewEl.classList.add('active');

    const pageTitle = document.getElementById('page-title');
    if (pageTitle) pageTitle.textContent = view.charAt(0).toUpperCase() + view.slice(1);

    if (view === 'dashboard') renderDashboard();
    if (view === 'produtos') renderProdutos();
    if (view === 'acompanhamentos') renderAcompanhamentos();
    if (view === 'pedidos') renderPedidos();
  },
  editar: editar,
  excluir: excluir,
  excluirPedido: excluirPedido,
  verDetalhesPedido: verDetalhesPedido,
  atualizarStatusPedido: atualizarStatusPedido,
};

// Iniciar imediatamente
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAdmin);
} else {
  initAdmin();
}