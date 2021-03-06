const express  = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require("cors")
const app = express()
const PORT = 3000
const {mogoUrl} = require('./keys')


require('./models/User');
const requireToken = require('./middleware/requireToken')
const authRoutes = require('./routes/authRoutes') 

 
mongoose.connect(mogoUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
mongoose.connection.on('connected',()=>{
    console.log("connected to mongo yeah")
})

mongoose.connection.on('error',(err)=>{
    console.log("this is error",err)
})
  
 
app.use(cors())
app.use(bodyParser.json())
app.use(authRoutes)

app.get('/',requireToken,(req,res)=>{
    res.send({email: req.user.email})
})
app.listen(PORT,()=>{
    console.log("server running "+PORT)
})