import { createContext, useContext } from "react";

import Button from "@components/Button";
import ErrorMessage from "@components/ErrorMessage";
import Input from "@components/Input";
import LoadSpin from "@components/LoadSpin";
import RepoDetailsDrawer from "@components/RepoDetailsDrawer";
import ReposList from "@components/ReposList/ReposList";
import SearchIcon from "@components/SearchIcon";
import routes from "@config/routes";
import ReposListStore from "@store/ReposListStore";
import { useQueryStoreSetInitialQuery } from "@store/RootStore/hooks/useQueryStoreInit";
import { Meta } from "@utils/meta";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import InfiniteScroll from "react-infinite-scroll-component";
import { Route } from "react-router-dom";

import styles from "./ReposSearchPage.module.scss";

type ReposListContextProps = {
  store: null | ReposListStore;
};

const ReposListContext = createContext<ReposListContextProps>({
  store: null,
});

const Provider = ReposListContext.Provider;

const useReposListContext = () => useContext(ReposListContext);

const SearchPage = () => {
  const reposListStore = useLocalStore(() => new ReposListStore());

  useQueryStoreSetInitialQuery();

  return (
    <Provider
      value={{
        store: reposListStore,
      }}
    >
      <div className={styles.repoList}>
        <div className={styles.repoSearch}>
          <Input
            value={reposListStore.input}
            placeholder="Введите название организации"
            onChange={reposListStore.handleInputChange}
          />
          <Button
            onClick={reposListStore.getNewReposListPart}
            disabled={reposListStore.meta === Meta.loading}
          >
            <SearchIcon />
          </Button>
        </div>
        <InfiniteScroll
          dataLength={reposListStore.list.length}
          next={reposListStore.getReposListPart}
          hasMore={true}
          loader={reposListStore.meta === Meta.loading && <LoadSpin />}
          scrollThreshold={0.9}
        >
          <ReposList />
          {reposListStore.meta === Meta.error && (
            <ErrorMessage message="Не нашли такую организацию на GitHub" />
          )}
        </InfiniteScroll>
      </div>
      <Route exact path={routes.repoInfo.mask} component={RepoDetailsDrawer} />
    </Provider>
  );
};

const ReposSearchPage = observer(SearchPage);

export { useReposListContext, ReposSearchPage };
