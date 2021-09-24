import { useEffect, useState } from "react";

import ErrorMessage from "@components/ErrorMessage";
import LoadSpin from "@components/LoadSpin";
import RepoItemStore from "@store/RepoItemStore";
import { Meta } from "@utils/meta";
import { useLocalStore } from "@utils/useLocalStore";
import { Drawer } from "antd";
import { observer } from "mobx-react-lite";
import { useParams, useHistory } from "react-router-dom";

import Branches from "./components/Branches";
import RepoInfo from "./components/RepoInfo";

type ParamsProps = {
  owner: string;
  name: string;
};

const RepoDetailsDrawer: React.FC = () => {
  const { owner, name } = useParams<ParamsProps>();

  const repoItemStore = useLocalStore(() => new RepoItemStore());

  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen((prev) => !prev);

  const history = useHistory();

  useEffect(() => {
    if (!(owner && name)) return;
    repoItemStore.getRepoInfo({
      owner,
      name,
    });
    handleOpen();
  }, [owner, name, repoItemStore]);
  return (
    <Drawer
      title="More about"
      placement="right"
      onClose={() => {
        handleOpen();
        setTimeout(() => {
          history.goBack();
        }, 100);
      }}
      visible={isOpen}
      closable={true}
    >
      {repoItemStore.meta === Meta.loading && <LoadSpin />}
      {repoItemStore.meta === Meta.error && <ErrorMessage />}
      {repoItemStore.meta === Meta.success && (
        <>
          <RepoInfo repo={repoItemStore.info} />
          <Branches repo={repoItemStore.info} />
        </>
      )}
    </Drawer>
  );
};

export default observer(RepoDetailsDrawer);
