import "./App.css";
import { Layout } from "antd";

import ReposSearchPage from "./pages/ReposSearchPage";

const { Content } = Layout;

const App = () => {
  return (
    <Layout className="git-repo-layout">
      <Content>
        <ReposSearchPage />
      </Content>
    </Layout>
  );
};

export default App;
