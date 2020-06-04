const express = require('express');
const multer = require('multer')
const hbs = require('express-handlebars')
const path = require('path')

const storage = multer.diskStorage({
    destination: './public/image/',
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
}).single('myimage')

const app = express()

app.engine('.hbs', hbs({
    defaultLayout: 'layout',
    extname: 'hbs'
}))
app.set('view engine', 'hbs')

app.use(express.static('./public'))

app.get('/', (req, res)=> res.render('index'))

app.post('/upload', (req, res) => {
    res.send('test')
})

app.listen(3010, ()=> {
    console.log('server is running on port 3010')
})