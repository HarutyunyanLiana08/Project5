const jwt = require('jsonwebtoken')
require('dotenv').config()
const SECRET = process.env.SECRET

function authenticateToken(req, res, next) {
    const token = req.headers.authorization
    console.log(token);
    
    if (token == null) {
      return res.sendStatus(401)
    }
    jwt.verify(token, SECRET, (err, user) => {
        const {role} = user
      if (role != "admin") {
        return res.sendStatus(403)
      }
      
    
      next()
    })
}

function checkRole(req,res){
    const token = req.headers.authorization
    const decoded = jwt.decode(token)
    console.log(decoded);
    const role = decoded.role
    return role
}

module.exports = {
    authenticateToken, checkRole
}