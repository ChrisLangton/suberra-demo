import { SupportedChainIdList } from "@suberra/evm-sdk"

const INFURA_KEY = "9a6072f4a9824d52a5ec89885149df5e"

export const INFURA_NETWORK_URLS: { [key in SupportedChainIdList]: string } = {
  [SupportedChainIdList.POLYGON]: `https://polygon-mainnet.infura.io/v3/${INFURA_KEY}`,
  [SupportedChainIdList.POLYGON_MUMBAI]: `https://polygon-mumbai.infura.io/v3/${INFURA_KEY}`,
  [SupportedChainIdList.AVALANCHE]: "",
  [SupportedChainIdList.BSC]: "",
}
