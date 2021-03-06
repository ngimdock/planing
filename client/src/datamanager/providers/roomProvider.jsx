import { useState } from "react"
import Room from "../../entities/room"
import RoomContext from "../contexts/roomContext"

const RoomProvider = ({ children }) => {
  // Set local state
  const [ rooms, setRooms ] = useState([])
  const [ selectedRoom, setSelectedRoom ] = useState(null)

  // Some handlers
  const handleGetRoom = (id) => {
    const room = rooms.find(lev => Number(lev.getId) === Number(id))

    if (room) return room

    return null
  }

  /**
   * Add the entire list of rooms
   * @param {Array} data 
   */
  const handleAddRooms = (data) => {
    const rooms = data.map(room => {
      return new Room({ id: room.idSalle, name: room.nomSal, capacity: room.capaciteSal })
    })

    setRooms(rooms)
  }

  /**
   * Add the single room
   * @param {Object} data 
   */
  const handleAddRoom = (data) => {
    const {
      id,
      name,
      capacity
    } = data
    console.log("stateRooms",data)
    if (id && name && capacity) {
      const room = new Room(data)
      
      const roomsPrevState = [...rooms]

      roomsPrevState.push(room)

      setRooms(roomsPrevState)
      // console.log(rooms)
    }
  }

  const handleUpdateRoom = (id, data) => {
    const {
      name,
      capacity
    } = data

    const roomsPrev = [...rooms]

    if (id && name && capacity){
      roomsPrev.forEach(room =>{
        if(room.id === id){
          room.name = name
          room.capacity =capacity
        }

      })
    }
   
    setRooms(roomsPrev)
  }

  const handleRemoveRoom = (id) => {
    const roomNewState = []

    if (id) {
      const roomPreState = [...rooms]

      roomPreState.forEach(room =>{
        if (room.id !== id) {
          roomNewState.push(room)
        }
      })
      setRooms(roomNewState)
    }

  }

  const handleSelectedRoom = ( data )=>{
    setSelectedRoom(data)
  }

  // Context value
  const contextValue = {
    rooms,
    selectedRoom,
    setRoom: handleSelectedRoom, 
    addRooms: handleAddRooms,
    addRoom: handleAddRoom,
    updateRoom: handleUpdateRoom,
    removeRoom: handleRemoveRoom
  }

  return (
    <RoomContext.Provider value={contextValue}>
      { children }
    </RoomContext.Provider>
  )
}

export default RoomProvider