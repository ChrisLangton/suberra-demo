import Image from "next/image";
import { useSubscriberInfo } from "../../hooks/useSubscriberInfo";
import { constants } from "../../lib/constants";

export default function SubscriptionImage() {
  const { isLoading, subscriberInfo } = useSubscriberInfo(
    constants.nft_contract
  );
  if (isLoading)
    return (
      <div className="w-[250px] h-[300px] flex items-center text-center">
        loading...
      </div>
    );
  if (!subscriberInfo) return null;
  return <Image src={subscriberInfo.image} alt="" width={250} height={300} />;
}
