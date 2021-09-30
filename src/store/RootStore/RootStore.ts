import ApiStore from "./ApiStore";
import QueryStore from "./QueryStore";

const BASE_GITHUB_URL = "https://api.github.com";

export default class RootStore {
  readonly api = new ApiStore(BASE_GITHUB_URL);
  readonly query = new QueryStore();
}
