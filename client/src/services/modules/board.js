import api from '../../services'
export default {
  getAllBoard() {
    return api().get('/boards/get-all-board')
  }
}