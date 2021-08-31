import React from "react";

import { Drawer } from "antd";
import { BranchesItem, RepoItem } from "src/store/GitHubStore/types";

import GitHubStore from "../../store/GitHubStore";

type RepoBranchesDrawerProps = {
  selectedRepo: RepoItem | null;
  onClose: () => void;
};

const RepoBranchesDrawer: React.FC<RepoBranchesDrawerProps> = ({
  selectedRepo,
  onClose,
}) => {
  const [branchesList, setBranchesList] = React.useState<BranchesItem[] | null>(
    null
  );
  const handleChange = (list: BranchesItem[] | null) => setBranchesList(list);
  React.useEffect(() => {
    if (!selectedRepo) return;
    const api = new GitHubStore();
    api
      .getRepoBranches({
        owner: selectedRepo.owner.login,
        repo: selectedRepo.name,
      })
      .then((response) => {
        if (response.success) {
          handleChange(response.data);
        }
      });
  }, [selectedRepo]);
  return (
    <Drawer
      title="Branches"
      placement="right"
      onClose={() => {
        handleChange(null);
        onClose();
      }}
      visible={selectedRepo ? true : false}
      closable={true}
    >
      {branchesList?.map((branch) => (
        <div key={branch.name} className="git-repo-branch">
          <a
            className="git-repo-branch__link"
            href={`https://github.com/${selectedRepo?.owner.login}/${selectedRepo?.name}/tree/${branch.name}`}
            target="_blank"
            rel="noreferrer"
          >
            {branch.name}
          </a>
        </div>
      ))}
    </Drawer>
  );
};

export default RepoBranchesDrawer;
