const db = require("./db");

function getAnalyticaData() {
	return db.query("SELECT * FROM analytica");
}

module.exports = {
};