import * as React from 'react';
import { CSSProperties } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import s from '@src/components/Entry/Entry.css';
import { Link } from '@src/components/Link/Link';
import { Tag } from '@src/components/Tag/Tag';
import { IItem } from '@src/services/ItemsService/ItemsService';
import { ViewModel } from '@src/ViewModel';

export enum Status {
  toRead = 'toRead',
  inProgress = 'inProgress',
  done = 'done',
}

export interface IEntry extends IItem {
  status: Status;
}

interface IProps {
  entry: IEntry;
  vm: ViewModel;
  style?: CSSProperties;
}

export class Entry extends React.Component<IProps> {
  private get actionLinkRender() {
    const { entry, vm } = this.props;
    switch (entry.status) {
      case Status.toRead:
        return <Link text={'start reading'} icon={'→'} onClick={() => vm.readBook(entry.id)} />;
      case Status.inProgress:
        return <Link text={'finish reading'} icon={'→'} onClick={() => vm.doneBook(entry.id)} />;
      case Status.done:
        return <Link text={'return in "to read"'} icon={'↲'} onClick={() => vm.resetBook(entry.id)} />;
    }
  }

  public render() {
    const { entry, vm, style } = this.props;
    return (
      <div className={s.wrapper} style={style}>
        <div>{entry.author}</div>
        <div className={s.titleWrapper}>
          <div className={s.title}>{entry.title}</div>
          {this.actionLinkRender}
        </div>
        <div className={s.description}>{entry.description}</div>
        {Boolean(entry.tags.length) && (
          <div>
            {[...new Set(entry.tags)].map(tag => (
              <Tag key={tag} value={tag} onClick={vm.addTag} />
            ))}
          </div>
        )}
      </div>
    );
  }
}
