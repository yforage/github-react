import React from "react";

import styles from "./Avatar.module.scss";

type AvatarProps = {
  src?: string;
  letter: string;
};

const Avatar: React.FC<AvatarProps> = ({ src, letter }) => {
  return (
    <div
      className={`${styles.repoTile__avatar} ${
        src ? styles.whiteBackground : styles.mainBackground
      }`}
      style={{
        backgroundImage: `url(${src})`,
      }}
    >
      <span>{!src && letter}</span>
    </div>
  );
};

export default React.memo(Avatar);
