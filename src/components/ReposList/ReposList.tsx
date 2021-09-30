import React from "react";

import RepoTile from "components/RepoTile";
import routes from "config/routes";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { useReposListContext } from "store/ReposListStore/ReposListContext";

import styles from "./ReposList.module.scss";

const ReposList: React.FC = () => {
  const reposContext = useReposListContext();
  if (reposContext.store === null) return null;
  return (
    <>
      {reposContext.store.list.map((repoItem) => {
        return (
          <Link
            to={routes.repoInfo.create(repoItem.owner.login, repoItem.name)}
            key={repoItem.id}
            className={styles.repoLink}
          >
            <RepoTile item={repoItem} />
          </Link>
        );
      })}
    </>
  );
};

export default observer(ReposList);
