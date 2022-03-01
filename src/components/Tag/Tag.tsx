import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import s from '@src/components/Tag/Tag.css';

interface IProps {
  value: string;
}

export class Tag extends React.Component<IProps> {
  public render() {
    return <div className={s.tag}>#{this.props.value}</div>;
  }
}
