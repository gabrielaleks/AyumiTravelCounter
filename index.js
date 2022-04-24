const rwClient = require("./twitterClient");
const emojis = require("./emojis.json");
const tripDate = new Date("July 15, 2022 05:00:00");
const currentDate = new Date();
let daysLeft;

function setDaysLeft() {
    const diffTime = Math.abs(tripDate - currentDate);
    daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
}

function shuffleEmojis() {
    // Fisher–Yates shuffle
    var m = emojis.length, t, i;

    while (m) {
        i = Math.floor(Math.random() * m--);

        t = emojis[m];
        emojis[m] = emojis[i];
        emojis[i] = t;
    }
}

setDaysLeft();
shuffleEmojis();

const tweet = async () => {
    try {
        if (daysLeft > 0) {
            await rwClient.v1.tweet("⏳ Faltam *" + daysLeft + "* dias pra viagem " + emojis[0] + emojis[1] + emojis[2]);
        } else if (daysLeft == 0) {
            await rwClient.v1.tweet("⌛ Chegou o dia da gata voar! Boa viagem, linda 💫🛫🌹");
        }
    } catch (e) {
        console.error(e)
    }
}

tweet();