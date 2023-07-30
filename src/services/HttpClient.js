class HttpClient {
  constructor(baseUrl = "", token = "") {
    this.baseUrl =
      baseUrl || "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest";
    this.token = token || import.meta.env.VITE_TOKEN;
    this.headers = {
      "Content-Type": "application/json",
    };
    this.initToken();
  }

  initToken() {
    if (this.token) {
      this.headers.Authorization = "Token " + this.token;
    }
  }

  async get(url) {
    return this._request(url);
  }

  async post(url, body) {
    return this._request(url, "POST", body);
  }

  async _request(url, method = "GET", body = null) {
    try {
      const response = await fetch(this.baseUrl + url, {
        method,
        headers: this.headers,
        body: body ? JSON.stringify(body) : null,
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("API request error:", error);
      throw error;
    }
  }
}

export default HttpClient;
