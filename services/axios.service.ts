import axios from "axios";
class axiosService {
  axios!: any;
  axiosConfig!: any;
  constructor(url: string, headersConfig: any) {
    this.axios = axios.create({
      baseURL: url,
      headers: headersConfig,
    });
  }
  addConfig(config: any) {
    this.axiosConfig = {
      ...config,
    };
  }
  getMethod(uri: string) {
    return this.axios.get(uri);
  }
  postMethod(uri: string, data: any) {
    // console.log(111);
    // console.log(this.axios?.post(uri, data));
    // console.log(222);
    return this.axios.post(uri, data);
  }
  deleteMethod(uri: string) {
    return this.axios.delete(uri);
  }
  puttMethod(uri: string, data: any) {
    return this.axios.put(uri, data);
  }
}

export default axiosService;
