module.exports = function(bot) {
    /*
        Prefix: "./"

        Commands to make:
        - prune (number of messages)
        - kick [username / mention]
        - ban [username / mention]
        - createChannel (name, [type, reason, parentID])
        - deleteChannel (channelID [ reason ] )
        - addRole (name, permissions, color, hoist, mentionable)
        - removeRole ( roleID [ reason ])
        - editRole ( roleID [name, permissions, color, hoist, mentionable, reason])
        

    */

    bot.registerCommand("/prune", (msg, args) => {
        if(args.length === 0 )
        {
            return "Invalid Input";
        }
        var messages = bot.getMessages(msg.channel.id, limit= args[0], before = msg.id );
        console.log("Messages: " +messages);

        for(var i = 0; i < messages.Length; i ++)
        {
            var message = messages[i];
            bot.deleteMessage(msg.channel.id, message.id);
        }

    }, {
        requirements: {
            "manageMessages": true
        }
    })
}