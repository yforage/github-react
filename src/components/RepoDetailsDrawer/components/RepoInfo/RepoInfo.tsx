import UpdatedIcon from "@components/UpdatedIcon";
import UploadIcon from "@components/UploadIcon";
import { RepoInfoModel } from "@store/models/gitHub/repoInfo";
import prettyDate from "@utils/prettyDate";

import styles from "./RepoInfo.module.scss";

type RepoInfoProps = {
  repo: RepoInfoModel | null;
};

const RepoInfo: React.FC<RepoInfoProps> = ({ repo }) => {
  if (!repo) return null;
  const createdDate = prettyDate(repo.createdAt);
  const updatedDate = prettyDate(repo.updatedAt);
  return (
    <div>
      <p className={styles.repoInfo__name}>{repo.name}</p>
      <span className={styles.repoInfo__fullName}>{repo.fullName}</span>
      <p className={styles.repoInfo__description}>{repo.description}</p>
      <p className={styles.repoInfo__lang}>{repo.language}</p>
      <div>
        <div className={styles.repoInfo__date}>
          <div className={styles.repoInfo__dateIcon}>
            <UploadIcon />
          </div>
          <div>{createdDate}</div>
        </div>
        <div className={styles.repoInfo__date}>
          <div className={styles.repoInfo__dateIcon}>
            <UpdatedIcon />
          </div>
          <div>{updatedDate}</div>
        </div>
      </div>
    </div>
  );
};

export default RepoInfo;
