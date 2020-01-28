require('dotenv').config();
const express =require ('express'), 
    session = require ('express-session'),
    checkForSession =require('./middleware/checkForSession'), 
    swagCtrl = require('./controllers/swagCtrl'), 
    authCtrl =require('./controllers/authCtrl'), 
    cartCtrl = require('./controllers/cartCtrl'), 
    searchCtrl = require('./controllers/searchCtrl'), 
    app = express();

let  {SERVER_PORT, SESSION_SECRET} = process.env; 
    
app.use(express.json()); 
app.use(session({
    secret:SESSION_SECRET, 
    resave: true, 
    saveUninitialized: true
})); 
app.use(checkForSession)


app.post('/api/register', authCtrl.register); 
app.post('/api/login', authCtrl.login); 
app.post('/api/signout', authCtrl.signout); 
app.get('/api/user', authCtrl.getUser);

app.get('/api/swag', swagCtrl.read); 

//cart
app.post('/api/cart/checkout', cartCtrl.checkout); 
app.post('/api/cart/:id', cartCtrl.add); 
app.delete('/api/cart/:id', cartCtrl.delete); 
//search
app.get('/api/search',searchCtrl.search); 


const port = SERVER_PORT; 
app.listen(port, () => console.log(`server running on ${port}`)); 

