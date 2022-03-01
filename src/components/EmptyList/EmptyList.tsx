import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import s from '@src/components/EmptyList/EmptyList.css';

interface IProps {
  index: string;
}

export class EmptyList extends React.Component<IProps> {
  public render() {
    return (
      <div className={s.emptyList}>
        <span>List is empty {this.props.index}</span>
      </div>
    );
  }
}
