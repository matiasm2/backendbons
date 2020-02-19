const cardsEffects = ['Heal','Damage','Shield','Horror']

function getCard() {
    return {
        effect: cardsEffects[Math.floor(Math.random()*cardsEffects.length)],
        value: Math.floor(Math.random() * (10 - 1) + 1)
    }
}

function applyEffect(player, playedCard){
    if (player.shield){
        player
    }
    return
}

function newHand(cards, playedCardIndex){
    return newCards = [
        ...cards.slice(0, playedCardIndex),
        ...cards.slice(playedCardIndex+1, cards.length),
        Cards.getCard()
    ]
}

module.exports = {
    getCard: getCard,
    
}