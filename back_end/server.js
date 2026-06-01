const article =require('./bd.json') 
const express =require('express')
const fs = require('fs')
const app = express();
const port = 5000;

app.use(express.json());

app.get('/api/article',(req,res)=>{
    res.json(article)
})
app.post('/api/article',(req,res) => {
   
    const newarticle = req.body

    const arti = article 
    arti.push(newarticle)

    const articlet = JSON.stringify(arti)

    fs.writeFileSync("./bd.json",articlet,{overwrite:true})

    res.json(arti)

    
})
app.listen(port,() =>{
    console.log(`Le serveur tourne sur http://localhost:${port}`);
})
