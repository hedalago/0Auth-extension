import {makeAutoObservable} from 'mobx';

type HistoryInfo = {
  host: string;
  type: string;
  createdAt: Date;
}

class History {
  histories: { [host: string]: HistoryInfo[] } = {};

  constructor() {
    makeAutoObservable(this);
  }

  addHistory(host: string, type: string) {
    this.histories[host].push({
      host,
      type,
      createdAt: new Date()
    })
  }

  history(host: string | undefined): HistoryInfo[] {
    return host !== undefined ? this.histories[host] : [];
  }
}

const historyStore = new History();
export default historyStore;
