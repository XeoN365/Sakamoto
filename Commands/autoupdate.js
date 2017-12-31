var child_process = require('child_process');
module.exports = function(bot)
{
    var update = bot.createCommand("update", (msg, args) => {
        child_process.exec('./update.sh', function(err, stdout, stderr) {
            console.log(stdout);
        })
    });
}