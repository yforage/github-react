import React from "react";

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
  const [isLoading, setIsLoading] = React.useState(false);
  const [reposList, updateReposList] = React.useState<null | RepoItem[]>(null);
  const [clickedRepo, setClickedRepo] = React.useState<null | RepoItem>(null);

  const handleInputChange = (value: string) => setInputValue(value);
  const handleLoading = () => setIsLoading((prev) => (prev ? false : true));
  const handleReposList = (repos: RepoItem[] | null) => updateReposList(repos);
  const selectRepo = (repo: RepoItem | null) => setClickedRepo(repo);

  const searchOrganization = (orgName: string) => {
    if (!orgName) return;
    handleLoading();
    const api = new GitHubStore();
    api.getRepoList({ orgName }).then((response) => {
      if (response.success) {
        handleReposList(response.data);
      } else {
        handleReposList(null);
      }
      handleLoading();
    });
  };
  return (
    <div className="git-repo-list">
      <div className="git-repo-search">
        <Input
          value={inputValue}
          placeHolder="Введите название организации"
          onChange={(e) => handleInputChange(e.target.value)}
        />
        <Button
          onClick={() => searchOrganization(inputValue)}
          disabled={isLoading}
        >
          <SearchIcon />
        </Button>
      </div>
      {reposList?.map((repoItem) => {
        return (
          <RepoTile
            key={repoItem.id}
            item={repoItem}
            onClick={() => selectRepo(repoItem)}
          />
        );
      })}
      <RepoBranchesDrawer
        selectedRepo={clickedRepo}
        onClose={() => selectRepo(null)}
      />
    </div>
  );
};

export default ReposSearchPage;
