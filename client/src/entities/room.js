import generateColor from "../utils/generateColor";

class Room {
  id;
  name;
  capacity;
  color;

  constructor(data) {
    this.initialization(data);
  }

  initialization(data) {
    const { id, name, capacity } = data;

    if (id && name && capacity) {
      this.id = id;
      this.name = name;
      this.capacity = capacity;
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

  get getCapacity() {
    return this.capacity;
  }

  get getColor() {
    return this.color;
  }
}

export default Room;
