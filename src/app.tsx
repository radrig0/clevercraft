import { observer } from 'mobx-react';
import * as React from 'react';
import { EntryList } from '@src/components/EntryList/EntryList';
import { Tabs } from '@src/components/Tabs/Tabs';
import { ViewModel } from '@src/ViewModel';

interface IProps {
  vm: ViewModel;
}

interface IState {
  activeTab: string;
}

@observer
export class App extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = { activeTab: this.tabs[0].id };
    this.props.vm.loadItems();
  }

  private get tabs() {
    const { toReadBooks, inProgressBooks, doneBooks } = this.props.vm;
    return [
      {
        id: 'toRead',
        title: `To read (${toReadBooks.length})`,
        content: <EntryList vm={this.props.vm} entries={toReadBooks} />,
      },
      {
        id: 'inProgress',
        title: `In progress (${inProgressBooks.length})`,
        content: <EntryList vm={this.props.vm} entries={inProgressBooks} />,
      },
      {
        id: 'done',
        title: `Done (${doneBooks.length})`,
        content: <EntryList vm={this.props.vm} entries={doneBooks} />,
      },
    ];
  }

  private selectTab = (tabName: string) => {
    this.setState({ activeTab: tabName });
  };

  public render() {
    return <Tabs tabs={this.tabs} activeTab={this.state.activeTab} selectActiveTab={this.selectTab} />;
  }
}
