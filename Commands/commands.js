const request = require('request');
const sharp = require('sharp');
const fs = require('fs');
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
                    title: "Weather for "+weather.name+", :flag_"+weather.sys.country.toLowerCase()+":", // Title of the embed
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
                        }
                    ]
                    
                }
            });
        }, 1000);
    }, {
        description: "Check the weather",
        fullDescription: "Allows you to check the weather in provided town/country",
        usage: "<text>"
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
            bot.createMessage(msg.channel.id, ":8ball: | **"+data.magic.answer+"**");
        },1000);
    }, {
        description: "Check your destiny!",
        fullDescription: "8Ball is here for you to help you with your undecisive mind!",
        usage: "<text>"
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
            bot.createMessage(msg.channel.id, ":yoda: | **"+data.contents.translated+"**");
        },1000);
    });

    bot.registerCommand("genderize", (msg, args) => {
        var data;
        console.log("Message Received: "+msg+" Args: "+args)
        request('https://api.genderize.io/?name='+args[0], {json: true}, (err,res,body) => {
            if(err) { return err};
            
            data = body;
        });
        setTimeout(() => 
        {
            var emoji;
            if(data.gender == "male")
            {
                emoji = ":man_dancing:";
            }
            else if(data.gender == "female")
            {
                emoji = ":dancer:";
            }
            else
            {
                emoji = ":x:";
            }
            bot.createMessage(msg.channel.id, emoji+" | Name: **"+data.name+"** is for **"+data.gender+"**");
        },1000);
    }, {
        description: "Check if your name is for male or female!",
        fullDescription: "This command allows you to check if the name that your parents gave, suits your gender!",
        usage: "<text>"
    });

    bot.registerCommand("coin", (msg, args) => {
       var random = Math.random();
       var coin;
       if(random < 0.5)
       {
            coin = "Heads";
       }
       else
       {
           coin = "Tails";
       }

       bot.createMessage(msg.channel.id, "CT | "+msg.author.mention+" It's **"+coin+"**");
    }, {
        description: "Flip coin!",
        fullDescription: "This command allows you to flip a coin!",
        usage: ""
    });

    bot.registerCommand("reverse", (msg, args) => {
        var text = args.join(" ").split("").reverse().join("");
        bot.createMessage(msg.channel.id, "Rev | "+text);
    }, {
        description: "Reverse string!",
        fullDescription: "This command allows you to reverse whole text",
        usage: "<text>"
    });

    bot.registerCommand("osu", (msg, args) => {
        bot.createMessage(msg.channel.id, {
            embed: {
                title: "Osu! | "+ args[0]+" Statistics",
                image: {
                    url: "https://lemmmy.pw/osusig/sig.php?colour=blue&uname="+args[0],
                    width: 338,
                    height: 94 
                }
            }
        })
    }, {
        description: "Osu Statistaks",
        fullDescription: "Show given player's statistics",
        usage: "<text>"
    });

}