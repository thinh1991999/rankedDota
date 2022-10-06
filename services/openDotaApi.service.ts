import axios, { AxiosRequestConfig } from "axios";
class openDotaApiService {
  axiosConfig!: AxiosRequestConfig;
  axios = axios.create({
    baseURL: "https://api.opendota.com/api",
  });

  // Teams
  getTeams(page: number) {
    this.axiosConfig = {
      params: {
        page,
      },
    };
    return this.axios.get("/teams", this.axiosConfig);
  }
  // Compos
  getComposMatch(params: URLSearchParams) {
    this.axiosConfig = {
      params,
    };
    return this.axios.get("/findMatches", this.axiosConfig);
  }
}

export default new openDotaApiService();
