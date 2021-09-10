const express = require('express')
const router = express.Router()

const deckCtr = require('../controllers/deck')


router.route('/get-decks').get(deckCtr.getAllDeck)
router.route('/new-deck').post(deckCtr.addNewDeck)
router.route('/update-deck/:deckId').patch(deckCtr.updateDeck)
router.route('/delete-deck/:deckId').delete(deckCtr.deleteDeck)

module.exports = router