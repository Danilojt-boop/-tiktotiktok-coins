        let userId = null; // Variável para armazenar o ID do usuário
let currentCoins = 0; // Variável para armazenar as moedas do usuário

async function registerUser() {
    const username = document.getElementById('username').value;
    const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
    });

    const data = await response.json();
    if (data._id) {
        userId = data._id; // Armazenar o ID do usuário registrado
        currentCoins = data.coins || 0; // Atualiza as moedas do usuário
        updateCoinsDisplay();
        document.getElementById('registrationStatus').innerText = 'Usuário registrado com sucesso!';
    } else {
        document.getElementById('registrationStatus').innerText = 'Erro ao registrar usuário.';
    }
}

async function addVideo() {
    const videoLink = document.getElementById('videoLink').value;
    if (!userId) {
        alert('Por favor, registre-se primeiro!');
        return;
    }
    if (currentCoins < 50) {
        alert('Você precisa de pelo menos 50 moedas para adicionar um vídeo.');
        return;
    }

    // Adicionar o vídeo à lista de vídeos
    const videoList = document.getElementById('videoList');
    const li = document.createElement('li');
    li.innerHTML = `<a href="#" onclick="playVideo('${videoLink}')">${videoLink}</a>`;
    videoList.appendChild(li);

    // Reduzir moedas
    currentCoins -= 50;
    updateCoinsDisplay();

    // Aqui você deve também adicionar o vídeo ao backend, se necessário
    const response = await fetch('http://localhost:3000/addVideo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, videoLink })
    });

    const data = await response.json();
    document.getElementById('videoAddStatus').innerText = data.message || 'Erro ao adicionar vídeo';
    document.getElementById('videoLink').value = ''; // Limpar o campo
}

function playVideo(videoLink) {
    const videoPlayer = document.getElementById('videoPlayer');
    const videoIframe = document.getElementById('videoIframe');

    // Exibir o player de vídeo e redirecionar para o link
    videoIframe.src = videoLink; // Define a URL do vídeo no iframe
    videoPlayer.style.display = 'block'; // Mostra o player de vídeo

    // Aguarda 15 segundos
    setTimeout(async () => {
        await fetch('http://localhost:3000/watch', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId })
        });
        currentCoins += 10; // Adiciona 10 moedas após assistir
        updateCoinsDisplay();
        alert('Você ganhou 10 moedas!');
    }, 15000); // 15 segundos
}

function updateCoinsDisplay() {
    document.getElementById('coins').innerText = currentCoins;
}

