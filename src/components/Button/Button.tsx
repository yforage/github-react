import React from "react";

import styles from "./Button.module.scss";

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({ onClick, children, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type="submit"
      name="search_repo_button"
      className={styles.repoSearch__button}
    >
      {children}
    </button>
  );
};

export default Button;
