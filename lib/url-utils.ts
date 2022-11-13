const CHECKOUT_VERSION = "v3.0"

export function getCheckoutBaseURL() {
  if (process.env.NODE_ENV === "development")
    return `http://localhost:3030/checkout/${CHECKOUT_VERSION}`

  if (typeof window !== "undefined") {
    const host = window.location.host
    return `https://checkout${host.substring(
      host.indexOf(".")
    )}/checkout/${CHECKOUT_VERSION}`
  }
}

export function getCheckoutUrl(contractAddress: string, redirectUri: string) {
  return `${getCheckoutBaseURL()}/${contractAddress}?redirectUri=${redirectUri}`
}
