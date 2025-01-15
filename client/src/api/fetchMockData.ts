import ApiRequest from "./apiRequest";
import { transformUSData, transformStateData } from "../utils/transformData";

const apiRequest = new ApiRequest();

export default class MockUSData {
  baseUrl: string;

  constructor() {
    this.baseUrl = "https://datausa.io/api/data";
  }

  fetchStateData = async () => {
    try {
      const response = await apiRequest.getRequest(this.baseUrl, {
        drilldowns: "State",
        measures: "Population",
        year: "latest",
      });
      console.log("API State Data from fetchMockData:", response);
      if (!response) {
        throw new Error("No data available");
      }
      return transformStateData(response);
    } catch (error) {
      console.error("Error fetching state data:", error);
      throw error;
    }
  };

  fetchUSData = async () => {
    try {
      const response = await apiRequest.getRequest(this.baseUrl, {
        drilldowns: "Nation",
        measures: "Population",
      });
      console.log("API US Data from fetchMockData:", response);
      if (!response) {
        throw new Error("No data available");
      }
      return transformUSData(response);
    } catch (error) {
      console.error("Error fetching US data:", error);
      throw error;
    }
  };
}
