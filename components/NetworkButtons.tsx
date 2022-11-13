import { CHAIN_INFO } from "@suberra/evm-sdk";
import { useWeb3React } from "@web3-react/core";
import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import Image from "next/image";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NetworkButtons() {
  const { chainId } = useWeb3React();
  const [network, setNetwork] = useState(CHAIN_INFO[chainId]);
  useEffect(() => setNetwork(CHAIN_INFO[chainId]), [chainId]);

  return (
    <>
      {network && (
        <div className="flex flex-row justify-between mx-2 space-x-2">
          <div className="flex flex-row border rounded-full shadow-xl w-full py-1.5 cursor-pointer space-x-2 items-center border-gray-500 bg-transparent">
            <Listbox value={network} onChange={setNetwork}>
              {({ open }) => (
                <>
                  <div className="relative w-full">
                    <Listbox.Button className="relative flex flex-row items-center justify-between w-full px-4 space-x-2 text-base bg-transparent rounded-md shadow-sm cursor-pointer focus:outline-none">
                      <div className="flex flex-row items-center space-x-4">
                        {network?.logo && (
                          <Image
                            className="h-7"
                            src={network.logo}
                            alt="usdc logo"
                            height={20}
                            width={20}
                          />
                        )}
                        <span className="block truncate">{network?.label}</span>
                      </div>
                      <ChevronDownIcon className="h-4" />
                    </Listbox.Button>

                    <Transition
                      show={open}
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute z-10 w-full mt-2 overflow-auto text-white bg-white rounded-lg shadow-xl max-h-60 focus:outline-none">
                        <div className="px-6 py-4 text-black cursor-default">
                          Coming soon!
                        </div>
                        {Object.values(CHAIN_INFO).map((network) => (
                          <Listbox.Option
                            key={Object.keys(CHAIN_INFO).find(
                              (key) => CHAIN_INFO[key] === network
                            )}
                            className={({ active }) =>
                              classNames(
                                active
                                  ? "text-white bg-primary-300"
                                  : `text-white ${
                                      network.disabled
                                        ? "cursor-not-allowed"
                                        : "cursor-default"
                                    }`,
                                `cursor-default select-none relative p-4 ${
                                  chainId === network.chainId && "hidden"
                                }`
                              )
                            }
                            disabled={network.disabled}
                            value={network}
                          >
                            {({ selected, active }) => (
                              <div className="flex flex-row space-x-4">
                                {network.logo && (
                                  <Image
                                    className="h-7"
                                    src={network.logo}
                                    alt="usdc logo"
                                    height={20}
                                    width={20}
                                  />
                                )}
                                <span
                                  className={classNames(
                                    selected
                                      ? "font-semibold"
                                      : `${
                                          network.disabled
                                            ? "text-gray-600 cursor-not-allowed"
                                            : "text-text-theme"
                                        }`
                                  )}
                                >
                                  {network.label}
                                </span>

                                {selected ? (
                                  <span
                                    className={classNames(
                                      active
                                        ? "text-white"
                                        : "text-primary-300",
                                      "flex items-center"
                                    )}
                                  >
                                    <CheckIcon
                                      className="w-5 h-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </div>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </>
              )}
            </Listbox>
          </div>
        </div>
      )}
    </>
  );
}
