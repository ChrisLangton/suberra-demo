import { CHAIN_INFO, isSupportedChain } from "@suberra/evm-sdk"
import { useWeb3React } from "@web3-react/core"

export function useEVMNetwork() {
  const { chainId } = useWeb3React()
  const isValidChain = isSupportedChain(chainId)
  const { explorer } = CHAIN_INFO[chainId] || {}

  if (!isValidChain || !explorer) {
    return null
  }
  const getExplorerTxUrl = (txHash) =>
    txHash ? `${explorer}tx/${txHash}` : undefined

  const getExplorerAddressUrl = (account) =>
    account ? `${explorer}address/${account}` : undefined
  console
  return { getExplorerTxUrl, getExplorerAddressUrl }
}
