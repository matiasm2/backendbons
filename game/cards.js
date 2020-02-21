const cardsEffects = ['Heal','Damage','Shield','Horror']
const maxHp = 20;
const maxShield = 10;

function getCard() {
    return {
        effect: cardsEffects[Math.floor(Math.random()*cardsEffects.length)],
        value: Math.floor(Math.random() * (10 - 1) + 1)
    }
}

function applyEffect(player, affectedPlayer, playedCard){
    console.log(playedCard.get('effect'));
    

    switch(playedCard.get('effect')) {
        case 'Heal':
            player['hp'] += playedCard.get('value');
            (player['hp'] > 20) ? player['hp'] = maxHp : {};
            break;

        case 'Damage':
            affectedPlayer['shield'] -= playedCard.get('value');
            (affectedPlayer['shield'] < 0) ? (affectedPlayer['hp'] += affectedPlayer['shield']) && (affectedPlayer['shield'] = 0) : {};
            (affectedPlayer['hp'] < 0) ? affectedPlayer['hp'] = 0 : {};  
            break;

        case 'Shield':
            player['shield'] += playedCard.get('value');
            (player['shield'] > maxShield) ? player['shield'] = maxShield : {};
            break;

        case 'Horror':
            break;
    }
    return {player: player, affectedPlayer: affectedPlayer}
}

function newHand(cards, playedCardIndex){
    return newCards = [
        ...cards.slice(0, playedCardIndex),
        ...cards.slice(playedCardIndex+1, cards.length),
        getCard()
    ]
}

module.exports = {
    applyEffect: applyEffect,
    getCard: getCard,
    newHand: newHand
}