import RepoTile from "@components/RepoTile";
import routes from "@config/routes";
import { useReposContext } from "@pages/ReposSearchPage";
import { Link } from "react-router-dom";

import styles from "./ReposList.module.scss";

const ReposList: React.FC = () => {
  const reposContext = useReposContext();
  return (
    <>
      {reposContext.list.map((repoItem) => {
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

export default ReposList;
