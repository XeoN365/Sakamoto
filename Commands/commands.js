const request = require('request');
module.exports = function(bot) 
{
    bot.registerCommand("weather", (msg, args) => {
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
            
            //bot.createMessage(msg.channel.id, "Weather: "+weather.weather[0].description);
            
            bot.createMessage(msg.channel.id, {
                embed: {
                    title: "Weather for "+weather.name+", "+weather.sys.country, // Title of the embed
                    description: ""+weather.weather[0].description,
                    author: { // Author property
                        name: "Weather",
                        icon_url: "https://openweathermap.org/img/w/"+weather.weather[0].icon+".png"
                    },
                    color: 0x008000, // Color, either in hex (show), or a base-10 integer
                    fields: [ // Array of field objects
                        {
                            name: "Temp", // Field title
                            value: round(weather.main.temp-273.15,2)+"°C", // Field
                            inline: true // Whether you want multiple fields in same line
                        },
                        {
                            name: "Humidity",
                            value: weather.main.humidity+"%",
                            inline: true
                        },
                        {
                            name: "Wind",
                            value: weather.wind.speed+" m/s",
                            inline: true
                        },
                        {
                            name: "Wind2",
                            value: weather.wind.speed+"m/S",
                            inline: false
                        }
                    ]
                    
                }
            });
        }, 1000);
    })

    function round(value, precision) {
        var multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
    }

    bot.registerCommand("8ball", (msg, args) => {
        var data;
        request('https://8ball.delegator.com/magic/JSON/'+args, {json: true}, (err,res,body) => {
            if(err) { return err};
            
            data = body;
        });
        setTimeout(() => 
        {
            bot.createMessage(msg.channel.id, "[:8ball:] **8Ball**: **"+data.magic.answer+"**");
        },1000);
    });

    bot.registerCommand("yoda", (msg, args) => {
        var data;
        console.log("Message Received: "+msg+" Args: "+args)
        request('http://api.funtranslations.com/translate/yoda.json?text='+args.join(" "), {json: true}, (err,res,body) => {
            if(err) { return err};
            
            data = body;
        });
        setTimeout(() => 
        {
            bot.createMessage(msg.channel.id, "[:yoda:] **Yoda**: **"+data.contents.translated+"**");
        },1000);
    });
}