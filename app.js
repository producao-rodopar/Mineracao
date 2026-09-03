/* =============================================================
   app.js — comportamento do site
   Depende de dados.js (EMPRESA, ROSCAS, METODOS, FAMILIAS,
   SERVICOS, CHECKLIST, SINAIS, GLOSSARIO).
   Sem bibliotecas externas. Roda em GitHub Pages sem servidor.
   ============================================================= */
(function () {
  'use strict';

  const $ = (s, ctx) => (ctx || document).querySelector(s);
  const $$ = (s, ctx) => Array.from((ctx || document).querySelectorAll(s));
  const porId = (id) => FAMILIAS.find((f) => f.id === id);

  /* ----------------------------------------------------------
     Ícones técnicos (desenho vetorial próprio, sem imagens
     externas — troque por fotos reais se quiser, ver README)
     ---------------------------------------------------------- */
  const ICONES = {
    bit: `<path class="traco" d="M14 10h20v14c0 6-4 10-10 10s-10-4-10-10z"/>
          <circle class="cheio" cx="19" cy="29" r="2.4"/><circle class="cheio" cx="24" cy="32" r="2.4"/>
          <circle class="cheio" cx="29" cy="29" r="2.4"/>
          <path class="traco" d="M17 10V6h14v4"/>`,
    retrac: `<path class="traco" d="M14 10h20v14c0 6-4 10-10 10s-10-4-10-10z"/>
             <path class="traco" d="M18 12v12M24 12v10M30 12v12"/>
             <circle class="cheio" cx="24" cy="32" r="2.4"/>
             <path class="traco" d="M17 10V6h14v4"/>`,
    alargador: `<path class="traco" d="M8 14h32v10c0 6-6 10-16 10S8 30 8 24z"/>
                <circle class="cheio" cx="14" cy="27" r="2.2"/><circle class="cheio" cx="24" cy="31" r="2.2"/>
                <circle class="cheio" cx="34" cy="27" r="2.2"/>
                <path class="traco" d="M19 14V5h10v9"/>`,
    conebit: `<path class="traco" d="M16 8h16l4 18c0 5-5 8-12 8s-12-3-12-8z"/>
              <circle class="cheio" cx="20" cy="29" r="2.3"/><circle class="cheio" cx="28" cy="29" r="2.3"/>`,
    piloto: `<path class="traco" d="M10 12h28v8c0 5-6 8-14 8s-14-3-14-8z"/>
             <path class="traco" d="M20 28h8v12l-4 4-4-4z"/>
             <circle class="cheio" cx="24" cy="36" r="2"/>`,
    dth: `<path class="traco" d="M14 6h20v20c0 6-4 10-10 10s-10-4-10-10z"/>
          <path class="traco" d="M14 14h20"/>
          <circle class="cheio" cx="19" cy="30" r="2.3"/><circle class="cheio" cx="29" cy="30" r="2.3"/>
          <circle class="cheio" cx="24" cy="33" r="2.3"/>`,
    punho: `<path class="traco" d="M17 4h14v36H17z"/>
            <path class="traco" d="M19 12h10M19 18h10M19 24h10M19 30h10"/>`,
    luva: `<path class="traco" d="M12 14h24v20H12z"/>
           <path class="traco" d="M16 19h16M16 24h16M16 29h16"/>
           <path class="traco" d="M20 14V8M28 14V8M20 40v-6M28 40v-6"/>`,
    haste: `<path class="traco" d="M20 4h8v40h-8z"/>
            <path class="traco" d="M20 10h8M20 38h8"/>
            <path class="traco" d="M24 14v20"/>`,
    hasteconica: `<path class="traco" d="M18 4h12v28l-6 10-6-10z"/>
                  <path class="traco" d="M22 6v26M26 6v26"/>`
  };

  const icone = (chave) =>
    `<svg viewBox="0 0 48 48" aria-hidden="true">${ICONES[chave] || ICONES.bit}</svg>`;

  /* ----------------------------------------------------------
     Peças do diagrama que NÃO são fabricadas pela Rodopar
     ---------------------------------------------------------- */
  const PECAS_EQUIPAMENTO = {
    tubo: {
      nome: 'Tubo de perfuração',
      posicao: 'Corpo da coluna',
      funcao: 'Conduz o ar comprimido até o martelo de fundo e transmite a rotação. Faz parte do equipamento de perfuração.',
      externa: true
    },
    martelo: {
      nome: 'Martelo de fundo',
      posicao: 'Acima do bit, dentro do furo',
      funcao: 'Gera o impacto junto à rocha. É o martelo que define qual encaixe de bit DTH você precisa. Faz parte do equipamento de perfuração.',
      externa: true
    }
  };

  /* ==========================================================
     1. DIAGRAMA INTERATIVO DA COLUNA
     ========================================================== */
  const svg = $('#colunaSvg');
  const painelPeca = $('#pecaInfo');

  function mostrarPeca(chave) {
    const equip = PECAS_EQUIPAMENTO[chave];
    const fam = porId(chave);

    if (equip) {
      painelPeca.innerHTML = `
        <p class="peca-info__papel">${equip.posicao} — item do equipamento</p>
        <h3>${equip.nome}</h3>
        <p>${equip.funcao}</p>
        <p class="peca-info__papel">A Rodopar fornece o bit que se acopla a este conjunto.</p>
        <a class="peca-info__acao" href="#catalogo" data-ir="bits-dth">Ver bits fundo de furo</a>`;
      return;
    }
    if (!fam) return;

    const etiquetas = fam.roscas.concat(fam.modelos);
    painelPeca.innerHTML = `
      <p class="peca-info__papel">${fam.posicao}</p>
      <h3>${fam.nome}</h3>
      <p>${fam.funcao}</p>
      ${etiquetas.length
        ? `<ul class="peca-info__lista">${etiquetas.map((e) => `<li>${e}</li>`).join('')}</ul>`
        : ''}
      <a class="peca-info__acao" href="#catalogo" data-ir="${fam.id}">Ver no catálogo</a>`;
  }

  function ativarPeca(g) {
    $$('.peca', svg).forEach((p) => p.removeAttribute('data-ativa'));
    g.setAttribute('data-ativa', 'true');
    mostrarPeca(g.dataset.peca);
  }

  $$('.peca', svg).forEach((g) => {
    g.addEventListener('click', () => ativarPeca(g));
    g.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        ativarPeca(g);
      }
    });
  });

  $$('.metodo__opcao').forEach((btn) => {
    btn.addEventListener('click', () => {
      $$('.metodo__opcao').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      $$('.conjunto', svg).forEach((c) => {
        c.hidden = c.dataset.conjunto !== btn.dataset.metodo;
      });
      $$('.peca', svg).forEach((p) => p.removeAttribute('data-ativa'));
      painelPeca.innerHTML =
        '<p class="peca-info__vazio">Nenhuma peça selecionada. Toque em um componente da coluna.</p>';
      // pré-seleciona o filtro do catálogo pelo método escolhido
      metodosSelecionados = new Set([btn.dataset.metodo]);
      sincronizarChips();
      desenharCatalogo();
    });
  });

  /* ==========================================================
     2. CATÁLOGO E FILTROS
     ========================================================== */
  let roscasSelecionadas = new Set();
  let metodosSelecionados = new Set();

  function criarChip(texto, valor, conjunto, aoMudar) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'chip';
    b.textContent = texto;
    b.dataset.valor = valor;
    b.setAttribute('aria-pressed', 'false');
    b.addEventListener('click', () => {
      if (conjunto.has(valor)) conjunto.delete(valor);
      else conjunto.add(valor);
      sincronizarChips();
      aoMudar();
    });
    return b;
  }

  function sincronizarChips() {
    $$('#chipsRosca .chip').forEach((c) =>
      c.setAttribute('aria-pressed', String(roscasSelecionadas.has(c.dataset.valor)))
    );
    $$('#chipsMetodo .chip').forEach((c) =>
      c.setAttribute('aria-pressed', String(metodosSelecionados.has(c.dataset.valor)))
    );
  }

  const chipsRosca = $('#chipsRosca');
  ROSCAS.forEach((r) =>
    chipsRosca.appendChild(criarChip(r, r, roscasSelecionadas, desenharCatalogo))
  );

  const chipsMetodo = $('#chipsMetodo');
  Object.keys(METODOS).forEach((k) =>
    chipsMetodo.appendChild(criarChip(METODOS[k], k, metodosSelecionados, desenharCatalogo))
  );

  const campoBusca = $('#busca');
  campoBusca.addEventListener('input', desenharCatalogo);

  $('#limparFiltros').addEventListener('click', () => {
    roscasSelecionadas.clear();
    metodosSelecionados.clear();
    campoBusca.value = '';
    sincronizarChips();
    desenharCatalogo();
  });

  function filtrar() {
    const termo = campoBusca.value.trim().toLowerCase();
    return FAMILIAS.filter((f) => {
      if (roscasSelecionadas.size) {
        const bate = f.roscas.some((r) => roscasSelecionadas.has(r));
        if (!bate) return false;
      }
      if (metodosSelecionados.size) {
        const bate = f.metodo.some((m) => metodosSelecionados.has(m));
        if (!bate) return false;
      }
      if (termo) {
        const alvo = [f.nome, f.alias, f.funcao, f.posicao]
          .concat(f.roscas, f.modelos)
          .join(' ')
          .toLowerCase();
        if (!alvo.includes(termo)) return false;
      }
      return true;
    });
  }

  function cartaoHTML(f) {
    const roscasHTML = f.roscas.length
      ? `<dt>Roscas</dt><dd>${f.roscas.map((r) => `<span class="cod">${r}</span>`).join('')}</dd>`
      : '';
    const modelosHTML = f.modelos.length
      ? `<dt>Modelos</dt><dd>${f.modelos.map((m) => `<span class="cod">${m}</span>`).join('')}</dd>`
      : '';
    const semDado =
      !f.roscas.length && !f.modelos.length
        ? '<dt>Especificação</dt><dd><span class="cod">sob consulta</span></dd>'
        : '';

    return `
      <article class="cartao" id="fam-${f.id}">
        <div class="cartao__topo">
          <div class="cartao__icone">${icone(f.icone)}</div>
          <div>
            <h3 class="cartao__nome">${f.nome}</h3>
            <p class="cartao__posicao">${f.posicao} — ${f.metodo.map((m) => METODOS[m]).join(', ')}</p>
          </div>
        </div>
        <p class="cartao__funcao">${f.funcao}</p>
        <dl class="cartao__dados">${roscasHTML}${modelosHTML}${semDado}</dl>
        <details class="cartao__detalhe">
          <summary>Como especificar</summary>
          <p>${f.escolha}</p>
          ${f.verificar ? `<span class="selo-verificar"><strong>Confirmar antes de publicar:</strong> ${f.pendencia}</span>` : ''}
        </details>
        <a class="cartao__cta" href="#orcamento" data-produto="${f.id}">Pedir orçamento desta família</a>
      </article>`;
  }

  const grade = $('#grade');
  const contagem = $('#contagem');

  function desenharCatalogo() {
    const lista = filtrar();
    contagem.textContent =
      lista.length === FAMILIAS.length
        ? `${FAMILIAS.length} famílias de produto`
        : `${lista.length} de ${FAMILIAS.length} famílias atendem ao filtro`;

    grade.innerHTML = lista.length
      ? lista.map(cartaoHTML).join('')
      : `<div class="vazio">
           <p>Nenhuma família com essa combinação de rosca e método.</p>
           <p>Roscas fora da lista e peças especiais são feitas sob desenho — fale com o Comercial.</p>
         </div>`;

    // botão "pedir orçamento" de cada cartão pré-seleciona o produto
    $$('.cartao__cta', grade).forEach((a) => {
      a.addEventListener('click', () => {
        $('#fProduto').value = a.dataset.produto;
        atualizarRoscasForm();
      });
    });
  }

  /* ==========================================================
     3. COMPATIBILIDADE POR ROSCA
     ========================================================== */
  const chipsSeletor = $('#chipsSeletor');
  const resultadoRosca = $('#resultadoRosca');
  let roscaEscolhida = null;

  function desenharResultadoRosca() {
    if (!roscaEscolhida) {
      resultadoRosca.innerHTML =
        '<p class="resultado-rosca__nada">Escolha uma rosca acima para ver o conjunto disponível.</p>';
      return;
    }
    const compativeis = FAMILIAS.filter((f) => f.roscas.includes(roscaEscolhida));
    const faltantes = ['punhos', 'hastes', 'luvas', 'bits-roscados']
      .map(porId)
      .filter((f) => f && !f.roscas.includes(roscaEscolhida));

    resultadoRosca.innerHTML = `
      <div class="resultado-rosca__caixa">
        <h3>Coluna em ${roscaEscolhida}</h3>
        ${compativeis.length
          ? `<ul>${compativeis
              .map(
                (f) =>
                  `<li><a href="#fam-${f.id}">${f.nome}</a> — ${f.posicao.toLowerCase()}</li>`
              )
              .join('')}</ul>`
          : '<p class="resultado-rosca__nada">Nenhuma família publicada nesta rosca.</p>'}
        ${faltantes.length
          ? `<p class="aviso">Não consta nesta rosca na informação pública: ${faltantes
              .map((f) => f.nome.toLowerCase())
              .join(', ')}. O punho é definido pelo martelo da perfuratriz, não pela rosca da coluna.</p>`
          : ''}
      </div>`;
  }

  ROSCAS.forEach((r) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'chip';
    b.textContent = r;
    b.dataset.valor = r;
    b.setAttribute('aria-pressed', 'false');
    b.addEventListener('click', () => {
      roscaEscolhida = roscaEscolhida === r ? null : r;
      $$('.chip', chipsSeletor).forEach((c) =>
        c.setAttribute('aria-pressed', String(c.dataset.valor === roscaEscolhida))
      );
      desenharResultadoRosca();
    });
    chipsSeletor.appendChild(b);
  });
  desenharResultadoRosca();

  /* matriz família x rosca — só famílias com rosca definida */
  const comRosca = FAMILIAS.filter((f) => f.roscas.length);
  $('#tabelaCabeca').innerHTML =
    '<th scope="col">Família</th>' + ROSCAS.map((r) => `<th scope="col">${r}</th>`).join('');
  $('#tabelaCorpo').innerHTML = comRosca
    .map(
      (f) =>
        `<tr><th scope="row">${f.nome}</th>` +
        ROSCAS.map((r) =>
          f.roscas.includes(r)
            ? '<td data-tem="1"><span class="marca-sim" aria-hidden="true">●</span><span class="oculto-visual"> sim</span></td>'
            : '<td data-tem="0">—</td>'
        ).join('') +
        '</tr>'
    )
    .join('');

  /* ==========================================================
     4. CHECKLIST DE INSPEÇÃO
     ========================================================== */
  const alvoChecklist = $('#checklist');
  const grupos = [];
  CHECKLIST.forEach((c) => {
    let g = grupos.find((x) => x.nome === c.grupo);
    if (!g) grupos.push((g = { nome: c.grupo, itens: [] }));
    g.itens.push(c.item);
  });

  alvoChecklist.innerHTML = grupos
    .map(
      (g, gi) => `
      <div class="checklist__grupo">
        <h4>${g.nome}</h4>
        ${g.itens
          .map(
            (item, ii) => `
          <label class="checklist__item">
            <input type="checkbox" data-grupo="${g.nome}" data-item="${gi}-${ii}">
            <span>${item}</span>
          </label>`
          )
          .join('')}
      </div>`
    )
    .join('');

  const caixas = $$('#checklist input');
  const barra = $('#progressoPreenchida');
  const textoProgresso = $('#progressoTexto');

  function atualizarProgresso() {
    const feitos = caixas.filter((c) => c.checked).length;
    barra.style.width = (feitos / caixas.length) * 100 + '%';
    textoProgresso.textContent = `${feitos} de ${caixas.length} itens verificados`;
  }
  caixas.forEach((c) => c.addEventListener('change', atualizarProgresso));
  atualizarProgresso();

  $('#zerarChecklist').addEventListener('click', () => {
    caixas.forEach((c) => (c.checked = false));
    atualizarProgresso();
    $('#resumoInspecao').hidden = true;
  });

  $('#gerarResumo').addEventListener('click', () => {
    const agora = new Date();
    const data = agora.toLocaleDateString('pt-BR');
    const hora = agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const pendentes = caixas
      .filter((c) => !c.checked)
      .map((c) => `  [ ] ${c.nextElementSibling.textContent.trim()}`);
    const linhas = [
      `INSPEÇÃO DE FERRAMENTA — ${data} ${hora}`,
      `Verificados: ${caixas.length - pendentes.length}/${caixas.length}`,
      '',
      pendentes.length ? 'PENDENTES:' : 'Nenhum item pendente.',
      ...pendentes,
      '',
      'Limites de desgaste, torque e reafiação conforme procedimento interno.',
      'Operador: ______________   Equipamento: ______________'
    ];
    const pre = $('#resumoInspecao');
    pre.textContent = linhas.join('\n');
    pre.hidden = false;
  });

  /* ==========================================================
     5. SINAIS DE CAMPO / GLOSSÁRIO / SERVIÇOS
     ========================================================== */
  $('#tabelaSinais').innerHTML = SINAIS.map(
    (s) => `<tr><td>${s.sintoma}</td><td>${s.causa}</td><td>${s.acao}</td></tr>`
  ).join('');

  $('#glossario').innerHTML = GLOSSARIO.map(
    (g) => `<details class="termo"><summary>${g.termo}</summary><p>${g.texto}</p></details>`
  ).join('');

  $('#servicos-lista').innerHTML = SERVICOS.map(
    (s) => `
    <article class="servico">
      <h3>${s.nome}</h3>
      <p>${s.detalhe}</p>
      ${s.itens.length ? `<ul>${s.itens.map((i) => `<li>${i}</li>`).join('')}</ul>` : ''}
    </article>`
  ).join('');

  /* ==========================================================
     6. CONTATO E FORMULÁRIO
     ========================================================== */
  const zapBase = 'https://wa.me/' + EMPRESA.whatsappNumero;

  $('#ctTel').textContent = EMPRESA.telefone;
  $('#ctTel').href = EMPRESA.telefoneLink;
  $('#ctZap').textContent = EMPRESA.whatsapp;
  $('#ctZap').href = zapBase;
  $('#ctMail').textContent = EMPRESA.email;
  $('#ctMail').href = 'mailto:' + EMPRESA.email;
  $('#ctHorario').textContent = EMPRESA.atendimento;
  $('#ctEndereco').textContent = `${EMPRESA.endereco} — ${EMPRESA.cidade}/${EMPRESA.uf}, CEP ${EMPRESA.cep}`;

  $('#rpEndereco').textContent = `${EMPRESA.endereco}, ${EMPRESA.cidade}/${EMPRESA.uf} — CEP ${EMPRESA.cep}`;
  $('#rpContato').textContent = `${EMPRESA.telefone} · ${EMPRESA.email} · ${EMPRESA.atendimento} · desde ${EMPRESA.fundacao}`;
  $('#rpInsta').href = EMPRESA.instagram;
  $('#rpLinked').href = EMPRESA.linkedin;
  $('#rpFace').href = EMPRESA.facebook;
  $('#rpSite').href = EMPRESA.site;
  $('#zapFlutuante').href = zapBase;
  $('#linkCatalogo').href = EMPRESA.catalogoProdutos;

  const selProduto = $('#fProduto');
  selProduto.innerHTML =
    FAMILIAS.map((f) => `<option value="${f.id}">${f.nome}</option>`).join('') +
    '<option value="especial">Peça especial / usinagem</option>' +
    '<option value="termico">Tratamento térmico</option>';

  const selRosca = $('#fRosca');
  function atualizarRoscasForm() {
    const f = porId(selProduto.value);
    const opcoes = f ? f.roscas.concat(f.modelos) : [];
    selRosca.innerHTML =
      '<option value="">A definir</option>' +
      opcoes.map((o) => `<option value="${o}">${o}</option>`).join('');
  }
  selProduto.addEventListener('change', atualizarRoscasForm);
  atualizarRoscasForm();

  function montarMensagem() {
    const v = (id) => $(id).value.trim();
    const nome = v('#fNome');
    const empresa = v('#fEmpresa');
    const erro = $('#formErro');

    $('#fNome').setAttribute('aria-invalid', String(!nome));
    $('#fEmpresa').setAttribute('aria-invalid', String(!empresa));

    if (!nome || !empresa) {
      erro.textContent = 'Informe seu nome e a empresa para que o Comercial possa responder.';
      erro.hidden = false;
      (nome ? $('#fEmpresa') : $('#fNome')).focus();
      return null;
    }
    erro.hidden = true;

    const rotuloProduto =
      selProduto.selectedOptions[0] ? selProduto.selectedOptions[0].textContent : '';

    const linhas = [
      'Pedido de orçamento — Rodopar',
      `Nome: ${nome}`,
      `Empresa: ${empresa}`,
      v('#fCidade') ? `Cidade/UF: ${v('#fCidade')}` : null,
      v('#fFone') ? `Telefone: ${v('#fFone')}` : null,
      `Produto: ${rotuloProduto}`,
      selRosca.value ? `Rosca/modelo: ${selRosca.value}` : 'Rosca/modelo: a definir',
      v('#fQtd') ? `Quantidade: ${v('#fQtd')}` : null,
      v('#fEquip') ? `Perfuratriz/martelo: ${v('#fEquip')}` : null,
      v('#fObs') ? `Observações: ${v('#fObs')}` : null
    ].filter(Boolean);

    return linhas.join('\n');
  }

  $('#enviarZap').addEventListener('click', () => {
    const msg = montarMensagem();
    if (!msg) return;
    window.open(zapBase + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
  });

  $('#enviarMail').addEventListener('click', () => {
    const msg = montarMensagem();
    if (!msg) return;
    window.location.href =
      'mailto:' +
      EMPRESA.email +
      '?subject=' +
      encodeURIComponent('Pedido de orçamento pelo site') +
      '&body=' +
      encodeURIComponent(msg);
  });

  /* ==========================================================
     7. MENU MOBILE + ATALHOS
     ========================================================== */
  const menuBotao = $('#menuBotao');
  const nav = $('#navPrincipal');
  menuBotao.addEventListener('click', () => {
    const aberta = nav.classList.toggle('nav--aberta');
    menuBotao.setAttribute('aria-expanded', String(aberta));
  });
  $$('#navPrincipal a').forEach((a) =>
    a.addEventListener('click', () => {
      nav.classList.remove('nav--aberta');
      menuBotao.setAttribute('aria-expanded', 'false');
    })
  );

  /* links "Ver no catálogo" saindo do diagrama filtram a família */
  document.addEventListener('click', (ev) => {
    const alvo = ev.target.closest('[data-ir]');
    if (!alvo) return;
    const f = porId(alvo.dataset.ir);
    if (!f) return;
    roscasSelecionadas.clear();
    metodosSelecionados.clear();
    campoBusca.value = f.nome;
    sincronizarChips();
    desenharCatalogo();
  });

  desenharCatalogo();
})();
