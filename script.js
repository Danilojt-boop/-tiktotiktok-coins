document.addEventListener("DOMContentLoaded", () => {
  let balance = 50;
  const balanceDisplay = document.getElementById("balance");
  const registerForm = document.getElementById("register-form");
  const addLinkForm = document.getElementById("add-link-form");
  const watchVideoBtn = document.getElementById("watch-video-btn");
  const registerMessage = document.getElementById("register-message");
  const linkMessage = document.getElementById("link-message");
  const watchMessage = document.getElementById("watch-message");

  const updateBalance = () => {
    balanceDisplay.textContent = `Saldo: ${balance} moedas`;
  };

  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    registerMessage.textContent = "Registro bem-sucedido";
    updateBalance();
  });
document.addEventListener("DOMContentLoaded", () => {
  let balance = 50; // Saldo inicial
  let links = []; // Lista de links de vídeos
  const balanceDisplay = document.getElementById("balance");
  const registerForm = document.getElementById("register-form");
  const addLinkForm = document.getElementById("add-link-form");
  const watchVideoBtn = document.getElementById("watch-video-btn");
  const registerMessage = document.getElementById("register-message");
  const linkMessage = document.getElementById("link-message");
  const watchMessage = document.getElementById("watch-message");

  // Atualiza o saldo exibido
  const updateBalance = () => {
    balanceDisplay.textContent = `Saldo: ${balance} moedas`;
  };

  // Atualiza os links armazenados
  const updateLinks = () => {
    localStorage.setItem("tiktokLinks", JSON.stringify(links));
  };

  // Carrega dados do localStorage ao iniciar
  const loadData = () => {
    const savedLinks = JSON.parse(localStorage.getItem("tiktokLinks"));
    if (savedLinks) {
      links = savedLinks;
    }
    const savedBalance = localStorage.getItem("balance");
    if (savedBalance) {
      balance = parseInt(savedBalance, 10);
    }
    updateBalance();
  };

  // Salva o saldo atual no localStorage
  const saveBalance = () => {
    localStorage.setItem("balance", balance);
  };

  // Registro do usuário
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    registerMessage.textContent = "Registro bem-sucedido";
    updateBal
    
  addLinkForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const link = document.getElementById("tiktok-link").value;
    if (balance >= 50) {
      balance -= 50;
      linkMessage.textContent = `Link adicionado: ${link}`;
    } else {
      linkMessage.textContent = "Saldo insuficiente!";
    }
    updateBalance();
  });

  watchVideoBtn.addEventListener("click", () => {
    watchMessage.textContent = "Assistindo vídeo...";
    setTimeout(() => {
      balance += 10;
      watchMessage.textContent = "Você ganhou 10 moedas!";
      updateBalance();
    }, 15000); // Simula 15 segundos
  });
});
document.addEventListener("DOMContentLoaded", () => {
  let balance = 50; // Saldo inicial
  let links = []; // Lista de links de vídeos
  const balanceDisplay = document.getElementById("balance");
  const registerForm = document.getElementById("register-form");
  const addLinkForm = document.getElementById("add-link-form");
  const showAddLinkFormBtn = document.getElementById("show-add-link-form");
  const watchVideoBtn = document.getElementById("watch-video-btn");
  const registerMessage = document.getElementById("register-message");
  const linkMessage = document.getElementById("link-message");
  const watchMessage = document.getElementById("watch-message");

  // Atualiza o saldo exibido
  const updateBalance = () => {
    balanceDisplay.textContent = `Saldo: ${balance} moedas`;
  };

  // Registro do usuário
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    registerMessage.textContent = "Registro bem-sucedido";
    updateBalance();
  });

  // Exibir ou ocultar o formulário de adicionar link
  showAddLinkFormBtn.addEventListener("click", () => {
    if (addLinkForm.classList.contains("hidden")) {
      addLinkForm.classList.remove("hidden");
    } else {
      addLinkForm.classList.add("hidden");
    }
  });

  // Adicionar link de vídeo
  addLinkForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const linkInput = document.getElementById("tiktok-link");
    const link = linkInput.value.trim();
    if (!link) {
      linkMessage.textContent = "Por favor, insira um link válido.";
      return;
    }
    if (balance >= 50) {
      balance -= 50;
      links.push(link);
      updateBalance();
      linkMessage.textContent = `Link adicionado com sucesso: ${link}`;
      linkInput.value = "";
      addLinkForm.classList.add("hidden");
    } else {
      linkMessage.textContent = "Saldo insuficiente para adicionar um link.";
    }
  });

  // Assistir vídeo para ganhar moedas
  watchVideoBtn.addEventListener("click", () => {
    if (links.length === 0) {
      watchMessage.textContent = "Nenhum link disponível. Adicione um vídeo primeiro.";
      return;
    }

    const randomLink = links[Math.floor(Math.random() * links.length)];
    watchMessage.textContent = "Assistindo vídeo...";

    // Simula o usuário assistindo ao vídeo por 15 segundos
    const videoWindow = window.open(randomLink, "_blank");
    setTimeout(() => {
      if (videoWindow) {
        videoWindow.close();
      }
      balance += 10;
      updateBalance();
      watchMessage.textContent = "Você ganhou 10 moedas!";
    }, 15000); // Espera 15 segundos antes de creditar as moedas
  });
});
  
document.addEventListener("DOMContentLoaded", () => {
  const addLinkForm = document.getElementById("add-link-form");
  const showAddLinkFormBtn = document.getElementById("show-add-link-form");

  // Exibir ou ocultar o formulário de adicionar link
  showAddLinkFormBtn.addEventListener("click", () => {
    if (addLinkForm.classList.contains("hidden")) {
      addLinkForm.classList.remove("hidden");
    } else {
      addLinkForm.classList.add("hidden");
    }
  });
});
  
