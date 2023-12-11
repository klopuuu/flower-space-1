require('dotenv').config()//этот модуль нужен, чтобы ипользовать переменные среды .env
const express = require('express')//импортируем модули
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')//нужен, чтобы отправлять запросы 
const router = require('./routes/index')
const fileUpload = require('express-fileupload')
const errorHandler = require('./middleware/ErrorHandingMiddleware')
const path = require('path')
const {Vonage} = require('@vonage/server-sdk')


const vonage = new Vonage({
    apiKey: "6318d653",
    apiSecret: "E3H5DzkulK4p05A7"
})

const PORT = process.env.PORT || 8000

const app = express()//создаем объект 
app.use(cors())
app.use(express.json())//чтобы приложение парсила json формат
app.use('/static',express.static(path.join(__dirname, 'static')))//говорим серверу, что картинки из папки static нужно раздавать как статику
app.use('/pdf',express.static(path.join(__dirname, 'pdf')))//говорим серверу
app.use('/api', router)

//Обработка ошибок
app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()//сверяется состояние бд со схемой данных
        app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`))//какой порт должен прослушивать сервер
    } catch (error) {
        console.log(error)
    }
}

const from = "Flower"
const to = "79518455689"
const text = "Hello, friend!"

async function sendSMS() {
    await vonage.sms.send({to, from, text}).then(resp => {console.log('Message sent successfully')}).catch(err=>{
        console.log(err)
    })
}

sendSMS()
start()

