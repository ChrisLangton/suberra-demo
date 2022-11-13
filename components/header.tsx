import { useWeb3React } from "@web3-react/core";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { truncate } from "../lib/truncate";
import NetworkButtons from "./NetworkButtons";
import LoginButton from "./LoginButton";
import AccountModal from "./AccountModal";

export default function Header() {
  const { account, isActive } = useWeb3React();

  const [showAccountModal, setShowAccountModal] = useState(false);

  const closeModal = () => {
    setShowAccountModal(false);
  };

  return (
    <nav className="z-10 flex flex-row items-center justify-center w-full py-4 border-b border-gray-300 shadow md:justify-between px-7 text-text-theme">
      <Link href="/" passHref>
        <a>
          <Image src="/acme-logo.svg" alt="logo" width={240} height={80} />
        </a>
      </Link>

      <AccountModal isOpen={showAccountModal} closeModal={closeModal} />
      <div className="items-center justify-end hidden text-black md:flex">
        <NetworkButtons />
        {isActive ? (
          <button
            onClick={() => setShowAccountModal(true)}
            className="flex flex-row items-center justify-between px-3 mr-2 rounded-full border-[0.5px] border-gray-500 shadow-xl text-base"
          >
            <div className="px-3 py-1.5 text-md">{truncate(account)}</div>
          </button>
        ) : null}
        <LoginButton />
      </div>
    </nav>
  );
}
