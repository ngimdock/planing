import { useContext, useEffect } from "react"
import RoomAPI from "../api/room"
import RoomContext from "../datamanager/contexts/roomContext"

const useGetRooms = () => {
  // Get global state
  const { addRooms } = useContext(RoomContext)

  useEffect(() => {
    handleGetRooms()
  }, [])

  // Some handlers
  const handleGetRooms = async () => {
    const { data } = await RoomAPI.getAll()

    console.log(data)

    if (data) {
      // Store rooms inside the global state
      addRooms(data)
    }
  }
}

export default useGetRooms