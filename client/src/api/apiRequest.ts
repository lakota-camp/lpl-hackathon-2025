/**
 * Handles HTTP API requests (GET, POST, PUT, DELETE) with standardized error handling and JSON parsing.
 * Supports URL parameters for GET requests and JSON payloads for POST/PUT operations.
 */

export default class ApiRequest {
  // FIXME: Create constructor to pass in the base URL for API class initialization
  async getRequest(url: string, params?: Record<string, string>) {
    if (params) {
      const urlParams = new URLSearchParams(params);
      url += `?${urlParams}`;
    }
    console.log(url);

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async postRequest(url: string, data: unknown) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();

      return responseData;
    } catch (error) {
      console.error(error);
    }
  }

  async putRequest(url: string, data: unknown) {
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();

      return responseData;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteRequest(url: string) {
    try {
      const response = await fetch(url, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();

      return responseData;
    } catch (error) {
      console.error(error);
    }
  }
}
