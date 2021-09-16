import routes from "@config/routes";
import { Layout } from "antd";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import styles from "./App.module.scss";
import { ReposSearchPage } from "./pages/ReposSearchPage";

const { Content } = Layout;

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Content>
          <div className={styles.fullViewportHeight}>
            <Switch>
              <Route path={routes.repos.mask} component={ReposSearchPage} />
              <Redirect to={routes.repos.mask} />
            </Switch>
          </div>
        </Content>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
