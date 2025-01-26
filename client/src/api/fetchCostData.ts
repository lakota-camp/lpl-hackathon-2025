// https://h1nxp4mrbd.execute-api.us-west-2.amazonaws.com

import ApiRequest from "./apiRequest";
// import { transformUSData, transformStateData } from "../utils/transformData";

const apiRequest = new ApiRequest();

export default class UsageData {
  baseUrl: string;

  constructor() {
    this.baseUrl =
      "https://h1nxp4mrbd.execute-api.us-west-2.amazonaws.com/costs";
  }

  fetchCostData = async () => {
    try {
      const response = await apiRequest.getRequest(this.baseUrl);
      console.log("API State Data from fetchMockData:", response);
      if (!response) {
        throw new Error("No data available");
      }
      return response;
    } catch (error) {
      console.error("Error fetching state data:", error);
      throw error;
    }
  };
}
