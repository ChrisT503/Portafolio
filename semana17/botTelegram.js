const {Telegraf} = require("telegraf");
const bot=new Telegraf("5385245110:AAFLb9BEkPj5sZtN_GJVl-OCtH1bMLf_l5w");

bot.start((ctx) => {
    ctx.reply(`Programacion Computacional IV ${ctx.from.first_name}`);
});



//comando personalizado
bot.command(['saludar','saludo','hola'],(ctx)=>{

ctx.reply("Buenos dias");
});


bot.on('sticker',(ctx) =>{

ctx.reply("Buen Sticker");

});



// shorturl.at/qXY29
bot.launch();