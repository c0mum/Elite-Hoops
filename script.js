
/**
 * ==========================================
 * 🏀 ELITE HOOPS - SISTEMA E-COMMERCE PRO
 * ==========================================
 * ✅ Login
 * ✅ Cadastro
 * ✅ Carrinho
 * ✅ Tema Dark/Light
 * ✅ Cupons
 * ✅ Frete
 * ✅ Pagamentos
 * ✅ Persistência LocalStorage
 * ✅ Loader
 * ✅ Segurança básica
 * ==========================================
 */

// ==========================================
// 🛍️ PRODUTOS
// ==========================================
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
    { id: 24, nome: "Moletom Nike Esportiva M1", preco: 299.99, img: "img/moletom1.png", cat: "Moletom" },
    { id: 25, nome: "Moletom Nike Esportiva M2", preco: 199.99, img: "img/moletom2.png", cat: "Moletom" },
    { id: 26, nome: "Moletom Nike Esportiva M3", preco: 399.99, img: "img/moletom3.png", cat: "Moletom" },
    { id: 27, nome: "Moletom Nike Esportiva M4", preco: 99.99, img: "img/moletom4.png", cat: "Moletom" },
];

// ==========================================
// 💾 LOCAL STORAGE
// ==========================================
function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

function getCarrinho() {
    return JSON.parse(localStorage.getItem("carrinho")) || [];
}

