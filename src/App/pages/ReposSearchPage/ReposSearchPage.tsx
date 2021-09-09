import React, { useCallback } from "react";

import Button from "@components/Button";
import Input from "@components/Input";
import RepoBranchesDrawer from "@components/RepoBranchesDrawer";
import RepoTile from "@components/RepoTile";
import SearchIcon from "@components/SearchIcon";
import "./ReposSearchPage.css";
import { RepoItem } from "src/store/GitHubStore/types";

import GitHubStore from "../../../store/GitHubStore/GitHubStore";

const ReposSearchPage = () => {
  const [inputValue, setInputValue] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [reposList, updateReposList] = React.useState<RepoItem[]>([]);
  const [clickedRepoId, setClickedRepoId] = React.useState<number>(0);

  const handleInputChange = useCallback((e) => {
    setInputValue(e.target.value);
  }, []);
  const handleLoading = () => setIsLoading((prev) => !prev);
  const handleReposList = (repos: RepoItem[]) => updateReposList(repos);
  const selectRepo = (repoId: number) => setClickedRepoId(repoId);

  const searchOrganization = async (orgName: string) => {
    if (!orgName) return;
    handleLoading();
    const api = new GitHubStore();
    const response = await api.getRepoList({ orgName });
    handleReposList(response.success ? response.data : []);
    handleLoading();
  };
  return (
    <div className="git-repo-list">
      <div className="git-repo-search">
        <Input
          value={inputValue}
          placeholder="Введите название организации"
          onChange={handleInputChange}
        />
        <Button
          onClick={() => searchOrganization(inputValue)}
          disabled={isLoading}
        >
          <SearchIcon />
        </Button>
      </div>
      {reposList.map((repoItem) => {
        return (
          <RepoTile key={repoItem.id} item={repoItem} onClick={selectRepo} />
        );
      })}
      <RepoBranchesDrawer
        selectedRepo={
          reposList[reposList.findIndex((item) => item.id === clickedRepoId)]
        }
        onClose={selectRepo}
      />
    </div>
  );
};

export default ReposSearchPage;
