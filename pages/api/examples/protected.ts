// This is an example of to protect an API route
import { getSession } from "next-auth/react"
import type { NextApiRequest, NextApiResponse } from "next"
import { ethers } from "ethers"
import { SuberraProduct } from "@suberra/evm-sdk"
import {
  firstParagraph,
  firstTitle,
  secondParagraph,
  secondTitle,
  sidebarParagraph
} from "../../../utils/content"
import * as constants from "../../../lib/constants"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })
  const provider = new ethers.providers.JsonRpcProvider(
    "https://matic-mumbai.chainstacklabs.com"
  )
  const suberraProduct = new SuberraProduct(
    provider,
    constants?.constants?.nft_contract
  )

  if (session) {
    const checkSub = await suberraProduct.hasValidSubscription(session?.address as string)
    if (checkSub) {
      res.send({
        post: {
          title: "ACME Research: The state of the market",
          content: {
            firstTitle,
            firstParagraph,
            secondParagraph,
            secondTitle,
            sidebarParagraph
          }
        },
      })
    } else {
      res.send({
        post: {
          title: "ACME Research: The state of the market",
          content: {
            firstTitle,
            firstParagraph,
          }
        },
        error: "INVALID_SUBSCRIPTION",
      })
    }
  } else {
    res.send({
      post: {
        title: "ACME Research: The state of the market",
        content: {
          firstTitle,
          firstParagraph,
        }
      },
      error: "NO_SUBSCRIPTION",
    })
  }
}
