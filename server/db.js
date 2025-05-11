const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
	port: 3306,         // Προσάρμοσε ανάλογα με το XAMPP configuration
  user: 'root',         // Προσάρμοσε ανάλογα με το XAMPP configuration
  password: '',         // Προσάρμοσε ανάλογα με το XAMPP configuration
  database: 'moviecave',  // Το όνομα της βάσης σου
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool.promise();
