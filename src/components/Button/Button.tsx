import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({ onClick, children, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    type="submit"
    name="search_repo_button"
    className="git-repo-search__button"
  >
    {children}
  </button>
);

export default Button;
