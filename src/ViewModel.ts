import { action, computed, observable } from 'mobx';
import { IEntry, Status } from '@src/components/Entry/Entry';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ItemsService } from '@src/services/ItemsService/ItemsService';

interface IItem {
  id: string;
  author: string;
  title: string;
  description: string;
  tags: string[];
}

export class ViewModel {
  private itemService: ItemsService;

  constructor() {
    this.itemService = new ItemsService();
  }

  @observable public loading = false;
  @observable public rawItems: IEntry[] = [];
  @observable public filteredTags: Set<string> = new Set<string>();

  @action
  public loadItems() {
    this.loading = true;
    this.itemService.loadItems().then(items => {
      this.loading = false;
      this.rawItems = items.map((item: IItem) => ({ ...item, status: Status.toRead } as IEntry));
    });
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

  @action.bound
  public addTag(tag: string) {
    this.filteredTags.add(tag);
  }

  @action.bound
  public removeTag(tag: string) {
    this.filteredTags.delete(tag);
  }

  @action.bound
  public clearTags() {
    this.filteredTags.clear();
  }
}
