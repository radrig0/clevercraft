export interface IItem {
  id: string;
  author: string;
  title: string;
  description: string;
  tags: string[];
}

export class ItemsService {
  private baseItemsUrl = 'https://raw.githubusercontent.com/lastw/test-task/master/data/10-items.json';
  private manyItemsUrl = 'https://raw.githubusercontent.com/lastw/test-task/master/data/30000-items.json';

  public async loadItems(): Promise<IItem[]> {
    const response = await fetch(this.baseItemsUrl);
    const { items } = await response.json();
    return items;
  }

  public async loadLocalItems(): Promise<IItem[]> {
    const response = await import('@src/services/ItemsService/manyTestItems');
    return response.default.items;
  }
}
