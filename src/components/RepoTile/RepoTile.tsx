import React from "react";

import Avatar from "@components/Avatar";
import StarIcon from "@components/StarIcon";

import { RepoItem } from "../../store/GitHubStore/types";

type RepoTileProps = {
  item: RepoItem;
  onClick: (repoId: number) => void;
};

const RepoTile: React.FC<RepoTileProps> = ({ item, onClick }) => {
  const updatedDate = new Date(item.updated_at);
  const numberFormat = Intl.NumberFormat("en", { notation: "compact" });
  return (
    <div className="git-repo-tile" onClick={() => onClick(item.id)}>
      <Avatar letter={item.name[0]} src={item.owner.avatar_url} />
      <div className="git-repo-tile__content">
        <p className="git-repo-tile__repo-name">{item.name}</p>
        <span className="git-repo-tile__org-name">{item.owner.login}</span>
        <div className="git-repo-tile__info">
          <div className="git-repo-tile__stars">
            <StarIcon />{" "}
            <span className="git-repo-tile__star-number">
              {numberFormat.format(item.stargazers_count)}
            </span>
          </div>
          <div className="git-repo-tile__date">
            <span className="git-repo-tile__last-updated-date">
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
