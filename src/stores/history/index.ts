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
    if (chrome.storage === undefined) {
      return;
    }
    chrome.storage.local.get(['history'], async (data) => {
      if (data.history === undefined) {
        return ;
      }
      this.histories = data.history;
    });
  }

  addHistory(host: string, type: string) {
    if (this.histories[host] === undefined) {
      this.histories[host] = [];
    }
    this.histories[host].push({
      host,
      type,
      createdAt: new Date()
    })
    chrome.storage.local.set({ history: JSON.parse(JSON.stringify(this.histories)) });
  }

  history(host: string | undefined): HistoryInfo[] {
    return host !== undefined ? this.histories[host] : [];
  }
}

const historyStore = new History();
export default historyStore;
