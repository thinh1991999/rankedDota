import axios from "axios";
class axiosService {
  axios!: any;
  axiosConfig!: any;
  constructor() {
    this.axios = axios.create({
      baseURL: this.getBaseUrl(),
      headers: this.getHeadersConfig(),
    });
  }

  getBaseUrl(): string {
    return "https://api.opendota.com/api";
  }

  getHeadersConfig(): any {
    return {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "text/plain",
    };
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
    return this.axios.post(uri, data);
  }
  deleteMethod(uri: string) {
    return this.axios.delete(uri);
  }
  puttMethod(uri: string, data: any) {
    return this.axios.put(uri, data);
  }
}

export default new axiosService();
