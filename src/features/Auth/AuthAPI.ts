import { LoginTypes } from "../../utils/types/Auth/LoginTypes";

export const EMAIL = "solarvis@gmail.com";
export const PASSWORD = "solarvis123456";

export const loginApi = (data: LoginTypes) => {
  const { email, password } = data;

  return new Promise((resolve, reject) => {
    if (email === EMAIL && password === PASSWORD) {
      resolve(email);
    } else {
      reject("Missing email or password");
    }
  });
};

export const userVerify = () => {
  const loggedIn = localStorage.getItem("loggedIn");

  return new Promise((resolve, reject) => {
    if (loggedIn && Boolean(loggedIn) === true) {
      const user = localStorage.getItem("user");

      if (!user) {
        reject("Please, login again!");
      } else {
        resolve(user);
      }
    } else {
      reject();
    }
  });
};
