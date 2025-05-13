function generateRandomHash(length = 128) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function getUnixSessionLifetime(time=3600) {
    const date = new Date();
    date.setSeconds(date.getSeconds() + time);
    return Math.floor(date.getTime() / 1000);
}

// Export the functions
module.exports = {
    generateRandomHash,
    getUnixSessionLifetime,
};