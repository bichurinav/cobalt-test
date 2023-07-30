import HttpClient from "../HttpClient";

export default new (class AddressApi extends HttpClient {
  constructor() {
    super();
  }

  async getCountry(value) {
    const data = await this.post("/country", {
      query: value,
    });
    if (!Array.isArray(data?.suggestions)) return [];
    return data.suggestions.map((el) => el.value);
  }

  async getArea(value) {
    const data = await this.post("/address", {
      query: value,
    });

    if (!Array.isArray(data?.suggestions)) return [];

    return this.processSuggestions(
      data.suggestions,
      (el) => el.data.region_type !== "г",
      "region_with_type"
    );
  }

  async getCity(value) {
    const data = await this.post("/address", {
      query: value,
    });

    if (!Array.isArray(data?.suggestions)) return [];

    return this.processSuggestions(
      data.suggestions,
      (el) => el.data.city_with_type,
      "city_with_type"
    );
  }

  async getStreet(value) {
    const data = await this.post("/address", {
      query: value,
    });

    if (!Array.isArray(data?.suggestions)) return [];

    return this.processSuggestions(
      data.suggestions,
      (el) => el.data.street_with_type,
      "street_with_type"
    );
  }

  processSuggestions(suggestions, filterFunc, field) {
    const arResult = new Set([]);

    suggestions.forEach((el) => {
      if (filterFunc(el)) {
        arResult.add(el.data[field]);
      }
    });

    return Array.from(arResult);
  }
})();
