import React, { useContext } from 'react'
import TeacherContext from '../../../datamanager/contexts/teacherContext'
import { formatName } from '../../../utils/format'
import generateColor from '../../../utils/generateColor'
import TeacherItem from './TeacherItem'

const TeacherContent = () => {
    // Global state
    const { teachers } = useContext(TeacherContext)

    return (
        teachers.map(teacher => (
            <TeacherItem
                key={teacher.getMatricule}
                name={formatName(teacher.getName)}
                sexe={formatName(teacher.getSex)}
                matricule={teacher.getMatricule}
                color={teacher.getColor}
            />
        ))
    )
}

export default TeacherContent