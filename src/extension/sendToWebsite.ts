import { Property, Signature } from '@0auth/message';
import { DynamicFormInput } from '@0auth/client';

type MessageType = {
  type: string;
  properties?: Property[];
  sign?: Signature;
  form?: DynamicFormInput[];
};

export default function sendToWebsite({ type, properties, sign, form }: MessageType) {
  if (chrome.tabs !== undefined) {
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id!, {
        type,
        from: 'popup',
        properties,
        sign,
        form,
      });
    });
  }
}
