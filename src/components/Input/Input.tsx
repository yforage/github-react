import React from "react";

type InputProps = {
  value: string;
  placeHolder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({ value, placeHolder, onChange }) => {
  return (
    <div className="git-repo-search__input-container">
      <input
        type="text"
        name="repo_name"
        placeholder={placeHolder}
        className="git-repo-search__input"
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default Input;
