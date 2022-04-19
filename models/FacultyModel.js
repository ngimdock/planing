
class FacultyModel {

	async createFaculty () {
		const query = `SELECT * FROM Filiere`

		const result = await db.run(query)

		return result
	}
}

export default FacultyModel