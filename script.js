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

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

// Conexão com o banco de dados (exemplo usando MongoDB)
mongoose.connect('mongodb://localhost:27017/tiktok-coins', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Modelo de usuário
const User = mongoose.model('User', {
    username: String,
    coins: { type: Number, default: 0 },
});

// Modelo de vídeo
const Video = mongoose.model('Video', {
    userId: String,
    videoLink: String,
});

// Rota para registrar um usuário
app.post('/register', async (req, res) => {
    const { username } = req.body;
    const user = new User({ username, coins: 0 }); // Inicializa com 0 moedas
    await user.save();
    res.status(201).send(user);
});

// Rota para adicionar vídeo
app.post('/addVideo', async (req, res) => {
    const { userId, videoLink } = req.body;
    const user = await User.findById(userId);

    if (user && user.coins >= 50) { // Cobrar 50 moedas por vídeo
        user.coins -= 50;
        await user.save();

        const video = new Video({ userId, videoLink });
        await video.save();

        res.send({ message: 'Vídeo adicionado com sucesso!' });
    } else {
        res.status(400).send({ error: 'Moedas insuficientes ou usuário inválido' });
    }
});

// Rota para assistir vídeos (adiciona moedas)
app.post('/watch', async (req, res) => {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (user) {
        user.coins += 10; // Exemplo: 10 moedas por vídeo
        await user.save();
        res.send({ message: 'Moedas adicionadas!', coins: user.coins });
    } else {
        res.status(404).send({ error: 'Usuário não encontrado' });
    }
});

// Inicialização do servidor
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
