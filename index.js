//Ty FatAussieFatBoy and Zooly for the help, bot created by Ziif// Partie Config
const Discord = require('discord.js')
const client = new Discord.Client() //Client
const v8 = require('v8');
const { version, MessageEmbed } = require('discord.js');
const moment = require('moment');
require('moment-duration-format');
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcwMDg1OTI5ODcyODY0MDU3MyIsImJvdCI6dHJ1ZSwiaWF0IjoxNTg3Njk2NDc2fQ.BVAnv1EYUg2OZz2LEV-Roar6oOLnHQIe5_kWzwhAGHU', client);
let prefix = "=" //Change préfix ex: !clean , =clean etc.
client.login('TOKEN') //Bot token 
client.on('ready', () => {     
client.user.setActivity("=help");  //Change statut bot
})

// Optional events
dbl.on('posted', () => {
  console.log('Compteur de serveur mis à jour!');
})

dbl.on('error', e => {
 console.log(`Oops! ${e}`);
})

//-------------------------------------------------------------------------------//Logs

client.on('ready', function () {
  console.log("Bot en ligne")
  console.log("Commande help : '=help'")
  console.log("Created by Ziifkah")
})

//-------------------------------------------------------------------------------//Test

client.on('message', message => {
  if (message.content === prefix + 'test') {
    message.channel.send('**Bot ok! ✅**')
    message.delete({ timeout: 2000 })
  }
})

//-------------------------------------------------------------------------------//Help

client.on('message', message => {
  if (message.content === prefix + 'help') {
    message.channel.send('Liste des commandes du bot.')
    message.delete({ timeout: 2000 })
    message.channel.send({embed: {

      description: "**Une commande CleanZiiChannel doit commencer par le préfix ' = ' **",
      fields: [{
          
        name: "**=clean**",  
          value: "Supprime les messages dans le channel et laisse les messages épinglés.",  
        }, 
        {
          name: "**=sts**",
          value: "Montre les stats du bot."
        },
        {
          name: "**=test**",
          value: "Teste le bot."
        }
      ],
      
      footer: {
        icon_url: client.user.avatarURL,
        text: "© Ziifkah#7132"
      }
    }
  });
  }
})

//-------------------------------------------------------------------------------//Delete New (work)

client.on("message", async message => {
  if (message.author.bot) return;

  if (message.content ===  prefix + "clean") {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("**Vous n'avez pas la permission d'utiliser cette commande ❎**").then(msg => { msg.delete({ timeout : 4000 })})
    const allMessages = await message.channel.messages.fetch()
    const deletable = allMessages.filter(message => !message.pinned)
    await message.channel.bulkDelete(deletable, true)
    message.channel.send("**J'ai bien supprimé les messages ✅**").then(msg => { msg.delete({ timeout : 2000 })})
  }
});
   
//-------------------------------------------------------------------------------//Delete Ancient (work)

//client.on('message', function (message) {
  //if (!message.guild) return
  //let args = message.content.trim().split(/ +/g)

  //if (args[0].toLowerCase() === prefix + "clear") {
      //if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("**Vous n'avez pas la permission d'utiliser cette commande ❎**").then(msg => { msg.delete({ timeout : 4000 })})
      //let count = parseInt(args[1])
      //if (!count) return message.channel.send("**Veuillez indiquer un nombre de messages à supprimer ❎**").then(msg => { msg.delete({ timeout : 4000 })})
      //if (isNaN(count)) return message.channel.send("**Veuillez indiquer un nombre valide ❎**").then(msg => { msg.delete({ timeout : 4000 })})
      //if (count < 1 || count > 100) return message.channel.send("**Veuillez indiquer un nombre entre 1 et 100 ❎**").then(msg => { msg.delete({ timeout : 4000 })})
      //message.channel.bulkDelete(count + 1, true)
      //message.channel.send("**J'ai bien supprimé les messages ✅**").then(msg => { msg.delete({ timeout : 2000 })})

     //}
  //});
  
//-------------------------------------------------------------------------------//Stats

client.on('message', async (message) => {
    if (message.author.bot) return;
  

  const args = message.content.split(/\s+/g); 
  let command = null;

  if (message.content.startsWith(`<@${client.user.id}>`)) { 
    args.shift(); 
    command = args.shift().toLowerCase(); 
  } else if (message.content.startsWith(prefix)) {
    if (args[0] == prefix) {
      args.shift(); 
      command = args.shift().toLowerCase(); 
    } else {
      command = args.shift().toLowerCase().slice(prefix.length).trim(); 
      
    }
  } else return;

  switch (command) {
    case 'stat':  
      break;
    case 'stats':
    case 'sts': 
    
      

      let guilds = client.guilds.cache.size;
      let users = client.users.cache.size;
      let channels = client.channels.cache.size;

      let uptime = client.uptime;

      const usedHeapSize = v8.getHeapStatistics().used_heap_size;
      const totalHeapSize = v8.getHeapStatistics().total_heap_size;
      
      const duration = moment.duration(uptime).format(" D [days], H [hrs], m [mins] & s [secs]");
      

     

      const botInfo = [`**Mémoire Utilisée:** \`${(usedHeapSize / 1024 / 1024).toFixed(2)}/${(totalHeapSize / 1024 / 1024).toFixed(2)} MB\``, `**ON:** \`${duration}\``, `**Latence:** \`${Math.round(client.ws.ping)}ms\``];

      const guildInfo = [`**Nombre De Serveurs:** \`${guilds.toLocaleString()}\``, `**Nombre D'utilisateurs:** \`${users.toLocaleString()}\``, `**Nombre De Channels:** \`${channels.toLocaleString()}\``];
      const miscInfo = [`**Discord.js Version:** \`v${version}\``, `**Node Version:** \`${process.version}\``, `**Bot Version:** \`v1.2\``];  //${client.version}

      const embed = new MessageEmbed()
        //Bot information
        .addField(`• Bot Informations`, `${botInfo.join(' \u200b ')}\n\u200b`, false)
        //Guild information
        .addField('• Compteurs Informations', guildInfo.join('\n'), true)
        //Version information
        .addField('• Autres Informations', miscInfo.join('\n'), true);

        

      message.channel.send(`Liste des stats du bot.`, embed)
      message.delete({ timeout: 2000 })

      break;
    default:
      
     //message.reply(`${command} n'est pas une commande valide`);
  }
});



