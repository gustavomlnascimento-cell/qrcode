// PERSONALIZE AQUI: este é o único bloco que você precisa editar.
const CONFIG = {
  nomeDela: "Meu Amor",
  seuNome: "Seu Amor",
  inicioRelacionamento: "2023-06-12T20:00:00",
  dataEspecial: "2026-06-12T00:00:00",
  musica: "", // Exemplo: "assets/nossa-musica.mp3"
  mensagemDeVoz: "", // Exemplo: "assets/minha-voz.mp3"
  premioRaspadinha: "um encontro surpresa comigo ♥",
  mensagemPrincipal:
    "Hoje celebramos você, nós e todas as histórias lindas que ainda vamos viver.",
  mensagemAniversario:
    "Que seu novo ciclo seja leve, intenso e cheio de motivos para sorrir. Quero estar pertinho em cada um deles.",
  carta: [
    "Se você está lendo isto, minha surpresa deu certo. Eu queria transformar em palavras tudo o que você representa para mim, mesmo sabendo que palavra nenhuma consegue dar conta.",
    "Obrigado por deixar meus dias mais bonitos, por cada conversa, cada risada e até pelos pequenos momentos que parecem comuns, mas que ao seu lado viram as minhas melhores lembranças.",
    "Neste aniversário e neste Dia dos Namorados, meu maior desejo é continuar construindo uma vida cheia de carinho, cumplicidade e aventuras com você. Eu escolheria você em todas elas.",
    "Feliz vida, meu amor. Eu te amo.",
  ],
  historia: [
    {
      data: "O começo",
      titulo: "Quando nossos caminhos se cruzaram",
      texto: "Aquele dia em que o mundo ficou um pouco diferente e a nossa história começou.",
    },
    {
      data: "Nosso primeiro encontro",
      titulo: "O frio na barriga",
      texto: "Conversas, sorrisos e aquela vontade de fazer o tempo passar mais devagar.",
    },
    {
      data: "Um dia inesquecível",
      titulo: "Nossa aventura favorita",
      texto: "Coloque aqui uma viagem, uma conquista ou aquele momento que vocês nunca esquecem.",
    },
    {
      data: "Hoje e sempre",
      titulo: "Tudo o que ainda vem",
      texto: "O melhor capítulo é aquele que continuamos escrevendo juntos, todos os dias.",
    },
  ],
  fotos: [
    { arquivo: "assets/foto-1.jpg", legenda: "Meu lugar favorito é com você" },
    { arquivo: "assets/foto-2.jpg", legenda: "Um dia para guardar" },
    { arquivo: "assets/foto-3.jpg", legenda: "Seu sorriso" },
    { arquivo: "assets/foto-4.jpg", legenda: "Nós dois" },
    { arquivo: "assets/foto-5.jpg", legenda: "Mais uma memória bonita" },
  ],
  motivos: [
    "Seu sorriso ilumina qualquer dia",
    "O jeito como você cuida de quem ama",
    "Nossas conversas sobre tudo e nada",
    "Como posso ser eu mesmo ao seu lado",
    "Sua força e seu coração enorme",
    "Cada futuro que imagino com você",
  ],
};

const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

function fillPersonalDetails() {
  $$("[data-name]").forEach((element) => {
    element.textContent = CONFIG.nomeDela;
  });
  $$("[data-signature]").forEach((element) => {
    element.textContent = CONFIG.seuNome;
  });

  $("[data-hero-message]").textContent = CONFIG.mensagemPrincipal;
  $("[data-birthday-message]").textContent = CONFIG.mensagemAniversario;
  $("[data-scratch-prize]").textContent = CONFIG.premioRaspadinha;

  const specialDate = new Date(CONFIG.dataEspecial);
  $("[data-special-day]").textContent = String(specialDate.getDate()).padStart(2, "0");
  $("[data-special-month]").textContent = specialDate.toLocaleDateString("pt-BR", {
    month: "long",
  });
  $("[data-letter-date]").textContent = specialDate.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  $("[data-universe-date]").textContent = specialDate.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  $("#letter-copy").innerHTML = CONFIG.carta.map((paragraph) => `<p>${paragraph}</p>`).join("");
  document.title = `Para ${CONFIG.nomeDela} ♥`;
}

