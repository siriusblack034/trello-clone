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

    const deck = await Deck.findById(deckId)
    const locationDeckDel = deck.location

    //update deck after deck was delete
    const decks = req.body
    var decksUpdate = []
    var lengthDecks = decks.length;
    if (locationDeckDel !== decks[lengthDecks - 1]) {
      decksUpdate = decks.filter((deck, index) => index > locationDeckDel)
      Promise.all(decksUpdate.map(async deck => {
        await Deck.findByIdAndUpdate(deck._id, { location: deck.location - 1 })
      }))
    }

    await Task.deleteMany({ deck: deckId })
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

const dragDeck = async (req, res, next) => {
  try {
    const { newIndex, oldIndex, decks } = req.body
    var max = newIndex > oldIndex ? newIndex : oldIndex
    var min = newIndex > oldIndex ? oldIndex : newIndex
    Promise.all(decks.map(async (deck, index) => {
      if (index >= min && index <= max) {
        let id = deck._id
        await Deck.findByIdAndUpdate(id, { location: index })
      }
    }))
    return res.status(200).json({ message: '"draggble success!' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  addNewDeck,
  deleteDeck,
  getAllDeck,
  updateDeck,
  dragDeck

}