import axiosService from "./axios.service";

class HttpService {
  getHeroesAll() {
    return axiosService.getMethod("heroes");
  }
  getHeroStats() {
    return axiosService.getMethod("heroStats");
  }
}

export default new HttpService();
