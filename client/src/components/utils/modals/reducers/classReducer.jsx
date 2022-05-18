const initialState = {
  name: "",
  faculty: 0,
  level: 0,
  capacity: 0,
  groups: [
    {
      id: 1,
      name: "Groupe Principale",
      capacity: 0
    }
  ],
  specialities: []
}

const classReducer = (state = initialState, action) => {
  const prevState = {...state}

  switch (action.type) {
    case "RESET": {
      return initialState
    }

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

        return computeGroupCapacity(prevState)[0]
      }

      return prevState
    }

    case "ADD_GROUP": {
      const id = prevState.groups.length === 1 ? 2 : prevState.groups[prevState.groups.length-1].id + 1
      
      const newGroup = {
        id,
        name: `Groupe ${id-1}`,
        capacity: 0
      }

      const [prevStateUpdated, newGroupUpdated] = computeGroupCapacity(prevState, newGroup)

      prevStateUpdated.groups.push(newGroupUpdated)

      return prevStateUpdated
    }

    case "DELETE_GROUP": {
      const id = action.payload

      const index = prevState.groups.findIndex(group => Number(group.id) === Number(id))

      if (index > -1) {
        prevState.groups.splice(index, 1)
      }

      return computeGroupCapacity(prevState)[0]
    }

    case "ADD_SPECIALITY": {
      const id = prevState.specialities.length === 0 ? 1 : prevState.specialities[prevState.specialities.length-1].id + 1

      // Default group
      const newGroup = {
        id: 1,
        name: "Groupe Principale",
        capacity: 0
      }

      // Get capacity value
      let newCapacity = 0
      
      if (prevState.specialities.length > 0) {
        for (let spec of prevState.specialities) {
          newCapacity += spec.capacity
        }

        newCapacity = prevState.capacity - newCapacity
      }

      console.log({newCapacity})

      // New speciality
      const newSpeciality = {
        id,
        value: 0,
        capacity: newCapacity,
        groups: [ newGroup ]
      }

      prevState.specialities.push(newSpeciality)

      return prevState
    }

    case "DELETE_SPECIALITY": {
      const id = action.payload

      if (id) {
        const index = prevState.specialities.findIndex(speciality => Number(speciality.id) === Number(id))

        if (index > -1) {
          prevState.specialities.splice(index, 1)
        }
      }

      return prevState
    }

    case "UPDATE_SPECIALITY_INFO": {
      const {
        id,
        field,
        value
      } = action.payload

      if (id && field && value) {
        const index = prevState.specialities.findIndex(speciality => Number(speciality.id) === Number(id))

        if (index > -1) {
          // Update speciality information
          if (field === "value") {
            prevState.specialities[index].value = value
          } else if (field === "capacity") {
            prevState.specialities[index].capacity = Number(value)

            return computeSpecialityGroupCapacity(id, prevState)[0]
          }
        }
      }

      return prevState
    }

    case "ADD_SPECIALITY_GROUP": {
      const idSpec = action.payload

      if (idSpec) {
        const index = prevState.specialities.findIndex(speciality => Number(speciality.id) === Number(idSpec))

        if (index > -1) {
          const speciality = prevState.specialities[index]
          const id = speciality.groups.length === 1 ? 2 : speciality.groups[speciality.groups.length-1].id + 1
          
          const newGroup = {
            id,
            name: `Groupe ${id-1}`,
            capacity: 0
          }
    
          const [prevStateUpdated, newGroupUpdated] = computeSpecialityGroupCapacity(idSpec, prevState, newGroup)
    
          prevStateUpdated.specialities[index].groups.push(newGroupUpdated)

          return prevStateUpdated
        }
      }

      return prevState
    }

    case "DELETE_SPECIALITY_GROUP": {
      const {
        idSpec,
        idGroup
      } = action.payload

      if (idSpec && idGroup) {
        const indexSpec = prevState.specialities.findIndex(speciality => Number(speciality.id) === Number(idSpec))

        if (indexSpec > -1) {
          const speciality = prevState.specialities[indexSpec]
          const indexGroup = speciality.groups.findIndex(group => Number(group.id) === Number(idGroup))

          if (indexGroup > -1) {
            prevState.specialities[indexSpec].groups.splice(indexGroup, 1)
          }
        }
      }

      return computeSpecialityGroupCapacity(idSpec, prevState)[0]
    }

    default: return state
  }
}

// Helper function
const computeGroupCapacity = (prevState, newGroup = null) => {
  const groupNumber = (prevState.groups.length - 1) + (newGroup ? 1 : 0)
  let capacity = prevState.capacity
  const capacityPerGroup = Math.floor(capacity / groupNumber)

  if (groupNumber > 0) {
    prevState.groups[0].capacity = capacity
    
    if (newGroup) {
      // Add capacity to the new group
      newGroup.capacity = capacityPerGroup
      capacity -= capacityPerGroup
    }

    // Test if the is already a group defined different of the main group
    if (groupNumber - 1 > 0) {
      // update capacity to the existing groups
      for (let i = groupNumber - (newGroup ? 1 : 0); i > 1; i--) {
        prevState.groups[i].capacity = capacityPerGroup
        capacity -= capacityPerGroup
      }
    
      // Add capacity to the first group
      prevState.groups[1].capacity = capacity
    }
  
  } else {
    if (!newGroup) {
      prevState.groups[0].capacity = capacity
    }
  }

  return [ prevState, newGroup ]
}

const computeSpecialityGroupCapacity = (id, prevState, newGroup = null) => {
  const index = prevState.specialities.findIndex(speciality => Number(speciality.id) === Number(id))

  if (index > -1) {
    const specialityGroupNumber = Number((prevState.specialities[index].groups.length - 1) + (newGroup ? 1 : 0))
    let capacity = prevState.specialities[index].capacity
    const capacityPerGroup = Math.floor(capacity / specialityGroupNumber)
  
    if (specialityGroupNumber > 0) {
      prevState.specialities[index].groups[0].capacity = capacity

      if (newGroup) {
        // Add capacity to the new group
        newGroup.capacity = capacityPerGroup
        capacity -= capacityPerGroup
      }
  
      // Test if the is already a group defined different of the main group
      if (specialityGroupNumber - 1 > 0) {
        // Update capacity to the existing groups
        for (let i = specialityGroupNumber - (newGroup ? 2 : 1); i > 0; i--) {
          prevState.specialities[index].groups[i].capacity = capacityPerGroup
          capacity -= capacityPerGroup
        }
      
        // Add capacity to the first group
        prevState.specialities[index].groups[1].capacity = capacity
      }
    } else {
      if (!newGroup) {
        prevState.specialities[index].groups[0].capacity = capacity
      }
    }
  }

  return [ prevState, newGroup ]
}

export {
  classReducer as default,
  initialState
}