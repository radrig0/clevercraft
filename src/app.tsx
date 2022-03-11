import { observer } from 'mobx-react';
import * as React from 'react';
import { EntryList } from '@src/components/EntryList/EntryList';
import { Tabs } from '@src/components/Tabs/Tabs';
import { ViewModel } from '@src/ViewModel';

interface IProps {
  vm: ViewModel;
}

@observer
export class App extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
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

  public render() {
    return <Tabs tabs={this.tabs} activeTab={this.props.vm.activeTab} selectActiveTab={this.props.vm.selectTab} />;
  }
}
