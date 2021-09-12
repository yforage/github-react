import { useEffect, useState } from "react";

import LoadSpin from "@components/LoadSpin";
import { Drawer } from "antd";
import { useParams, useHistory } from "react-router-dom";
import { RepoInfoItem } from "src/store/GitHubStore/types";

import GitHubStore from "../../store/GitHubStore";
import Branches from "./components/Branches";
import RepoInfo from "./components/RepoInfo";

type ParamsProps = {
  owner: string;
  name: string;
};

const RepoBranchesDrawer: React.FC = () => {
  const { owner, name } = useParams<ParamsProps>();

  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen((prev) => !prev);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const handleLoading = () => setIsLoading(false);

  const [repoInfo, setRepoInfo] = useState<RepoInfoItem | null>(null);
  const handleRepoInfo = (repo: RepoInfoItem | null) => setRepoInfo(repo);

  const history = useHistory();

  useEffect(() => {
    if (!(owner && name)) return;
    const api = new GitHubStore();
    (async () => {
      const response = await api.getRepoInfo({
        owner,
        name,
      });
      handleRepoInfo(response.success ? response.data : null);
      handleLoading();
    })();
    handleOpen();
  }, [owner, name]);
  return (
    <Drawer
      title="More about"
      placement="right"
      onClose={() => {
        handleOpen();
        setTimeout(() => {
          handleRepoInfo(null);
          history.push("/repos");
        }, 100);
      }}
      visible={isOpen}
      closable={true}
    >
      {isLoading && <LoadSpin />}
      {!isLoading && <RepoInfo repo={repoInfo} />}
      {!isLoading && <Branches repo={repoInfo} />}
    </Drawer>
  );
};

export default RepoBranchesDrawer;
