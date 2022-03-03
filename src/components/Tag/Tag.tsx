import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import s from '@src/components/Tag/Tag.css';

interface IProps {
  value: string;
  onClick: (value: string) => void;
}

export class Tag extends React.Component<IProps> {
  public render() {
    const { value, onClick } = this.props;
    return (
      <div className={s.tag} onClick={() => onClick(value)}>
        #{value}
      </div>
    );
  }
}
