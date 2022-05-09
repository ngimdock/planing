import SpecialityContext from '../contexts/specialityContext'
import Speciality from '../../entities/speciality'
import { useState } from 'react'

const SpecialityProvider = ({ children }) => {
  // Set local state
  const [specialities, setSpecialities] = useState([])

  // Some handlers
  const handleGetSpeciality = (id) => {
    const speciality = specialities.find(spec => Number(spec.getId) === Number(id))

    if (speciality) return speciality

    return null
  }

  const handleAddSpecialities = (data) => {
    const specialities = data.map(spec => {
      return new Speciality({ id: spec.idSpecialite, name: spec.nomSpecialite })
    })

    setSpecialities(specialities)
  }

  const handleAddSpeciality = (data) => {
    const {
      id,
      name
    } = data

    if (id && name) {
      const speciality = new Speciality(data)

      const specialitiesPrevState = [...specialities]

      specialitiesPrevState.push(speciality)

      setSpecialities(specialitiesPrevState)
    }
  }

  const handleUpdateSpeciality = (id, name) => {
    // nothing
  }

  const handleRemoveSpeciality = (id) => {

    const specialitiesNewState = []

    if(id) {
      console.log(id)
      const specialitiesPrevState = [...specialities]

      specialitiesPrevState.forEach(checkSpeciality)

      function checkSpeciality(speciality) {
        if(speciality.id !== id) {
          specialitiesNewState.push(speciality)
        } 
      }
      setSpecialities(specialitiesNewState)
    }
  }

  // Context value
  const contextValue = {
    specialities,
    getSpeciality: handleGetSpeciality,
    addSpecialities: handleAddSpecialities,
    addSpeciality: handleAddSpeciality,
    updateSpeciality: handleUpdateSpeciality,
    removeSpeciality: handleRemoveSpeciality
  }

  return (
    <SpecialityContext.Provider value={contextValue}>
      { children }
    </SpecialityContext.Provider>
  )
}

export default SpecialityProvider