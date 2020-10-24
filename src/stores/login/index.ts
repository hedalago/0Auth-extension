import {makeAutoObservable} from 'mobx';
import {propertyStore} from "../index";
import {hash} from "@0auth/message";

type LoginType = {
  isLogin: boolean;
  password: string;
}

class Login {
  isLogin: boolean = false;
  password: string = '';
  hash: string = '';

  constructor() {
    makeAutoObservable(this)
    this.init();
  }

  init() {
    chrome.storage.local.get(['hash'], async data => {
      const hash = data.hash;
      if (hash === undefined) {
        return;
      }
      this.hash = hash;
    });
  }

  signup() {
    this.isLogin = true;
    this.hash = hash(this.password);
    const key = hash(this.password+this.hash);
    propertyStore.storeKey(key);
    propertyStore.setKey(key);
  }

  login() {
    if (this.hash === '') {
      this.signup();
      return ;
    }
    if (hash(this.password) === this.hash) {
      this.isLogin = true;
      propertyStore.setKey(hash(this.password+this.hash))
    }
  }

  setPassword(password: string) {
    this.password = password;
  }
}

const loginStore = new Login();
export default loginStore;
