const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0Uzcjlld3VCUVY3QnVsYnQ2TzZ0cjRaYmVwZmhIUlk3ZitYZFF1SFpYOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib2k5dVI3K3haV3ppNjkyN1B2K2tWcmJMMXZzS1JVSG9ZWFI4V1ZxLzVGYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXSTFhZWJQckp5L0tuTmc3OUxpNk5rR01HZElLT0doT1pGbWpXV3BKVjJ3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJuQ3gzMWYvTld1elk5YUhpeWlsMHp6Q20rZkEveEZDYXhlaVBDZ25TYXdFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBNbmY5SDVCWnRubC9RUmpOZGorS0IvK01QMkRWajBrcVJNL25jZVhobWs9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVpQmZSemZQei9yZVZsQVRrUTEzYkx3TWVIbENPRU5RR01Ob0tqMWh6MWs9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUxuaThQdHRlZ1hUYmdPcndCZXNsdE13djBsQXJmc1lpWE91SlBRZE1FZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNHZzbkkvYS9XWmhmdG1hdkVHTmFIcTNUblUzOVFMWjdxMnBXZ2JyTVNUcz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlI1UFRoMmF4ZmNlZHVKZHBPUTVsWnl0T3dxRzlxallVVTBQZ05jeWx3eGRoSHZEQXp1ZThWNzBIR01SOHZkK2F2aW1adkZJUGhEZXhGaDJLNnBHU0R3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NzQsImFkdlNlY3JldEtleSI6IlVKUmU0ZEI1VUdqOHNCMjhaSkNnUUpDdVZGeWtDcmc4WjZGUWtZaG41Q009IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Ijd0UUFzWXNvVEVhTWVsbDhoUWg3NmciLCJwaG9uZUlkIjoiNTNiODI0YTItNzRhMy00ZjY2LWE2YTEtNTZlZTU1OTZjYmM1IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjdVdjNnMjVCbjVWNVh6clBqVWN3a1dtNHNVST0ifSwicmVnaXN0ZXJlZCI6ZmFsc2UsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVzBCRGQxY1NQU2ZONUxISkxpOEFKakU0aklJPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTmEybGJNRUVMbjk5N1VHR0FZZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoibjBHVEhjUzljK05CY2FyQUloeStwWXE5WVNSN0Z3WE9wZDJZOFkzUUxIUT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiSmNncnFpSjl3OFpaZTAwcFV5U0ZscHlmRC9MU1l4U3IwaEhxMDN0bDlRZWJ0aTJYZm5wS1d4d1RmL0xMSnFFZlhZSmhQS1lwTElwZUNrMDNOWkxOQlE9PSIsImRldmljZVNpZ25hdHVyZSI6Ik11QWZyWjFueGtQZ3NYelFrZ0VsVzNMWXpFeGxzSTdjTjBETVhwYVVYcTJHdUh0dElacDArQmxrbloybzFvaVYxMVNzakJIbS9RZGtpRnZaVmJHZERBPT0ifSwibWUiOnsiaWQiOiIyMjUwNTYwMTMxMTo2QHMud2hhdHNhcHAubmV0In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIyNTA1NjAxMzExOjZAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWjlCa3gzRXZYUGpRWEdxd0NJY3ZxV0t2V0VrZXhjRnpxWGRtUEdOMEN4MCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMzcyNzU0OH0=',
    PREFIXE: process.env.PREFIX || "∀",
    OWNER_NAME: process.env.OWNER_NAME || "➳𝖁𝖊𝖓𝖏𝖎✰",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "2250505601311",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BENJI_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
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
