const {
    createPool
} = require('mysql');

const pool = createPool ({
    host:"localhost",
    user:"root",
    password:"",
    database:"food-diary-db",
    connectionLimit: 10
})

pool.query(`select * from testing`, (err, result, fields)=>{
    if (err){
        return console.log(err);
    }
    return console.log(result);
})

module.exports=pool;