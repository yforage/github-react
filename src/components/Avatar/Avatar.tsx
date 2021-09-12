import React from "react";

import styles from "../../App/pages/ReposSearchPage/ReposSearchPage.module.scss";

type AvatarProps = {
  src?: string;
  letter: string;
};

const Avatar: React.FC<AvatarProps> = ({ src, letter }) => {
  return (
    <div
      className={styles.repoTile__avatar}
      style={{ backgroundImage: `url(${src})` }}
    >
      <span className={styles.repoTile__firstLetter}>{!src && letter}</span>
    </div>
  );
};

export default React.memo(Avatar);
