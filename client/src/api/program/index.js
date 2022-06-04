import axiosInstance from "../config";
import DefaultApiCall from "../config/defaultApi";

class ProgramAPI extends DefaultApiCall {
  static async getAll(data) {
    const instance = this.insertToken(axiosInstance);

    const { idYear, idSemester } = data;

    if (!idYear || !idSemester)
      return { error: "Provide all the required params" };

    try {
      const { data } = await instance.get(
        `/planified/${idYear}/${idSemester}`
      );

      if (data) return data;
    } catch (err) {
      console.log(err);

      return { error: "An error occured" };
    }
  }

  static async getByClass(data) {
    const instance = this.insertToken(axiosInstance);

    const { idYear, idSemester, codeClass } = data;

    if (idYear && idSemester && codeClass) {
      try {
        const { data: res } = await instance.get(
          `/planified/classe/${idYear}/${idSemester}/${codeClass}`
        );

        return res;
      } catch (err) {
        console.log(err);

        return { error: "An error occured" };
      }
    }

    return { error: "Provide all the required params" };
  }

  static async getByTeacher(data) {
    const instance = this.insertToken(axiosInstance);

    const { idYear, idSemester, matriculeTeacher } = data;

    if (!idYear || !idSemester || !matriculeTeacher)
      return { error: "Provide all the required params" };

    try {
      const { data } = await instance.get(
        `/planified/teacher/${idYear}/${idSemester}/${matriculeTeacher}`
      );

      if (data) return data;
    } catch (err) {
      console.log(err);
      return { error: "An error occured" };
    }
  }

  static async getByRoom(data) {
    const instance = this.insertToken(axiosInstance);

    const { idYear, idSemester, idSalle } = data;

    if (!idYear || !idSemester || !idSalle)
      return { error: "Provide all the required params" };

    try {
      const { data } = await instance.get(
        `/planified/room/${idYear}/${idSemester}/${idSalle}`
      );

      if (data) return data;
    } catch (err) {
      console.log(err);
      return { error: "An error occured" };
    }
  }

  static async getFaculty(data) {
    const instance = this.insertToken(axiosInstance);

    const { idYear, idSemester, idFaculty } = data;

    if (!idYear || !idSemester || !idFaculty)
      return { error: "Provide all the required params" };

    try {
      const { data } = await instance.get(
        `/planified/filiere/${idYear}/${idSemester}/${idFaculty}`
      );

      if (data) return data;
    } catch (err) {
      console.log(err);

      return { error: "An error occured" };
    }
  }

  static async create(payload) {
    const instance = this.insertToken(axiosInstance);

    return new Promise(async (resolve, reject) => {
      try {
        const { data, error } = await instance.post(
          "/planified/create",
          payload
        );

        if (data) {
          resolve(data);
        } else {
          reject({ error });
        }
      } catch (err) {
        console.log(err);

        reject({ error: "An error occured" });
      }
    });
  }

  static async delete(payload) {
    const instance = this.insertToken(axiosInstance);

    return new Promise(async (resolve, reject) => {
      try {
        const {
          codeCours,
          idSalle,
          idJour,
          matriculeEns,
          idSemestre,
          heureDebut,
          idGroupe,
        } = payload;

        const url = `planified/delete/?codeCours=${codeCours}&idSalle=${idSalle}&idJour=${idJour}&matriculeEns=${matriculeEns}&idSemestre=${idSemestre}&heureDebut=${heureDebut}&idGroupe=${idGroupe}`;
        const { data, error } = await instance.delete(url, payload);

        if (data) {
          resolve(data);
        } else {
          reject({ error });
        }
      } catch (err) {
        console.log(err);

        reject({ error: "An error occured" });
      }
    });
  }
}

export default ProgramAPI;
