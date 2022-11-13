import { SuberraProduct } from "@suberra/evm-sdk";
import { useWeb3React } from "@web3-react/core";
import { useMemo } from "react";
import useSWR from "swr";

export function useSubscriberInfo(contractAddress: string) {
  const { provider, account } = useWeb3React();

  const product = useMemo(() => {
    if (provider && contractAddress)
      return new SuberraProduct(provider, contractAddress);
  }, [contractAddress, provider]);

  const { data, error, mutate, ...rest } = useSWR(
    [`subscription/${account}/status`, product],
    async (_key, product) => {
      return product.getSubscriberInfo(account);
    }
  );

  const isLoading = data === undefined && !error;
  return {
    isLoading,
    subscriberInfo: data,
    mutate,
    error,
    ...rest,
  };
}
