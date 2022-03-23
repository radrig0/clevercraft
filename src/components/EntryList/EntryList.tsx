import { observer } from 'mobx-react';
import React from 'react';
import { AutoSizer, List } from 'react-virtualized';
import { ListRowProps } from 'react-virtualized/dist/es/List';
import { EmptyList } from '@src/components/EmptyList/EmptyList';
import { Entry, IEntry } from '@src/components/Entry/Entry';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import s from '@src/components/EntryList/EntryList.css';
import { PlaceHolder } from '@src/components/PlaceHolder/PlaceHolder';
import { Tag } from '@src/components/Tag/Tag';
import { ViewModel } from '@src/ViewModel';
import 'react-virtualized/styles.css';

const COUNT_NEED_VIRTUALIZED = 1000;

interface IProps {
  vm: ViewModel;
  entries: IEntry[];
}

@observer
export class EntryList extends React.Component<IProps> {
  private get tagsRender() {
    const { vm } = this.props;
    return (
      <div className={s.filteredTags}>
        {[...vm.filteredTags].map(tag => (
          <Tag key={tag} value={tag} onClick={vm.removeTag} />
        ))}
        <span className={s.clearTags} onClick={vm.clearTags}>
          (clear)
        </span>
      </div>
    );
  }

  private get filteredEntries() {
    const { vm, entries } = this.props;
    return vm.filteredTags.size
      ? entries.filter(entry => [...vm.filteredTags.values()].every(tag => entry.tags.includes(tag)))
      : entries;
  }

  private rowRender = (props: ListRowProps) => {
    if (props.isScrolling) {
      return (
        <div style={props.style} key={props.key} className={s.scrollingPlaceholder}>
          Scrolling...
        </div>
      );
    }
    return <Entry key={props.key} entry={this.filteredEntries[props.index]} vm={this.props.vm} style={props.style} />;
  };

  private get virtualizedRender() {
    return (
      <AutoSizer>
        {({ height, width }) => {
          let rowHeight;
          switch (true) {
            case width < 650:
              rowHeight = 250;
              break;

            case width < 800:
              rowHeight = 220;
              break;

            case width < 1160:
              rowHeight = 200;
              break;

            default:
              rowHeight = 180;
          }

          return (
            <List
              width={width}
              height={height}
              rowCount={this.filteredEntries.length}
              rowHeight={rowHeight}
              rowRenderer={this.rowRender}
            />
          );
        }}
      </AutoSizer>
    );
  }

  private get baseRender() {
    return this.filteredEntries.map((item: IEntry) => <Entry key={item.id} entry={item} vm={this.props.vm} />);
  }

  public render() {
    const { vm } = this.props;

    if (vm.loading) {
      return <PlaceHolder />;
    }

    return (
      <div className={s.wrapper}>
        {vm.filteredTags.size > 0 && this.tagsRender}
        <div className={s.list}>
          {this.filteredEntries.length ? (
            this.filteredEntries.length > COUNT_NEED_VIRTUALIZED ? (
              this.virtualizedRender
            ) : (
              this.baseRender
            )
          ) : (
            <EmptyList />
          )}
        </div>
      </div>
    );
  }
}
