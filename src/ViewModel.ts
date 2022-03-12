import { action, computed, observable } from 'mobx';
import { IEntry, Status } from '@src/components/Entry/Entry';
import { ItemsService } from '@src/services/ItemsService/ItemsService';
import { RoutingService } from '@src/services/RoutingService/RoutingService';

export class ViewModel {
  private itemService: ItemsService;
  private routingService: RoutingService;

  constructor() {
    this.itemService = new ItemsService();
    this.routingService = new RoutingService();
  }

  @observable public loading = false;

  @observable private rawData: Map<string, IEntry> = new Map();

  @action
  public loadItems() {
    this.loading = true;
    this.itemService.loadItems().then(items => {
      items.forEach(item => {
        this.rawData.set(item.id, {
          ...item,
          status: window.localStorage.getItem(item.id) || Status.toRead,
        } as IEntry);
      });
      this.loading = false;
    });
  }

  private filterItem(status: Status) {
    const result = [];
    for (const item of this.rawData.values()) {
      if (item.status === status) {
        result.push(item);
      }
    }
    return result;
  }

  @computed
  public get toReadBooks() {
    return this.filterItem(Status.toRead);
  }

  @computed
  public get inProgressBooks() {
    return this.filterItem(Status.inProgress);
  }

  @computed
  public get doneBooks() {
    return this.filterItem(Status.done);
  }

  @action
  public readBook(id: string) {
    const foundBook = this.rawData.get(id);
    if (foundBook) {
      foundBook.status = Status.inProgress;
      window.localStorage.setItem(foundBook.id, Status.inProgress);
    }
  }

  @action
  public doneBook(id: string) {
    const foundBook = this.rawData.get(id);
    if (foundBook) {
      foundBook.status = Status.done;
      window.localStorage.setItem(foundBook.id, Status.done);
    }
  }

  @action
  public resetBook(id: string) {
    const foundBook = this.rawData.get(id);
    if (foundBook) {
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
