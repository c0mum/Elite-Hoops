/**
 * SISTEMA DE E-COMMERCE PRO - ELITE HOOPS v2.0
 * Funcionalidades: Temas Dinâmicos, Frete, Pagamentos e Gestão de Produtos
 * Total de Linhas: Refatorado para máxima estabilidade
 */

// ========================
// 🧠 BASE DE DADOS (PRODUTOS)
// ========================
const produtos = [
    { id: 1, nome: "Armour Spawn 3", preco: 240.00, img: "img/Armour Spawn 3.png", cat: "Basquete" },
    { id: 2, nome: "Nike Ja 3", preco: 1299.00, img: "img/ja3.jpg", cat: "Basquete" },
    { id: 3, nome: "LaMelo Ball", preco: 1039.00, img: "img/LaMelo Ball.png", cat: "Basquete" },
    { id: 4, nome: "Nike Precision 6", preco: 569.00, img: "img/precision6.png", cat: "Basquete" },
    { id: 5, nome: "Nike Precision 7", preco: 430.00, img: "img/precision7.jpg", cat: "Basquete" },
    { id: 6, nome: "Nike Precision 8", preco: 617.00, img: "img/precision8.png", cat: "Basquete" },
    { id: 7, nome: "Camisa Palmeiras", preco: 199.00, img: "img/palmeiras.png", cat: "Futebol" },
    { id: 8, nome: "Camisa Santos", preco: 189.99, img: "img/santos.png", cat: "Futebol" },
    { id: 9, nome: "Camisa Corinthians", preco: 169.99, img: "img/corinthias.png", cat: "Futebol" },
    { id: 10, nome: "Camisa Bragantino", preco: 110.00, img: "img/baragantino.png", cat: "Futebol" },
    { id: 11, nome: "Camisa Bahia", preco: 149.99, img: "img/bahia.png", cat: "Futebol" },
    { id: 12, nome: "Calça Nike Esportiva V1", preco: 99.99, img: "img/calca1.png", cat: "Calças" },
    { id: 13, nome: "Calça Nike Esportiva V2", preco: 119.99, img: "img/calca2.png", cat: "Calças" },
    { id: 14, nome: "Calça Nike Esportiva V3", preco: 159.99, img: "img/calca4.png", cat: "Calças" },
    { id: 15, nome: "Calça Nike Esportiva V4", preco: 79.99, img: "img/calca3.png", cat: "Calças" },
    { id: 16, nome: "Short Nike Esportiva S1", preco: 69.99, img: "img/short1.png", cat: "Shorts" },
    { id: 17, nome: "Short Nike Esportiva S2", preco: 49.99, img: "img/short2.png", cat: "Shorts" },
    { id: 18, nome: "Short Nike Esportiva S3", preco: 99.99, img: "img/short3.png", cat: "Shorts" },
    { id: 19, nome: "Short Nike Esportiva S4", preco: 119.99, img: "img/short4.png", cat: "Shorts" },
    { id: 20, nome: "Meia Nike Esportiva M1", preco: 59.99, img: "img/meia1.png", cat: "Meias" },
    { id: 21, nome: "Meia Nike Esportiva M2", preco: 39.99, img: "img/meia2.png", cat: "Meias" },
    { id: 22, nome: "Meia Nike Esportiva M3", preco: 25.99, img: "img/meia3.png", cat: "Meias" },
    { id: 23, nome: "Meia Nike Esportiva M4", preco: 35.99, img: "img/meia4.png", cat: "Meias" },
    { id: 24, nome: "Moletom Basquet B1", preco: 299.99, img: "img/moletom1.png", cat: "Moletom" },
    { id: 25, nome: "Moletom Basquet B2", preco: 199.99, img: "img/moletom2.png", cat: "Moletom" },
    { id: 26, nome: "Moletom Basquet B3", preco: 399.99, img: "img/moletom3.png", cat: "Moletom" },
    { id: 27, nome: "Moletom Basquet B4", preco: 99.99, img: "img/moletom4.png", cat: "Moletom" },
];

// ========================
// 💾 GESTÃO DE USUÁRIOS & PREFERÊNCIAS
// ========================
function getUsers() { return JSON.parse(localStorage.getItem("users")) || []; }
function saveUsers(users) { localStorage.setItem("users", JSON.stringify(users)); }

