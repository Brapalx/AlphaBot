const Discord = require('discord.js')
const bot = new Discord.Client();

const cheerio = require('cheerio');
const request = require('request');
var Scraper = require('images-scraper');
const randomPuppy = require('random-puppy');

const ytdl = require("ytdl-core");

const token = require("./token.js");

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

var pokeArray = []

const google = new Scraper({
    puppeteer: {
        headless: true
    }
})


bot.on('ready', () => {
    console.log('This bot is online');
    bot.user.setActivity('Use !help to get info!');


    fs.readFile('pokewinners.txt', 'utf8' , (err, data) => {
    if (err) {
          console.error(err)
          return
        }

        let stringArray = data.split(/\r?\n/);

        var tempObject;
        var tempArray;

        stringArray.forEach( str => {

            tempArray = str.split(' ');

            tempObject = {name: tempArray[0], wins: tempArray[1], losses: tempArray[2]};

            pokeArray.push(tempObject)

        })
    })

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
            image2rand(msg, "beagle");
            break;

        case 'bc':
            image2rand(msg, "border collie");
            break;

        case 'cursed':
            image2rand(msg, "cursed image");
            break;

        case 'skeleton':
            image2rand(msg, "skeleton video game");
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

                image2rand(msg, res);
                console.log(res);
            }
            else
                image2rand(msg, args[1]);

            break;

        case 'donut':
           
            const attachment = new Discord.MessageAttachment('./shinobu.gif');
            msg.reply('You gave Shinobu a donut!',attachment);
            break;

        case 'fact':
            fact(msg);
            break;

        case 'truck':
            image2rand(msg, "truck");
            break;

        case 'testimage':
            image2(msg, "dog", false);
            break;

        case 'god':
            image2rand(msg, "adam sandler");
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

                image2(msg, res);
                console.log(res);
            }
            else
                image2(msg, args[1]);

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

        case 'coin':
            var value = Math.random() * (100);

            if (value < 50)
            {
                msg.channel.send("Tails!");
            }
            else
            {
                msg.channel.send("Heads!");
            }

            break;

        case 'pokevs':

            msg.channel.send(" 👊  __***POKEMON BATTLE***__  👊 ");

            var fileString = "";
            var fileString2 = "";
            
            do {

            fileString = poke_files[Math.floor(Math.random() * poke_files.length)];

            fileString2 = poke_files[Math.floor(Math.random() * poke_files.length)];
            }
            while (fileString != fileString2)


            var dirString = "./pokeimages/" + fileString;
            var asterisk = "__***";
            var trimString = fileString.slice(0, -4);
            var editedString = asterisk.concat(trimString.toUpperCase(),"***__");

            var attachString = "attachment://";
            attachString = attachString.concat(fileString);

            var linkString = "https://bulbapedia.bulbagarden.net/wiki/";
            linkString = linkString.concat(trimString.charAt(0).toUpperCase() + trimString.slice(1), "_(Pok%C3%A9mon)")

            var pokewins = 0;
            var pokelosses = 0;

            pokeArray.forEach(pokemon => {
                if (pokemon.name === editedString)
                {
                    pokewins = pokemon.wins;
                    pokelosses = pokemon.losses;
                }
            })


            const pokeEmbed = new Discord.MessageEmbed()
                 .setTitle(editedString)
                 .addFields(
                     { name: "Wins:", value: pokewins.toString(), inline: true},
                     { name: "Losses:", value: pokelosses.toString(), inline: true},
                     { name: "More info:", value: "[Click here](" + linkString + ")", inline: true},
                 )
                 .attachFiles([dirString])
                 .setImage(attachString)
            
            var pokeA = editedString;

           msg.channel.send(pokeEmbed);

            var fileString2 = poke_files[Math.floor(Math.random() * poke_files.length)]
            var dirString2 = "./pokeimages/" + fileString2;
            var asterisk = "__***";
            var trimString2 = fileString2.slice(0, -4);
            var editedString2 = asterisk.concat(trimString2.toUpperCase(),"***__");

            var attachString2 = "attachment://";
            attachString2 = attachString2.concat(fileString2);

            var linkString2 = "https://bulbapedia.bulbagarden.net/wiki/";
            linkString2 = linkString2.concat(trimString2.charAt(0).toUpperCase() + trimString2.slice(1), "_(Pok%C3%A9mon)")

            var pokewins2 = 0;
            var pokelosses2 = 0;

            pokeArray.forEach(pokemon => {
                if (pokemon.name === editedString2)
                {
                    pokewins2 = pokemon.wins;
                    pokelosses2 = pokemon.losses;
                }
            })

            const pokeEmbed2 = new Discord.MessageEmbed()
                 .setTitle(editedString2)
                 .addFields(
                    { name: "Wins:", value: pokewins2.toString(), inline: true},
                    { name: "Losses:", value: pokelosses2.toString(), inline: true},
                    { name: "More info:", value: "[Click here](" + linkString2 + ")", inline: true},
                )
                 .attachFiles([dirString2])
                 .setImage(attachString2)

            var pokeB = editedString2;
            
            msg.channel.send(pokeEmbed2);
            
            const pokeEmbed3 = new Discord.MessageEmbed()
                .setTitle("CAST YOUR VOTES __***HERE***__")
                .setDescription(`🅰️:  ${pokeA}\n 🅱️:  ${pokeB}`)

                 
            
                msg.channel.send(pokeEmbed3).then (sent3 => {
                sent3.react('🅰️')
                sent3.react('🅱️')

                const filter = (reaction, user) => {
                    return (reaction.emoji.name === '🅰️' || reaction.emoji.name === '🅱️') && !user.bot;
                };

                const options = {
                    max: 20,
                    time: 20000
                }


                return sent3.awaitReactions(filter, options);
            })
            .then(collected => {
                // Convert the collection to an array
                let collectedArray = collected.array()


                let numA = 0;
                let numB = 0;

                collectedArray.forEach(reaction => {

                    if (reaction.emoji.name == '🅰️')
                    {
                        numA = reaction.count - 1;
                    }

                    if (reaction.emoji.name == '🅱️')
                    {
                        numB = reaction.count - 1;
                    }
                })

                let winnerName = "";
                let loserName = "";

                if( numA > numB)
                {
                    winnerName = pokeA;
                    loserName = pokeB;
                }
                else if (numB > numA)
                {
                    winnerName = pokeB;
                    loserName = pokeA;
                }

                let surveyResultsEmbed;

                if (numB == numA)
                {
                    surveyResultsEmbed = new Discord.MessageEmbed()
                    .setTitle("IT'S A __***TIE***__")
            
                }
                else if ((numA + numB) == 1)
                {
                    surveyResultsEmbed = new Discord.MessageEmbed()
                    .setTitle("NOT ENOUGH VOTES!")
                }
                else
                {
                    surveyResultsEmbed = new Discord.MessageEmbed()
                    .setTitle(`${winnerName} WINS!`)

                    updateWinners(winnerName);
                    updateLosers(loserName);
                }
        
        
                msg.channel.send(surveyResultsEmbed);
              })


            break;

        case 'poketop':

              pokeArray.sort((a,b) => parseInt(b.wins) - parseInt(a.wins)); 

              var concString = "";
              var tString = "";
              var i = 1;

              var j;

              for (j = 0; j < 20; j++)
              {

                if(!pokeArray[j])
                {
                    break;
                }

                if(pokeArray[j].wins > 0)
                {
                    tString = "#" + i.toString() + ":  " + pokeArray[j].name + "  -  " + pokeArray[j].wins + "\n";
                    concString = concString.concat(tString);
                    i = i + 1;
                }
              }

              const pokeWLembed = new Discord.MessageEmbed()
                .setTitle(" 🥵  __***POKEMON BATTLE WINNER RANKINGS***__  🥵 ")
                .setDescription(concString);

              msg.channel.send(pokeWLembed);

            break;


        case 'pokebot':

                pokeArray.sort((a,b) => parseInt(b.losses) - parseInt(a.losses)); 
  
                var concString = "";
                var tString = "";
                var i = 1;
  
                var j;
  
                for (j = 0; j < 20; j++)
                {
  
                  if(!pokeArray[j])
                  {
                      break;
                  }
  
                  if(pokeArray[j].losses > 0)
                  {
                      tString = "#" + i.toString() + ":  " + pokeArray[j].name + "  -  " + pokeArray[j].losses + "\n";
                      concString = concString.concat(tString);
                      i = i + 1;
                  }
                }
  
                const pokeLembed = new Discord.MessageEmbed()
                  .setTitle(" 🤢  __***POKEMON BATTLE LOSER RANKINGS***__  🤢 ")
                  .setDescription(concString);
  
                msg.channel.send(pokeLembed);
  
              break;

        case 'pokedex':
            if(!args[1]) return msg.reply('Not a valid pokemon.');
    
            var luName = "__***" + args[1].toUpperCase() + "***__";

            let pokedexEmbed;

                


            var found = false;

            pokeArray.forEach( pokemon => {

            if (pokemon.name === luName)
            {

                var fileString2 = args[1].toLowerCase();
                var dirString2 = "./pokeimages/" + fileString2 + ".png";
        
                var attachString2 = "attachment://";
                attachString2 = attachString2.concat(fileString2 + ".png");

                var trimString2 = fileString2;


                var linkString2 = "https://bulbapedia.bulbagarden.net/wiki/";
                linkString2 = linkString2.concat(trimString2.charAt(0).toUpperCase() + trimString2.slice(1), "_(Pok%C3%A9mon)")



                pokedexEmbed = new Discord.MessageEmbed()
                 .setTitle(pokemon.name)
                 .addFields(
                    { name: "Wins:", value: pokemon.wins.toString(), inline: true},
                    { name: "Losses:", value: pokemon.losses.toString(), inline: true},
                    { name: "More info:", value: "[Click here](" + linkString2 + ")", inline: true},
                 )
                 .attachFiles([dirString2])
                 .setImage(attachString2)

                msg.channel.send(pokedexEmbed);

                found = true;
            }
            })

            if (!found)
            {
                pokedexEmbed = new Discord.MessageEmbed()
                .setTitle("POKEMON  __***NOT***__  FOUND IN THE BATTLE RECORDS")
                msg.channel.send(pokedexEmbed);
            }
            
            break;
    }
});

