const { readdirSync } = require("fs");
const path = require("path");

module.exports = (client) => {
    const commandsPath = path.resolve(__dirname, "../commands");
    readdirSync(commandsPath).forEach((dirName) => {
        readdirSync(path.resolve(commandsPath, dirName)).forEach((fileName) => {
            const command = require(path.resolve(
                commandsPath,
                dirName,
                fileName
            ));
            if (command.name) client.commands.set(command.name, command);
        });
    });
};
