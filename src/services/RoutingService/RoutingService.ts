import { action, computed, observable } from 'mobx';

enum QUERY_PARAMS {
  TAB = 'tab',
  TAGS = 'tags',
}

export class RoutingService {
  @observable private currentUrl: URL = new URL(window.location.href);

  constructor() {
    window.addEventListener('popstate', this.update);
  }

  @action.bound
  public update() {
    this.currentUrl = new URL(window.location.href);
  }

  @computed public get currentTab() {
    return this.currentUrl.searchParams.get(QUERY_PARAMS.TAB);
  }

  @computed public get selectedTags() {
    const currentTags = this.currentUrl.searchParams.get(QUERY_PARAMS.TAGS);
    if (currentTags) {
      return new Set<string>(currentTags.split(','));
    } else {
      return new Set<string>();
    }
  }

  public setTab(value: string) {
    const url = new URL(window.location.href);
    url.searchParams.set(QUERY_PARAMS.TAB, value);
    window.history.pushState({}, '', url);
    this.update();
  }

  @action.bound
  public setTag(value: string) {
    const url = new URL(window.location.href);
    const currentTags = new Set(this.selectedTags);
    currentTags.add(value);
    url.searchParams.set(QUERY_PARAMS.TAGS, [...currentTags.values()].join(','));
    window.history.pushState({}, '', url);
    this.update();
  }

  @action.bound
  public removeTag(value: string) {
    const url = new URL(window.location.href);
    const currentTags = new Set(this.selectedTags);
    currentTags.delete(value);
    if (currentTags.size) {
      url.searchParams.set(QUERY_PARAMS.TAGS, [...currentTags.values()].join(','));
    } else {
      url.searchParams.delete(QUERY_PARAMS.TAGS);
    }
    window.history.pushState({}, '', url);
    this.update();
  }

  @action.bound
  public clearTags() {
    const url = new URL(window.location.href);
    url.searchParams.delete(QUERY_PARAMS.TAGS);
    window.history.pushState({}, '', url);
    this.update();
  }
}
