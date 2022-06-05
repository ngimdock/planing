import generateColor from "../utils/generateColor";

class Teacher {
  matricule;
  name;
  sex;
  color;

  constructor(data) {
    this.initialization(data);
  }

  initialization(data) {
    const { matricule, name, sex } = data;

    if (matricule && name && sex) {
      this.matricule = matricule;
      this.name = name;
      this.sex = sex;
      this.color = generateColor();
    }
  }

  // Getters
  get getMatricule() {
    return this.matricule;
  }

  get getName() {
    return this.name;
  }

  get getSex() {
    return this.sex;
  }

  get getColor() {
    return this.color;
  }
}

export default Teacher;
