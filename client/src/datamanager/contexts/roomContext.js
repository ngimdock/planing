import { createContext } from 'react'

const RoomContext = createContext({
  rooms: [],
  selectedRoom:{},
  setRoom: (data) =>{},
  addRooms: (data) => {},
  addRoom: (data) => {},
  updateRoom: (id, data) => {},
  removeRoom: (id) => {}
})

export default RoomContext