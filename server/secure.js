var crypto = require('crypto');

// Either get salt from environment variable or use default (not recommended in production)
var systemSalt = process.env.SALT || 'default_salt';

function generateRandomSessionHash(length = 128) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function generateDataHash(data) {
    const hash = crypto.createHash('sha256');
    hash.update(data + systemSalt);
    return hash.digest('hex');
}

function getCurrentUnixTime() {
    return Math.floor(Date.now() / 1000);
}

function getCurrentDate() {
    const date = new Date();
    return date.toISOString().split("T")[0];
}

function getUnixSessionLifetime(time=3600) {
    const date = new Date();
    date.setSeconds(date.getSeconds() + time);
    return Math.floor(date.getTime() / 1000);
}

// Export the functions
module.exports = {
    generateRandomSessionHash,
    generateDataHash,
    getUnixSessionLifetime,
    getCurrentUnixTime,
    getCurrentDate,
};