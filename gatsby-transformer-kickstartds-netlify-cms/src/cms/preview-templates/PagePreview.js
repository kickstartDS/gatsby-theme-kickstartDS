import React, { Component } from 'react';
import { PageTemplate } from '../templates/PageTemplate';

import * as assets from '../../../../gatsby-theme-kickstartds/src/assets/asset-paths.json';

class PagePreview extends Component {
  componentDidMount() {
    const { document } = this.props;

    [...assets.js].forEach((asset) => {
      const script = document.createElement('script');
      script.src = `..${asset}`;
      document.head.appendChild(script);
    });
  }

  render() {
    const { entry } = this.props; 
    const data = entry.getIn(['data']).toJS();
    data.content = data.content || [];
  
    if (data) {
      return (
        <PageTemplate
          keyvisual={data.keyvisual}
          heading={data.heading}
          content={data.content}
        />
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

export default PagePreview;