import {
  initializeConnector,
  Web3ReactHooks,
  Web3ReactProvider,
} from "@web3-react/core";
import { SessionProvider } from "next-auth/react";
import "../styles/global.css";
import { Connector } from "@web3-react/types";
import { MetaMask } from "@web3-react/metamask";
import { Network } from "@web3-react/network";
import { INFURA_NETWORK_URLS } from "../lib/infura";

function onError(error: Error) {
  console.debug(`web3-react error: ${error}`);
}

export const [injected, injectedHooks] = initializeConnector<MetaMask>(
  (actions) => new MetaMask({ actions, onError })
);

export const [network, networkHooks] = initializeConnector<Network>(
  (actions) =>
    new Network({ actions, urlMap: INFURA_NETWORK_URLS, defaultChainId: 80001 })
);

const connectors = [
  {
    connector: injected,
    hooks: injectedHooks,
  },
  { connector: network, hooks: networkHooks },
];

const web3ReactConnectors: [Connector, Web3ReactHooks][] = connectors.map(
  ({ connector, hooks }) => [connector, hooks]
);

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({ Component, pageProps }) {
  return (
    <Web3ReactProvider connectors={web3ReactConnectors}>
      <SessionProvider session={pageProps.session} refetchOnWindowFocus={false}>
        <Component {...pageProps} />
      </SessionProvider>
    </Web3ReactProvider>
  );
}
