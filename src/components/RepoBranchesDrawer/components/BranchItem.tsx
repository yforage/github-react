import React from "react";

type BranchItemProps = {
  name: string;
  href: string;
};

const BranchItem: React.FC<BranchItemProps> = ({ name, href }) => {
  return (
    <div className="git-repo-branch">
      <a
        className="git-repo-branch__link"
        href={href}
        target="_blank"
        rel="noreferrer"
      >
        {name}
      </a>
    </div>
  );
};

export default BranchItem;
