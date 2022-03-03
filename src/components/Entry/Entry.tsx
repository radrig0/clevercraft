import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import s from '@src/components/Entry/Entry.css';
import { Link } from '@src/components/Link/Link';
import { Tag } from '@src/components/Tag/Tag';

export interface IEntry {
  id: string;
  author: string;
  title: string;
  description: string;
  tags: string[];
}

interface IProps {
  entry: IEntry;
}

export class Entry extends React.Component<IProps> {
  public render() {
    const { entry } = this.props;
    return (
      <div className={s.wrapper}>
        <div>{entry.author}</div>
        <div className={s.titleWrapper}>
          <div className={s.title}>{entry.title}</div>
          <Link text={'finish reading'} icon={'→'} onClick={console.log} />
        </div>
        <div className={s.description}>{entry.description}</div>
        <div>
          {entry.tags.map(tag => (
            <Tag key={tag} value={tag} />
          ))}
        </div>
      </div>
    );
  }
}
