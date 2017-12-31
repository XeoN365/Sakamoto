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
        
        
    })
}