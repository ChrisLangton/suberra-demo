import { getCsrfToken, signIn, signOut, useSession } from "next-auth/react";
import { SiweMessage } from "siwe";
import { useWeb3React } from "@web3-react/core";
import { Connector } from "@web3-react/types";
import { injected } from "../pages/_app";
import { useEffect, useState } from "react";

export default function LoginButton() {
  const { provider, chainId, account, isActive } = useWeb3React();
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();

  const connect = async (connector: Connector) => {
    if (isActive && account) return; // already connected
    try {
      await connector.activate();
    } catch (error) {
      console.debug(`web3-react eager connection error: ${error}`);
    }
  };

  async function signLoginMessage() {
    if (!isActive || !account || isLoading) return; // not connected
    if (session && session.address === account) return; // already logged in

    setIsLoading(true);
    try {
      const callbackUrl = "/";
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
      await signIn("credentials", {
        message: JSON.stringify(message),
        redirect: false,
        signature,
        callbackUrl,
      });
    } catch (error) {
      window.alert(JSON.stringify(error));
    } finally {
      setIsLoading(false);
    }
  }

  // Auto logout when account changes
  useEffect(() => {
    const verifySession = async () => {
      if (account && session?.address && session?.address !== account) {
        signOut();
      }
    };
    verifySession();
  }, [provider, account, session]);

  // Auto signin on connect
  useEffect(() => {
    if (!isActive || !account) return;
    if (!session) {
      signLoginMessage();
    }
  }, [isActive, account, session]);

  // auto connect on mount
  useEffect(() => {
    if (session) {
      connect(injected);
    }
  }, []);

  if (isLoading)
    return (
      <button className="flex flex-row justify-center border-gray-500 items-center my-2 bg-gray-500 px-8 rounded-full cursor-pointer hover:bg-[#124BDF] shadow-xl">
        <p className="text-3xl text-gray-900 animate animate-pulse">...</p>
      </button>
    );
  return session ? (
    <button
      onClick={() => {
        signOut();
      }}
      className="flex flex-row justify-center border-gray-500 items-center my-5 bg-[#2C64F2] py-1.5 px-7 rounded-full cursor-pointer hover:bg-[#124BDF] shadow-xl"
    >
      <p className="text-base text-white">Sign Out</p>
    </button>
  ) : isActive ? (
    <button
      onClick={() => signLoginMessage()}
      className="flex flex-row justify-center border-gray-500 items-center my-5 bg-[#2C64F2] py-1.5 px-7 rounded-full cursor-pointer hover:bg-[#124BDF] shadow-xl"
    >
      <p className="text-base text-white">Sign In</p>
    </button>
  ) : (
    <button
      onClick={() => {
        connect(injected);
      }}
      className="flex flex-row justify-center border-gray-500 items-center my-5 bg-[#2C64F2] py-1.5 px-7 rounded-full cursor-pointer hover:bg-[#124BDF] shadow-xl"
    >
      <p className="text-base text-white"> Connect Wallet</p>
    </button>
  );
}
