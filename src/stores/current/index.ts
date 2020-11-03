import {makeAutoObservable} from 'mobx';
import {Property, Signature} from "@0auth/message";
import {DynamicFormInput} from "../../components/register";

class Current {
  title: string | undefined = undefined;
  favicon: string | undefined = undefined;
  properties: Property[] = [];
  sign: Signature | undefined = undefined;
  form: DynamicFormInput[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(properties: Property[], sign: Signature | undefined) {
    this.clear();
    this.properties = properties;
    this.sign = sign;
  }

  setRegister(form: DynamicFormInput[]) {
    this.clear();
    this.form = form;
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
