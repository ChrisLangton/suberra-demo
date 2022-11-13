import { SuberraProduct } from "@suberra/evm-sdk";
import { useWeb3React } from "@web3-react/core";
import { useMemo } from "react";
import useSWR from "swr";

export function useSubscriptionDetail(contractAddress: string) {
  const { provider } = useWeb3React();

  const product = useMemo(() => {
    if (provider && contractAddress)
      return new SuberraProduct(provider, contractAddress);
  }, [contractAddress, provider]);

  const { data, error, ...rest } = useSWR(
    [`subscription/metadata/${contractAddress}`, product],
    (_key, product) => product.getSubscriptionDetail()
  );

  const isLoading = data === undefined && !error;
  return {
    subscriptionDetail: data,
    subscriptionMetaData: data?.metadata,
    error,
    isLoading,
    ...rest,
  };
}
