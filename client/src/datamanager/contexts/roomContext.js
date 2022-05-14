import { createContext } from 'react'

const RoomContext = createContext({
  rooms: [],
  setRoom: (id, data) =>{},
  addRooms: (data) => {},
  addRoom: (data) => {},
  updateRoom: (id, data) => {},
  removeRoom: (id) => {}
})

export default RoomContext