const Deck = require('../models/Deck')
const Board = require('../models/Board')
const Task = require('../models/Task')

const addNewDeck = async (req, res, next) => {
  try {
    const newDeck = await new Deck(req.body)
    await newDeck.save()
    return res.status(200).json({ deck: newDeck })
  } catch (error) {
    next(error)
  }
}
const deleteDeck = async (req, res, next) => {
  try {
    const { deckId } = req.params
    //remove all task of deck
    await Task.deleteMany({ deckId: deckId })
    //remove deck
    const deck = await Deck.findById(deckId)
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
    console.log(req.body);
    await Deck.findByIdAndUpdate(deckId, req.body)
    return res.status(200).json({
      message: 'update thành công'
    })
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