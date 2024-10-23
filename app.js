require('dotenv').config(); // Carregar variáveis de ambiente

const OpenAI = require('openai');
const express = require('express')
const app = express()
const port = 3000

app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.API_KEY,
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/vulnerability', async (req, res) => {

    const { vulnerability } = req.body;

    if (!vulnerability) {
        return res.status(400).json({ error: 'Informe a vulnerabilidade!' })
    }

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", // 'gpt-4'
        messages: [
            { 
                role: "user",
                content: `
                    Você é um especialista em segurança da informação e executou uma varredura de ameaças na sua empresa, na qual retornou a seguinte vulnerabilidade: ${vulnerability}.
                    Em poucas palavras, gere uma descrição e as possiveis soluções para essa vulnerabilidade, retornando um objeto com as propriedades description e resolution.
                `,
            }
        ],
        temperature: 0.7,
    });

    return res.json({
        teste: response,
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
