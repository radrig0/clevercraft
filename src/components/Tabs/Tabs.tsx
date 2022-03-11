import classNames from 'classnames';
import { observer } from 'mobx-react';
import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import s from '@src/components/Tabs/Tabs.css';

export interface ITab {
  id: string;
  title: string;
  content: JSX.Element;
}

interface IProps {
  tabs: ITab[];
  activeTab: string;
  selectActiveTab: (title: string) => void;
}

@observer
export class Tabs extends React.Component<IProps> {
  public render() {
    return (
      <div className={s.wrapper}>
        <div className={s.titles}>
          {this.props.tabs.map(tab => (
            <div
              className={classNames(s.title, { [s.activeTitle]: tab.id === this.props.activeTab })}
              key={tab.id}
              onClick={() => this.props.selectActiveTab(tab.id)}
            >
              {tab.title}
            </div>
          ))}
        </div>
        {this.props.tabs.map(tab => {
          return (
            <div className={classNames(s.content, { [s.activeContent]: tab.id === this.props.activeTab })} key={tab.id}>
              {tab.content}
            </div>
          );
        })}
      </div>
    );
  }
}
