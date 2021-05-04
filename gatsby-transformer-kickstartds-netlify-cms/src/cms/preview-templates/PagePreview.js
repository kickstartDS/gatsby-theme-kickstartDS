import React, { Component } from 'react';
import { KickstartDSPage } from 'gatsby-theme-kickstartds/src/components/KickstartDSPageComponent';

class PagePreview extends Component {
  componentDidMount() {
    [...document.getElementsByTagName('style')].forEach((styleTag) => {
      if (styleTag.type && styleTag.type === 'text/css') {
        const style = this.props.document.createElement('style');
        
        style.type = 'text/css';
        style.innerHTML = styleTag.innerHTML;

        this.props.document.head.appendChild(style);
      }
    });

    /*const script = this.props.document.createElement('script');
    script.src = '/component---gatsby-theme-kickstartds-src-templates-page-js.js';
    this.props.document.head.appendChild(script);*/
  }

  render() {
    const { entry } = this.props; 
    const data = entry.getIn(['data']).toJS();
    data.content = data.content || [];
  
    if (data) {
      return (
        <KickstartDSPage
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