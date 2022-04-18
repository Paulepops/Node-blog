
const express = require('express')
const ejs = require('ejs')
const mongoose = require('mongoose')
const expressSession = require('express-session')
const flash = require('connect-flash')
const { resourceUsage } = require('process')

const fileUpload = require('express-fileupload')
const postValidation = require('./middleware/postValidation')

const userAuth = require('./middleware/userAuth')
const userRedirect = require('./middleware/userRedirect')

mongoose.connect('mongodb+srv://sorroko:ubo5n-Sorroko@sorroko.mo32d.mongodb.net/NodeBlog',{useNewUrlParser: true})

const app = express()

app.set('view engine','ejs')

global.loggedIn = null;

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())
app.use(fileUpload())
app.use('/posts/store',postValidation)

app.use(expressSession({ 
    secret: 'cool for cats' 
}))
app.use(flash())
app.use("*", (req,res,next) => {
    loggedIn = req.session.userId
    next()
})

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

app.listen(port,() => {
    console.log('App listening on port: ', port)
})

const homeController = require('./controllers/home')
const aboutController = require('./controllers/about')
const contactController = require('./controllers/contact')

app.get('/', homeController)
app.get('/about', aboutController)
app.get('/contact', contactController)

const newPostController = require('./controllers/newPost')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const listPostsController = require('./controllers/listPosts')

app.get('/post/:id', getPostController)
app.get('/posts/new', userAuth, newPostController)
app.post('/posts/store', userAuth, storePostController)
app.get('/posts/older', listPostsController)

const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')

app.get('/auth/register', userRedirect, newUserController)
app.post('/users/register', userRedirect, storeUserController)

const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const logoutController = require('./controllers/logout')

app.get('/auth/login', userRedirect, loginController)
app.post('/users/login', userRedirect, loginUserController)
app.get('/auth/logout', logoutController)

app.use((req, res) => {
    res.render('notFound')
})

/* use 'npm start' to start the localhost server */
