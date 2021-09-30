import { useEffect } from "react";

import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";

import rootStore from "../instance";

export const useQueryStoreInit = (): void => {
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    rootStore.query.syncQueryParams();
  }, [location.search]);

  rootStore.query.setHistory(history, location);
};
