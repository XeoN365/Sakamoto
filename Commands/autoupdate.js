var child_process = require('child_process');
module.exports = function(bot)
{
    var update = bot.registerCommand("update", (msg, args) => {
        console.log("Initiate Update");
        child_process.exec('../update.sh', function(err, stdout, stderr) {
            console.log(stdout);
        })
    });
}


