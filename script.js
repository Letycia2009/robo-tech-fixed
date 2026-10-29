
/* ==========================================
   SCHOOL GAME APP
   Sistema principal + OFFLINE
   + CONFIGURAÇÕES
   + MODO CLARO / ESCURO
========================================== */


/* ==========================================
   ELEMENTOS
========================================== */

const startScreen = document.getElementById("startScreen");
const mainScreen = document.getElementById("mainScreen");

const startButton = document.getElementById("startButton");
const continueButton = document.getElementById("continueButton");

const offlineBanner = document.getElementById("offlineBanner");

const connectionDot = document.getElementById("connectionDot");
const connectionText = document.getElementById("connectionText");

const mainConnectionDot =
    document.getElementById("mainConnectionDot");

const mainConnectionText =
    document.getElementById("mainConnectionText");

const xpValue =
    document.getElementById("xpValue");

const levelValue =
    document.getElementById("levelValue");

const questionInput =
    document.getElementById("questionInput");

const questionButton =
    document.getElementById("questionButton");

const modal =
    document.getElementById("modal");

const modalContent =
    document.getElementById("modalContent");

const closeModal =
    document.getElementById("closeModal");

const toast =
    document.getElementById("toast");

const toastMessage =
    document.getElementById("toastMessage");


/* ==========================================
   ESTADO DO JOGADOR
========================================== */

let player = {
    xp:
        Number(
            localStorage.getItem("schoolGameXP")
        ) || 0
};


/* ==========================================
   SALVAR PROGRESSO
========================================== */

function savePlayer() {
    localStorage.setItem(
        "schoolGameXP",
        player.xp
    );
}


/* ==========================================
   NÍVEL
========================================== */

function calculateLevel(xp) {
    return Math.floor(xp / 100) + 1;
}


/* ==========================================
   ATUALIZAR XP
========================================== */

function updatePlayerUI() {
    const level = calculateLevel(player.xp);

    xpValue.textContent = `${player.xp} XP`;
    levelValue.textContent = level;

    savePlayer();
}


/* ==========================================
   ADICIONAR XP
========================================== */

function addXP(amount) {
    const oldLevel = calculateLevel(player.xp);

    player.xp += amount;

    const newLevel = calculateLevel(player.xp);

    updatePlayerUI();

    showToast(`+${amount} XP conquistado!`);

    if (newLevel > oldLevel) {
        setTimeout(() => {
            showToast(
                `🎉 Parabéns! Você chegou ao nível ${newLevel}!`
            );
        }, 1200);
    }
}


function checkLoggedUser() {
    const savedUser = localStorage.getItem("schoolGameCurrentUser");

    // Se não existe usuário logado, permanece na tela inicial
    if (!savedUser) {
        return;
    }

    try {
        const user = JSON.parse(savedUser);

        // Esconde a tela inicial
        if (startScreen) {
            startScreen.classList.add("hidden");
        }

        // Mostra o conteúdo interno
        if (mainScreen) {
            mainScreen.classList.remove("hidden");
        }

        console.log("Usuário logado:", user.name);

    } catch (error) {
        console.error(
            "Erro ao carregar usuário:",
            error
        );

        localStorage.removeItem("schoolGameCurrentUser");
    }
}


/* ========================================== tercceira tela
   TELA INICIAL
========================================== */

if (startButton) {
    startButton.addEventListener("click", () => {
        window.location.href = "login.html";
    });
}


continueButton.addEventListener(
    "click",
    () => {
        document
            .querySelector(".menu-section")
            .scrollIntoView({
                behavior: "smooth"
            });
    }
);


/* ==========================================
   STATUS DA INTERNET
========================================== */

function updateConnectionStatus() {
    const online = navigator.onLine;

    if (online) {
        /* Tela inicial */
        connectionText.textContent =
            "Conectado à internet";

        connectionDot.classList.remove("offline");

        /* Tela principal */
        mainConnectionText.textContent = "Online";

        mainConnectionDot.classList.remove("offline");

        /* Banner */
        offlineBanner.classList.remove("show");

    } else {
        /* Tela inicial */
        connectionText.textContent = "Modo offline";

        connectionDot.classList.add("offline");

        /* Tela principal */
        mainConnectionText.textContent = "Offline";

        mainConnectionDot.classList.add("offline");

        /* Banner */
        offlineBanner.classList.add("show");
    }
}


/* ==========================================
   DETECTAR QUANDO PERDE INTERNET
========================================== */

window.addEventListener(
    "offline",
    updateConnectionStatus
);


/* ==========================================
   DETECTAR QUANDO INTERNET VOLTA
========================================== */

window.addEventListener(
    "online",
    () => {
        updateConnectionStatus();

        showToast("🟢 Conexão restaurada!");
    }
);


/* ==========================================
   MODAL
========================================== */

function openModal(content) {
    modalContent.innerHTML = content;

    modal.classList.remove("hidden");

    document.body.style.overflow = "hidden";
}


function closeModalFunction() {
    modal.classList.add("hidden");

    document.body.style.overflow = "";
}


