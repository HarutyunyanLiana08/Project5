const sql = ("CREATE TABLE IF NOT EXISTS product(id INTEGER PRIMARY KEY, name text, price INTEGER)")

function create_product(my_database){
    my_database.run(sql)
}

module.exports = {create_product}