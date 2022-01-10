import axios from "axios";

const API_URL = "http://localhost:5000/login";

export const auth = async (login: string, senha: string) => {

  return await axios.post(API_URL, {
    login,
    senha,
  }).then((response) => {
    // Removi as aspas para facilitar na aplicação no header
    if (response.data) {
      localStorage.setItem("token", response.data.replace(/^"(.*)"$/, '$1'));
    }
    return response.data;
  });
};

export const logout = () => {
  localStorage.removeItem("token");
};

