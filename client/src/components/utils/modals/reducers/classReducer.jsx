const initialState = {
  name: "",
  faculty: 0,
  level: 0,
  capacity: 0,
  groups: [
    {
      id: 1,
      name: "Groupe 1",
      capacity: 0
    }
  ],
  specialities: []
}

const classReducer = (state = initialState, action) => {
  const prevState = {...state}

  switch (action.type) {
    case "CHANGE_VALUE": {
      const {
        field,
        value
      } = action.payload

      // Update one of this list of property at once
      if (field === "name") {
        prevState.name = value.toUpperCase()
      } else if (field === "faculty") {
        prevState.faculty = value
      } else if (field === "level") {
        prevState.level = value
      } else if (field === "capacity") {
        prevState.capacity = Number(value)
        prevState.groups[0].capacity = Number(value)
      }

      return prevState
    }

    case "ADD_GROUP": {
      const id = prevState.groups.length === 1 ? 2 : prevState.groups[prevState.groups.length-1].id + 1
      
      const newGroup = {
        id,
        name: "Groupe " + id,
        capacity: 0
      }

      prevState.groups.push(newGroup)

      return prevState
    }

    case "DELETE_GROUP": {
      const id = action.payload

      const index = prevState.groups.findIndex(group => Number(group.id) === Number(id))

      if (index > -1) {
        prevState.groups.splice(index, 1)
      }

      return prevState
    }

    default: return state
  }
}

export {
  classReducer as default,
  initialState
}