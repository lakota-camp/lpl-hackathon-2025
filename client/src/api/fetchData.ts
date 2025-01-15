import ApiRequest from "./apiRequest";

export default class FetchData {
  private apiRequest: ApiRequest;

  constructor() {
    this.apiRequest = new ApiRequest();
  }

  async fetchData(url: string, params?: Record<string, string>) {
    return await this.apiRequest.getRequest(url, params);
  }

  async postData(url: string, data: unknown) {
    return await this.apiRequest.postRequest(url, data);
  }

  async updateData(url: string, data: unknown) {
    return await this.apiRequest.putRequest(url, data);
  }

  async deleteData(url: string) {
    return await this.apiRequest.deleteRequest(url);
  }
}
