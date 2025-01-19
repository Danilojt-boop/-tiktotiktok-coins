function watchVideo() {
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
