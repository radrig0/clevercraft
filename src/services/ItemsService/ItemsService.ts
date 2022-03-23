export interface IItem {
  id: string;
  author: string;
  title: string;
  description: string;
  tags: string[];
}

const BASE_ITEMS_URL = 'https://raw.githubusercontent.com/lastw/test-task/master/data/10-items.json';
const MANY_ITEMS_URL = 'https://raw.githubusercontent.com/lastw/test-task/master/data/30000-items.json';
const WRONG_ITEMS_URL = 'wrongItemsUrl';

export class ItemsService {
  public async loadItems(): Promise<IItem[]> {
    try {
      const response = await fetch(MANY_ITEMS_URL);
      const { items } = await response.json();
      return items;
    } catch (e) {
      alert('Ошибка при загрузке данных!');
      return [];
    }
  }

  public async loadLocalItems(): Promise<IItem[]> {
    const response = await import('@src/services/ItemsService/manyTestItems');
    return response.default.items;
  }
}
