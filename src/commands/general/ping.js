module.exports = {
    name: "ping",
    aliases: ["pong"],
    category: "general",
    guildOnly: false,
    exec(message) {
        return message.reply("Poooonnnngggggggggggggg!");
    },
};
