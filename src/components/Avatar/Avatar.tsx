import React from "react";

type AvatarProps = {
  src?: string;
  letter: string;
};

const Avatar: React.FC<AvatarProps> = ({ src, letter }) => (
  <div
    className="git-repo-tile__avatar"
    style={{ backgroundImage: `url(${src})` }}
  >
    <span className="git-repo-tile__avatar-first-letter">{!src && letter}</span>
  </div>
);

export default Avatar;
