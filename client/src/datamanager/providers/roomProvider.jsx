import { useState } from "react"
import Room from "../../entities/room"
import RoomContext from "../contexts/roomContext"

const RoomProvider = ({ children }) => {
  // Set local state
  const [rooms, setRooms] = useState([])

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

    if (id && name && capacity) {
      const room = new Room(data)

      const roomsPrevState = [...rooms]

      roomsPrevState.push(room)

      setRooms(roomsPrevState)
    }
  }

  const handleUpdateRoom = (id, data) => {
    // nothing
  }

  const handleRemoveRoom = (id) => {
    // nothing
  }

  // Context value
  const contextValue = {
    rooms,
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