// ========================
// 💰 UTILITÁRIOS DE FORMATAÇÃO
// ========================
function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function mostrarFeedback(msg, tipo = "sucesso") {
    const t = document.getElementById("toast");
    if (!t) return;
    t.innerText = msg;
    t.className = `toast show ${tipo}`;
    setTimeout(() => t.classList.remove("show"), 3000);
}

// ========================
// 🛍️ RENDERIZAÇÃO DO CATÁLOGO (LOJA)
// ========================
function carregarTenis() {
    const cat = document.getElementById("catalogo");
    if (!cat) return;

    cat.innerHTML = "";
    produtos.forEach(p => {
        cat.innerHTML += `
            <div class="card">
                <div class="tag">${p.cat}</div>
                <img src="${p.img}" alt="${p.nome}">
                <h3>${p.nome}</h3>
                <p class="preco">${formatarPreco(p.preco)}</p>
                <button class="btn-add" onclick="add('${p.nome}', ${p.preco})">Adicionar ao Carrinho</button>
            </div>
        `;
    });
}

// ========================
// 🛒 LÓGICA DO CARRINHO
// ========================
function getCarrinho() { return JSON.parse(localStorage.getItem("carrinho")) || []; }
function salvarCarrinho(c) { localStorage.setItem("carrinho", JSON.stringify(c)); }

function add(nome, preco) {
    let c = getCarrinho();
    c.push({ nome, preco, data: new Date() });
    salvarCarrinho(c);
    mostrarFeedback(`${nome} adicionado com sucesso!`);
    if (document.getElementById("listaCarrinho")) carregarCarrinho();
}

function remover(i) {
    let c = getCarrinho();
    c.splice(i, 1);
    salvarCarrinho(c);
    carregarCarrinho();
}

// ========================
// 🎟️ CUPOM & FRETE
// ========================
let descontoGlobal = 0;
function aplicarCupom() {
    const cupomInput = document.getElementById("cupom");
    if (!cupomInput) return;
    const cupom = cupomInput.value.toUpperCase();
    const validos = { "DEV10": 0.10, "PROMO20": 0.20, "SAIRDOZERO": 0.50 };

    if (validos[cupom]) {
        descontoGlobal = validos[cupom];
        mostrarFeedback(`Cupom ${cupom} aplicado!`);
    } else {
        descontoGlobal = 0;
        mostrarFeedback("Cupom inválido ou expirado", "erro");
    }
    carregarCarrinho();
}

let freteCalculado = 0;
function calcularFreteUI() {
    const cepInput = document.getElementById("cep");
    if (!cepInput) return;
    const cep = cepInput.value.replace(/\D/g, "");

    if (!cep || cep.length !== 8) {
        mostrarFeedback("Informe um CEP válido", "erro");
        freteCalculado = 0;
        return;
    }

    const prefixo = parseInt(cep.substring(0, 2));
    if (prefixo >= 1 && prefixo <= 19) freteCalculado = 15.00;
    else if (prefixo >= 20 && prefixo <= 28) freteCalculado = 22.50;
    else freteCalculado = 35.00;

    mostrarFeedback("Frete calculado!");
    carregarCarrinho();
}

// ========================
// 🛒 ATUALIZAR INTERFACE DO CARRINHO
// ========================
function carregarCarrinho() {
    const lista = document.getElementById("listaCarrinho");
    if (!lista) return;

    let carrinho = getCarrinho();
    let subtotal = 0;
    lista.innerHTML = "";

    carrinho.forEach((item, i) => {
        subtotal += item.preco;
        lista.innerHTML += `
            <li class="item-carrinho">
                <span>${item.nome}</span>
                <div>
                    <strong>${formatarPreco(item.preco)}</strong>
                    <button class="btn-remover" onclick="remover(${i})">X</button>
                </div>
            </li>
        `;
    });

    let valorDesconto = subtotal * descontoGlobal;
    let totalFinal = subtotal - valorDesconto + freteCalculado;

    // Atualização Segura dos Elementos
    const atualizarTexto = (id, texto) => {
        const el = document.getElementById(id);
        if (el) el.innerText = texto;
    };

    atualizarTexto("subtotal", formatarPreco(subtotal));
    atualizarTexto("freteTotal", formatarPreco(freteCalculado));
    atualizarTexto("descontoTotal", "-" + formatarPreco(valorDesconto));
    atualizarTexto("totalGeral", formatarPreco(totalFinal));

    // Parcelamento
    const comboParcelas = document.getElementById("parcelas");
    if (comboParcelas) {
        comboParcelas.innerHTML = "";
        for (let j = 1; j <= 12; j++) {
            let vFinalP = totalFinal / j;
            comboParcelas.innerHTML += `<option value="${j}">${j}x de ${formatarPreco(vFinalP)}</option>`;
        }
    }
}

