export interface NotificationMessage {
  type: NotificationVariant;
  text: string;
}

export enum NotificationVariant {
  SUCCESS,
  ERROR,
}
