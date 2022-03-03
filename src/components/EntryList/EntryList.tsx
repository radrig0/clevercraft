import { observer } from 'mobx-react';
import React from 'react';
import { EmptyList } from '@src/components/EmptyList/EmptyList';
import { Entry, IEntry } from '@src/components/Entry/Entry';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import s from '@src/components/EntryList/EntryList.css';
import { Tag } from '@src/components/Tag/Tag';
import { ViewModel } from '@src/ViewModel';

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

  public render() {
    const { vm } = this.props;
    return (
      <React.Fragment>
        {vm.filteredTags.size > 0 && this.tagsRender}
        {this.filteredEntries.length ? (
          <React.Fragment>
            {this.filteredEntries.map((item: IEntry) => (
              <Entry key={item.id} entry={item} vm={vm} />
            ))}
          </React.Fragment>
        ) : (
          <EmptyList />
        )}
      </React.Fragment>
    );
  }
}
