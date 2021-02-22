const Discord = require('discord.js')
const bot = new Discord.Client();

const cheerio = require('cheerio');
const request = require('request');
const randomPuppy = require('random-puppy');

const ytdl = require("ytdl-core");

const token = require("./token");

const PREFIX = '!'

const zackID = '104048942496358400'

var servers = {};

var fs = require('fs');
var files = fs.readdirSync('./roulette/');
var files2 = fs.readdirSync('./f_roulette/');

var poke_files = fs.readdirSync('./pokeimages/');

var clownID;
var clownerID;
var clownNext = false;

bot.on('ready', () => {
    console.log('This bot is online');
    bot.user.setActivity('Use !help to get info!');
})


bot.on('message', msg => {

    console.log(msg.author.id);





    var shieldStringTest = msg.content.toLowerCase();

    if(shieldStringTest === '!shield'  && msg.author.id != clownID)
    {
        msg.reply('You wasted your clown shield! You fucking loser! 🤡');
        return;
    }


    if(clownNext  && msg.author.id == clownID)
    {

        if(shieldStringTest === '!shield')
        {
            msg.reply('You are safe!');
            clownNext = false;
            clownID = null;
            clownerID = null;


            return;
        }

        msg.react('🤡');
        msg.react('⬅️');
        msg.react('🇾');
        msg.react('🇴');
        msg.react('🇺');

        msg.reply('You just got clowned!');
        msg.author.send('||🤡 <- You||');
        clownNext = false;
    }

    if(msg.author.id === '85614143951892480')
    {
        var rand = Math.random();

        if (rand <= 0.05)
            msg.channel.send('oh shut up, cuck bot');
        
        return;
    }

    var args_t = msg.content.split(" ");

   // erases messages from a user with a word in it
   
    /*
    if(msg.author.id === '128290356969078784')
    {
        if(msg.content.includes("valorant") || msg.content.includes("val"))
            msg.channel.bulkDelete(1);
    }
   */
    
    if(!msg.content.startsWith(PREFIX))
    {
        if (args_t.length > 2)
            {
                var i;
                var res = new String("");
                for(i = 0; i < args_t.length; ++i)
                {
                    res = res.concat(args_t[i]);
                    res = res.concat(" ");
                }

                console.log(res);

                if(res.includes("alpha bot"))
                {
                    if(res.includes("ily") || res.includes("love you"))
                    {
                        if(msg.author == zackID)
                        {
                            msg.reply('Awww ily 2 <3')
                        }
                        else
                        {
                            msg.reply('Ew, fuck off')
                        }
                    }
                    else
                    {
                        msg.reply('Fuck you.')
                    }

                    
                }

                return;

            }

        if (args_t.length == 1 && msg.author.id != 708145208000249937)
        {
            if(args_t[0].includes("rara") || args_t[0].includes("RARA"))
                msg.channel.send('ARARARARARARA')

            if(args_t[0].includes("haha"))
                msg.channel.send('hahahaha so funny omg')
            
        }

        return;
    };

    let args = msg.content.substring(PREFIX.length).split(" ");

    args[0] = args[0].toLowerCase();

    switch (args[0])
    {
        case 'clear':
            if(!args[1]) return msg.reply('Please define a second argument');

            var numString = parseInt(args[1])

            if(numString != null)
                msg.channel.bulkDelete(numString + 1);
            else
                msg.reply('Please enter a valid number.');

            break;

        case 'whelp':
            msg.channel.send('it izz what it izz');
            break;

        case 'beagle':
            image(msg, "beagle", false);
            break;

        case 'bc':
            image(msg, "border collie", false);
            break;

        case 'cursed':
            image(msg, "cursed image", false);
            break;

        case 'skeleton':
            image(msg, "skeleton video game", false);
            break;

        case 'give':
            if(!args[1]) return msg.reply('Please define a second argument');

            if (args.length > 2)
            {
                var i;
                var res = new String("");
                for(i = 1; i < args.length; ++i)
                {
                    res = res.concat(args[i]);
                    res = res.concat(" ");
                }

                image(msg, res);
                console.log(res);
            }
            else
                image(msg, args[1]);

            break;

        case 'donut':
           
            const attachment = new Discord.MessageAttachment('./shinobu.gif');
            msg.reply('You gave Shinobu a donut!',attachment);
            break;

        case 'fact':
            fact(msg);
            break;

        case 'truck':
            image(msg, "truck", false);
            break;

        case 'god':
            image(msg, "adam sandler", false);
            break;

        case 'puppy':
            pup(msg);
            break;

        case 'anime':
            getImgFromSubreddit(msg, 'anime_irl');
            break;

        case 'food':
            getImgFromSubreddit(msg, 'FoodPorn');
            break;

        case 'design':
            getImgFromSubreddit(msg, 'CrappyDesign');
            break;

        case 'stock':
            getImgFromSubreddit(msg,'wtfstockphotos');
            break;

        case 'aww':
            getImgFromSubreddit(msg, 'aww');
            break;

        case 'clown':
            if(!args[1]) return msg.reply('Please define a second argument');

            clown(msg);
            break;

        case 'help':
            help(msg);
            break;

        case 'img':
            if(!args[1]) return msg.reply('Please define a second argument.');

            if (args.length > 2)
            {
                var i;
                var res = new String("");
                for(i = 1; i < args.length; ++i)
                {
                    res = res.concat(args[i]);
                    res = res.concat(" ");
                }

                image(msg, res, true);
                console.log(res);
            }
            else
                image(msg, args[1], true);

            break;
        
        case 'play':

            function play(connection, message){
                var server = servers[message.guild.id];

                server.dispatcher = connection.play(ytdl(server.queue[0], {filter: "audioonly"}));
                server.queue.shift();

                server.dispatcher.on("end", function(){
                    if(server.queue[0]){
                        play(connection, message);
                    } else {
                        connection.disconnect();
                    }
                });

            }

            if(!args[1]){
                msg.channel.send("You need to provide a link!");
                return;
            }

            if(!msg.member.voice.channel){
                msg.channel.send("You must be in a channel to play this, you fool.");
                return;
            }

            if(!servers[msg.guild.id]) servers[msg.guild.id] = {
                queue: []
            }

            var server = servers[msg.guild.id];

            server.queue.push(args[1]);

            if(!msg.guild.voice) msg.member.voice.channel.join().then(function(connection){
                play(connection, msg);
            })
        break;

        case 'ape':
            function play(connection, message){
                var server = servers[message.guild.id];

                server.dispatcher = connection.play(ytdl(server.queue[0], {filter: "audioonly"}));
                server.queue.shift();

                server.dispatcher.on("end", function(){
                    if(server.queue[0]){
                        play(connection, message);
                    } else {
                        connection.disconnect();
                    }
                });

            }

          

            if(!msg.member.voice.channel){
                msg.channel.send("You must be in a channel to play this, you fool.");
                return;
            }

            if(!servers[msg.guild.id]) servers[msg.guild.id] = {
                queue: []
            }

            var server = servers[msg.guild.id];

            server.queue.push('https://www.youtube.com/watch?v=D7aHOsxFP4w');

            if(!msg.guild.voice) msg.member.voice.channel.join().then(function(connection){
                play(connection, msg);
            })
        break;

        case 'ape2':
            function play(connection, message){
                var server = servers[message.guild.id];

                server.dispatcher = connection.play(ytdl(server.queue[0], {filter: "audioonly"}));
                server.queue.shift();

                server.dispatcher.on("end", function(){
                    if(server.queue[0]){
                        play(connection, message);
                    } else {
                        connection.disconnect();
                    }
                });

            }

            if(msg.mentions.members.size == 0)
            {
                message.reply("This user isn't valid! Looks like you're the clown smh.");
                return;
            }

            if(!msg.mentions.members.first().voice.channel){
                msg.channel.send("The target must be in a channel to play this, you fool.");
                return;
            }

            if(!servers[msg.guild.id]) servers[msg.guild.id] = {
                queue: []
            }

            var server = servers[msg.guild.id];

            server.queue.push('https://www.youtube.com/watch?v=D7aHOsxFP4w');

            if(!msg.guild.voice) msg.mentions.members.first().voice.channel.join().then(function(connection){
                play(connection, msg);
            })
        break;

        case 'skip':
            var server = servers[msg.guild.id];
            if (server.dispatcher) {
                server.dispatcher.end();
                msg.channel.send("Skipped!");
            }
        break;

        case 'stop':
            var server = servers[msg.guild.id];
            if(msg.guild.voice){
                for(var i = server.queue.length - 1; i >= 0; i--){
                    server.queue.splice(i, 1);
                }

                server.dispatcher.end();
                msg.channel.send("Ending the queue!");
                console.log('stopped the queue');
            }

            if(msg.guild.voice.connection) msg.guild.voice.connection.disconnect();
        break;

        case 'w':
            var fileString = files[Math.floor(Math.random() * files.length)]
            var dirString = "./roulette/" + fileString;
            var randomAttachment = new Discord.MessageAttachment(dirString);
            msg.channel.send(randomAttachment).then( sent => {
                sent.react('❤️');
            });
            break;

        case 'triangle':   
            const attachment2 = new Discord.MessageAttachment('./triangle.png');
            msg.channel.send(attachment2);
            break;

        case 'f':
            var fileString = files2[Math.floor(Math.random() * files2.length)]
            var dirString = "./f_roulette/" + fileString;
            var randomAttachment2 = new Discord.MessageAttachment(dirString);
            msg.channel.send(randomAttachment2);
            break;
        
        case 'test1':
            var fileString = poke_files[Math.floor(Math.random() * poke_files.length)]
            var dirString = "./pokeimages/" + fileString;
            var randomAttachment3 = new Discord.MessageAttachment(dirString);
            msg.channel.send(randomAttachment3).then( sent => {
                sent.react('❤️');
            });

            var asterisk = "__***";
            var editedString = asterisk.concat((fileString.slice(0, -4)).toUpperCase(),"***__");

            msg.channel.send(editedString);

            break;

        case 'test2':

            var fileString = poke_files[Math.floor(Math.random() * poke_files.length)]
            var dirString = "./pokeimages/" + fileString;
            var asterisk = "__***";
            var trimString = fileString.slice(0, -4);
            var editedString = asterisk.concat(trimString.toUpperCase(),"***__");

            var attachString = "attachment://";
            attachString = attachString.concat(fileString);

            var linkString = "https://bulbapedia.bulbagarden.net/wiki/";
            linkString = linkString.concat(trimString.charAt(0).toUpperCase() + trimString.slice(1), "_(Pok%C3%A9mon)")

            const pokeEmbed = new Discord.MessageEmbed()
                 .setTitle(editedString)
                 .addField("More info", "[Click here](" + linkString + ")")
                 .attachFiles([dirString])
                 .setImage(attachString)
                 
            
            msg.channel.send(pokeEmbed).then( sent => {
                sent.react('❤️');
            });

            var fileString2 = poke_files[Math.floor(Math.random() * poke_files.length)]
            var dirString2 = "./pokeimages/" + fileString2;
            var asterisk = "__***";
            var trimString2 = fileString2.slice(0, -4);
            var editedString2 = asterisk.concat(trimString2.toUpperCase(),"***__");

            var attachString2 = "attachment://";
            attachString2 = attachString2.concat(fileString2);

            var linkString2 = "https://bulbapedia.bulbagarden.net/wiki/";
            linkString2 = linkString2.concat(trimString2.charAt(0).toUpperCase() + trimString2.slice(1), "_(Pok%C3%A9mon)")

            const pokeEmbed2 = new Discord.MessageEmbed()
                 .setTitle(editedString2)
                 .addField("More info", "[Click here](" + linkString2 + ")")
                 .attachFiles([dirString2])
                 .setImage(attachString2)
                 
            
            msg.channel.send(pokeEmbed2).then( sent => {
                sent.react('❤️');
            });


            //https://bulbapedia.bulbagarden.net/wiki/Marshadow_(Pok%C3%A9mon)

            break;
    }
});