function buildTimeline() {
  $("#timeline").innerHTML = CONFIG.historia
    .map(
      (item) => `
        <article class="timeline__item reveal">
          <span class="timeline__dot" aria-hidden="true"></span>
          <span class="timeline__date">${item.data}</span>
          <h3>${item.titulo}</h3>
          <p>${item.texto}</p>
        </article>
      `,
    )
    .join("");
}

function buildGallery() {
  $("#photo-grid").innerHTML = CONFIG.fotos
    .map(
      (photo, index) => `
        <figure class="photo reveal">
          <img src="${photo.arquivo}" alt="${photo.legenda}" loading="lazy"
            onerror="this.hidden=true; this.nextElementSibling.hidden=false">
          <div class="photo__placeholder" hidden>
            <span>♥</span>
            Adicione a foto ${index + 1}
          </div>
          <figcaption>${photo.legenda}</figcaption>
        </figure>
      `,
    )
    .join("");
}

function buildRetrospective() {
  $("#memory-slides").innerHTML = CONFIG.fotos
    .map(
      (photo, index) => `
        <div class="memory-slide${index === 0 ? " is-active" : ""}">
          <img src="${photo.arquivo}" alt="${photo.legenda}"
            onerror="this.hidden=true; this.nextElementSibling.hidden=false">
          <div class="memory-slide__placeholder" hidden>♥</div>
        </div>
      `,
    )
    .join("");

  $("#memory-progress").innerHTML = CONFIG.fotos
    .map(
      (_, index) => `
        <span class="memory-progress__track${index === 0 ? " is-active" : ""}">
          <i class="memory-progress__fill"></i>
        </span>
      `,
    )
    .join("");
}

function setupRetrospective() {
  const player = $("#memory-player");
  const slides = $$(".memory-slide");
  const tracks = $$(".memory-progress__track");
  const playButton = $("#memory-play");
  let current = 0;
  let playing = true;
  let timer;

  const scheduleNext = () => {
    window.clearTimeout(timer);
    if (playing) timer = window.setTimeout(() => showSlide(current + 1), 5000);
  };

  const showSlide = (nextIndex) => {
    current = (nextIndex + slides.length) % slides.length;
    slides.forEach((slide, index) => slide.classList.toggle("is-active", index === current));
    tracks.forEach((track, index) => {
      track.classList.toggle("is-complete", index < current);
      track.classList.toggle("is-active", index === current);
      if (index > current) track.classList.remove("is-complete");
    });
    $("#memory-number").textContent = `Memória ${String(current + 1).padStart(2, "0")}`;
    $("#memory-caption").textContent = CONFIG.fotos[current].legenda;
    scheduleNext();
  };

  $("#memory-prev").addEventListener("click", () => showSlide(current - 1));
  $("#memory-next").addEventListener("click", () => showSlide(current + 1));
  playButton.addEventListener("click", () => {
    playing = !playing;
    player.classList.toggle("is-paused", !playing);
    playButton.textContent = playing ? "Ⅱ" : "▶";
    playButton.setAttribute("aria-label", playing ? "Pausar retrospectiva" : "Continuar retrospectiva");
    scheduleNext();
  });

  scheduleNext();
}

