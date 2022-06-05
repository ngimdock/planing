// Class Speciality

import generateColor from "../utils/generateColor";
import Group from "./group";

class Speciality {
  id;
  name;
  capacity;
  groups;
  color;

  constructor(data) {
    this.initialization(data);
  }

  initialization(data) {
    const { id, name, capacity, groups } = data;

    if (id && name) {
      this.id = id;
      this.name = name;
      this.capacity = capacity ? capacity : null;
      this.color = generateColor();

      if (groups && groups.length > 0) {
        this.groups = groups.map((group) => new Group(group));
      } else {
        this.groups = [];
      }
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

export default Speciality;
