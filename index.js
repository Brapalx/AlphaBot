require('dotenv').config()
const fs = require('node:fs');
const path = require('node:path');
const Discord = require('discord.js')
const { Client, GatewayIntentBits } = require('discord.js');
const { Collection } = require('discord.js');
const {getPokemon,getAllPokemon,getAllPokemonNames} = require('pkmonjs');
const bot = new Client({ intents: [GatewayIntentBits.Guilds] });
bot.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	bot.commands.set(command.data.name, command);
}

const cheerio = require('cheerio');
const request = require('request');


var Scraper = require('images-scraper');
const randomPuppy = require('random-puppy');

const ytdl = require("ytdl-core");

const PREFIX = '!'

const zackID = '104048942496358400'

var servers = {};

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

const names = getAllPokemonNames().then( f =>{

    f.forEach( poke => {

        console.log(poke.pokemonName)

    });
});

    




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

    

});





bot.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});


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

    var args_t = msg.content.split(" ");

   // erases messages from a user with a word in it
   
    /*
    if(msg.author.id === '128290356969078784')
    {
        if(msg.content.includes("valorant") || msg.content.includes("val"))
            msg.channel.bulkDelete(1);
    }
   */

    let args = msg.content.substring(PREFIX.length).split(" ");

    args[0] = args[0].toLowerCase();

    switch (args[0])
    {

        case 'beagle':
            image2rand(msg, "beagle");
            break;

            case 'w':
                var fileString = files[Math.floor(Math.random() * files.length)]
                var dirString = "./roulette/" + fileString;
                var randomAttachment = new Discord.MessageAttachment(dirString);
                msg.channel.send(randomAttachment).then( sent => {
                    sent.react('❤️');
                });
                break;

        case 'forest':
            T.get('users/show', { screen_name: `HourlyLizards`}, function (err, data, response) {
                if (err) {
                    console.log(`User Fetch Error`);
                    console.log(err);
                }
                msg.channel.send(data['id']);
                });
            break;

        case 'donut':
           
            const attachment = new Discord.MessageAttachment('./shinobu.gif');
            msg.reply('You gave Shinobu a donut!',attachment);
            break;

        case 'anime':
            getImgFromSubreddit(msg, 'anime_irl');
            break;

        case 'food':
            getImgFromSubreddit(msg, 'FoodPorn');
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
        
 
       

        case 'f':
            var fileString = files2[Math.floor(Math.random() * files2.length)]
            var dirString = "./f_roulette/" + fileString;
            var randomAttachment2 = new Discord.MessageAttachment(dirString);
            msg.channel.send(randomAttachment2);
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

            case 'fact':

                var htmldata="";
                var imgString=""
                request('http://randomfactgenerator.net/', function (error, response, body) {
                    htmldata=body;
                    
    
                    let imgIndexStart = htmldata.indexOf("<div id='z'");
                    imgString = htmldata.substring(imgIndexStart + 12, htmldata.size);
    
                    let imgIndexEnd = imgString.indexOf("<br/>");
    
                    imgString = imgString.substring(0, imgIndexEnd);
                    //imgString = imgString.replace(/\s+/g, '');
                    //console.log(imgIndexStart);
                    //console.log(imgIndexEnd);
    
                    
    
                    msg.channel.send(imgString);
    
                });
    
    
                break;

        // case 'pokevs':

        //     msg.channel.send(" 👊  __***POKEMON BATTLE***__  👊 ");

        //     var fileString = "";
        //     var fileString2 = "";
            
        //     do {

        //     fileString = poke_files[Math.floor(Math.random() * poke_files.length)];

        //     fileString2 = poke_files[Math.floor(Math.random() * poke_files.length)];
        //     }
        //     while (fileString != fileString2)


        //     var dirString = "./pokeimages/" + fileString;
        //     var asterisk = "__***";
        //     var trimString = fileString.slice(0, -4);
        //     var editedString = asterisk.concat(trimString.toUpperCase(),"***__");

        //     var attachString = "attachment://";
        //     attachString = attachString.concat(fileString);

        //     var linkString = "https://bulbapedia.bulbagarden.net/wiki/";
        //     linkString = linkString.concat(trimString.charAt(0).toUpperCase() + trimString.slice(1), "_(Pok%C3%A9mon)")

        //     var pokewins = 0;
        //     var pokelosses = 0;

        //     pokeArray.forEach(pokemon => {
        //         if (pokemon.name === editedString)
        //         {
        //             pokewins = pokemon.wins;
        //             pokelosses = pokemon.losses;
        //         }
        //     })


        //     const pokeEmbed = new Discord.MessageEmbed()
        //          .setTitle(editedString)
        //          .addFields(
        //              { name: "Wins:", value: pokewins.toString(), inline: true},
        //              { name: "Losses:", value: pokelosses.toString(), inline: true},
        //              { name: "More info:", value: "[Click here](" + linkString + ")", inline: true},
        //          )
        //          .attachFiles([dirString])
        //          .setImage(attachString)
            
        //     var pokeA = editedString;

        //    msg.channel.send(pokeEmbed);

        //     var fileString2 = poke_files[Math.floor(Math.random() * poke_files.length)]
        //     var dirString2 = "./pokeimages/" + fileString2;
        //     var asterisk = "__***";
        //     var trimString2 = fileString2.slice(0, -4);
        //     var editedString2 = asterisk.concat(trimString2.toUpperCase(),"***__");

        //     var attachString2 = "attachment://";
        //     attachString2 = attachString2.concat(fileString2);

        //     var linkString2 = "https://bulbapedia.bulbagarden.net/wiki/";
        //     linkString2 = linkString2.concat(trimString2.charAt(0).toUpperCase() + trimString2.slice(1), "_(Pok%C3%A9mon)")

        //     var pokewins2 = 0;
        //     var pokelosses2 = 0;

        //     pokeArray.forEach(pokemon => {
        //         if (pokemon.name === editedString2)
        //         {
        //             pokewins2 = pokemon.wins;
        //             pokelosses2 = pokemon.losses;
        //         }
        //     })

        //     const pokeEmbed2 = new Discord.MessageEmbed()
        //          .setTitle(editedString2)
        //          .addFields(
        //             { name: "Wins:", value: pokewins2.toString(), inline: true},
        //             { name: "Losses:", value: pokelosses2.toString(), inline: true},
        //             { name: "More info:", value: "[Click here](" + linkString2 + ")", inline: true},
        //         )
        //          .attachFiles([dirString2])
        //          .setImage(attachString2)

        //     var pokeB = editedString2;
            
        //     msg.channel.send(pokeEmbed2);
            
        //     const pokeEmbed3 = new Discord.MessageEmbed()
        //         .setTitle("CAST YOUR VOTES __***HERE***__")
        //         .setDescription(`🅰️:  ${pokeA}\n 🅱️:  ${pokeB}`)

                 
            
        //         msg.channel.send(pokeEmbed3).then (sent3 => {
        //         sent3.react('🅰️')
        //         sent3.react('🅱️')

        //         const filter = (reaction, user) => {
        //             return (reaction.emoji.name === '🅰️' || reaction.emoji.name === '🅱️') && !user.bot;
        //         };

        //         const options = {
        //             max: 20,
        //             time: 20000
        //         }


        //         return sent3.awaitReactions(filter, options);
        //     })
        //     .then(collected => {
        //         // Convert the collection to an array
        //         let collectedArray = collected.array()


        //         let numA = 0;
        //         let numB = 0;

        //         collectedArray.forEach(reaction => {

        //             if (reaction.emoji.name == '🅰️')
        //             {
        //                 numA = reaction.count - 1;
        //             }

        //             if (reaction.emoji.name == '🅱️')
        //             {
        //                 numB = reaction.count - 1;
        //             }
        //         })

        //         let winnerName = "";
        //         let loserName = "";

        //         if( numA > numB)
        //         {
        //             winnerName = pokeA;
        //             loserName = pokeB;
        //         }
        //         else if (numB > numA)
        //         {
        //             winnerName = pokeB;
        //             loserName = pokeA;
        //         }

        //         let surveyResultsEmbed;

        //         if (numB == numA)
        //         {
        //             surveyResultsEmbed = new Discord.MessageEmbed()
        //             .setTitle("IT'S A __***TIE***__")
            
        //         }
        //         else if ((numA + numB) == 1)
        //         {
        //             surveyResultsEmbed = new Discord.MessageEmbed()
        //             .setTitle("NOT ENOUGH VOTES!")
        //         }
        //         else
        //         {
        //             surveyResultsEmbed = new Discord.MessageEmbed()
        //             .setTitle(`${winnerName} WINS!`)

        //             updateWinners(winnerName);
        //             updateLosers(loserName);
        //         }
        
        
        //         msg.channel.send(surveyResultsEmbed);
        //       })


        //     break;

        // case 'poketop':

        //       pokeArray.sort((a,b) => parseInt(b.wins) - parseInt(a.wins)); 

        //       var concString = "";
        //       var tString = "";
        //       var i = 1;

        //       var j;

        //       for (j = 0; j < 20; j++)
        //       {

        //         if(!pokeArray[j])
        //         {
        //             break;
        //         }

        //         if(pokeArray[j].wins > 0)
        //         {
        //             tString = "#" + i.toString() + ":  " + pokeArray[j].name + "  -  " + pokeArray[j].wins + "\n";
        //             concString = concString.concat(tString);
        //             i = i + 1;
        //         }
        //       }

        //       const pokeWLembed = new Discord.MessageEmbed()
        //         .setTitle(" 🥵  __***POKEMON BATTLE WINNER RANKINGS***__  🥵 ")
        //         .setDescription(concString);

        //       msg.channel.send(pokeWLembed);

        //     break;


        // case 'pokebot':

        //         pokeArray.sort((a,b) => parseInt(b.losses) - parseInt(a.losses)); 
  
        //         var concString = "";
        //         var tString = "";
        //         var i = 1;
  
        //         var j;
  
        //         for (j = 0; j < 20; j++)
        //         {
  
        //           if(!pokeArray[j])
        //           {
        //               break;
        //           }
  
        //           if(pokeArray[j].losses > 0)
        //           {
        //               tString = "#" + i.toString() + ":  " + pokeArray[j].name + "  -  " + pokeArray[j].losses + "\n";
        //               concString = concString.concat(tString);
        //               i = i + 1;
        //           }
        //         }
  
        //         const pokeLembed = new Discord.MessageEmbed()
        //           .setTitle(" 🤢  __***POKEMON BATTLE LOSER RANKINGS***__  🤢 ")
        //           .setDescription(concString);
  
        //         msg.channel.send(pokeLembed);
  
        //       break;

            
        // case 'pokedex':
        //     if(!args[1]) return msg.reply('Not a valid pokemon.');
    
        //     var luName = "__***" + args[1].toUpperCase() + "***__";

        //     let pokedexEmbed;

                


        //     var found = false;

        //     pokeArray.forEach( pokemon => {

        //     if (pokemon.name === luName)
        //     {

        //         var fileString2 = args[1].toLowerCase();
        //         var dirString2 = "./pokeimages/" + fileString2 + ".png";
        
        //         var attachString2 = "attachment://";
        //         attachString2 = attachString2.concat(fileString2 + ".png");

        //         var trimString2 = fileString2;


        //         var linkString2 = "https://bulbapedia.bulbagarden.net/wiki/";
        //         linkString2 = linkString2.concat(trimString2.charAt(0).toUpperCase() + trimString2.slice(1), "_(Pok%C3%A9mon)")



        //         pokedexEmbed = new Discord.MessageEmbed()
        //          .setTitle(pokemon.name)
        //          .addFields(
        //             { name: "Wins:", value: pokemon.wins.toString(), inline: true},
        //             { name: "Losses:", value: pokemon.losses.toString(), inline: true},
        //             { name: "More info:", value: "[Click here](" + linkString2 + ")", inline: true},
        //          )
        //          .attachFiles([dirString2])
        //          .setImage(attachString2)

        //         msg.channel.send(pokedexEmbed);

        //         found = true;
        //     }
        //     })

        //     if (!found)
        //     {
        //         pokedexEmbed = new Discord.MessageEmbed()
        //         .setTitle("POKEMON  __***NOT***__  FOUND IN THE BATTLE RECORDS")
        //         msg.channel.send(pokedexEmbed);
        //     }
            
        //     break;


               // case 'wordle':

        //     if (sessionActive)
        //     {
        //         msg.channel.send("Wordle session already active! Use !guess <word> to play!");
        //         break;
        //     }

        //     var word = wordArray[Math.floor(Math.random() * wordArray.length)];

        //     console.log(word);

        //     currentWord = word.toLowerCase();
        //     sessionActive = true;
        //     guessesLeft = 6;

        //     msg.channel.send("Wordle session started! Use !guess <word> to play!");
        //     break;

        // case 'guess':

        //     if(!args[1]) return msg.reply('Please define a second argument.');

        //     if (sessionActive == false)
        //     {
        //         msg.channel.send("Wordle session not active! Use !wordle to play!");
        //         break;
        //     }

            


        //     var guess = args[1].toLowerCase();

        //     var found = false;

        //     for (let i = 0; i < wordArray.length; i++)
        //     {
        //         if (wordArray[i].toLowerCase() == guess)
        //             found = true;
        //     }

        //     if (found == false)
        //     {
        //         msg.channel.send("Not a valid word, bob.");
        //         break;
        //     }



        //     if (guess.length != 5)
        //     {
        //         msg.channel.send("Wordle words are five characters long, dipshit.");
        //         break;
        //     }

            
        //     var count = [...currentWord].reduce((a, e) => { a[e] = a[e] ? a[e] + 1 : 1; return a }, {}); 

        //     var outString = "";
        //     var checkArray = [0, 0, 0, 0, 0];

        //     for (let i = 0; i < guess.length; i++)
        //     {
   

        //         if (checkArray[i] == 0)
        //         {
                    

        //             if (guess[i] == currentWord[i])
        //             {
                        
        //                 checkArray[i] = 2;
        //                 count[guess[i]] = count[guess[i]] - 1;
        //             }
        //         }
        //     }

            

        //     for (let i = 0; i < guess.length; i++)
        //     {


        //         if (checkArray[i] == 0)
        //         {
                    

        //             if(currentWord.includes(guess[i]) && count[guess[i]] > 0)
        //             {

                        

        //                 count[guess[i]] = count[guess[i]] - 1;
        //                 checkArray[i] = 1;
        //             }
        //         }

        //     }

        //     for (let i = 0; i < guess.length; i++)
        //     {
        //         if (checkArray[i] == 2)
        //             outString += '🟩';
        //         else if (checkArray[i] == 1)
        //             outString += '🟨';
        //         else
        //             outString += '⬛';
        //     }

    

        //     guessesLeft -= 1;




        //     msg.channel.send(outString);

        //     if (guessesLeft <= 0)
        //     {
        //         msg.channel.send("You lost! You're a fucking loser!");
                
        //         var answer = "The word was: " + currentWord;
        //         msg.channel.send(answer);
        //         sessionActive = false;
        //         break;
        //     }

        //     const allEqual = arr => arr.every( v => v === arr[0] );

        //     if (allEqual(checkArray) && checkArray[0] == 2)
        //     {
        //         msg.channel.send("You win! That one was too easy, huh.");

        //         sessionActive = false;

        //         break;
        //     }


        //     var guessString = "You have " + guessesLeft.toString() + " guess(es) left!";

        //     msg.channel.send(guessString);

        //     break;

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

function getImgFromSubreddit(message, subreddit){

    randomPuppy(subreddit).then(url => {
        console.log(url);
        message.channel.send(url);
    })
}

bot.login(process.env.TOKEN);

module.exports.pokeArray = pokeArray;