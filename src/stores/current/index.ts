import { makeAutoObservable } from 'mobx';
import {
  Property,
  PropertyData,
  PropertyDataType,
  PropertyType,
  Signature,
} from '@0auth/message';
import { defaultValue } from '@0auth/message/lib/type/defaultValue';
import { DynamicFormInput } from '@0auth/client';

import { sendToWebsite } from '../../extension';
import { propertyStore } from '../index';
import loginStore from "../login";

type ExtensionMessage = {
  type: string;
  host?: string;
  title?: string;
  favicon?: string;
  properties?: Property[];
  sign?: Signature;
  form?: DynamicFormInput[];
}

class Current {
  host: string | undefined = undefined;
  title: string | undefined = undefined;
  favicon: string | undefined = undefined;
  sign: Signature | undefined = undefined;
  form: DynamicFormInput[] = [];
  properties: Property[] = [];
  messageQueue: ExtensionMessage[] = [];
  isChecked: boolean = false;

  constructor() {
    makeAutoObservable(this);
    this.init();
  }

  init() {
    if (chrome.storage !== undefined) {
      chrome.storage.local.get(['messageQueue'], async (data) => {
        this.messageQueue = data.messageQueue || [];
      })
    }
  }

  checkMessageQueue(): boolean {
    if (this.messageQueue.length > 0 && !this.isChecked && loginStore.isLogin) {
      this.isChecked = true;
      return true;
    }
    return false;
  }

  popMessage(): ExtensionMessage {
    const [msg] = this.messageQueue.splice(0, 1);
    chrome.storage.local.set({messageQueue: JSON.parse(JSON.stringify(currentStore.messageQueue))});
    return JSON.parse(JSON.stringify(msg));
  }

  auth() {
    sendToWebsite({ type: 'AUTH', sign: this.sign, properties: this.properties });
  }

  register() {
    sendToWebsite({ type: 'REGISTER', form: this.form, properties: this.properties });
  }

  changeProperty(index: number, value: PropertyData) {
    this.properties[index].value = value;
  }

  setAuth(host: string) {
    this.clear();
    this.properties = propertyStore.properties[host].property;
    this.sign = propertyStore.properties[host].sign;
  }

  setRegister(form: DynamicFormInput[]) {
    this.clear();
    this.form = form;
    this.properties = form.map((input) => ({
      type: PropertyType.Raw,
      dataType: PropertyDataType.String,
      key: input.name,
      value: defaultValue(input.type),
    }));
  }

  getTitle(): string {
    return this.title || '';
  }

  getFavicon(): string {
    return this.favicon || '';
  }

  clear() {
    this.title = undefined;
    this.favicon = undefined;
    this.properties = [];
    this.sign = undefined;
    this.form = [];
  }
}

const currentStore = new Current();
export default currentStore;
