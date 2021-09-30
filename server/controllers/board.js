const Board = require('../models/Board');
const Deck = require('../models/Deck');
const Task = require('../models/Task');
const resize = require('../helpers/resizeImage')
const createBoard = async (req, res, next) => {
  try {
    const board = {
      userId: req.user._id,
      ...req.body
    }
    const newBoard = new Board(board)
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
    const userId = req.user._id
    const boards = await Board.find({ userId: userId })
    return res.status(200).json({ boards })
  } catch (error) {
    next(error)
  }
}
const getBoard = async (req, res, next) => {
  try {
    const { boardId } = req.params
    const board = await Board.findOne({ _id: boardId })
    const listDeck = await Deck.find({ boardId: boardId }).sort('location')
    var decks = null;
    if (listDeck) {
      decks = await Promise.all(listDeck.map(async deck => {
        let tasks = await Task.find({ deck: deck._id }).sort('location')
        let title = deck.title
        return {
          ...deck._doc,
          tasks
        }
      }))
    }
    return res.status(200).json({
      board: {
        ...board._doc,
        decks
      }
    })

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