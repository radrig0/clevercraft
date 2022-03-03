import { action, computed, observable } from 'mobx';
import { IEntry, Status } from '@src/components/Entry/Entry';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as data from '@src/testItems.json';

interface IItem {
  id: string;
  author: string;
  title: string;
  description: string;
  tags: string[];
}

export class ViewModel {
  @observable public rawItems: IEntry[] = [];

  @action
  public loadItems() {
    this.rawItems = data.items.map((item: IItem) => ({ ...item, status: Status.toRead } as IEntry));
  }

  @computed
  public get toReadBooks() {
    return this.rawItems.filter(item => item.status === Status.toRead) || [];
  }

  @computed
  public get inProgressBooks() {
    return this.rawItems.filter(item => item.status === Status.inProgress) || [];
  }

  @computed
  public get doneBooks() {
    return this.rawItems.filter(item => item.status === Status.done) || [];
  }

  @action
  public readBook(id: string) {
    const foundBook = this.rawItems.find(item => item.id === id);
    if (foundBook && foundBook.status === Status.toRead) {
      foundBook.status = Status.inProgress;
    }
  }

  @action
  public doneBook(id: string) {
    const foundBook = this.rawItems.find(item => item.id === id);
    if (foundBook && foundBook.status === Status.inProgress) {
      foundBook.status = Status.done;
    }
  }

  @action
  public resetBook(id: string) {
    const foundBook = this.rawItems.find(item => item.id === id);
    if (foundBook && foundBook.status === Status.done) {
      foundBook.status = Status.toRead;
    }
  }
}
