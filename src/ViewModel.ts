import { action, computed, observable } from 'mobx';
import { IEntry, Status } from '@src/components/Entry/Entry';
import { ItemsService } from '@src/services/ItemsService/ItemsService';
import { RoutingService } from '@src/services/RoutingService/RoutingService';

interface IItem {
  id: string;
  author: string;
  title: string;
  description: string;
  tags: string[];
}

export class ViewModel {
  private itemService: ItemsService;
  private routingService: RoutingService;

  constructor() {
    this.itemService = new ItemsService();
    this.routingService = new RoutingService();
  }

  @observable public loading = false;

  @observable private rawItems: IEntry[] = [];

  @action
  public loadItems() {
    this.loading = true;
    this.itemService.loadItems().then(items => {
      this.rawItems = items.map(
        (item: IItem) => ({ ...item, status: window.localStorage.getItem(item.id) || Status.toRead } as IEntry)
      );
      this.loading = false;
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
      window.localStorage.setItem(foundBook.id, Status.inProgress);
    }
  }

  @action
  public doneBook(id: string) {
    const foundBook = this.rawItems.find(item => item.id === id);
    if (foundBook && foundBook.status === Status.inProgress) {
      foundBook.status = Status.done;
      window.localStorage.setItem(foundBook.id, Status.done);
    }
  }

  @action
  public resetBook(id: string) {
    const foundBook = this.rawItems.find(item => item.id === id);
    if (foundBook && foundBook.status === Status.done) {
      foundBook.status = Status.toRead;
      window.localStorage.removeItem(foundBook.id);
    }
  }

  @computed
  public get filteredTags(): Set<string> {
    return this.routingService.selectedTags;
  }

  public addTag = (tag: string) => {
    this.routingService.setTag(tag);
  };

  public removeTag = (tag: string) => {
    this.routingService.removeTag(tag);
  };

  public clearTags = () => {
    this.routingService.clearTags();
  };

  @computed
  public get activeTab() {
    return this.routingService.currentTab || '';
  }

  public selectTab = (value: string) => {
    if (value !== this.activeTab) {
      this.routingService.setTab(value);
    }
  };
}
