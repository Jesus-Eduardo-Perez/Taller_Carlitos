const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

let connection;

function handleDisconnect() {
    connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
        });
    
    connection.connect(err => {
        if(err){
            console.error('Error conectando a la base de datos', err);
            setTimeout(handleDisconnect, 2000);
        }else {
            console.log('Conexión exitosa con la base de datos');
        }
    });

    connection.on('error', err => {
        console.error('Error en la conexión',err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNRESET') {
            handleDisconnect();
        } else {
            throw err;
        }
    });

    connection.promisePool = connection.promise();
}
handleDisconnect();

module.exports = connection;