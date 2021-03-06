const express = require('express')
const ejs = require('ejs')
const path = require('path')
const puppeteer = require('puppeteer')
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

app.get('/pdf', async(request, response) =>{

  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto('http://localhost:3000/',{
     waitUntil: 'networkidle0'
  })

  const pdf = await page.pdf({
    printBackground: true,
    format: 'Letter',
    margin: {
      top: "20px",
      bottom: "40px",
      left: "20px",
      right: "20px"
    }
  })

  await browser.close()

  response.contentType("application/pdf")

  return response.send(pdf)

})

// Request = pedido || Response = resposta
app.get('/', (request, response) => {
  
  // Caminho 
  const filePath = path.join(__dirname, "PDF.ejs")
  ejs.renderFile(filePath, { passengers }, (err, html) => {
    // Assincronismo
     if(err){
       return response.send('Erro na leitura do arquivo')
      }
        //  enviar para o navegador
        return response.send(html)
   })
})

// Porta que irar executar a aplicação 
app.listen(3000)


