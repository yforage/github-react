import React from "react";

import Avatar from "@components/Avatar";
import StarIcon from "@components/StarIcon";
import { RepoItem } from "@store/GitHubStore/types";
import prettyDate from "@utils/prettyDate";

import styles from "./RepoTile.module.scss";

type RepoTileProps = {
  item: RepoItem;
};

const RepoTile: React.FC<RepoTileProps> = ({ item }) => {
  const updatedDate = prettyDate(item.updated_at);
  const numberFormat = Intl.NumberFormat("en", { notation: "compact" });
  return (
    <div className={styles.repoTile}>
      <Avatar letter={item.name[0]} src={item.owner.avatar_url} />
      <div className={styles.repoTile__content}>
        <p className={styles.repoTile__repoName}>{item.name}</p>
        <span className={styles.repoTile__orgName}>{item.owner.login}</span>
        <div className={styles.repoTile__info}>
          <div className={styles.repoTile__stars}>
            <StarIcon />{" "}
            <span>{numberFormat.format(item.stargazers_count)}</span>
          </div>
          <div>
            <span>Updated {updatedDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepoTile;
