import React from "react";

import styles from "../../App/pages/ReposSearchPage/ReposSearchPage.module.scss";

type InputProps = {
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({ value, placeholder, onChange }) => {
  return (
    <div className={styles.repoSearch__input}>
      <input
        type="text"
        name="repo_name"
        placeholder={placeholder}
        className={styles.repoSearch__inputField}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default React.memo(Input);
