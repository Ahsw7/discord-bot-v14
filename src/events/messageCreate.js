module.exports = {
    name: "messageCreate",
    exec(message) {
        if (message.author.bot) return;

        let prefix = message.client.config.prefix;
        if (
            message.content.match(
                new RegExp(`^<@!?(${message.client.user.id})>$`)
            )
        )
            return message.reply(`My prefix is: \`${prefix}\``);

        // mention prefix
        const matched = message.content.match(
            new RegExp(`^<@!?(${message.client.user.id})>`)
        );
        if (matched) prefix = matched[0];

        const [commandName, ...args] = message.content
            .slice(prefix.length)
            .trim()
            .split(/ +/g);

        const command = message.client.commands.find(
            (c) =>
                c.name === commandName.toLowerCase() ||
                c.aliases?.includes(commandName.toLowerCase())
        );

        if (command?.exec && message.content.toLowerCase().startsWith(prefix))
            command.exec(message, args);
    },
};
