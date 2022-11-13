import { truncate } from "@suberra/evm-sdk";
import { SubscriberInfo } from "@suberra/evm-sdk/src/types";
import { Button } from "@suberra/react-commons";
import { useEVMNetwork } from "../../hooks/useEVMNetwork";
import { useSubscriberInfo } from "../../hooks/useSubscriberInfo";
import { useSubscriptionCancel } from "../../hooks/useSubscriptionCancel";
import { useSubscriptionDetail } from "../../hooks/useSubscriptionInfo";
import { constants } from "../../lib/constants";
import { getCheckoutUrl } from "../../lib/url-utils";
import toDaysHours from "../../utils/utils";

export default function SubscriptionStatus() {
  const { subscriptionDetail } = useSubscriptionDetail(constants.nft_contract);

  const { isLoading: isSubscriberInfoLoading, subscriberInfo } =
    useSubscriberInfo(constants.nft_contract);

  const {
    cancel,
    txHash,
    isLoading: isCancelLoading,
  } = useSubscriptionCancel(constants.nft_contract);

  const { getExplorerTxUrl } = useEVMNetwork();
  if (isSubscriberInfoLoading) return <div>Loading...</div>;

  const isSubscriber = !!subscriberInfo;
  const isValidSub = isSubscriber && subscriberInfo.active;
  const isCancelled = isSubscriber && subscriberInfo.isCancelled;
  const expiryText = toDaysHours(subscriberInfo.expiry);
  const callToActionText = !isSubscriber
    ? `Please subscribe to ${subscriptionDetail?.name} to view this paid content:`
    : !isValidSub
    ? "Please renew your subscription to ACME Insights to view this paid content."
    : null;

  const checkoutURL = getCheckoutUrl(
    constants.nft_contract,
    window.location.href
  );
  const openseaURL =
    isSubscriber &&
    `https://testnets.opensea.io/assets/mumbai/${
      constants.nft_contract
    }/${subscriberInfo.tokenId.toString()}`;

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-row items-center space-x-2 text-center">
          <span className="text-lg">Subscription Status: </span>
          <StatusButton subscriberInfo={subscriberInfo} />
        </div>
        <div>
          {expiryText && (
            <div className="text-lg text-gray-900">{expiryText}</div>
          )}
          {callToActionText && (
            <div className="text-sm text-primary-500">{callToActionText}</div>
          )}
        </div>
      </div>
      <div className="flex flex-row items-baseline space-x-2">
        {!isSubscriber ? (
          <a
            href={checkoutURL}
            className="flex justify-center p-4 px-4 py-2 text-white rounded-full bg-primary-500"
            target="_blank"
            rel="noreferrer"
          >
            Subscribe Now!
          </a>
        ) : (
          <a
            href={openseaURL}
            className="flex justify-center p-4 px-4 py-2 text-white rounded-full bg-primary-500"
            target="_blank"
            rel="noreferrer"
          >
            View on Opensea
          </a>
        )}

        {isValidSub && !isCancelled ? (
          <Button
            secondary
            className="rounded-full bg-bg-1"
            text="Cancel subscription"
            onClick={cancel}
            loading={isCancelLoading}
          />
        ) : (
          isSubscriber && (
            <a
              href={checkoutURL}
              className="flex justify-center p-4 px-4 py-2 text-white rounded-full bg-primary-500"
              target="_blank"
              rel="noreferrer"
            >
              Resubscribe
            </a>
          )
        )}
        {!!txHash && (
          <a
            className="mt-1 text-xs text-primary-500"
            href={getExplorerTxUrl(txHash)}
            target="_blank"
            rel="noreferrer"
          >
            Tx: {truncate(txHash)}
          </a>
        )}
      </div>
    </div>
  );
}

const StatusButton = ({
  subscriberInfo,
}: {
  subscriberInfo: SubscriberInfo | null;
}) => {
  const isSubscriber = !!subscriberInfo;
  const isValidSub = isSubscriber && subscriberInfo.active;
  const isCancelled = isSubscriber && subscriberInfo.isCancelled;

  const style = isValidSub
    ? "text-white bg-success"
    : isSubscriber
    ? "text-gray-500 border-gray-500"
    : "text-white bg-error";

  // TODO: simplify logic
  const subscriptionStatus = isValidSub
    ? isCancelled
      ? "Cancelled, active until cycle ends"
      : "Active"
    : !isSubscriber
    ? "Not Subscribed"
    : isCancelled
    ? "Cancelled"
    : "Expired";

  return (
    <span
      className={`flex flex-row text-md border rounded-full px-3 py-1 items-center ${style}`}
    >
      {subscriptionStatus}
    </span>
  );
};
