import * as React from 'react';
import { EmptyList } from '@src/components/EmptyList/EmptyList';
import { Link } from '@src/components/Link/Link';
import { Tabs } from '@src/components/Tabs/Tabs';
import { Tag } from '@src/components/Tag/Tag';

interface IState {
  activeTab: string;
}

const tabs = new Map<string, JSX.Element>();
tabs.set('Tab 1', <EmptyList index={'1'} />);
tabs.set('Tab 2', <EmptyList index={'2'} />);
tabs.set('Tab 3', <EmptyList index={'3'} />);

export class App extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = { activeTab: [...tabs.keys()][1] };
  }

  public selectTab = (tabName: string) => {
    this.setState({ activeTab: tabName });
  };

  public render() {
    return (
      <div>
        <Tag value={'CleverCraft'} />
        <Link text={'link to →'} onClick={console.log} />
        <Link text={'link back ↲'} onClick={console.log} />
        <Tabs tabs={tabs} activeTab={this.state.activeTab} selectActiveTab={this.selectTab} />
      </div>
    );
  }
}
