import { useMemo } from "react";

import Button from "@components/Button";
import ErrorMessage from "@components/ErrorMessage";
import Input from "@components/Input";
import LoadSpin from "@components/LoadSpin";
import RepoDetailsDrawer from "@components/RepoDetailsDrawer";
import ReposList from "@components/ReposList/ReposList";
import SearchIcon from "@components/SearchIcon";
import routes from "@config/routes";
import ReposListStore from "@store/ReposListStore";
import { Provider } from "@store/ReposListStore/ReposListContext";
import { Meta } from "@utils/meta";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import InfiniteScroll from "react-infinite-scroll-component";
import { Route } from "react-router-dom";

import styles from "./ReposSearchPage.module.scss";

const ReposSearchPage = () => {
  const reposListStore = useLocalStore(() => new ReposListStore());

  const memoReposListStore = useMemo(
    () => ({
      store: reposListStore,
    }),
    [reposListStore]
  );

  return (
    <Provider value={memoReposListStore}>
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

export default observer(ReposSearchPage);
