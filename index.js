const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const axios = require('axios')
// global var
const port = 4000;
const BASE_URL = 'https://apps.maxion.gg/api/market/list?status=LISTING&category=headgear&serverId=1'
const buy_url = 'https://apps.maxion.gg/roverse/detail/'
// Middle ware
app.use(bodyparser.json())
//router
app.get('/', (req, res) => {
    res.send('Hello server')
})
const BASE_URL_Img = 'https://apps.maxion.gg/_next/image?url=https%3A%2F%2Frop2e-collection-cdn.s3-bkk.nipa.cloud%2F'

app.get('/get_headgear', async (req, res) => {
    let response = await axios.get(`${BASE_URL}`)
    let data = response.data
    let list = []
    for(let i = 0; i < data.length; i++){
        if(data[i].nft.refine == 7 && data[i].price <= 100){
            let obj = {
                img : `${BASE_URL_Img}${data[i].nft.nameid}.png&w=256&q=75`,
                name : data[i].nft.nameEnglish,
                price : Number(data[i].price),
                option1 : data[i].nft.option0Text,
                option2 : data[i].nft.option1Text,
                option3 : data[i].nft.option2Text.replace('+', ''),
                option4 : data[i].nft.option3Text.replace('+', ''),
                option5 : data[i].nft.option4Text.replace('+', ''),
                url : `${buy_url}${data[i].id}`
            }
            list.push(obj)
        }
    }
    let sort = list.sort((a,b) => {
        return a.price - b.price
    })
    res.json({
        msg : 'OK',
        data : sort
    })
})

//start server
app.listen(port, () => console.log(`App on port ${port}`))

module.exports = app;
