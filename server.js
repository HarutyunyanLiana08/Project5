const express = require('express')
const sqlite3 = require('sqlite3').verbose();
const CryptoJS = require('crypto-js')
const app = express()
const port = 5000
require('dotenv').config()
app.use(express.json())
const product_schema = require("./models/products_schema")
const user_schema = require("./models/users_schema")
const user_routes = require("./routes/users_routes")

let db = new sqlite3.Database("database.db", (err)=>{
    if(err){
        console.log("Error");
    }
    console.log("Connected to the database");
})

product_schema.create_product(db)
user_schema.create_users(db)
user_routes.create_users_routes_get(app)
user_routes.create_users_routes_get_id(app)
user_routes.create_users_routes_post(app)
user_routes.create_users_routes_put(app)
user_routes.create_users_routes_delete(app)
user_routes.create_users_routes_register(app)
user_routes.create_users_routes_login(app)















// const SECRET = process.env.SECRET

// let db = new sqlite3.Database('database.db')
// db.run("CREATE TABLE IF NOT EXISTS users(id integer primary key,role text,username TEXT, password TEXT)")
// db.run("CREATE TABLE IF NOT EXISTS product(id INTEGER PRIMARY KEY, name text, price INTEGER)")

// app.get('/', (req,res)=>{
//     db.all("SELECT * FROM PRODUCT", [], (err, data)=>{
//         res.send(data)
//     })
// })

// app.get('/product/:id', (req, res) => {
//     const id = req.params.id
//     db.get('SELECT * FROM product WHERE id=?', [id], (err, data) => {
//         res.send(data)
//     })
   
// })

// app.post('/new', authenticateToken, (req,res)=>{
//     const name = req.body.name
//     const price = req.body.price

//     db.run("INSERT INTO product(name,price)VALUES(?,?)", [name, price], (err)=>{
//         res.send("ok")
//     })
// })

// app.delete('/delete/:id', authenticateToken, (req,res) => {
    
//     const id = req.params.id

//     db.run('DELETE FROM product WHERE id=?;)', [id],(err) => {
//         res.send("OOKKK")
//     })
// })

// app.put('/update/:id', authenticateToken, (req,res)=>{

//     const name = req.body.name
//     const price = req.body.price
//     const id = req.params.id

//     db.run('UPDATE product SET name =?, price =? WHERE id =?', [name, price, id], ()=>{
//         res.send('ok')
//     })
// })

// app.post('/register', (req, res) => {
//     const role = req.body.role
//     const username = req.body.username
//     const password = req.body.password
//     const hashed_password = CryptoJS.SHA256(password).toString();
//     let sql = "INSERT INTO users (role, username, password) VALUES (?, ?, ?)"
//     db.run(sql, [role,username,hashed_password], function(err){
//           if(err){
//               res.send(JSON.stringify({status: "Error Reigstering"}))
//           }
//           res.send(JSON.stringify({status: "User Created"}))
//       })  
//   })


// function generateAccessToken(username, role) {
//     return jwt.sign({username, role}, SECRET, { expiresIn: '36000s' });
// }

// function authenticateToken(req, res, next) {
//     const token = req.headers.authorization
//     console.log(token);
    
//     if (token == null) {
//       return res.sendStatus(401)
//     }
//     jwt.verify(token, SECRET, (err, user) => {
//         const {role} = user
//       if (role != "admin") {
//         return res.sendStatus(403)
//       }
      
    
//       next()
//     })
//   }

//   function checkRole(req,res){
//     const token = req.headers.authorization
//     const decoded = jwt.decode(token)
//     console.log(decoded);
//     const role = decoded.role
//     return role
//   }

// app.post('/login', (req, res) => {
//     const username = req.body.username
//     const password = req.body.password
//     const role = req.body.role
//     const hashed_password = CryptoJS.SHA256(password).toString();
//     let sql = "SELECT * from users WHERE username = ?"
//     db.get(sql,[username], function(err, data){
//         let token = generateAccessToken(username, data.role) 

//       if(username == data.username && hashed_password == data.password) {
//           res.send(JSON.stringify({status: "Logged in", jwt:token}));
//       }else {
//           res.send(JSON.stringify({status: "Wrong credentials"}));
//       }  
//     })
//   })












app.listen(port)