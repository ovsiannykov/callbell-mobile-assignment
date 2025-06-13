export class ApiClient {
  static instance = null;
  baseUrl = process.env.CALLBELL_API_URL;
  apiKey = process.env.CALLBELL_API_KEY;

  static getInstance() {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;

    const defaultHeaders = {
      Authorization: `Bearer ${this.apiKey}`,
      Accept: "application/json",
    };

    const headers = {
      ...defaultHeaders,
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    const contentType = response.headers.get("content-type");
    let responseBody;

    if (contentType && contentType.includes("application/json")) {
      responseBody = await response.json();
    } else {
      responseBody = await response.text();
    }

    if (!response.ok) {
      const error = new Error("API request failed");
      error.status = response.status;
      error.body = responseBody;
      throw error;
    }

    return responseBody;
  }

  async get(endpoint) {
    return this.request(endpoint, { method: "GET" });
  }

  async post(endpoint, data) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async put(endpoint, data) {
    return this.request(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async patch(endpoint, data) {
    return this.request(endpoint, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