const helpEmbed = new Discord.MessageEmbed()
    .setTitle('ALPHABOT COMMANDS')
    .addField('**Utility Commands**','- **!clear** <number>: Clears a number of messages from the current channel.\n- **!give** <anything you want>: Basically an image search. Gives you a different result each time.\n- **!img** <anything you want>: Same as !give, but it always gives you the first result.')
    .addField('**Special Image Search Commands**','- **!beagle**: To get a beagle.\n- **!bc**: To get a border collie.\n- **!cursed**: To get a random cursed image. Use at your own risk.\n- **!god**: Makes your day instantly better.\n- **!skeleton**: To get a random skeleton.\n- **!truck**: To get a random truck. Big trucks only.')
    .addField('**Reddit Commands: These take a random post from a subreddit.**', '- **!anime**: r/anime_irl\n- **!aww**: r/aww\n- **!design**: r/shittydesigns\n- **!food**: r/foodporn\n- **!puppy**: r/puppy\n- **!stock**: r/cursedstockimages')
    .addField('**Misc. Commands**','- **!donut**: Gives Shinobu a snack!\n- **!fact**: Tells the truth.\n- **!w**: rolls a random waifu.\n-**!whelp**: sometime things happen yknow')
    .addField('**Clown Game Commands**','- **!clown @someone** : target someone to be clowned the next time they send a message.\n - **!shield** : Use this to save yourself from being clowned. Be careful not to waste it,it will only work if you are the current target.');