function setupScratchCard() {
  const canvas = $("#scratch-canvas");
  const area = $("#scratch-area");
  const context = canvas.getContext("2d", { willReadFrequently: true });
  let drawing = false;
  let checkedAt = 0;

  const paintCover = () => {
    const ratio = window.devicePixelRatio || 1;
    const rect = area.getBoundingClientRect();
    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;
    context.scale(ratio, ratio);

    const gradient = context.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, "#d7b9ad");
    gradient.addColorStop(0.5, "#f1ded1");
    gradient.addColorStop(1, "#c89e9f");
    context.fillStyle = gradient;
    context.fillRect(0, 0, rect.width, rect.height);

    context.fillStyle = "#6e4350";
    context.textAlign = "center";
    context.font = "600 13px DM Sans, sans-serif";
    context.fillText("RASPE AQUI  ♥", rect.width / 2, rect.height / 2);
  };

  const scratch = (event) => {
    if (!drawing) return;
    const rect = canvas.getBoundingClientRect();
    const pointer = event.touches?.[0] || event;
    const x = pointer.clientX - rect.left;
    const y = pointer.clientY - rect.top;
    context.globalCompositeOperation = "destination-out";
    context.beginPath();
    context.arc(x, y, 24, 0, Math.PI * 2);
    context.fill();

    checkedAt += 1;
    if (checkedAt % 12 === 0) {
      const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
      let transparent = 0;
      for (let index = 3; index < pixels.length; index += 80) {
        if (pixels[index] < 20) transparent += 1;
      }
      if (transparent / (pixels.length / 80) > 0.42) {
        canvas.classList.add("is-revealed");
        createHearts(18);
      }
    }
  };

  const start = (event) => {
    drawing = true;
    scratch(event);
  };
  const stop = () => {
    drawing = false;
  };

  canvas.addEventListener("pointerdown", start);
  canvas.addEventListener("pointermove", scratch);
  window.addEventListener("pointerup", stop);
  paintCover();
}

function setupVoiceMessage() {
  const audio = $("#voice-message");
  const button = $("#voice-play");
  const icon = $("#voice-icon");
  const card = $(".voice-card");
  const time = $("#voice-time");

  if (!CONFIG.mensagemDeVoz) {
    button.disabled = true;
    $("#voice-hint").textContent = "Configure mensagemDeVoz no script.js";
    return;
  }

  audio.src = CONFIG.mensagemDeVoz;
  $("#voice-hint").textContent = "Um áudio gravado especialmente para você";

  const formatTime = (seconds) => {
    if (!Number.isFinite(seconds)) return "00:00";
    return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
  };

  button.addEventListener("click", () => {
    if (audio.paused) audio.play();
    else audio.pause();
  });
  audio.addEventListener("play", () => {
    icon.textContent = "Ⅱ";
    card.classList.add("is-playing");
  });
  audio.addEventListener("pause", () => {
    icon.textContent = "▶";
    card.classList.remove("is-playing");
  });
  audio.addEventListener("timeupdate", () => {
    time.textContent = formatTime(audio.currentTime);
  });
}

function setupStarField() {
  const canvas = $("#star-canvas");
  const context = canvas.getContext("2d");
  const stars = Array.from({ length: 150 }, () => ({
    x: Math.random(),
    y: Math.random(),
    radius: 0.25 + Math.random() * 1.2,
    alpha: 0.2 + Math.random() * 0.7,
  }));

  const draw = () => {
    const ratio = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;
    context.scale(ratio, ratio);
    context.clearRect(0, 0, rect.width, rect.height);
    stars.forEach((star) => {
      context.beginPath();
      context.fillStyle = `rgba(255, 244, 225, ${star.alpha})`;
      context.arc(star.x * rect.width, star.y * rect.height, star.radius, 0, Math.PI * 2);
      context.fill();
    });
  };

  draw();
  window.addEventListener("resize", draw);
}

