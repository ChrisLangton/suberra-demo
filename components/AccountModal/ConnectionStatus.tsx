import { truncate } from "@suberra/evm-sdk";
import { Button, MetamaskJazzicon } from "@suberra/react-commons";
import { useWeb3React } from "@web3-react/core";
import { signOut } from "next-auth/react";
import AddressLabel from "../AddressLabel";

export default function ConnectionStatus() {
  const { account, connector } = useWeb3React();
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row items-center space-x-4">
        <span className="text-xl">Connected with Metamask</span>
        <Button
          primary
          className="items-center h-8 text-md rounded-2xl"
          text="Disconnect"
          onClick={() => {
            signOut();
            connector.deactivate
              ? connector.deactivate()
              : connector.resetState();
            localStorage.setItem("isWalletConnected", JSON.stringify(false));
          }}
        />
      </div>
      <div className="flex flex-row items-center space-x-2 text-text-theme">
        <MetamaskJazzicon account={account} />
        <div className="text-lg text-black">{truncate(account)}</div>
      </div>
      <AddressLabel
        address={account}
        withAddress={false}
        withText
        className="items-center text-xs text-black cursor-default"
        iconColor="text-primary-300"
      />
    </div>
  );
}
