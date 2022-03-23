import classNames from 'classnames';
import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import s from '@src/components/Tag/Tag.css';

interface IProps {
  value: string;
  onClick: (value: string) => void;
  disabled?: boolean;
}

export class Tag extends React.Component<IProps> {
  private onClick = () => {
    if (!this.props.disabled) {
      this.props.onClick(this.props.value);
    }
  };

  public render() {
    const { value, disabled } = this.props;
    return (
      <div className={classNames(s.tag, { [s.disabled]: disabled })} onClick={this.onClick}>
        #{value}
      </div>
    );
  }
}
