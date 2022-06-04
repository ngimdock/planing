import generateColor from "../utils/generateColor";

class Level {
  id;
  name;
  color;

  constructor(data) {
    this.initialization(data);
  }

  initialization(data) {
    const { id, name } = data;

    if (id && name) {
      this.id = id;
      this.name = name;
      this.color = generateColor();
    }
  }

  // Getters
  get getId() {
    return this.id;
  }

  get getName() {
    return this.name;
  }

  get getColor() {
    return this.color;
  }
}

export default Level;
