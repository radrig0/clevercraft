import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import s from '@src/components/Entry/Entry.css';
import { Link } from '@src/components/Link/Link';
import { Tag } from '@src/components/Tag/Tag';
import { ViewModel } from '@src/ViewModel';

export enum Status {
  toRead,
  inProgress,
  done,
}

export interface IEntry {
  id: string;
  author: string;
  title: string;
  description: string;
  tags: string[];
  status: Status;
}

interface IProps {
  entry: IEntry;
  vm: ViewModel;
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
    const { entry, vm } = this.props;
    return (
      <div className={s.wrapper}>
        <div>{entry.author}</div>
        <div className={s.titleWrapper}>
          <div className={s.title}>{entry.title}</div>
          {this.actionLinkRender}
        </div>
        <div className={s.description}>{entry.description}</div>
        {entry.tags.length && (
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
