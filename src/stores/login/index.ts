import { makeAutoObservable } from 'mobx';
import { hash } from '@0auth/message';

import { propertyStore } from '../index';

class Login {
  isLogin = false;

  password = '';

  hash = '';

  constructor() {
    makeAutoObservable(this);
    this.init();
  }

  init() {
    if (chrome.storage === undefined) {
      return;
    }
    chrome.storage.local.get('hash', async (data) => {
      const hashValue = data.hash;
      if (hashValue === undefined) {
        return;
      }
      this.hash = hashValue;
    });
  }

  signup() {
    this.isLogin = true;
    this.hash = hash(this.password);
    const key = hash(`${this.password}${this.hash}`);
    propertyStore.init(key);
    if (chrome.storage !== undefined) {
      chrome.storage.local.set({ hash: this.hash });
    }
  }

  login(): boolean {
    if (this.hash === '') {
      this.signup();
      return true;
    }
    if (hash(this.password) === this.hash) {
      this.isLogin = true;
      propertyStore.init(hash(this.password + this.hash));
      return true;
    }
    return false;
  }

  setPassword(password: string) {
    this.password = password;
  }
}

const loginStore = new Login();
export default loginStore;
