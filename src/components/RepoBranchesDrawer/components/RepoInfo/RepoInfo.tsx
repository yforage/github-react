import UpdatedIcon from "@components/UpdatedIcon";
import UploadIcon from "@components/UploadIcon";
import { RepoInfoItem } from "src/store/GitHubStore/types";

import styles from "./RepoInfo.module.scss";

type RepoInfoProps = {
  repo: RepoInfoItem | null;
};

const RepoInfo: React.FC<RepoInfoProps> = ({ repo }) => {
  if (!repo) return null;
  const createdDate = new Date(repo.created_at);
  const updatedDate = new Date(repo.updated_at);
  return (
    <div className={styles.repoInfo}>
      <p className={styles.repoInfo__name}>{repo.name}</p>
      <span className={styles.repoInfo__fullName}>{repo.full_name}</span>
      <p className={styles.repoInfo__description}>{repo.description}</p>
      <p className={styles.repoInfo__lang}>{repo.language}</p>
      <div className={styles.repoInfo__dates}>
        <div className={styles.repoInfo__date}>
          <div className={styles.repoInfo__dateIcon}>
            <UploadIcon />
          </div>
          <div className={styles.repoInfo__time}>
            {createdDate?.getDate()}{" "}
            {createdDate?.toLocaleString("default", { month: "short" })}{" "}
            {createdDate?.getFullYear()}
          </div>
        </div>
        <div className={styles.repoInfo__date}>
          <div className={styles.repoInfo__dateIcon}>
            <UpdatedIcon />
          </div>
          <div className={styles.repoInfo__time}>
            {updatedDate?.getDate()}{" "}
            {updatedDate?.toLocaleString("default", { month: "short" })}{" "}
            {updatedDate?.getFullYear()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepoInfo;