function buildReasons() {
  $("#reasons-grid").innerHTML = CONFIG.motivos
    .map(
      (reason, index) => `
        <button class="reason-card reveal" type="button" aria-label="Revelar motivo ${index + 1}">
          <span class="reason-card__inner">
            <span class="reason-card__face reason-card__front">
              <span>${String(index + 1).padStart(2, "0")}</span>
              <small>toque para revelar</small>
            </span>
            <span class="reason-card__face reason-card__back">${reason}</span>
          </span>
        </button>
      `,
    )
    .join("");

  $$(".reason-card").forEach((card) => {
    card.addEventListener("click", () => card.classList.toggle("is-flipped"));
  });
}

function updateCounter() {
  const start = new Date(CONFIG.inicioRelacionamento);
  const now = new Date();
  const totalHours = Math.max(0, Math.floor((now - start) / 3_600_000));
  const totalDays = Math.floor(totalHours / 24);
  const years = Math.floor(totalDays / 365.2425);
  const remainingAfterYears = totalDays - Math.floor(years * 365.2425);
  const months = Math.floor(remainingAfterYears / 30.44);

  $("#years").textContent = years;
  $("#months").textContent = months;
  $("#days").textContent = remainingAfterYears - Math.floor(months * 30.44);
  $("#hours").textContent = totalHours % 24;
}

function createHearts(amount = 18) {
  const container = $("#heart-container");

  for (let index = 0; index < amount; index += 1) {
    window.setTimeout(() => {
      const heart = document.createElement("span");
      heart.className = "floating-heart";
      heart.textContent = Math.random() > 0.35 ? "♥" : "♡";
      heart.style.left = `${Math.random() * 100}vw`;
      heart.style.fontSize = `${12 + Math.random() * 20}px`;
      heart.style.setProperty("--drift", `${-80 + Math.random() * 160}px`);
      heart.style.setProperty("--duration", `${3.5 + Math.random() * 3}s`);
      container.appendChild(heart);
      heart.addEventListener("animationend", () => heart.remove());
    }, index * 100);
  }
}

function setupMusic() {
  const audio = $("#background-music");
  const button = $("#sound-toggle");
  const label = $("#sound-label");

  if (!CONFIG.musica) {
    button.hidden = true;
    return;
  }

  audio.src = CONFIG.musica;

  const syncButton = () => {
    const playing = !audio.paused;
    button.classList.toggle("is-playing", playing);
    button.setAttribute("aria-label", playing ? "Pausar música" : "Ativar música");
    label.textContent = playing ? "Pausar" : "Música";
  };

  button.addEventListener("click", async () => {
    if (audio.paused) {
      await audio.play().catch(() => {});
    } else {
      audio.pause();
    }
    syncButton();
  });

  return async () => {
    await audio.play().catch(() => {});
    syncButton();
  };
}

function setupRevealAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  $$(".reveal").forEach((element) => observer.observe(element));
}

function setupInteractions(playMusic) {
  $("#open-surprise").addEventListener("click", async () => {
    $("#welcome").classList.add("is-open");
    $("#content").classList.add("is-visible");
    $("#content").setAttribute("aria-hidden", "false");
    document.body.classList.remove("locked");
    createHearts(22);
    if (playMusic) await playMusic();
  });

  const modal = $("#letter-modal");
  $("#read-letter").addEventListener("click", () => {
    modal.showModal();
    createHearts(12);
  });
  $("#close-letter").addEventListener("click", () => modal.close());
  modal.addEventListener("click", (event) => {
    if (event.target === modal) modal.close();
  });

  $("#make-wish").addEventListener("click", () => {
    $(".cake").classList.add("wish-made");
    createHearts(30);
    $("#toast").classList.add("show");
    window.setTimeout(() => $("#toast").classList.remove("show"), 3000);
  });
}

fillPersonalDetails();
buildTimeline();
buildGallery();
buildRetrospective();
buildReasons();
updateCounter();
window.setInterval(updateCounter, 60_000);
const playMusic = setupMusic();
setupRevealAnimations();
setupInteractions(playMusic);
setupRetrospective();
setupScratchCard();
setupVoiceMessage();
setupStarField();
