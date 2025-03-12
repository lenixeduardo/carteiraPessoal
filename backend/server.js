require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


const users = [
  { email: "teste@teste.com", password: "123456", isFirstLogin: true },
 
];

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  

  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
  
    if (user.isFirstLogin) {
  
      user.isFirstLogin = false;
    }
    
   
    return res.json({
      token: "meu-token-fake",
      isFirstLogin: user.isFirstLogin,
    });
  } else {
    return res.status(401).json({ error: "Usuário ou senha incorretos" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
