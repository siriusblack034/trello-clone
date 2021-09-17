import api from '../api'

export default {
  getAllBoard() {
    return api.get('boards/get-all-board')
  },
  getBoard(idBoard) {
    return api.get(`boards/get-board/${idBoard}`)
  },
  newBoard(board) {
    return api.post('boards/add-board', board)
  },
  updateBoard(board, idBoard) {
    return api.patch(`boards/update-board/${idBoard}`, board)
  },
  deleteBoard(idBoard) {
    return api.delete(`boards/delete-board/${idBoard}`)
  },
}