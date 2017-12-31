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

        bot.createMessage(msg.channel.id, {
            embed: {
                title: "Weather for "+weather.name+", "+weather.sys.country, // Title of the embed
                description: "",
                author: { // Author property
                    name: "Weather",
                    icon_url: ":white_sun_cloud:"
                },
                color: 0x008000, // Color, either in hex (show), or a base-10 integer
                fields: [ // Array of field objects
                    {
                        name: "Temp", // Field title
                        value: weather.main.temp-273.15+"°C", // Field
                        inline: true // Whether you want multiple fields in same line
                    },
                    {
                        name: "Wind",
                        value: weather.wind.speed+"m/S",
                        inline: true
                    }
                ]
            }
        });
    })

    bot.registerCommand("test", (msg, args) => {
        
        
    });
}