function help(message){
    message.author.send(helpEmbed);
}

function fact(message){
    

    message.channel.send( "guys it's omar");
    

}


function clown(message){

    if(message.mentions.members.size == 0)
    {
        message.reply("This user isn't valid! Looks like you're the clown smh.");
        return;
    }

    clownID = message.mentions.members.first().id;
    clownerID = message.author.id;

    console.log(clownID);
    console.log(message.mentions.members.first().id);

    clownNext = true;
    
    message.channel.bulkDelete(1);

    message.author.send('You have set ' + message.mentions.members.first().nickname + ' as your clown target.');

}


function image(message, word, firstImage){
 
    var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + word,
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    };
 
    request(options, function(error, response, responseBody) {
        if (error) {
            return;
        }
 
        $ = cheerio.load(responseBody);
        var links = $(".image a.link");
        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
       
        console.log(urls);
 
        if (!urls.length) {
            message.channel.send('I ran out of daily searches :(');
            return;
        }
 
        // Send result
        if(firstImage)
            message.channel.send(urls[0]);
        else
            message.channel.send(urls[Math.floor(Math.random() * urls.length)]);
    });
}

function pup(message){
  
    randomPuppy().then(url => {
        console.log(url);
        message.channel.send(url);
    })

}

function getImgFromSubreddit(message, subreddit){

    randomPuppy(subreddit).then(url => {
        console.log(url);
        message.channel.send(url);
    })
}

bot.login(token);
