import {makeAutoObservable} from 'mobx';
import {Property, Signature} from '@0auth/message';
import {decryptMessage, encryptMessage} from '@0auth/client/lib/utils';

type PropertyInfo = {
  host: string;
  title: string;
  favicon: string;
  property: Property[];
  sign: Signature;
}

class UserProperty {
  hostList: string[] = [];
  properties: { [host: string]: PropertyInfo } = {};
  key: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  init(key: string) {
    this.setKey(key);
    if (chrome.storage === undefined) {
      return;
    }
    chrome.storage.local.get(['hostList'], async (data) => {
      const hostList = JSON.parse(decryptMessage(data.hostList, this.key));
      if (hostList === undefined) {
        return;
      }
      this.hostList = hostList;
      this.loadAll();
    });
  }

  loadAll() {
    chrome.storage.local.get(this.hostList, async (data) => {
      for (const host of this.hostList) {
        if (data[host] !== undefined) {
          this.properties[host] = JSON.parse(decryptMessage(data[host], this.key));
        }
      }
    });
  }

  loadProperty(host: string) {
    chrome.storage.local.get([host], async (data) => {
      const encryptedData = data[host];
      if (encryptedData !== undefined) {
        this.properties[host] = JSON.parse(decryptMessage(data[host], this.key));
      }
    });
  }

  setKey(key: string) {
    this.key = key;
  }

  storeProperty(host: string) {
    if (chrome.storage === undefined) {
      return;
    }
    const encryptedData = encryptMessage(JSON.stringify(this.properties[host]), this.key);
    chrome.storage.local.set({[host]: encryptedData}, () => console.log('기록되었습니다.'));
  }

  updateProperties(host: string, title: string, favicon: string, properties: Property[], sign: Signature) {
    this.properties[host].title = title;
    this.properties[host].favicon = favicon;
    this.properties[host].property = properties;
    this.properties[host].sign = sign;
  }
}

const propertyStore = new UserProperty();
export default propertyStore;
