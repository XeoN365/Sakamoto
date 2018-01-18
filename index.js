const Eris = require("eris");
const token = require("./token");

// Replace BOT_TOKEN with your bot account's token
var bot = new Eris.CommandClient(token.getToken(), {}, {
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