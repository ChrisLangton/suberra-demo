import { useWeb3React } from "@web3-react/core";
import { useSession, getCsrfToken, signIn } from "next-auth/react";
import { SiweMessage } from "siwe";
import { constants } from "../lib/constants";
import { getCheckoutUrl } from "../lib/url-utils";
import Image from "next/image";
import { useRouter } from "next/router";

export default function PayWall({ invalidSubscription }) {
  const { isActive, account, provider, chainId } = useWeb3React();
  const { data: session } = useSession();
  const router = useRouter();

  async function getSession() {
    try {
      if (isActive && account) {
        if (session && session?.address === account) {
          return;
        }
        const callbackUrl = "/"; //TODO: replace with current path ure on
        const message = new SiweMessage({
          domain: window.location.host,
          address: account,
          statement: "Sign in with Ethereum to the app.",
          uri: window.location.origin,
          version: "1",
          chainId: chainId,
          nonce: await getCsrfToken(),
        });
        const signature = await provider.provider.request({
          method: "personal_sign",
          params: [message?.toMessage(), account],
        });
        message.signature = signature;
        signIn("credentials", {
          message: JSON.stringify(message),
          redirect: false,
          signature,
          callbackUrl,
        });
      }
    } catch (error) {
      window.alert(JSON.stringify(error));
    }
  }

  const PaidSubscriber = () => {
    return (
      <>
        {isActive ? (
          session ? (
            ""
          ) : (
            <div className="text-xs">
              Already a paid subscriber?
              <button
                onClick={() => getSession()}
                className="mx-1 underline underline-offset-1"
              >
                Sign in.
              </button>
            </div>
          )
        ) : (
          <div className="text-xs">
            Already a paid subscriber?
            <button
              onClick={() => getSession()}
              className="mx-1 underline underline-offset-1"
            >
              Sign in.
            </button>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="flex justify-center w-full my-8">
      <div
        className={`${
          invalidSubscription
            ? "p-3 flex flex-col items-center justify-center text-center text-black rounded-md bg-fff"
            : "hidden"
        }`}
      >
        <PaidSubscriber />
        <div className="my-6 text-3xl font-semibold">
          Get more with Insights at 20 USDC / Month
        </div>
        <div className="p-2">
          <p className="mb-4 text-2xl font-medium"> Unlock these benefits</p>
          <ul className="text-base list-disc list-inside">
            <li className={"mb-2"}>
              Full-unrestricted access to our Telegram group
            </li>
            <li className={"mb-2"}>
              Industry leading crypto insights 365 days a year
            </li>
            <li className={"mb-2"}>Unfettered access to our weekly podcasts</li>
          </ul>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            window.location.href = `${getCheckoutUrl(
              constants.nft_contract,
              window.location.href
            )}`;
          }}
          className="justify-center items-center mt-5 mb-2 bg-[#006BE5] py-4 w-3/5 rounded-3xl cursor-pointer hover:bg-[#005BC2] shadow-xl"
        >
          <p className="text-xl font-semibold text-white">Subscribe</p>
        </button>
        <div className="flex flex-row items-center">
          <span className="text-sm">Powered By</span>
          <Image
            height={30}
            width={115}
            src="/logo_dark.svg"
            alt="Brand Logo"
            className="hover:cursor-pointer"
            onClick={() => router.push("https://suberra.io")}
          />
        </div>
      </div>
    </div>
  );
}
