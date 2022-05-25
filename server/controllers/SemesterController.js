import AcademicYearModel from "../models/AcademicYearModel.js"
import SemesterModel from "../models/SemesterModel.js"

class SemesterController {
  static async findAll (req, res) {
    const { data, error } = await SemesterModel.findAll()

    if (data) {
      const academicYear = []

      for (let acaY of data) {
        // Chech if academic year already exist
        const index = academicYear.findIndex(elt => Number(elt.idAnneeAca) === Number(acaY.idAnneeAca))
        const semester = {
          idSemestre: acaY.idSemestre,
          valSemestre: acaY.valSemestre
        }

        console.log({ academicYear, acaY })

        if (index > -1) {
          academicYear[index].semestres.push(semester)
        } else {
          const newAcaY = {
            idAnneeAca: acaY.idAnneeAca,
            valAnneeAca: acaY.valAnneeAca,
            semestres: [ semester ]
          }

          academicYear.push(newAcaY)
        }
      }

      return res.json({ data: academicYear })
    }

    return res.status(500).json({ error })
  }

  static async create (req, res) {
    // Get data from request body
    const {
      academicYear
    } = req.body

    if (academicYear) {
      // Create academic year first
      const { data: acaY, error: acaYErr } = await AcademicYearModel.create(academicYear)

      if (acaY) {
        // Create semester 
        let isOk = true

        const semesters = []

        for (let semester = 1; semester <= 2; semester++) {
          const { data: semesterData, error } = await SemesterModel.create({ 
            semester,
            idAcademicYear: acaY.id
          })

          if (error) {
            isOk = false
            break
          }

          semesters.push({ ...semesterData, value: semester })
        }
  
        if (isOk) {
          return res.status(201).json({ data: { academicYear: {...acaY, value: academicYear}, semesters } })
        }
  
        return res.status(500).json({ error })
      } else {
        return res.status(500).json({ error: acaYErr })
      }
    } else {
      res.status(400).json({ error: "Provide an academic year" })
    }
  }

  static async update (req, res) {
    // Get data from request body
    const {
      idSemester,
      newValSemester
    } = req.body

    if (idSemester && newValSemester) {
      // Update semester
      const { data, error } = await SemesterModel.update(req.body)

      if (data) {
        return res.status(200).json({ data })        
      }

      return res.status(500).json({ error })
    } else {
      res.status(400).json({ error: "Provide all the required data" })
    }
  }
}

export default SemesterController