import React from "react";

import { Drawer } from "antd";
import { BranchesItem, RepoItem } from "src/store/GitHubStore/types";

import GitHubStore from "../../store/GitHubStore";
import BranchItem from "./components";

type RepoBranchesDrawerProps = {
  selectedRepo: RepoItem | null;
  onClose: (repoId: number) => void;
};

const RepoBranchesDrawer: React.FC<RepoBranchesDrawerProps> = ({
  selectedRepo,
  onClose,
}) => {
  const [branchesList, setBranchesList] = React.useState<BranchesItem[]>([]);
  const handleChange = (list: BranchesItem[]) => setBranchesList(list);
  React.useEffect(() => {
    if (!selectedRepo) return;
    const api = new GitHubStore();
    (async () => {
      const response = await api.getRepoBranches({
        owner: selectedRepo.owner.login,
        repo: selectedRepo.name,
      });
      handleChange(response.success ? response.data : []);
    })();
  }, [selectedRepo]);
  return (
    <Drawer
      title="Branches"
      placement="right"
      onClose={() => {
        handleChange([]);
        onClose(0);
      }}
      visible={selectedRepo ? true : false}
      closable={true}
    >
      {branchesList.map((branch) => {
        const href = `https://github.com/${selectedRepo?.owner.login}/${selectedRepo?.name}/tree/${branch.name}`;
        return <BranchItem key={branch.name} name={branch.name} href={href} />;
      })}
    </Drawer>
  );
};

export default RepoBranchesDrawer;
