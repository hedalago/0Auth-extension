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

class Current {
  title: string | undefined = undefined;
  favicon: string | undefined = undefined;
  sign: Signature | undefined = undefined;
  form: DynamicFormInput[] = [];
  properties: Property[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  auth() {
    sendToWebsite({ sign: this.sign, properties: this.properties });
  }

  register() {
    sendToWebsite({ form: this.form, properties: this.properties });
  }

  changeProperty(index: number, value: PropertyData) {
    this.properties[index].value = value;
  }

  setAuth(host: string) {
    this.clear();
    this.properties = propertyStore.properties[host];
    this.sign = propertyStore.sign[host];
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
