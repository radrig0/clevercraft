import * as React from 'react';
import { EmptyList } from '@src/components/EmptyList/EmptyList';
import { Entry, IEntry } from '@src/components/Entry/Entry';
import { Tabs } from '@src/components/Tabs/Tabs';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as items from '@src/testItems.json';

interface IState {
  activeTab: string;
}

const tabs = new Map<string, JSX.Element>();
tabs.set(`Tab 1 (${0})`, <EmptyList index={'1'} />);
tabs.set(
  `Tab 2 (${items.items.length})`,
  items.items.map((item: IEntry) => <Entry key={item.id} entry={item} />)
);
tabs.set(`Tab 3 (${0})`, <EmptyList index={'3'} />);

export class App extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = { activeTab: [...tabs.keys()][1] };
  }

  public selectTab = (tabName: string) => {
    this.setState({ activeTab: tabName });
  };

  public render() {
    return <Tabs tabs={tabs} activeTab={this.state.activeTab} selectActiveTab={this.selectTab} />;
  }
}
