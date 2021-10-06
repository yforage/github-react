import React from "react";
import { useCallback, useEffect } from "react";

import { Drawer } from "antd";
import ErrorMessage from "components/ErrorMessage";
import LoadSpin from "components/LoadSpin";
import { observer } from "mobx-react-lite";
import { useParams, useHistory } from "react-router-dom";
import RepoItemStore from "store/RepoItemStore";
import { Meta } from "utils/meta";
import { useLocalStore } from "utils/useLocalStore";

import Branches from "./components/Branches";
import RepoInfo from "./components/RepoInfo";

type ParamsProps = {
  owner: string;
  name: string;
};

const RepoDetailsDrawer: React.FC = () => {
  const { owner, name } = useParams<ParamsProps>();

  const repoItemStore = useLocalStore(() => new RepoItemStore());

  const history = useHistory();

  const onClose = useCallback(() => {
    repoItemStore.toggleDrawerState();
    setTimeout(() => history.goBack(), 100);
  }, [history, repoItemStore]);

  useEffect(() => {
    if (!(owner && name)) return;
    repoItemStore.getRepoInfo({
      owner,
      name,
    });
    repoItemStore.toggleDrawerState();
  }, [owner, name, repoItemStore]);

  return (
    <Drawer
      title="More about"
      placement="right"
      onClose={onClose}
      visible={repoItemStore.drawerState}
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
