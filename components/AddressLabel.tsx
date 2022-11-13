import { DuplicateIcon, ExternalLinkIcon } from "@heroicons/react/solid"
import { useEffect, useState } from "react"
import { useEVMNetwork } from "../hooks/useEVMNetwork"
import { truncate } from "../lib/truncate"

export default function AddressLabel({
  address,
  className = "",
  iconColor = "",
  showIcons = true,
  truncateAddress = true,
  withAddress = true,
  withText = false,
}: {
  address: string
  className?: string
  iconColor?: string
  showIcons?: boolean
  truncateAddress?: boolean
  withAddress?: boolean
  withText?: boolean
}) {
  const { getExplorerAddressUrl } = useEVMNetwork() || {}

  const [isCopied, setCopied] = useState(false)
  const copy = () => {
    navigator?.clipboard.writeText(address).then(() => setCopied(true))
  }

  useEffect(() => {
    const timer = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timer)
  }, [isCopied])

  if (!getExplorerAddressUrl) return null

  return (
    <div className={`flex space-x-2 ${className}`}>
      {withAddress && (
        <span>{truncateAddress ? truncate(address, [8, 6]) : address}</span>
      )}
      <div className="relative" onClick={copy}>
        {isCopied && (
          <div className="absolute p-1 mt-6 -ml-2 text-xs rounded bg-bg-2">
            Copied
          </div>
        )}
        {showIcons && (
          <div className="flex flex-row items-center space-x-1">
            <DuplicateIcon
              className={`h-5 rounded hover:bg-bg-1 ${iconColor} hover:text-primary-700 cursor-pointer`}
            />
            {withText && <div className="cursor-pointer">Copy Address</div>}
          </div>
        )}
      </div>
      {showIcons && (
        <a
          href={getExplorerAddressUrl(address)}
          target="_blank"
          rel="noreferrer"
          className="focus:outline-none"
        >
          <div className="flex flex-row items-center space-x-1">
            <ExternalLinkIcon
              className={`h-5 rounded hover:bg-bg-1 ${iconColor} hover:text-primary-700 cursor-pointer`}
            />
            {withText && <div>View on Explorer</div>}
          </div>
        </a>
      )}
    </div>
  )
}
