import { Layout } from "antd";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import { ReposSearchPage } from "./pages/ReposSearchPage";

const { Content } = Layout;

const App = () => {
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: "100vh" }}>
        <Content>
          <Switch>
            <Route path="/repos" component={ReposSearchPage} />
            <Redirect to="/repos" />
          </Switch>
        </Content>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
