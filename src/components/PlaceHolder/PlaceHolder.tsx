import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import s from '@src/components/PlaceHolder/PlaceHolder.css';

export class PlaceHolder extends React.Component {
  public render() {
    return (
      <div className={s.placeHolder}>
        <span>Loading...</span>
      </div>
    );
  }
}
