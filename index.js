const Eris = require("eris");

// Replace BOT_TOKEN with your bot account's token
var bot = new Eris.CommandClient("Mzk2NzEwNDM2NjIxMzg1NzI4.DSlanw.b7jjxvKwJsPi34F6nmhjx3NojZA", {}, {
    description: "Sakamoto Bot Powered By Eris",
    name: "Sakamoto",
    owner: "nJoy",
    prefix: "."
});

var commands = require("./Commands/commands")(bot);
var management = require("./Commands/management")(bot);

bot.on("ready", () => { // When the bot is ready
    console.log("Ready!"); // Log "Ready!"
});

bot.connect();