import './App.css';
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import { getLibrary } from './utils/web3React'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from './components/Header/Header';
import Home from './view/home';
import Mint from './layout/MainSection';
import WhiteList from './view/whitelist';
import history from "./routerHistory";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import PreSaleSection from './layout/preSale';

const NetworkContextName = 'NETWORK'
const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

function App() {
  return (
    <Router history={history}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Web3ProviderNetwork getLibrary={getLibrary}>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={true}
          />
          <div className="App">
          <Header />
            <Switch>
              <Route path="/" exact>
              <Home />
              </Route>
              <Route path="/mint-nft-golden-id-club" exact>
                <Mint />
              </Route>
              <Route path="/whitelist-golden-id-club" exact>
                <PreSaleSection />
              </Route>
              <Redirect from="*" to="/" />
            </Switch>
         
            
          </div>
        </Web3ProviderNetwork>
      </Web3ReactProvider>
    </Router>
  );
}

export default App;