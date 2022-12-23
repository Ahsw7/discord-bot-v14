require("dotenv").config();
const { Client, IntentsBitField, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const path = require("path");
const { registerFont } = require("canvas");

const Constants = require("./util/Constants");

const intents = Object.values(IntentsBitField.Flags).filter(
    (v) => typeof v === "number"
);
const client = new Client({
    intents,
});

client.config = require("./config");
client.commands = new Collection();

// register font for canvas use case
const fontFiles = readdirSync(path.resolve(__dirname, "./assets/fonts/"));
fontFiles.forEach((fontFile) => {
    const split = fontFile.split(".")[0].split("-");
    const family = split[0];
    const weight = split[1]
        ? Constants.FontWeight[split[1]]
        : Constants.FontWeight.Regular;
    registerFont(path.resolve(__dirname, `./assets/fonts/${fontFile}`), {
        family,
        weight,
    });
});

const handlersPath = path.resolve(__dirname, "./handlers");
readdirSync(handlersPath).forEach((fileName) =>
    require(`${handlersPath}/${fileName}`)(client)
);

client.login(client.config.secret.token);
