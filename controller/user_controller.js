const sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database("database.db")
const CryptoJS = require('crypto-js')
const jwt_generate = require("../jwt/jwt_generate")

function show_all_products(req,res){
    db.all("SELECT * FROM PRODUCT", [], (err, data)=>{
        res.send(data)
    })
}

function show_one_product(req,res){
    const id = req.params.id
    db.get('SELECT * FROM product WHERE id=?', [id], (err, data) => {
        res.send(data)
    })
}

function create_product(req,res){
    const name = req.body.name
    const price = req.body.price

    db.run("INSERT INTO product(name,price)VALUES(?,?)", [name, price], (err)=>{
        res.send("ok")
    })
}

function delete_product(req,res){
    const id = req.params.id

    db.run('DELETE FROM product WHERE id=?;)', [id],(err) => {
        res.send("OOKKK")
    })
}

function update_product(req,res){
    const name = req.body.name
    const price = req.body.price
    const id = req.params.id

    db.run('UPDATE product SET name =?, price =? WHERE id =?', [name, price, id], ()=>{
        res.send('ok')
    })
}

function register_user(req,res){
    const username = req.body.username
    const password = req.body.password
    const hashed_password = CryptoJS.SHA256(password).toString();
    let sql = "INSERT INTO users (role, username, password) VALUES (?, ?, ?)"
    db.run(sql, ["user",username,hashed_password], function(err){
          if(err){
              res.send(JSON.stringify({status: "Error Reigstering"}))
          }
          res.send(JSON.stringify({status: "User Created"}))
      })  
}

function login_user(req,res){
    const username = req.body.username
    const password = req.body.password
    const hashed_password = CryptoJS.SHA256(password).toString();
    let sql = "SELECT * from users WHERE username = ?"
    db.get(sql,[username], function(err, data){
        let token = jwt_generate.generateAccessToken(username) 

      if(username == data.username && hashed_password == data.password) {
          res.send(JSON.stringify({status: "Logged in", jwt:token}));
      }else {
          res.send(JSON.stringify({status: "Wrong credentials"}));
      }  
    })
}

module.exports = {
    show_all_products, show_one_product, create_product, delete_product, update_product, register_user, login_user
}

