import Subject from './subject'
import Teacher from './teacher'
import Room from './room'
import Semester from './semester'
import Class from './class'

class Program {
  subject
  targetClass
  teacher
  room
  semester
  day

  constructor (data) {
    this.initialization(data)
  }

  initialization (data) {
    // extraction data
    const {
      subject,
      targetClass,
      teacher,
      room,
      semester,
      day
    } = data

    this.subject = new Subject(subject)
    this.targetClass = new Class(targetClass)
    this.teacher = new Teacher(teacher)
    this.room = new Room(room)
    this.semester = new Semester(semester)
    this.day = day
  }

  // Getters
  get getSubject () {
    return this.subject
  }

  get getClass () {
    return this.targetClass
  }

  get getTeacher () {
    return this.teacher
  }

  get getRoom () {
    return this.Semester
  }

  get getSemester () {
    return this.semester
  }

  get getDay () {
    return this.day
  }
}

export default Program