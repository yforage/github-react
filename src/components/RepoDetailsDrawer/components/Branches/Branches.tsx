import React, { useEffect } from "react";

import ErrorMessage from "components/ErrorMessage";
import LoadSpin from "components/LoadSpin";
import { observer } from "mobx-react-lite";
import { RepoInfoModel } from "store/models/gitHub";
import RepoBranchesStore from "store/RepoBranchesStore";
import links from "utils/links";
import { Meta } from "utils/meta";
import { useLocalStore } from "utils/useLocalStore";

import styles from "./Branches.module.scss";
import BranchItem from "./components/BranchItem";

type BranchesProps = {
  repo: RepoInfoModel | null;
};

const Branches: React.FC<BranchesProps> = ({ repo }) => {
  const repoBranchesStore = useLocalStore(() => new RepoBranchesStore());

  useEffect(() => {
    if (!repo) return;
    repoBranchesStore.getRepoBranches({
      owner: repo.owner.login,
      repo: repo.name,
    });
  }, [repo, repoBranchesStore]);

  if (!repo) return null;
  return (
    <div className={styles.branches}>
      <p className={styles.branches__title}>Branches:</p>
      {repoBranchesStore.meta === Meta.success &&
        repoBranchesStore.branchesList.map((branch) => {
          const href = links.branchLink(
            repo.owner.login,
            repo.name,
            branch.name
          );
          return (
            <BranchItem key={branch.name} name={branch.name} href={href} />
          );
        })}
      {repoBranchesStore.meta === Meta.loading && <LoadSpin />}
      {repoBranchesStore.meta === Meta.error && <ErrorMessage />}
    </div>
  );
};

export default observer(Branches);
