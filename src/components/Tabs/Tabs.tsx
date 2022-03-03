import classNames from 'classnames';
import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import s from '@src/components/Tabs/Tabs.css';

interface IProps {
  tabs: Map<string, JSX.Element>;
  activeTab: string;
  selectActiveTab: (title: string) => void;
}

export class Tabs extends React.Component<IProps> {
  public render() {
    const activeTab = this.props.tabs.has(this.props.activeTab) ? this.props.activeTab : this.props.tabs.keys().next();

    return (
      <div className={s.wrapper}>
        <div className={s.titles}>
          {[...this.props.tabs.keys()].map(title => (
            <div
              className={classNames(s.title, { [s.activeTitle]: title === activeTab })}
              key={title}
              onClick={() => this.props.selectActiveTab(title)}
            >
              {title}
            </div>
          ))}
        </div>
        {[...this.props.tabs.keys()].map(title => (
          <div className={classNames(s.content, { [s.activeContent]: title === activeTab })} key={title}>
            {this.props.tabs.get(title)}
          </div>
        ))}
      </div>
    );
  }
}
