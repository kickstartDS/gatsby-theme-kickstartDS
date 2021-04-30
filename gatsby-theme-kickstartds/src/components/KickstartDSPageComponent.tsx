import { FunctionComponent } from 'react';
import { KickstartDSLayout } from './KickstartDSLayoutComponent';

import { Visual } from '@kickstartds/content';
import { NewsList } from '@kickstartds/blog';
import { TextMedia } from '@kickstartds/base';

import { KickstartDSPageProps } from './KickstartDSPageProps';

const elementCounter = [];

const getComponent = (element) => {
  elementCounter[element.type] = elementCounter[element.type]+1 || 1;
  const key = `${element.type}-${elementCounter[element.type]}`;

  switch (element.type) {
    case 'text-media':
      return <TextMedia key={key} {...element} />
    case 'news-list':
      return <NewsList key={key} {...element} />;
    default:
      return `No component definition for type: ${element.type}`;
  }
};

// TODO add `KickstertLayoutProps`
export const KickstartDSPage: FunctionComponent<KickstartDSPageProps> = ({
  keyvisual,
  heading,
  content,
}) => (
  <KickstartDSLayout>
    {keyvisual && <Visual {...keyvisual} />}

    <div className="l-section">
      <div className="l-main-wrap">
        <header className="content-headline content-headline--page-header">
          <h1>{heading}</h1>
        </header>
      </div>
    </div>

    {content && content.length > 0 && content.map((element) => getComponent(element))}
  </KickstartDSLayout>
);
