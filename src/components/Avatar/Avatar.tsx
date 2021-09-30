import React from "react";

import cn from "classnames";

import styles from "./Avatar.module.scss";

type AvatarProps = {
  src?: string;
  letter: string;
};

const Avatar: React.FC<AvatarProps> = ({ src, letter }) => {
  const isSrc = src ? true : false;
  const avatarClass = cn(styles.repoTile__avatar, {
    [styles.whiteBackground]: isSrc,
    [styles.mainBackground]: !isSrc,
  });

  return (
    <div
      className={avatarClass}
      style={{
        backgroundImage: `url("${src}")`,
      }}
    >
      <span>{!src && letter}</span>
    </div>
  );
};

export default React.memo(Avatar);