// ========================
// 📱 PAGAMENTO & MÉTODOS
// ========================
function gerenciarMetodosPagamento() {
    const metodo = document.getElementById("metodoPagamento")?.value;
    const sPix = document.getElementById("secaoPix");
    const sBoleto = document.getElementById("secaoBoleto");
    const sCartao = document.getElementById("secaoCartao");

    const secoes = [sPix, sBoleto, sCartao];
    secoes.forEach(s => { if (s) s.style.display = "none"; });

    if (metodo === "pix" && sPix) {
        sPix.style.display = "block";
        const qr = document.getElementById("qrcode");
        if (qr) qr.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ELITEHOOPSPIX${Math.random()}" alt="QR">`;
    } 
    else if (metodo === "boleto" && sBoleto) {
        sBoleto.style.display = "block";
        const linha = document.getElementById("linhaDigitavel");
        if (linha) linha.innerText = "23793.38128 60083.435252 63000.063319 8 980100000000";
    } 
    else if (metodo === "cartao" && sCartao) {
        sCartao.style.display = "block";
    }
}

// ========================
// 👤 LOGIN / AUTH / LOGOUT
// ========================
function logout() {
    localStorage.removeItem("logado");
    localStorage.removeItem("userAtual");
    window.location.href = "login.html";
}

function login() {
    const e = document.getElementById("email");
    const s = document.getElementById("senha");
    if (!e || !s) return;

    let user = getUsers().find(u => u.email === e.value && u.senha === s.value);
    if (!user) return mostrarFeedback("E-mail ou senha incorretos", "erro");

    localStorage.setItem("logado", "true");
    localStorage.setItem("userAtual", JSON.stringify(user));
    window.location.href = "index.html";
}

// ========================
// 🚀 INICIALIZAÇÃO GLOBAL (ON LOAD)
// ========================
document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;

    // 1. PERSISTÊNCIA DO TEMA
    const temaSalvo = localStorage.getItem("tema");
    if (temaSalvo === "light") body.classList.add("light");

    // 2. BOTÃO DE TEMA (APENAS NA HOME)
    const btnTema = document.getElementById("theme-toggle");
    if (btnTema) {
        const isHome = window.location.pathname.endsWith("index.html") || window.location.pathname === "/";
        btnTema.style.display = isHome ? "inline-block" : "none";

        btnTema.addEventListener("click", () => {
            body.classList.toggle("light");
            localStorage.setItem("tema", body.classList.contains("light") ? "light" : "dark");
        });
    }

    // 3. PROTEÇÃO DE ROTAS
    const path = window.location.pathname;
    const isPublic = path.includes("login.html") || path.includes("cadastro.html");
    const logado = localStorage.getItem("logado") === "true";

    if (!logado && !isPublic) {
        window.location.href = "login.html";
        return;
    }

    // 4. ÁREA DO USUÁRIO
    const userArea = document.getElementById("userArea");
    const user = JSON.parse(localStorage.getItem("userAtual"));
    if (userArea && user) {
        userArea.innerHTML = `
            <div class="user-info">
                <span>Bem-vindo, <strong>${user.nome}</strong></span>
                <button onclick="logout()" class="btn-sair">Sair</button>
            </div>`;
    }

    // 5. RENDERIZAÇÃO DE CONTEÚDO
    carregarTenis();
    carregarCarrinho();

    // 6. EVENTOS DE PAGAMENTO
    const selPagamento = document.getElementById("metodoPagamento");
    if (selPagamento) selPagamento.addEventListener("change", gerenciarMetodosPagamento);

    // 7. LOADER FINAL
    const loader = document.getElementById("loader");
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = "0";
            setTimeout(() => loader.remove(), 500);
        }, 1200);
    }
});

console.log("Elite Hoops System Initialized - Version 2.0");