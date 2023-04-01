const { Client, Intents, MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js');
const readline = require("readline").createInterface({ input: process.stdin, output: process.stdout });
const { red, yellow, greenBright, yellowBright } = require("chalk");
const { token, message } = require("./settings.json");
const consolecolor = require('gradient-string');
const client = new Client({ intents: 32767 });
const fs = require("fs");

client.on('ready', () => {
  console.log(consolecolor("#2871fa", "#6717cd", "#2871fa", "#6717cd")("Ich Bin Online ✔️"))
    client.user.setActivity("🦈 𝗦𝗵𝗮𝗿𝗸 𝗦𝗲𝗿𝘃𝗶𝗰𝗲𝘀",{type:"STREAMING",url:"https://twitch.tv/h4mod3y"});
    Main();
});




function Main() {
   
console.log(consolecolor("#2871fa", "#6717cd")(`
   ::::::::  :::    :::     :::     :::::::::  :::    :::   :::::::::::  ::::::::   ::::::::  :::        
  :+:    :+: :+:    :+:   :+: :+:   :+:    :+: :+:   :+:        :+:     :+:    :+: :+:    :+: :+:        
  +:+        +:+    +:+  +:+   +:+  +:+    +:+ +:+  +:+         +:+     +:+    +:+ +:+    +:+ +:+        
  +#++:++#++ +#++:++#++ +#++:++#++: +#++:++#:  +#++:++          +#+     +#+    +:+ +#+    +:+ +#+        
         +#+ +#+    +#+ +#+     +#+ +#+    +#+ +#+  +#+         +#+     +#+    +#+ +#+    +#+ +#+        
  #+#    #+# #+#    #+# #+#     #+# #+#    #+# #+#   #+#        #+#     #+#    #+# #+#    #+# #+#        
   ########  ###    ### ###     ### ###    ### ###    ###       ###      ########   ########  ##########                                                                                                            
                                         Discord.gg/Shark-Services-V2`))
console.log(consolecolor("#2871fa", "#6717cd", "#2871fa", "#6717cd")("============================================================================================================"))
console.log(consolecolor("#2871fa", "#6717cd")(`    
                                        D I S C O R D    M A S S    D M 
                                        
                                       [1] - Normal Mode (Without Timeout)
                                       [2] - Timeout Mode (Avoids Flagging)`))

readline.question(consolecolor("#2871fa", "#6717cd")("[?] Choose Option: "), answer => {
switch (answer) {
 case "1":
readline.question(consolecolor("#2871fa", "#6717cd")("\n[!] Enter Guild ID: "), response => {
    ScrapeUsers(response).then(() => { console.log(greenBright("Warning: Mass DMing Soon!"));
      setTimeout(() => { MassDMNormal(null, message).catch((err) => { console.log(err)
       setTimeout(() => { console.log(yellow("Warning: Restarting."));
    }, 1000);
       setTimeout(() => { process.exit(1) }, 2000);
    });
   }, 2000);
  });
 });
  break;
  case "2":

readline.question(consolecolor("#2871fa", "#6717cd")("\n[!] Enter Guild ID: "), response => {
 ScrapeUsers(response).then(() => {
  setTimeout(() => { 
    readline.question(consolecolor("#2871fa", "#6717cd")("\n[i] Set Timeout: The number of seconds the bot waits before it messages users.\n[i] Bypass: Avoids being flagged by Discord\n[i] Limit(s): 3 - 9 seconds\n\n[!] Enter Timeout: "), timeout => {
    if (timeout === "3" || timeout === "4" || timeout === "5" || timeout === "6" || timeout === "7" || timeout === "8" || timeout === "9") {
    const timer = (parseInt(timeout) * 1000)
     console.log(greenBright("Warning: Mass DMing Soon."));
       MassDMTimeOut(null, timer, message).catch((err) => {console.log(err)
        setTimeout(() => { console.log(yellow("Warning: Restarting...")) }, 2000);
        setTimeout(() => { process.exit(1) }, 4000);
    }) } else {
  console.log(red("Timeout Error: Invalid number was used to set a Timeout."));
     setTimeout(() => {console.log(yellow("Warning: Restarting..."))}, 1000);
     setTimeout(() => {process.exit(1)}, 2000);
    }
   });
  }, 2000);
 });
 });
  break;
  default:
    console.log(red("Option Error: Incorrect option used."))
    }
  })
}

async function ScrapeUsers(guildID) {
    client.guilds.fetch(guildID).then((guild) => {
        const file_path = './scraped.json';
        const MemberIDs = guild.members.cache.map((users) => users.id)
        console.log(yellowBright("[!] " + MemberIDs.length + " Users Scraped"))
        const Data = { IDs: MemberIDs}
        const content = JSON.stringify(Data, null, 2)
        fs.writeFileSync(file_path, content, (err) => {
            if (err) return console.log(red("Writing File Error: " + err))
            console.log(greenBright("Successfully made " + file_path))
        })
    }).catch((err) => {console.log(red("Fetching Guild Error: " + err))
      setTimeout(() => {console.log(yellow("Warning: Restarting."));
  }, 1000);
      setTimeout(() => {
       process.exit(1);
        }, 2000);
    })
}


function MassDMTimeOut(users, timeout, msg) {
  return new Promise((resolve, reject) => {
    const scraped = require("./scraped.json");
      users = scraped.IDs;
        if (typeof timeout != "number") {
            reject(red("Timeout Error: Wrong data type used."))
        } else if (typeof msg != "string") {
            reject(red("Message Args Error: Must use of 'string' data type"))
        } else {
            for (let i = 0; i <= users.length; i++) {
                client.users.fetch(users[i]).then((u) => {
                    (function (i) {
                        setTimeout(function () {
                            u.send(msg).then(() => console.log(greenBright("User: " + u.tag + " messaged."))).catch((err) => console.log(red("DM Error: User: " + u.tag + " May have DMs off. " + err)))
                        }, timeout * i);
                    })(i);
                }).catch((err) => console.log(red("Fetching User Error: " + err)));
            }
            resolve();
        }
    })
}

function MassDMNormal(users, msg) {
    return new Promise((resolve, reject) => {
        const scraped = require("./scraped.json");
        users = scraped.IDs;
            for (let i = 0; i <= users.length; i++) {
                client.users.fetch(users[i]).then((u) => {
                    u.send(msg).then(() => console.log(greenBright("User: " + u.tag + " messaged."))).catch((err) => console.log(red("DM Error: User: " + u.tag + " may have DMs off. " + err)));
                }).catch((err) => console.log(red("Fetching User Error: " + err)));
            }
            resolve();
    })
}

// Client Logging in

client.login(token).catch(() => console.log(consolecolor("#2871fa", "#6717cd")("Invalid Token ! Put a new token in the Settings file")))
