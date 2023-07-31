import HttpClient from "../HttpClient";
import storageForm from "@/storageForm";

const storageArea = storageForm("area");

export default new (class AddressApi extends HttpClient {
  constructor() {
    super();
    this.area = storageArea.get() || "";
  }

  async getCountry(value) {
    const data = await this.getData("/country", value);
    return data.map((el) => el.value);
  }

  async getArea(value) {
    const data = await this.getData("/address", value);
    return this.processSuggestions(
      data,
      (el) => el.data.region_type !== "г",
      "region_with_type"
    );
  }

  async getCity(value) {
    const query = this.area ? `${this.area} ${value}` : value;
    let data = await this.getData("/address", query);
    let field = "city_with_type";
    let validFunc = (el) => !!el.data.city_with_type;

    const village = data.find((el) => {
      return !!el.data.settlement;
    });

    if (village) {
      field = "settlement_with_type";
      validFunc = (el) => !!el.data.settlement;
    }

    return this.processSuggestions(data, validFunc, field);
  }

  async getStreet(value) {
    const query = this.area ? `${this.area} ${value}` : value;
    const data = await this.getData("/address", query);

    return this.processSuggestions(
      data,
      (el) => el.data.street_with_type,
      "street_with_type"
    );
  }

  async getData(path, query) {
    const data = await this.post(path, { query });
    if (!Array.isArray(data?.suggestions)) return [];
    return data.suggestions;
  }

  processSuggestions(suggestions, filterFunc, field) {
    const arResult = new Set([]);

    if (suggestions.length === 0) return [];

    suggestions.forEach((el) => {
      if (filterFunc(el)) {
        arResult.add(el.data[field]);
      }
    });

    return Array.from(arResult);
  }
})();
