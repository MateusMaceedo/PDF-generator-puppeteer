const express = require('express')
const ejs = require('ejs')
const path = require('path')
const pdf = require('html-pdf')
const app = express()

// Template criação de todos os path
const passengers = [
  {
    name: "Mateus",
    flightNumber: 7859,
    time: "18h00",
  },
  {
    name: "Block",
    flightNumber: 7859,
    time: "18h00",
  },
  {
    name: "Eve",
    flightNumber: 7859,
    time: "18h00",
  },
];

// Request = pedido || Response = resposta
app.get('/', (request, response) => {
  
  // Caminho 
  const filePath = path.join(__dirname, "PDF.ejs")
  ejs.renderFile(filePath, { passengers }, (err, html) => {
    // Assincronismo
     if(err){
       return response.send('Erro na leitura do arquivo')
      }

      const options = {
        height: "11.25in",
        width: "8.5in",
        header: {
          height: "20mm"
        },
        footer:{
          height: "20mm"
        }
      }

      // criar o pdf
      pdf.create(html, options).toFile("report.pdf", (err, data)=> {
        if(err){
          return response.send("Erro ao gerar o PDF")
        }
        //  enviar para o navegador
        return response.send(html)
      })
   })
})

// Porta que irar executar a aplicação 
app.listen(3000)


