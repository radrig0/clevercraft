import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import s from '@src/components/Link/Link.css';

interface IProps {
  text: string;
  onClick: () => void;
}

export class Link extends React.Component<IProps> {
  public render() {
    return (
      <div onClick={this.props.onClick} className={s.link}>
        {this.props.text}
      </div>
    );
  }
}
