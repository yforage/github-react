import React from "react";

import styles from "./BranchItem.module.scss";

type BranchItemProps = {
  name: string;
  href: string;
};

const BranchItem: React.FC<BranchItemProps> = ({ name, href }) => {
  return (
    <a
      className={styles.branch__link}
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {name}
    </a>
  );
};

export default BranchItem;
