const cardsEffects = ['Heal','Damage','Shield','Horror']

function getCard() {
    return {
        effect: cardsEffects[Math.floor(Math.random()*cardsEffects.length)],
        value: Math.floor(Math.random() * (10 - 1) + 1)
    }
}

module.exports = getCard

