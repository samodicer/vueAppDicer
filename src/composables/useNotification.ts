import { ref } from "vue";
import { NotificationMessage } from "../types/notifications";

const message = ref<NotificationMessage | undefined>(undefined);
let notificationTimeout: ReturnType<typeof setTimeout>;
const MESSAGE_DURATION = 4000; // 4 seconds

export function useNotification() { 

  /* Set message text and set timeout after which the message will be deleted */
  function setMessage(notificationMessage: NotificationMessage) { 
    message.value = notificationMessage;
    clearTimeout(notificationTimeout);
    notificationTimeout = setTimeout(() =>  message.value = undefined, MESSAGE_DURATION);
  }

  return {
    message,
    setMessage,
  }
}