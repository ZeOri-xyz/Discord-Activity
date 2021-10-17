const { Client } = require("discord.js");
const { config } = require("dotenv");
const fetch = require("node-fetch");

const client = new Client({
    disableEveryone: true
});

config({
    path: __dirname + "/.env"
})

// When the bot's online, what's in these brackets will be executed
client.on("ready", () => {
    console.log(`Hi, ${client.user.username} is now online!`);
    client.user.setActivity("Show Me Your Cards! 🃏", { type: "WATCHING"})
});


client.on("message", async message => {
    // console.log(`${message.author.username} said: ${message.content}`);

    let args = message.content.trim().split(' ').slice(1);

    const poker_rooms = {
        '1': 'channel-id',
        '2': 'channel-id',
        '3': 'channel-id',
        '4': 'channel-id',

    }
    
    const youtube_rooms = {
        '1': 'channel-id',
        '2': 'channel-id',
        '3': 'channel-id',
    }

    const betrayal_rooms = {
		'1': 'channel-id',
        '2': 'channel-id',
        '3': 'channel-id',
        '4': 'channel-id',
        '5': 'channel-id',
        
    }

    if(message.content.startsWith("!poker")) {
        if(message.channel.id !== "channel-id") return message.channel.send("You can't use this command here.");
        let jj = poker_rooms[args[0]];
        if(!jj == "") {
            // message.channel.send(rooms[args[0]]);
            const channel =  message.guild.channels.cache.get(jj);
            if(!channel || channel.type !== "voice") return message.channel.send("Invalid channel specified!");
            if(!channel.permissionsFor(message.guild.me).has("CREATE_INSTANT_INVITE")) return message.reply('permission failed.')
        
            fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
                method: "POST",
                body: JSON.stringify({
                    max_age: 86400,
                    max_uses: 0,
                    target_application_id: "755827207812677713", // Youtube Together: 755600276941176913 | Poker Night: 755827207812677713 | Betrayal.io: 773336526917861400 | Fishington.io: 814288819477020702 
                    target_type: 2,
                    temporary: false,
                    validate: null
                }),
                headers: {
                    "Authorization": `Bot ${process.env.TOKEN}`,
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(invite => {
                if (!invite.code) return message.reply("the bot can't start poker night");
                message.channel.send(`click here to start play poker night in ${channel.name} <https://discord.com/invite/${invite.code}>`);
            });

        }
    }

    if(message.content.startsWith("!youtube")) {
        if(message.channel.id !== "channel-id") return message.channel.send("You can't use this command here.");
        let jj = youtube_rooms[args[0]];
        if(!jj == "") {
            const channel =  message.guild.channels.cache.get(jj);
            fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
                method: "POST",
                body: JSON.stringify({
                    max_age: 86400,
                    max_uses: 0,
                    target_application_id: "755600276941176913", // Youtube Together: 755600276941176913 | Poker Night: 755827207812677713 | Betrayal.io: 773336526917861400 | Fishington.io: 814288819477020702 
                    target_type: 2,
                    temporary: false,
                    validate: null
                }),
                headers: {
                    "Authorization": `Bot ${process.env.TOKEN}`,
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(invite => {
                if (!invite.code) return message.reply("the bot can't start youtube");
                message.channel.send(`click here to start youtube in \`${channel.name}\` <https://discord.com/invite/${invite.code}>`);
            });
        }
    }

    // This Command Is Disable, you can to enable it if you want.
    
    // if(message.content.startsWith("!bl")) {
    //     if(message.channel.id !== "channel-id") return message.channel.send("You can't use this command here.");
    //     let jj = betrayal_rooms[args[0]];
    //     if(!jj == "") {
    //         const channel =  message.guild.channels.cache.get(jj);
    //         fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
    //             method: "POST",
    //             body: JSON.stringify({
    //                 max_age: 86400,
    //                 max_uses: 0,
    //                 target_application_id: "755600276941176913", // Youtube Together: 755600276941176913 | Poker Night: 755827207812677713 | Betrayal.io: 773336526917861400 | Fishington.io: 814288819477020702 
    //                 target_type: 2,
    //                 temporary: false,
    //                 validate: null
    //             }),
    //             headers: {
    //                 "Authorization": `Bot ${process.env.TOKEN}`,
    //                 "Content-Type": "application/json"
    //             }
    //         })
    //         .then(res => res.json())
    //         .then(invite => {
    //             if (!invite.code) return message.reply("the bot can't start youtube");
    //             message.channel.send(`click here to start play Betrayal.io in \`${channel.name}\` <https://discord.com/invite/${invite.code}>`);
    //         });
    //     }
    // }
    

});

// Login the bot
client.login(process.env.TOKEN);
