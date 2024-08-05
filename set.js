const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUN4QUpjYm5NZE5NQlNCa2dXOThlSURyOUpTTnhOY0ZDTkgyT3FBNTBtaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTHJkbWFnaXc2NmVVN29Wb2duWFJVOFFRb0FSU3podEtxaXJ1blAxclMwVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0UFJWTERIY29wSVpNT0V2TFFGNEFLclZtMEpsYmU0UEtLM1FzWmYwS1ZnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvdEhEUzVVTXNLc0J6djZod0hETnBBL1RlekIwVTdlclRTcExZMlp2a1RrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtIeTZBaDRTdm5ZSTZZSXIwTVAwVDZWM3NlbGIxTU0rSkVaOW9jQWYrVWs9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjMwcnpYMHNaclJjTmlVMklIYVBIdjZGMDhBclZucUVDVVl2S0QzWFc3RWM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0RoemhHRDA4alZZb3ZxdHUzRGVCRFVXMGlSRCtRci9UN0RDNkVERmFGST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoianM3Z21hNWtCRE9ZbFJGM3lXYXZ3VSswY3BYbXlCR0xJK3RYeGl3c2IyOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkplVklTNERNbEhyT2ptZ3hlWXladlJLN0ZTQkJ2Q0JlOS9KWC9BWjRSMzVtNkxXZnYwWjdwYjhNbjMycEdTODF1aU8vVHUwVmZaVHJldTFZK3NJMER3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjIxLCJhZHZTZWNyZXRLZXkiOiI3M1BDMkJZeDNKNUs2c09mY3JxVFVCMzVJN05Jb3V2bE5YNVJjc2ZTSW1BPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJweWh5THdaRVJZMlA1MXpRVktzWDNRIiwicGhvbmVJZCI6ImI3ODIzMDA2LThlMzQtNGQwYy1iODI0LWFkNzNhY2NiNTNlOSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzVzNEek5DSnhuRitmR25CY3JWMGs5N0ZrTjQ9In0sInJlZ2lzdGVyZWQiOmZhbHNlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklKd3VlaDFHUlRSSllNVnVHOHY1aUFLeElxcz0ifSwicmVnaXN0cmF0aW9uIjp7fSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0tuTzc2VUZFTGZkd2JVR0dBUWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkJuYkhONC9oM0p6Mml6d2Y2ZGxTcFNBTTk4WW9EY0FpQVJnTWVqVXNMaWM9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkRIRHVtY3ZzNkZWcitUL0FhMnNXU2dEYVZGbzNxY05TeFZEQlpYckxRZE9TbktPbXRRejlLZnVUOG44THQva294NTNkYm9ublNkY3J4MHdJUEIzc0FnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiIvOHd3VnI0dFVzUW4wV1V4dkNYNUtLcUxoTmYxN1pzWmNUeVJ5T0M2WWVlcy9TNG9YMTh0aXBkcHNpZ1BRdFMvQTFvS2YwK2VkdGtnM0tFbCtyb3FEZz09In0sIm1lIjp7ImlkIjoiMjI1NTU1ODE5MjE6MTBAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi4Ly64YOm4LyS8J2Qt/Cdm6/wnZuu8J2QvfCdm6ot8J2RhvCdm6XwnZuuXG7gvJLhg6bgvLsifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjI1NTU1ODE5MjE6MTBAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUVoyeHplUDRkeWM5b3M4SCtuWlVxVWdEUGZHS0EzQUlnRVlESG8xTEM0biJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMjgzODcxNCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFEeEcifQ==',
    PREFIXE: process.env.PREFIX || "Σ",
    OWNER_NAME: process.env.OWNER_NAME || "~༺ღ༒𝐷𝛯𝛮𝐽𝛪-𝑆𝛥𝛮༒ღ༻",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 2250555581921",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'DENJI_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "no",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
