import React, { useMemo } from 'react'
import styles from '../css/exports.module.css'

const TableItem = ({ program }) => {
    // some handlers
    const handleSetTablePrograms = (program, day) => {
        if(program) {
            switch(day) {
                case "monday":
                    return program.Lundi
                case "tuesday":
                    return program.Mardi
                case "wednesday":
                    return program.Mercredi
                case "thursday":
                    return program.Jeudi
                case "friday":
                    return program.Vendredi
                case "saturday":
                    return program.Samedi
                case "sunday":
                    return program.Dimanche
                default:
                    return null
            }
        }
    }

    // set local state
    const mondayPrograms = useMemo(() => handleSetTablePrograms(program, "monday"),[program])
    const tuesdayPrograms = useMemo(() => handleSetTablePrograms(program,  "tuesday"),[program])
    const wednesdayPrograms = useMemo(() => handleSetTablePrograms(program, "wednesday"),[program])
    const thursdayPrograms = useMemo(() => handleSetTablePrograms(program, "thursday"),[program])
    const fridayPrograms = useMemo(() => handleSetTablePrograms(program, "friday"),[program])
    const saturdayPrograms = useMemo(() => handleSetTablePrograms(program, "saturday"),[program])
    const sundayPrograms = useMemo(() => handleSetTablePrograms(program, "sunday"),[program])

    const headerInfos = [
        "Heures", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"
    ]

    const bodyInfos = []
    for(var i = 0; i < 7; i++) {
        bodyInfos.push("")
    }

  return (
    <div style={{
        paddingLeft: "50px",
        paddingRight: "50px"
    }}>
       <table className={styles.table}>
           <thead>
                <tr>
                    {headerInfos.map((item) => (
                        <th className={styles.th}>{item}</th>
                    ))}
                </tr>
           </thead>
           <tbody>
                <tr>
                    <td className={styles.td}>7h - 9h55</td>

                    <td className={styles.td}>{
                        mondayPrograms ? 
                        mondayPrograms.map((course) => 
                            course.startHour / 3600 >= 7 && course.endHour / 3600 <= 10 ?
                                (<div> {`${course.subjectCode} (${course.roomName}) ${course.teacherName}`} </div>)
                            : null
                        ) : null
                    }</td>
                    <td className={styles.td}>{
                        tuesdayPrograms ? 
                        tuesdayPrograms.map((course) => 
                            course.startHour / 3600 >= 7 && course.endHour / 3600 <= 10 ?
                                (<div> {`${course.subjectCode} (${course.roomName}) ${course.teacherName}`} </div>)
                            : null
                        ) : null
                    }</td>
                    <td className={styles.td}>{
                        wednesdayPrograms ? 
                        wednesdayPrograms.map((course) => 
                            course.startHour / 3600 >= 7 && course.endHour / 3600 <= 10 ?
                                (<div> {`${course.subjectCode} (${course.roomName}) ${course.teacherName}`} </div>)
                            : null
                        ) : null
                    }</td>
                    <td className={styles.td}>{
                        thursdayPrograms ? 
                        thursdayPrograms.map((course) => 
                            course.startHour / 3600 >= 7 && course.endHour / 3600 <= 10 ?
                                (<div> {`${course.subjectCode} (${course.roomName}) ${course.teacherName}`} </div>)
                            : null
                        ) : null
                    }</td>
                    <td className={styles.td}>{
                        fridayPrograms ? 
                        fridayPrograms.map((course) => 
                            course.startHour / 3600 >= 7 && course.endHour / 3600 <= 10 ?
                                (<div> {`${course.subjectCode} (${course.roomName}) ${course.teacherName}`} </div>)
                            : null
                        ) : null
                    }</td>
                    <td className={styles.td}>{
                        saturdayPrograms ? 
                        saturdayPrograms.map((course) => 
                            course.startHour / 3600 >= 7 && course.endHour / 3600 <= 10 ?
                                (<div> {`${course.subjectCode} (${course.roomName}) ${course.teacherName}`} </div>)
                            : null
                        ) : null
                    }</td>
                    <td className={styles.td}>{
                        sundayPrograms ? 
                        sundayPrograms.map((course) => 
                            course.startHour / 3600 >= 7 && course.endHour / 3600 <= 10 ?
                                (<div> {`${course.subjectCode} (${course.roomName}) ${course.teacherName}`} </div>)
                            : null
                        ) : null
                    }</td> 
                </tr>
                <tr>
                    <td className={styles.td}>10h05 - 12h55</td>

                    <td className={styles.td}>{
                        mondayPrograms ? 
                        mondayPrograms.map((course) => 
                            course.startHour / 3600 >= 10 && course.endHour / 3600 <= 13 ?
                                (<div> {`${course.subjectCode} (${course.roomName}) ${course.teacherName}`} </div>)
                            : null
                        ) : null
                    }</td>
                    <td className={styles.td}>{
                        tuesdayPrograms ? 
                        tuesdayPrograms.map((course) => 
                            course.startHour / 3600 >= 10 && course.endHour / 3600 <= 13 ?
                                (<div> {`${course.subjectCode} (${course.roomName}) ${course.teacherName}`} </div>)
                            : null
                        ) : null
                    }</td>
                    <td className={styles.td}>{
                        wednesdayPrograms ? 
                        wednesdayPrograms.map((course) => 
                            course.startHour / 3600 >= 10 && course.endHour / 3600 <= 13 ?
                                (<div> {`${course.subjectCode} (${course.roomName}) ${course.teacherName}`} </div>)
                            : null
                        ) : null
                    }</td>
                    <td className={styles.td}>{
                        thursdayPrograms ? 
                        thursdayPrograms.map((course) => 
                            course.startHour / 3600 >= 10 && course.endHour / 3600 <= 13 ?
                                (<div> {`${course.subjectCode} (${course.roomName}) ${course.teacherName}`} </div>)
                            : null
                        ) : null
                    }</td>
                    <td className={styles.td}>{
                        fridayPrograms ? 
                        fridayPrograms.map((course) => 
                            course.startHour / 3600 >= 10 && course.endHour / 3600 <= 13 ?
                                (<div> {`${course.subjectCode} (${course.roomName}) ${course.teacherName}`} </div>)
                            : null
                        ) : null
                    }</td>
                    <td className={styles.td}>{
                        saturdayPrograms ? 
                        saturdayPrograms.map((course) => 
                            course.startHour / 3600 >= 10 && course.endHour / 3600 <= 13 ?
                                (<div> {`${course.subjectCode} (${course.roomName}) ${course.teacherName}`} </div>)
                            : null
                        ) : null
                    }</td>
                    <td className={styles.td}>{
                        sundayPrograms ? 
                        sundayPrograms.map((course) => 
                            course.startHour / 3600 >= 10 && course.endHour / 3600 <= 13 ?
                                (<div> {`${course.subjectCode} (${course.roomName}) ${course.teacherName}`} </div>)
                            : null
                        ) : null
                    }</td>
                </tr>
                <tr>
                    <td className={styles.td}>13h15 - 15h55</td>

                    <td className={styles.td}>{
                        mondayPrograms ? 
                        mondayPrograms.map((course) => 
                            course.startHour / 3600 >= 13 && course.endHour / 3600 <= 16 ?
                                (<div> {`${course.subjectCode} (${course.roomName}) ${course.teacherName}`} </div>)
                            : null
                        ) : null
                    }</td>
                    <td className={styles.td}>{
                        tuesdayPrograms ? 
                        tuesdayPrograms.map((course) => 
                            course.startHour / 3600 >= 13 && course.endHour / 3600 <= 16 ?
                                (<div> {`${course.subjectCode} (${course.roomName}) ${course.teacherName}`} </div>)
                            : null
                        ) : null
                    }</td>
                    <td className={styles.td}>{
                        wednesdayPrograms ? 
                        wednesdayPrograms.map((course) => 
                            course.startHour / 3600 >= 13 && course.endHour / 3600 <= 16 ?
                                (<div> {`${course.subjectCode} (${course.roomName}) ${course.teacherName}`} </div>)
                            : null
                        ) : null
                    }</td>
                    <td className={styles.td}>{
                        thursdayPrograms ? 
                        thursdayPrograms.map((course) => 
                            course.startHour / 3600 >= 13 && course.endHour / 3600 <= 16 ?
                                (<div> {`${course.subjectCode} (${course.roomName}) ${course.teacherName}`} </div>)
                            : null
                        ) : null
                    }</td>
                    <td className={styles.td}>{
                        fridayPrograms ? 
                        fridayPrograms.map((course) => 
                            course.startHour / 3600 >= 13 && course.endHour / 3600 <= 16 ?
                                (<div> {`${course.subjectCode} (${course.roomName}) ${course.teacherName}`} </div>)
                            : null
                        ) : null
                    }</td>
                    <td className={styles.td}>{
                        saturdayPrograms ? 
                        saturdayPrograms.map((course) => 
                            course.startHour / 3600 >= 13 && course.endHour / 3600 <= 16 ?
                                (<div> {`${course.subjectCode} (${course.roomName}) ${course.teacherName}`} </div>)
                            : null
                        ) : null
                    }</td>
                    <td className={styles.td}>{
                        sundayPrograms ? 
                        sundayPrograms.map((course) => 
                            course.startHour / 3600 >= 13 && course.endHour / 3600 <= 16 ?
                                (<div> {`${course.subjectCode} (${course.roomName}) ${course.teacherName}`} </div>)
                            : null
                        ) : null
                    }</td>
                </tr>
                <tr>
                    <td className={styles.td}>16h05 - 18h55</td>

                    <td className={styles.td}>{
                        mondayPrograms ? 
                        mondayPrograms.map((course) => 
                            course.startHour / 3600 >= 16 && course.endHour / 3600 <= 19 ?
                                (<div> {`${course.subjectCode} (${course.roomName}) ${course.teacherName}`} </div>)
                            : null
                        ) : null
                    }</td>
                    <td className={styles.td}>{
                        tuesdayPrograms ? 
                        tuesdayPrograms.map((course) => 
                            course.startHour / 3600 >= 16 && course.endHour / 3600 <= 19 ?
                                (<div> {`${course.subjectCode} (${course.roomName}) ${course.teacherName}`} </div>)
                            : null
                        ) : null
                    }</td>
                    <td className={styles.td}>{
                        wednesdayPrograms ? 
                        wednesdayPrograms.map((course) => 
                            course.startHour / 3600 >= 16 && course.endHour / 3600 <= 19 ?
                                (<div> {`${course.subjectCode} (${course.roomName}) ${course.teacherName}`} </div>)
                            : null
                        ) : null
                    }</td>
                    <td className={styles.td}>{
                        thursdayPrograms ? 
                        thursdayPrograms.map((course) => 
                            course.startHour / 3600 >= 16 && course.endHour / 3600 <= 19 ?
                                (<div> {`${course.subjectCode} (${course.roomName}) ${course.teacherName}`} </div>)
                            : null
                        ) : null
                    }</td>
                    <td className={styles.td}>{
                        fridayPrograms ? 
                        fridayPrograms.map((course) => 
                            course.startHour / 3600 >= 16 && course.endHour / 3600 <= 19 ?
                                (<div> {`${course.subjectCode} (${course.roomName}) ${course.teacherName}`} </div>)
                            : null
                        ) : null
                    }</td>
                    <td className={styles.td}>{
                        saturdayPrograms ? 
                        saturdayPrograms.map((course) => 
                            course.startHour / 3600 >= 16 && course.endHour / 3600 <= 19 ?
                                (<div> {`${course.subjectCode} (${course.roomName}) ${course.teacherName}`} </div>)
                            : null
                        ) : null
                    }</td>
                    <td className={styles.td}>{
                        sundayPrograms ? 
                        sundayPrograms.map((course) => 
                            course.startHour / 3600 >= 16 && course.endHour / 3600 <= 19 ?
                                (<div> {`${course.subjectCode} (${course.roomName}) ${course.teacherName}`} </div>)
                            : null
                        ) : null
                    }</td>
                </tr>
           </tbody>
        </table>
    </div>
  )
}

export default TableItem