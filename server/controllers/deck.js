const Deck = require('../models/Deck')
const Board = require('../models/Board')

const addNewDeck = async (req, res, next) => {
  try {

    const newDeck = await new Deck(req.body)
    await newDeck.save()
    return res.status(200).json({ newDeck })
  } catch (error) {
    next(error)
  }
}
const deleteDeck = async (req, res, next) => {
  try {
    const { deckId } = req.params

    // Get a deck
    const deck = await Deck.findById(deckId)
    const boardId = deck.board
    // Get a owner
    const board = await Board.findById(boardId)

    board.decks.pull(deck)
    await board.save()
    await deck.remove()
    return res.status(200).json({ success: true })

  } catch (error) {
    next(error)
  }
}
const getAllDeck = async (req, res, next) => {
  try {
    const decks = await Deck.find({ board: req.body.boardId })
    return res.status(200).json({ decks })
  } catch (error) {
    next(error)
  }
}
/* const getDeck = async (req, res, next) => {
  try {
    const { deckId } = req.params
    const deck = await Deck.findById(deckId)
    return res.status(200).json({ deck })
  } catch (error) {
    next(error)
  }
} */
const updateDeck = async (req, res, next) => {
  try {
    const { deckId } = req.params
    const decks = await Deck.findByIdAndUpdate(deckId, req.body)
    return res.status(200).json({ decks })
  } catch (error) {
    next(error)
  }
}


module.exports = {
  addNewDeck,
  deleteDeck,
  getAllDeck,
  updateDeck

}