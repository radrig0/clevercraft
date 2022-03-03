import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import s from '@src/components/Link/Link.css';

interface IProps {
  text: string;
  icon?: JSX.Element | string;
  onClick: () => void;
}

export class Link extends React.Component<IProps> {
  public render() {
    return (
      <div className={s.wrapper} onClick={this.props.onClick}>
        <div className={s.link}>{this.props.text}</div>
        {this.props.icon && <div className={s.icon}>{this.props.icon}</div>}
      </div>
    );
  }
}
