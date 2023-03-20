const sql = ("CREATE TABLE IF NOT EXISTS users(id integer primary key,role text,username TEXT, password TEXT)")

function create_users(my_database){
    my_database.run(sql)
}

module.exports = {create_users}