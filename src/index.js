require("dotenv").config();
const { Client, IntentsBitField, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const path = require("path");

const intents = Object.values(IntentsBitField.Flags).filter(
    (v) => typeof v === "number"
);
const client = new Client({
    intents,
});

client.config = require("./config");
client.commands = new Collection();

const handlersPath = path.resolve(__dirname, "./handlers");
readdirSync(handlersPath).forEach((fileName) =>
    require(`${handlersPath}/${fileName}`)(client)
);

client.login(client.config.secret.token);
