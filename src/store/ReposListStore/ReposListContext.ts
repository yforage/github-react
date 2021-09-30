import { createContext, useContext } from "react";

import ReposListStore from "./ReposListStore";

type ReposListContextProps = {
  store: null | ReposListStore;
};

const ReposListContext = createContext<ReposListContextProps>({
  store: null,
});

const Provider = ReposListContext.Provider;

const useReposListContext = () => useContext(ReposListContext);

export { Provider, useReposListContext };