closeModal.addEventListener(
    "click",
    closeModalFunction
);


document
    .querySelector(".modal-overlay")
    .addEventListener(
        "click",
        closeModalFunction
    );


/* ==========================================
   MATÉRIAS
========================================== */

function openSubjects() {
    openModal(`
        <h2>
            <i class="fa-solid fa-book-open"></i>
            Matérias
        </h2>

        <p>
            Escolha uma matéria para começar
            sua jornada de aprendizado.
        </p>

        <div class="modal-list">
            <div class="modal-item">📐 Matemática</div>
            <div class="modal-item">🧪 Química</div>
            <div class="modal-item">⚛️ Física</div>
            <div class="modal-item">🧬 Biologia</div>
            <div class="modal-item">📚 Português</div>
            <div class="modal-item">🌎 Geografia</div>
            <div class="modal-item">🏛️ História</div>
            <div class="modal-item">🇪🇸 Espanhol</div>
        </div>
    `);
}


/* ==========================================
   SECRETARIA
========================================== */

function openSecretary() {
    openModal(`
        <h2>
            <i class="fa-solid fa-building-columns"></i>
            Secretaria
        </h2>

        <p>
            Consulte as principais informações
            da escola.
        </p>

        <div class="modal-list">
            <div class="modal-item">
                🕐 Segunda a sexta<br>
                08h00 às 17h00
            </div>

            <div class="modal-item">
                📞 Contato<br>
                Secretaria
            </div>

            <div class="modal-item">
                📍 Localização<br>
                Escola
            </div>

            <div class="modal-item">
                📋 Atendimento<br>
                Informações escolares
            </div>
        </div>
    `);
}


/* ==========================================
   SOBRE
========================================== */

function openAbout() {
    openModal(`
        <h2>
            <i class="fa-solid fa-circle-info"></i>
            Sobre o School Game
        </h2>

        <p>
            O School Game App é um projeto desenvolvido
            para tornar o aprendizado mais interativo,
            divertido e acessível aos alunos.
        </p>

        <br>

        <p>
            Aqui você pode explorar matérias,
            responder perguntas, participar de desafios
            e conquistar XP.
        </p>

        <br>

        <p>
            <strong>
                Conquiste, evolua e aprenda!
            </strong>
        </p>
    `);
}


/* ==========================================
   CONFIGURAÇÕES
========================================== */

function openSettings() {
    const currentTheme =
        localStorage.getItem("schoolGameTheme") || "light";

    openModal(`
        <h2>
            <i class="fa-solid fa-gear"></i>
            Configurações
        </h2>

        <p>
            Personalize a aparência do
            School Game escolhendo o tema
            que você prefere.
        </p>

        <div class="settings-options">

            <!-- MODO CLARO -->
            <button
                class="theme-option ${
                    currentTheme === "light" ? "active" : ""
                }"
                data-theme="light"
            >
                <i class="fa-solid fa-sun"></i>
                <span>Modo claro</span>
            </button>

            <!-- MODO ESCURO -->
            <button
                class="theme-option ${
                    currentTheme === "dark" ? "active" : ""
                }"
                data-theme="dark"
            >
                <i class="fa-solid fa-moon"></i>
                <span>Modo escuro</span>
            </button>

        </div>
    `);

    document.querySelectorAll("[data-theme]").forEach(button => {
        button.addEventListener("click", () => {
            setTheme(button.dataset.theme);
            openSettings();
        });
    });
}


/* ==========================================
   APLICAR TEMA
========================================== */

function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);

    localStorage.setItem("schoolGameTheme", theme);

    showToast(
        theme === "dark"
            ? "Modo escuro ativado."
            : "Modo claro ativado."
    );
}


/* ==========================================
   CARREGAR TEMA SALVO
========================================== */

function loadSavedTheme() {
    const savedTheme =
        localStorage.getItem("schoolGameTheme") || "light";

    setTheme(savedTheme);
}


/* ==========================================
   NAVEGAÇÃO DO MENU
========================================== */

document.querySelectorAll("[data-section]").forEach(button => {
    button.addEventListener("click", () => {
        const section = button.dataset.section;

        if (section === "subjects") {
            openSubjects();
        } else if (section === "secretary") {
            openSecretary();
        } else if (section === "about") {
            openAbout();
        } else if (section === "settings") {
            openSettings();
        }
    });
});


/* ==========================================
   MINI GAMES
========================================== */

document.querySelectorAll("[data-game]").forEach(button => {
    button.addEventListener("click", () => {
        const game = button.dataset.game;

        if (game === "quiz") {
            openQuiz();
        } else if (game === "memory") {
            openMemory();
        } else if (game === "challenge") {
            openChallenge();
        }
    });
});


const justLoggedIn =
    sessionStorage.getItem("schoolGameJustLoggedIn") === "true";

sessionStorage.removeItem("schoolGameJustLoggedIn");

if (justLoggedIn) {
    checkLoggedUser();
} else {
    localStorage.removeItem("schoolGameCurrentUser");
    window.location.replace("login.html");
}

