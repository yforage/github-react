import React from "react";

type InputProps = {
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({ value, placeholder, onChange }) => {
  return (
    <div className="git-repo-search__input-container">
      <input
        type="text"
        name="repo_name"
        placeholder={placeholder}
        className="git-repo-search__input"
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default React.memo(Input);
