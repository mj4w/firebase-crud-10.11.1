'use strict'

import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import config from './config'
import studentRoute from './routes/studentRoute'

const app = express()

app.use(express.json())
app.use(cors())
app.use(bodyParser.json())

app.use('/api',studentRoute)

app.listen(config.port, () => {
    console.log(`App listening on ${config.url}`)
})