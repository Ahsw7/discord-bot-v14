const { readdirSync } = require("fs");
const path = require("path");

module.exports = (client) => {
    const eventsPath = path.resolve(__dirname, "../events");
    readdirSync(eventsPath).forEach((fileName) => {
        const event = require(path.resolve(eventsPath, fileName));
        if (event.name && event.exec) {
            const on = event.once ? "once" : "on";
            client[on](event.name, (...args) => event.exec(...args));
        }
    });
};
