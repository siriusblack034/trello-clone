import api from '../api'

export default {
  newDeck(deck) {
    return api.post('decks/new-deck', deck)
  },
  updateDeck(deck, idDeck) {
    return api.patch(`decks/update-deck/${idDeck}`, deck)
  },
  dragDeck(data) {
    return api.post('decks/draggble', data)
  },
  deleteDeck(idDeck, decks) {
    console.log(decks);
    return api.post(`decks/delete-deck/${idDeck}`, decks)
  },
}
