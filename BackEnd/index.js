const jsonServer=require('json-server')
const cors = require('cors'); 
//create a server Instance
const rBuilderServer=jsonServer.create()
const router=jsonServer.router('db.json')

//middleware

const middleware =jsonServer.defaults()
server.use(cors());  
rBuilderServer.use(middleware)
rBuilderServer.use(router)

const PORT=process.env.PORT || 3000
rBuilderServer.listen(PORT,()=>{
    console.log(`Server running on Port ${PORT}`);
    
})