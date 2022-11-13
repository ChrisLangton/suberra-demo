import BaseModal from "../BaseModal";
import ConnectionStatus from "./ConnectionStatus";
import SubscriptionStatus from "./SubscriptionStatus";
import SubscriptionImage from "./SubscriptionImage";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

export default function AccountModal({ isOpen, closeModal }: Props) {
  return (
    <BaseModal title="Account" isOpen={isOpen} closeModal={closeModal}>
      <div className="flex flex-row justify-between p-6 border border-gray-500 rounded-2xl">
        <div className="flex flex-col justify-between pr-4 space-y-4">
          <ConnectionStatus />
          <div className="w-3/4 border-b border-black"></div>
          <SubscriptionStatus />
        </div>
        <SubscriptionImage />
      </div>
    </BaseModal>
  );
}
