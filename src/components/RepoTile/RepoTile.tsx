import React from "react";

import Avatar from "@components/Avatar";
import StarIcon from "@components/StarIcon";

import styles from "../../App/pages/ReposSearchPage/ReposSearchPage.module.scss";
import { RepoItem } from "../../store/GitHubStore/types";

type RepoTileProps = {
  item: RepoItem;
};

const RepoTile: React.FC<RepoTileProps> = ({ item }) => {
  const updatedDate = new Date(item.updated_at);
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
            <span className={styles.repoTile__starNumber}>
              {numberFormat.format(item.stargazers_count)}
            </span>
          </div>
          <div className={styles.repoTile__date}>
            <span className={styles.repoTile__lastUpdated}>
              Updated {updatedDate.getDate()}{" "}
              {updatedDate.toLocaleString("default", { month: "short" })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepoTile;
