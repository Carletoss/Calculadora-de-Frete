// Importando os mudulos que serão utilizados na aplicação  
const express = require('express');
// Permite que o servidor aceite as requisições de diferentes origens(dominios)
const cors = require('cors');

// Criando uma instancia da aplicação
const app = express();

// Definir a porta que o servidor vai escutar
const port =3001;
// Configurar o express para analisar requisições no corpo da página com formato json
app.use(express.json());
// Habilita o CORS para que todas as rotas da aplicaçao seja permitido
app.use(cors());

//Objeto que representa como uma tabela do bando de dados
const precos ={
    bicicleta: 5.90, // Preço por KM
    carro: 9.50,    
    drone: 13.50
}

//Criando a roda da api do tipo rost
app.post("/calcularfrete", (req, res) => {
  
    // desestruturação com as requisições que serão utilizadas no corpo
    const{distancia,tipoTranposte} = req.body;

    if(distancia === undefined || tipoTranposte === undefined){
        return res.status(400).json({erro:"Distancia e Tipo de transporte obrigatorios"})

    }
    // Busca o preço por Km no objeto convertendo o tipo de transporte para minusculas
    const precoPorKm = precos[tipoTransporte.tolowerCase()];

    if (precoPorKm === undefined){
        return res.status(400).json({erro:"Tipo de transporte invalido"})
    }

    //Calcular o valor total do frete 

    const valorTotal = distancia * precoPorKm;
    res.json({valorTotal: valorTotal.toFixed(2)});//arredonda para 2 casas decimais
    

})

// Inicia o servidor para que possa escutar as requisições 

app.listen(port,()=>{
    console.log("Servidor rodando em http://localhost:3001");
})

