import instance from "../config";
import axiosInstance from "../config";
import DefaultApiCall from "../config/defaultApi";

// Api call class
class AuthApi extends DefaultApiCall {
  /**
   * Login
   * @param {string} email
   * @param {string} password
   */
  static async login(email, password) {
    try {
      const { data, error } = await axiosInstance.post("/admin/signin", {
        email,
        password,
      });

      if (data) {
        return data;
      } else {
        return error;
      }
    } catch (err) {
      console.log(err);

      return { error: "An error occured" };
    }
  }

  static async getAll() {
    const instance = this.insertToken(axiosInstance);

    try {
      const { data, error } = await instance.get("/admin/all");

      return { data };
    } catch (err) {
      console.log(err);

      return { error: "An error occured" };
    }
  }

  static async addAdmin(credentials) {
    const instance = this.insertToken(axiosInstance);

    try {
      const { data, error } = await instance.post("/admin/create", credentials);

      if (data && data.data) {
        return { data: data.data };
      }

      return { error };
    } catch (err) {
      console.log(err);

      return { error: "An error occured" };
    }
  }

  /**
   * Get the current User
   */
  static async getCurrentUser() {
    const instance = AuthApi.insertToken(axiosInstance);

    try {
      const { data, error } = await instance.get("/admin/current");

      if (data) {
        return data;
      } else {
        return error;
      }
    } catch (err) {
      console.log(err);

      return { error: "An error occured" };
    }
  }

  static async verifyEmail(email) {
    const instance = AuthApi.insertToken(axiosInstance);

    try {
      const { data, error } = await instance.post("/admin/verify_email", {
        email,
      });

      if (data) {
        return data;
      }

      return error;
    } catch (err) {
      console.log(err);

      return { error: "An error occured" };
    }
  }
}

export default AuthApi;