function updateWinners(winner){

    var found = false;

    pokeArray.forEach( pokemon => {

        if (pokemon.name === winner)
        {

            var tempnum = parseInt(pokemon.wins) + 1;

            pokemon.wins = tempnum.toString();
            found = true;
        }
    })

    if (!found)
    {
        var tempPokemon = {name: winner, wins: 1, losses: 0};
        pokeArray.push(tempPokemon);
    }

    var concatString = "";
    var tempString = "";

    pokeArray.forEach( pokemon => {

        tempString = pokemon.name + " " + pokemon.wins + " " + pokemon.losses + "\n";

        concatString = concatString.concat(tempString);
    })

    concatString = concatString.slice(0, -1);

    fs.writeFile('pokewinners.txt', concatString, function (err) {
        if (err) return console.log(err);
    })
}


function updateLosers(loser){

    var found = false;

    pokeArray.forEach( pokemon => {

        if (pokemon.name === loser)
        {

            var tempnum = parseInt(pokemon.losses) + 1;

            pokemon.losses = tempnum.toString();
            found = true;
        }
    })

    if (!found)
    {
        var tempPokemon = {name: loser, wins: 0, losses: 1};
        pokeArray.push(tempPokemon);
    }

    var concatString = "";
    var tempString = "";

    pokeArray.forEach( pokemon => {

        tempString = pokemon.name + " " + pokemon.wins + " " + pokemon.losses + "\n";

        concatString = concatString.concat(tempString);
    })

    concatString = concatString.slice(0, -1);

    fs.writeFile('pokewinners.txt', concatString, function (err) {
        if (err) return console.log(err);
    })
}

