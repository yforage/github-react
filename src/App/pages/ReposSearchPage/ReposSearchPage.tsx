import { createContext, useCallback, useContext, useState } from "react";

import Button from "@components/Button";
import Input from "@components/Input";
import LoadSpin from "@components/LoadSpin";
import RepoBranchesDrawer from "@components/RepoBranchesDrawer";
import RepoTile from "@components/RepoTile";
import SearchIcon from "@components/SearchIcon";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link, Route } from "react-router-dom";
import { RepoItem } from "src/store/GitHubStore/types";

import GitHubStore from "../../../store/GitHubStore/GitHubStore";
import styles from "./ReposSearchPage.module.scss";

type ReposContextProps = {
  list: RepoItem[];
  isLoading: boolean;
  load: () => void;
};

const ReposContext = createContext<ReposContextProps>({
  list: [],
  isLoading: false,
  load: () => {},
});

const Provider = ReposContext.Provider;

const useReposContext = () => useContext(ReposContext);

const ReposSearchPage = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [reposList, setReposList] = useState<RepoItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, incPage] = useState<number>(1);

  const handleIncPage = () => incPage((prev) => prev + 1);
  const handleInputChange = useCallback((e) => {
    setInputValue(e.target.value);
  }, []);

  const handleLoading = () => setIsLoading((prev) => !prev);
  const handleReposList = (repos: RepoItem[]) =>
    setReposList((prev) => [...prev, ...repos]);

  const getOrganizationRepos = (
    orgName: string,
    per_page?: number,
    page?: number
  ) => {
    if (!orgName) return;
    handleLoading();
    (async () => {
      const api = new GitHubStore();
      const response = await api.getRepoList({ orgName, per_page, page });
      handleReposList(response.success ? response.data : []);
      handleLoading();
    })();
    if (page) handleIncPage();
  };
  return (
    <Provider
      value={{
        list: reposList,
        isLoading: isLoading,
        load: handleLoading,
      }}
    >
      <div className={styles.repoList}>
        <div className={styles.repoSearch}>
          <Input
            value={inputValue}
            placeholder="Введите название организации"
            onChange={handleInputChange}
          />
          <Button
            onClick={() => getOrganizationRepos(inputValue, 6, page)}
            disabled={isLoading}
          >
            <SearchIcon />
          </Button>
        </div>
        <InfiniteScroll
          className={styles.scroll}
          dataLength={reposList.length}
          next={() => getOrganizationRepos(inputValue, 6, page)}
          hasMore={true}
          loader={isLoading && <LoadSpin />}
          scrollThreshold={1}
        >
          {reposList.map((repoItem) => {
            return (
              <Link
                to={`/repos/${repoItem.owner.login}/${repoItem.name}`}
                key={repoItem.id}
                className={styles.repoLink}
              >
                <RepoTile item={repoItem} />
              </Link>
            );
          })}
        </InfiniteScroll>
      </div>
      <Route exact path="/repos/:owner/:name" component={RepoBranchesDrawer} />
    </Provider>
  );
};

export { useReposContext, ReposSearchPage };
