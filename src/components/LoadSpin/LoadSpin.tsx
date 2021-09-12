import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

import styles from "./LoadSpin.module.scss";

const LoadSpin: React.FC = () => {
  const loadIcon = <LoadingOutlined className={styles.spinIcon} spin />;
  return (
    <div className={styles.loader}>
      <Spin className={styles.spin} indicator={loadIcon} />
    </div>
  );
};

export default LoadSpin;