const helpEmbed = new Discord.MessageEmbed()
    .setTitle('🐶  __***ALPHABOT COMMANDS***__  🐶')
    .addField('**Utility Commands**','- **!clear** <number>: Clears a number of messages from the current channel.\n- **!give** <anything you want>: Basically an image search. Gives you a different result each time.\n- **!img** <anything you want>: Same as !give, but it always gives you the first result.')
    .addField('**Special Image Search Commands**','- **!beagle**: To get a beagle.\n- **!bc**: To get a border collie.\n- **!cursed**: To get a random cursed image. Use at your own risk.\n- **!god**: Makes your day instantly better.\n- **!skeleton**: To get a random skeleton.\n- **!truck**: To get a random truck. Big trucks only.')
    .addField('**Reddit Commands: These take a random post from a subreddit.**', '- **!anime**: r/anime_irl\n- **!aww**: r/aww\n- **!design**: r/shittydesigns\n- **!food**: r/foodporn\n- **!puppy**: r/puppy\n- **!stock**: r/cursedstockimages')
    .addField('**Misc. Commands**','- **!donut**: Gives Shinobu a snack!\n- **!fact**: Tells the truth.\n- **!w**: rolls a random waifu.\n-**!whelp**: sometime things happen yknow')
    .addField('**Clown Game Commands**','- **!clown @someone** : Target someone to be clowned the next time they send a message.\n - **!shield** : Use this to save yourself from being clowned. Be careful not to waste it,it will only work if you are the current target.')
    .addField('**Pokemon Commands**','- **!pokevs** : Sends out a poll between two pokemon. Only one will remain.\n - **!poketop** : Shows the list of pokemon who have won the most battles.\n - **!pokebot** : Shows the list of pokemon who have lost the most battles.\n - **!pokedex <pokemon>** : Shows the battle stats of a pokemon. A pokemon must have fought at least  __***ONE***__  battle for it to show up!');

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

function image2(message, word){
 
    if(!word)
        return message.channel.send("Please enter an image name.");

    (async () => {
        const results = await google.scrape(word, 1);
        console.log('results', results);
        message.channel.send(results[0].url);
    })();

}

function image2rand(message, word){
 
    if(!word)
        return message.channel.send("Please enter an image name.");

    (async () => {
        const results = await google.scrape(word, 50);
        
        var rand = Math.floor(Math.random() * 50)

        message.channel.send(results[rand].url);
    })();

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
