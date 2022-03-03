import { observer } from 'mobx-react';
import * as React from 'react';
import { EmptyList } from '@src/components/EmptyList/EmptyList';
import { Entry, IEntry } from '@src/components/Entry/Entry';
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
        content: toReadBooks.length ? (
          <React.Fragment>
            {toReadBooks.map((item: IEntry) => (
              <Entry key={item.id} entry={item} vm={this.props.vm} />
            ))}
          </React.Fragment>
        ) : (
          <EmptyList />
        ),
      },
      {
        id: 'inProgress',
        title: `In progress (${inProgressBooks.length})`,
        content: inProgressBooks.length ? (
          <React.Fragment>
            {inProgressBooks.map((item: IEntry) => (
              <Entry key={item.id} entry={item} vm={this.props.vm} />
            ))}
          </React.Fragment>
        ) : (
          <EmptyList />
        ),
      },
      {
        id: 'done',
        title: `Done (${doneBooks.length})`,
        content: doneBooks.length ? (
          <React.Fragment>
            {doneBooks.map((item: IEntry) => (
              <Entry key={item.id} entry={item} vm={this.props.vm} />
            ))}
          </React.Fragment>
        ) : (
          <EmptyList />
        ),
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
