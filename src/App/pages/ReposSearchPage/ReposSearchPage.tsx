import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

import Button from "@components/Button";
import Input from "@components/Input";
import LoadSpin from "@components/LoadSpin";
import RepoBranchesDrawer from "@components/RepoBranchesDrawer";
import ReposList from "@components/ReposList/ReposList";
import SearchIcon from "@components/SearchIcon";
import routes from "@config/routes";
import GitHubStore from "@store/GitHubStore/GitHubStore";
import InfiniteScroll from "react-infinite-scroll-component";
import { Route } from "react-router-dom";
import { RepoItem } from "src/store/GitHubStore/types";

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
  const [page, setPage] = useState<number>(1);

  const handleIncPage = () => setPage((prev) => prev + 1);
  const handleInputChange = useCallback((e) => {
    setInputValue(e.target.value);
  }, []);

  const handleLoading = () => setIsLoading((prev) => !prev);
  const handleExtendReposList = (repos: RepoItem[]) =>
    setReposList((prev) => [...prev, ...repos]);
  const handleNewReposList = (repos: RepoItem[]) => setReposList(repos);

  const api = useRef(new GitHubStore());

  const getOrganizationRepos = (
    orgName: string,
    per_page?: number,
    page?: number,
    newList?: boolean
  ) => {
    if (!orgName) return;
    handleLoading();
    (async () => {
      const response = await api.current.getRepoList({
        orgName,
        per_page,
        page,
      });
      const data = response.success ? response.data : [];
      if (newList) {
        handleNewReposList(data);
      } else {
        handleExtendReposList(data);
      }
      handleLoading();
    })();
    if (page) handleIncPage();
  };

  const getReposListPart = () => getOrganizationRepos(inputValue, 6, page);
  const getNewReposListPart = () => {
    setPage(1);
    getOrganizationRepos(inputValue, 6, 1, true);
  };

  return (
    <Provider
      value={{
        list: reposList,
        isLoading: isLoading,
        load: getReposListPart,
      }}
    >
      <div className={styles.repoList}>
        <div className={styles.repoSearch}>
          <Input
            value={inputValue}
            placeholder="Введите название организации"
            onChange={handleInputChange}
          />
          <Button onClick={getNewReposListPart} disabled={isLoading}>
            <SearchIcon />
          </Button>
        </div>
        <InfiniteScroll
          dataLength={reposList.length}
          next={getReposListPart}
          hasMore={true}
          loader={isLoading && <LoadSpin />}
          scrollThreshold={1}
        >
          <ReposList />
        </InfiniteScroll>
      </div>
      <Route exact path={routes.repoInfo.mask} component={RepoBranchesDrawer} />
    </Provider>
  );
};

export { useReposContext, ReposSearchPage };
