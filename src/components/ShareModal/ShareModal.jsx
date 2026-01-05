import BaseModal from "@components/BaseModal";
import ShareButton from "@components/ShareButton";
import shareCopy from "@assets/img/share copy.svg";
import shareFacebook from "@assets/img/share facebook.svg";
import shareTelegram from "@assets/img/share telegram.svg";
import shareVk from "@assets/img/share vk.svg";
import shareWhatsUp from "@assets/img/share whatsup.svg";
import { observer } from "mobx-react-lite";
import { modalStore } from "@stores/ModalStore";

export const ShareModal = observer(() => {
  const { shareModal } = modalStore;
  const { isOpen, taskTitle, taskBody } = shareModal;
  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `Задача: ${taskTitle}\n Описание: ${taskBody}`
      );
    } catch (err) {
      console.error("Не удалось скопировать:", err);
    }
    modalStore.closeShareModal();
  };

  return (
    <BaseModal
      onClose={() => modalStore.closeShareModal()}
      variant="shareModal"
    >
      <ShareButton
        img={shareCopy}
        platform="Копирование"
        onClick={handleCopy}
      />
      <ShareButton img={shareFacebook} platform="Facebook" />
      <ShareButton img={shareTelegram} platform="Telegram" />
      <ShareButton img={shareVk} platform="Вконтакте" />
      <ShareButton img={shareWhatsUp} platform="What's Up" />
    </BaseModal>
  );
});
