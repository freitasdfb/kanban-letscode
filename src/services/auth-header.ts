export default function authHeader() {
    const token = localStorage.getItem("token");
 
    if (token) {
      return { 'Authorization': 'Bearer ' + token }; // Authorization padrão
      // return { 'x-access-token': token }; // Para backend em node 
    } else {
      return {};
    }
  }
  