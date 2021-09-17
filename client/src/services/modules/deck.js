import api from '../api'

export default {
  newDeck(deck) {
    return api.post('decks/new-deck', deck)
  },
  updateDeck(deck, idDeck) {
    return api.patch(`decks/update-deck/${idDeck}`, deck)
  },
  deleteDeck(idDeck) {
    return api.delete(`decks/delete-deck/${idDeck}`)
  },
}