function salvarCarrinho(carrinho) {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

// ==========================================
// 💰 FORMATAR PREÇO
// ==========================================
function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// ==========================================
// 🌗 TEMA DARK/LIGHT
// ==========================================
function alternarTema() {

    document.body.classList.toggle("light");

    const temaAtual = document.body.classList.contains("light")
        ? "light"
        : "dark";

    localStorage.setItem("tema", temaAtual);

    atualizarIconeTema();
}

// ==========================================
// 🌙 ÍCONE TEMA
// ==========================================
function atualizarIconeTema() {

    const botao = document.getElementById("theme-toggle");

    if (!botao) return;

    if (document.body.classList.contains("light")) {
        botao.innerHTML = "☀️";
    } else {
        botao.innerHTML = "🌙";
    }
}

// ==========================================
// 🔔 FEEDBACK
// ==========================================
function mostrarFeedback(msg, tipo = "sucesso") {

    const toast = document.getElementById("toast");

    if (!toast) {
        alert(msg);
        return;
    }

    toast.innerText = msg;
    toast.className = `toast show ${tipo}`;

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

// ==========================================
// 👤 CADASTRO
// ==========================================
function cadastro() {

    const nome = document.getElementById("nome")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const senha = document.getElementById("senha")?.value.trim();

    if (!nome || !email || !senha) {
        mostrarFeedback("Preencha todos os campos", "erro");
        return;
    }

    let users = getUsers();

    const existe = users.find(user => user.email === email);

    if (existe) {
        mostrarFeedback("E-mail já cadastrado", "erro");
        return;
    }

    users.push({
        nome,
        email,
        senha
    });

    saveUsers(users);

    mostrarFeedback("Cadastro realizado com sucesso!");

    setTimeout(() => {
        window.location.href = "login.html";
    }, 1500);
}

// ==========================================
// 🔐 LOGIN
// ==========================================
function login() {

    const email = document.getElementById("email")?.value.trim();
    const senha = document.getElementById("senha")?.value.trim();

    if (!email || !senha) {
        mostrarFeedback("Preencha todos os campos", "erro");
        return;
    }

    const users = getUsers();

    const user = users.find(
        u => u.email === email && u.senha === senha
    );

    if (!user) {
        mostrarFeedback("E-mail ou senha incorretos", "erro");
        return;
    }

    localStorage.setItem("logado", "true");
    localStorage.setItem("userAtual", JSON.stringify(user));

    mostrarFeedback("Login realizado!");

    setTimeout(() => {
        window.location.href = "index.html";
    }, 1000);
}

// ==========================================
// 🚪 LOGOUT
// ==========================================
function logout() {

    localStorage.removeItem("logado");
    localStorage.removeItem("userAtual");

    window.location.href = "login.html";
}

// ==========================================
// 🛍️ CARREGAR PRODUTOS
// ==========================================
function carregarTenis() {

    const catalogo = document.getElementById("catalogo");

    if (!catalogo) return;

    catalogo.innerHTML = "";

    produtos.forEach(produto => {

        catalogo.innerHTML += `
            <div class="card">

                <div class="tag">
                    ${produto.cat}
                </div>

                <img
                    src="${produto.img}"
                    alt="${produto.nome}"
                >

                <h3>${produto.nome}</h3>

                <p class="preco">
                    ${formatarPreco(produto.preco)}
                </p>

                <button
                    class="btn-add"
                    onclick="add('${produto.nome}', ${produto.preco})"
                >
                    Adicionar ao Carrinho
                </button>

            </div>
        `;
    });
}

// ==========================================
// 🛒 ADICIONAR CARRINHO
// ==========================================
function add(nome, preco) {

    let carrinho = getCarrinho();

    carrinho.push({
        nome,
        preco
    });

    salvarCarrinho(carrinho);

    mostrarFeedback(`${nome} adicionado ao carrinho!`);

    carregarCarrinho();
}

// ==========================================
// ❌ REMOVER ITEM
// ==========================================
function remover(index) {

    let carrinho = getCarrinho();

    carrinho.splice(index, 1);

    salvarCarrinho(carrinho);

    carregarCarrinho();

    mostrarFeedback("Produto removido!");
}

// ==========================================
// 🎟️ CUPONS
// ==========================================
let descontoGlobal = 0;

function aplicarCupom() {

    const cupomInput = document.getElementById("cupom");

    if (!cupomInput) return;

    const cupom = cupomInput.value.toUpperCase();

    const cupons = {
        DEV10: 0.10,
        PROMO20: 0.20,
        SAIRDOZERO: 0.50
    };

    if (cupons[cupom]) {

        descontoGlobal = cupons[cupom];

        mostrarFeedback(`Cupom ${cupom} aplicado!`);

    } else {

        descontoGlobal = 0;

        mostrarFeedback("Cupom inválido", "erro");
    }

    carregarCarrinho();
}

// ==========================================
// 🚚 FRETE
// ==========================================
let freteCalculado = 0;

function calcularFreteUI() {

    const cepInput = document.getElementById("cep");

    if (!cepInput) return;

    const cep = cepInput.value.replace(/\D/g, "");

    if (cep.length !== 8) {
        mostrarFeedback("CEP inválido", "erro");
        return;
    }

    const prefixo = Number(cep.substring(0, 2));

    if (prefixo <= 19) {
        freteCalculado = 15;
    }
    else if (prefixo <= 28) {
        freteCalculado = 22.5;
    }
    else {
        freteCalculado = 35;
    }

    mostrarFeedback("Frete calculado!");

    carregarCarrinho();
}

// ==========================================
// 🛒 RENDERIZAR CARRINHO
// ==========================================
function carregarCarrinho() {

    const lista = document.getElementById("listaCarrinho");

    if (!lista) return;

    const carrinho = getCarrinho();

    lista.innerHTML = "";

    let subtotal = 0;

    carrinho.forEach((item, index) => {

        subtotal += item.preco;

        lista.innerHTML += `
            <li class="item-carrinho">

                <span>${item.nome}</span>

                <div class="acoes-item">

                    <strong>
                        ${formatarPreco(item.preco)}
                    </strong>

                    <button
                        class="btn-remover"
                        onclick="remover(${index})"
                    >
                        X
                    </button>

                </div>

            </li>
        `;
    });

    const desconto = subtotal * descontoGlobal;

    const total = subtotal - desconto + freteCalculado;

    atualizarTexto("subtotal", formatarPreco(subtotal));
    atualizarTexto("freteTotal", formatarPreco(freteCalculado));
    atualizarTexto("descontoTotal", "-" + formatarPreco(desconto));
    atualizarTexto("totalGeral", formatarPreco(total));

    const parcelas = document.getElementById("parcelas");

    if (parcelas) {

        parcelas.innerHTML = "";

        for (let i = 1; i <= 12; i++) {

            const valorParcela = total / i;

            parcelas.innerHTML += `
                <option value="${i}">
                    ${i}x de ${formatarPreco(valorParcela)}
                </option>
            `;
        }
    }
}

// ==========================================
// 🧩 UTIL
// ==========================================
function atualizarTexto(id, texto) {

    const el = document.getElementById(id);

    if (el) {
        el.innerText = texto;
    }
}

// ==========================================
// 💳 PAGAMENTOS
// ==========================================
function gerenciarMetodosPagamento() {

    const metodo = document.getElementById("metodoPagamento")?.value;

    const secaoPix = document.getElementById("secaoPix");
    const secaoBoleto = document.getElementById("secaoBoleto");
    const secaoCartao = document.getElementById("secaoCartao");

    [secaoPix, secaoBoleto, secaoCartao].forEach(secao => {

        if (secao) {
            secao.style.display = "none";
        }
    });

    if (metodo === "pix" && secaoPix) {

        secaoPix.style.display = "block";

        const qr = document.getElementById("qrcode");

        if (qr) {

            qr.innerHTML = `
                <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ELITEHOOPSPIX"
                    alt="QR CODE PIX"
                >
            `;
        }
    }

    if (metodo === "boleto" && secaoBoleto) {

        secaoBoleto.style.display = "block";

        const linha = document.getElementById("linhaDigitavel");

        if (linha) {

            linha.innerText =
                "23793.38128 60083.435252 63000.063319";
        }
    }

    if (metodo === "cartao" && secaoCartao) {
        secaoCartao.style.display = "block";
    }
}

// ==========================================
// 🚀 INICIALIZAÇÃO
// ==========================================
document.addEventListener("DOMContentLoaded", () => {

    // ======================================
    // 🌗 CARREGAR TEMA
    // ======================================
    const temaSalvo = localStorage.getItem("tema");

    if (temaSalvo === "light") {
        document.body.classList.add("light");
    }

    atualizarIconeTema();

    // ======================================
    // 🌙 BOTÃO TEMA
    // ======================================
    const btnTema = document.getElementById("theme-toggle");

    if (btnTema) {
        btnTema.addEventListener("click", alternarTema);
    }

    // ======================================
    // 🔐 PROTEÇÃO DE ROTAS
    // ======================================
    const path = window.location.pathname.split("/").pop();

    const paginasPublicas = [
        "login.html",
        "cadastro.html",
        ""
    ];

    const logado =
        localStorage.getItem("logado") === "true";

    if (!logado && !paginasPublicas.includes(path)) {

        window.location.href = "login.html";
        return;
    }

    // ======================================
    // 👤 USER AREA
    // ======================================
    const userArea = document.getElementById("userArea");

    const user =
        JSON.parse(localStorage.getItem("userAtual"));

    if (userArea && user) {

        userArea.innerHTML = `
            <div class="user-info">

                <span>
                    Bem-vindo,
                    <strong>${user.nome}</strong>
                </span>

                <button
                    onclick="logout()"
                    class="btn-sair"
                >
                    Sair
                </button>

            </div>
        `;
    }

    // ======================================
    // 🛍️ CARREGAR PRODUTOS
    // ======================================
    carregarTenis();

    // ======================================
    // 🛒 CARREGAR CARRINHO
    // ======================================
    carregarCarrinho();

    // ======================================
    // 💳 PAGAMENTOS
    // ======================================
    const metodoPagamento =
        document.getElementById("metodoPagamento");

    if (metodoPagamento) {

        metodoPagamento.addEventListener(
            "change",
            gerenciarMetodosPagamento
        );

        gerenciarMetodosPagamento();
    }

    // ======================================
    // ⏳ LOADER
    // ======================================
    const loader = document.getElementById("loader");

    if (loader) {

        setTimeout(() => {

            loader.style.opacity = "0";

            setTimeout(() => {
                loader.remove();
            }, 500);

        }, 1200);
    }

    console.log("🏀 Elite Hoops carregado com sucesso!");
});


// ==========================================
// ♿ ACESSIBILIDADE ELITE HOOPS
// ==========================================

let tamanhoFonteAtual = 16;

// Abrir / fechar painel
const btnAcessibilidade =
    document.getElementById("btnAcessibilidade");

const painelAcessibilidade =
    document.getElementById("painelAcessibilidade");

if (btnAcessibilidade && painelAcessibilidade) {

    btnAcessibilidade.addEventListener("click", () => {

        painelAcessibilidade.classList.toggle("ativo");

    });

}

// ==========================================
// 🔍 AUMENTAR FONTE
// ==========================================
function aumentarFonte() {

    tamanhoFonteAtual += 2;

    document.body.style.fontSize =
        tamanhoFonteAtual + "px";

    localStorage.setItem(
        "fonte",
        tamanhoFonteAtual
    );
}

// ==========================================
// 🔎 DIMINUIR FONTE
// ==========================================
function diminuirFonte() {

    if (tamanhoFonteAtual <= 12) return;

    tamanhoFonteAtual -= 2;

    document.body.style.fontSize =
        tamanhoFonteAtual + "px";

    localStorage.setItem(
        "fonte",
        tamanhoFonteAtual
    );
}

// ==========================================
// 👨‍🦯 ALTO CONTRASTE
// ==========================================
function alternarContraste() {

    document.body.classList.toggle(
        "alto-contraste"
    );

    localStorage.setItem(
        "altoContraste",
        document.body.classList.contains(
            "alto-contraste"
        )
    );
}

// ==========================================
// 🎨 MODO DALTÔNICO
// ==========================================
function alternarDaltonico() {

    document.body.classList.toggle(
        "daltonico"
    );

    localStorage.setItem(
        "daltonico",
        document.body.classList.contains(
            "daltonico"
        )
    );
}

// ==========================================
// ✨ DESATIVAR ANIMAÇÕES
// ==========================================
function alternarAnimacoes() {

    document.body.classList.toggle(
        "sem-animacoes"
    );

    localStorage.setItem(
        "animacoes",
        document.body.classList.contains(
            "sem-animacoes"
        )
    );
}

// ==========================================
// 🔊 LEITOR DE TELA
// ==========================================
let falaAtual = null;

function lerPagina() {

    speechSynthesis.cancel();

    const texto =
        document.body.innerText;

    falaAtual =
        new SpeechSynthesisUtterance(texto);

    falaAtual.lang = "pt-BR";

    document.body.classList.add("lendo");

    falaAtual.onend = () => {

        document.body.classList.remove("lendo");

    };

    speechSynthesis.speak(falaAtual);
}

// ==========================================
// 🛑 PARAR LEITURA
// ==========================================
function pararLeitura() {

    speechSynthesis.cancel();

    document.body.classList.remove("lendo");
}

// ==========================================
// ⌨️ ATALHOS DE TECLADO
// ==========================================
document.addEventListener(
    "keydown",
    (e) => {

        if (e.altKey && e.key === "1") {

            document
                .getElementById("inicio")
                ?.scrollIntoView({
                    behavior: "smooth"
                });
        }

        if (e.altKey && e.key === "2") {

            document
                .getElementById("sobre")
                ?.scrollIntoView({
                    behavior: "smooth"
                });
        }

        if (e.altKey && e.key === "3") {

            document
                .getElementById("contato")
                ?.scrollIntoView({
                    behavior: "smooth"
                });
        }

        if (e.key === "Escape") {

            speechSynthesis.cancel();

            document.body.classList.remove(
                "lendo"
            );
        }
    }
);

// ==========================================
// 💾 CARREGAR PREFERÊNCIAS
// ==========================================
window.addEventListener(
    "load",
    () => {

        const fonte =
            localStorage.getItem("fonte");

        if (fonte) {

            tamanhoFonteAtual =
                parseInt(fonte);

            document.body.style.fontSize =
                fonte + "px";
        }

        if (
            localStorage.getItem(
                "altoContraste"
            ) === "true"
        ) {

            document.body.classList.add(
                "alto-contraste"
            );
        }

        if (
            localStorage.getItem(
                "daltonico"
            ) === "true"
        ) {

            document.body.classList.add(
                "daltonico"
            );
        }

        if (
            localStorage.getItem(
                "animacoes"
            ) === "true"
        ) {

            document.body.classList.add(
                "sem-animacoes"
            );
        }
    }
);

// ==========================================
// ♿ AJUSTE AUTOMÁTICO DE ALT
// ==========================================
document.addEventListener(
    "DOMContentLoaded",
    () => {

        document
            .querySelectorAll("img")
            .forEach((img) => {

                if (
                    !img.hasAttribute("alt")
                ) {

                    img.alt =
                        "Imagem Elite Hoops";
                }
            });
    }
);

console.log(
    "♿ Sistema de acessibilidade carregado!"
);