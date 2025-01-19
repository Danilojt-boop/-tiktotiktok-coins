defunction watchVideo() {
    document.getElementById('status').innerText = "Você ganhou 10 moedas!";
}
const Video = mongoose.model('Video', { // Define o modelo para vídeos
    userId: String,
    videoLink: String,
    views: { type: Number, default: 0 },
});

app.post('/addVideo', async (req, res) => {
    const { userId, videoLink } = req.body; // Recebe os dados da requisição
    const user = await User.findById(userId); // Busca o usuário no banco

    if (user && user.coins >= 10) { // Verifica se o usuário existe e tem moedas suficientes
        user.coins -= 10; // Deduz 10 moedas
        await user.save(); // Salva as mudanças no usuário

        const video = new Video({ userId, videoLink }); // Cria um novo vídeo
        await video.save(); // Salva o vídeo no banco de dados

        res.send({ message: 'Vídeo adicionado com sucesso!' }); // Responde com sucesso
    } else {
        res.status(400).send({ error: 'Moedas insuficientes ou usuário inválido' }); // Retorna erro
    }
});
async function addVideo() {
    const videoLink = document.getElementById('videoLink').value;
    if (!userId) {
        alert('Por favor, registre-se primeiro!');
        return;
    }

    const response = await fetch('http://localhost:3000/addVideo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, videoLink })
    });

    const data = await response.json();
    alert(data.message || 'Erro ao adicionar vídeo.');
}
const mongoose = require('mongoose');

// Conexão com o banco de dados
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
    views: { type: Number, default: 0 },
});
// Rota para registrar um usuário
app.post('/register', async (req, res) => {
    const { username } = req.body;
    const user = new User({ username });
    await user.save();
    res.status(201).send(user); // Retorna o usuário registrado
});
// Rota para assistir vídeos (adiciona moedas)
app.post('/watch', async (req, res) => {
    const { userId } = req.body; // Obtém o ID do usuário do corpo da requisição
    const user = await User.findById(userId); // Encontra o usuário no banco de dados
    if (user) {
        user.coins += 10; // Adiciona 10 moedas
        await user.save(); // Salva as alterações no banco de dados
        res.send({ message: 'Moedas adicionadas!', coins: user.coins }); // Retorna uma mensagem de sucesso
    } else {
        res.status(404).send({ error: 'Usuário não encontrado' }); // Retorna um erro se o usuário não for encontrado
    }
});
// Rota para adicionar vídeos
app.post('/addVideo', async (req, res) => {
    const { userId, videoLink } = req.body; // Obtém o ID do usuário e o link do vídeo do corpo da requisição
    const user = await User.findById(userId); // Encontra o usuário no banco de dados

    if (user && user.coins >= 10) { // Verifica se o usuário existe e tem moedas suficientes
        user.coins -= 10; // Deduz 10 moedas
        await user.save(); // Salva as alterações no banco de dados

        const video = new Video({ userId, videoLink }); // Cria um novo documento de vídeo
        await video.save(); // Salva o vídeo no banco de dados

        res.send({ message: 'Vídeo adicionado com sucesso!' }); // Retorna uma mensagem de sucesso
    } else {
        res.status(400).send({ error: 'Moedas insuficientes ou usuário inválido' }); // Retorna um erro se o usuário não tiver moedas suficientes
    }
});
    // Rota para listar vídeos
app.get('/getVideos', async (req, res) => {
    const videos = await Video.find(); // Obtém todos os vídeos do banco de dados
    res.send({ videos }); // Retorna os vídeos encontrados
});
// Rota para obter o saldo do usuário
app.post('/getCoins', async (req, res) => {
    const { userId } = req.body; // Obtém o ID do usuário do corpo da requisição
    const user = await User.findById(userId); // Encontra o usuário no banco de dados
    if (user) {
        res.send({ coins: user.coins }); // Retorna o saldo de moedas do usuário
    } else {
        res.status(404).send({ error: 'Usuário não encontrado' }); // Retorna um erro se o usuário não for encontrado
    }
});
let userId = null; // Variável para armazenar o ID do usuário

async function registerUser() {
    const username = document.getElementById('username').value;

    // Verifica se o campo de nome de usuário está vazio
    if (!username) {
        document.getElementById('registrationStatus').innerText = 'Por favor, digite um nome de usuário.';
        return;
    }

    const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
    });

    const data = await response.json();
    if (data._id) {
        userId = data._id; // Armazenar o ID do usuário registrado
        document.getElementById('registrationStatus').innerText = 'Registro realizado com sucesso! Bem-vindo, ' + username + '!';
    } else {
        document.getElementById('registrationStatus').innerText = 'Erro ao registrar usuário. Tente novamente.';
    }
}
let userId = null; // Variável para armazenar o ID do usuário

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

    // Adicionar o vídeo à lista de vídeos
    const videoList = document.getElementById('videoList');
    const li = document.createElement('li');
    li.innerHTML = `<a href="#" onclick="playVideo('${videoLink}')">${videoLink}</a>`;
    videoList.appendChild(li);

    // Aqui você deve também adicionar o vídeo ao backend, se necessário
    // (No backend, você pode adicionar uma rota para persistir vídeos, se ainda não fez isso)

    document.getElementById('videoLink').value = ''; // Limpar o campo
}

function playVideo(videoLink) {
    const videoPlayer = document.getElementById('videoPlayer');
    const videoIframe = document.getElementById('videoIframe');
    
    videoIframe.src = videoLink; // Define a URL do vídeo no iframe
    videoPlayer.style.display = 'block'; // Mostra o player de vídeo
        }
