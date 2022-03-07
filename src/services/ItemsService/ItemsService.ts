export class ItemsService {
  private baseItemsUrl = 'https://raw.githubusercontent.com/lastw/test-task/master/data/10-items.json';
  private manyItemsUrl = 'https://raw.githubusercontent.com/lastw/test-task/master/data/30000-items.json';

  public async loadItems() {
    const response = await fetch(this.baseItemsUrl);
    const { items } = await response.json();
    return items;
  }
}
