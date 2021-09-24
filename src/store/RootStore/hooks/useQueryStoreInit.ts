import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";

import rootStore from "../instance";

export const useQueryStoreInit = (): void => {
  const location = useLocation();
  const history = useHistory();
  rootStore.query.setHistory(history, location);
};

export const useQueryStoreSetInitialQuery = (): void => {
  setTimeout(() => rootStore.query.setInitialQueryToParam(), 100);
};
