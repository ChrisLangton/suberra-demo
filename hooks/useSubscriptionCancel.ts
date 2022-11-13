import { SuberraProduct } from "@suberra/evm-sdk";
import { useWeb3React } from "@web3-react/core";
import { useMemo, useState } from "react";
import { useSubscriberInfo } from "./useSubscriberInfo";

export function useSubscriptionCancel(contractAddress: string) {
  const { provider } = useWeb3React();
  const { subscriberInfo } = useSubscriberInfo(contractAddress);
  const [isLoading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState("");
  const product = useMemo(() => {
    if (provider && contractAddress)
      return new SuberraProduct(provider, contractAddress);
  }, [contractAddress, provider]);

  const cancel = async () => {
    if (!subscriberInfo) throw new Error("No subscriber info");
    if (isLoading) return;
    setLoading(true);
    const tx = await product.contract.functions.unsubscribe(
      subscriberInfo.tokenId
    );
    setTxHash(tx.hash);
    await tx.wait();
    setLoading(false);
  };

  return {
    cancel,
    txHash,
    isLoading,
  };
}
