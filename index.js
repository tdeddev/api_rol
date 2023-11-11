const express = require('express')
const app = express()
const axios = require('axios')
const port = 4000;
const BASE_URL = 'https://apps.maxion.gg/api/market/list?status=LISTING&category=headgear&serverId=1'
const BASE_URL_WEAPON = 'https://apps.maxion.gg/api/market/list?status=LISTING&category=weapon&serverId=1'
const buy_url = 'https://apps.maxion.gg/roverse/detail/'
const BASE_URL_Img = 'https://apps.maxion.gg/_next/image?url=https%3A%2F%2Frop2e-collection-cdn.s3-bkk.nipa.cloud%2F'
const cors = require('cors')

app.listen(port, () => console.log(`App Listening on ${port}`))
app.use(cors())
app.get('/', (req, res) => {
    res.send('This is my API running...')
})

app.get('/get_headgear/:price', async (req, res) => {
    try {
        let response = await axios.get(`${BASE_URL}`)
        let price = req.params.price
        let data = response.data
        let list = []
        if(data.length == 0){
            throw {
                msg : 'ไม่พบข้อมูล',
                code : 100
            }
        }
        for(let i = 0; i < data.length; i++){
            if(data[i].nft.refine == 7 && !!data[i].nft.option0Text && data[i].price <= price){
                let obj = {
                    img : `${BASE_URL_Img}${data[i].nft.nameid}.png&w=256&q=75`,
                    name : data[i].nft.nameEnglish,
                    price : Number(data[i].price),
                    option1 : data[i].nft.option0Text,
                    option2 : data[i].nft.option1Text,
                    option3 : data[i].nft.option2Text,
                    option4 : data[i].nft.option3Text,
                    option5 : data[i].nft.option4Text,
                    url : `${buy_url}${data[i].id}`
                }
                list.push(obj)
            }
        }
        if(list.length == 0){
            return res.send({
                msg : 'OK',
                data : 'Not found'
            })
        }
        let sort = list.sort((a,b) => {
            return a.price - b.price
        })
        res.send({
            msg : 'OK',
            data : sort
        })
    } catch (error) {
        console.log(error)
    }
})

app.get('/get_weapon/:price', async (req, res) => {
    try {
        let response = await axios.get(`${BASE_URL_WEAPON}`)
        let price = req.params.price
        let data = response.data
        let list = []
        if(data.length == 0){
            throw {
                msg : 'ไม่พบข้อมูล',
                code : 100
            }
        }
        for(let i = 0; i < data.length; i++){
            if(data[i].nft.refine == 7 && data[i].price <= price && !!data[i].nft.option0Text && data[i].nft.subtype == 'Katar'){
                let obj = {
                    img : `${BASE_URL_Img}${data[i].nft.nameid}.png&w=256&q=75`,
                    name : data[i].nft.nameEnglish,
                    price : Number(data[i].price),
                    option1 : data[i].nft.option0Text,
                    option2 : data[i].nft.option1Text,
                    option3 : data[i].nft.option2Text,
                    option4 : data[i].nft.option3Text,
                    option5 : data[i].nft.option4Text,
                    url : `${buy_url}${data[i].id}`
                }
                list.push(obj)
            }
        }
        if(list.length == 0){
            return res.send({
                msg : 'OK',
                data : 'Not found'
            })
        }
        let sort = list.sort((a,b) => {
            return a.price - b.price
        })
        res.send({
            msg : 'OK',
            data : sort
        })
    } catch (error) {
        console.log(error)
    }
})

//start server
app.listen(port, () => console.log(`App on port ${port}`))

module.exports = app
