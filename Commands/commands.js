const request = require('request');
module.exports = function(bot) 
{
    var misc = bot.registerCommand("misc", (msg, args) => {
        if(args.length ===0)
        {
            return "Invalid Input";
        }
    })

    misc.registerSubcommand("weather", (msg, args) => {
        console.log("Received Message " + msg +" " +args);
        if(args.length === 0)
        {
            return "Invalid Input!";
        }
        var weather;
        var town  = args;
        request('http://api.openweathermap.org/data/2.5/weather?q='+ town +'&appid=c7899ccf9b61fefbbc5050c908135f48', {json: true}, (err,res,body) => {
            if(err) { return err};
            
            weather = body;
        });
        
        setTimeout(() => {
            console.log(weather.weather[0].description);
            bot.createMessage(msg.channel.id, "Weather: "+weather.weather[0].description);
            
        }, 1000);
        
        bot.registerCommand("test", (msg, args) => {
            bot.createMessage(msg.channel.id, {
                embed: {
                    title: "I'm an embed!", // Title of the embed
                    description: "Here is some more info, with **awesome** formatting.\nPretty *neat*, huh?",
                    author: { // Author property
                        name: msg.author.username,
                        icon_url: msg.author.avatarURL
                    },
                    color: 0x008000, // Color, either in hex (show), or a base-10 integer
                    fields: [ // Array of field objects
                        {
                            name: "Some extra info.", // Field title
                            value: "Some extra value.", // Field
                            inline: true // Whether you want multiple fields in same line
                        },
                        {
                            name: "Some more extra info.",
                            value: "Another extra value.",
                            inline: true
                        }
                    ],
                    footer: { // Footer text
                        text: "Created with Eris."
                    }
                }
            });
        });
    })
}