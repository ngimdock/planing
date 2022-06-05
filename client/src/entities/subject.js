import generateColor from "../utils/generateColor";
import Speciality from "./speciality";

class Subject {
  code;
  description;
  speciality;
  color;

  constructor(data) {
    this.initialization(data);
  }

  initialization(data) {
    const { code, description, speciality } = data;

    if (code && description) {
      this.code = code;
      this.description = description;
      this.color = generateColor();

      if (speciality) this.speciality = new Speciality(speciality);
      else this.speciality = null;
    }
  }

  // Getters
  get getCode() {
    return this.code;
  }

  get getDescription() {
    return this.description;
  }

  get getColor() {
    return this.color;
  }
}

export default Subject;
