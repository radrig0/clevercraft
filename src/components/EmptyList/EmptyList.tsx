import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import s from '@src/components/EmptyList/EmptyList.css';

export class EmptyList extends React.Component {
  public render() {
    return (
      <div className={s.emptyList}>
        <span>List is empty</span>
      </div>
    );
  }
}
