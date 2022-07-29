import axios from "axios"

/* Создание экземпляра axios со свойством withCredentials, для которого задано значение true. */
const instance = axios.create({
  withCredentials: true,
})

export default instance
