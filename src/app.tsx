import * as React from 'react';
import { Link } from '@src/components/Link/Link';
import { Tag } from '@src/components/Tag/Tag';

export class App extends React.Component {
  public render() {
    return (
      <div>
        <Tag value={'CleverCraft'} />
        <Link text={'link to →'} onClick={console.log} />
        <Link text={'link back ↲'} onClick={console.log} />
      </div>
    );
  }
}
