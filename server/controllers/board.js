const Board = require('../models/Board');
const Deck = require('../models/Deck');
const Task = require('../models/Task');

const createBoard = async (req, res, next) => {
  try {
    const newBoard = new Board(req.body)
    await newBoard.save()
    return res.status(200).json({ board: newBoard })
  } catch (error) {
    next(error)
  }
}
const deleteBoard = async (req, res, next) => {
  try {
    const { boardId } = req.params
    await Board.findByIdAndDelete(boardId)
    return res.status(200).json({ success: true })

  } catch (error) {
    next(error)
  }
}
const getAllBoard = async (req, res, next) => {
  try {
    const { userId } = req.body
    const boards = await Board.find({ userId: userId })
    return res.status(200).json({ boards })
  } catch (error) {
    next(error)
  }
}
const getBoard = async (req, res, next) => {
  try {
    const { boardId } = req.params
    const { userId } = req.body
    const board = await Board.findOne({ _id: boardId, userId: userId })
    const listDeck = await Deck.find({ board: boardId })
    var decks = null;
    if (listDeck) {
      decks = await Promise.all(listDeck.map(async deck => {
        let listTask = await Task.find({ deck: deck._id })
        let title = deck.title
        return {
          title,
          listTask
        }
      }))
    }

    return res.status(200).json({ board, decks })

  } catch (error) {
    next(error)
  }
}
const updateBoard = async (req, res, next) => {
  try {
    const { boardId } = req.params
    const result = await Board.findByIdAndUpdate(boardId, req.body)
    return res.status(200).json({ success: true })
  } catch (error) {
    next(error)
  }
}
module.exports = {
  createBoard,
  deleteBoard,
  getBoard,
  getAllBoard,
  updateBoard,
}