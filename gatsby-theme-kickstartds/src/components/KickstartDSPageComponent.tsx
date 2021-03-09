import { FunctionComponent } from 'react';
import { KickstartDSLayout } from './KickstartDSLayoutComponent';
import { Keyvisual } from '@rm-frontend/visuals/source/2-molecules/keyvisual/keyvisual/KeyvisualComponent';
import { NewsList } from '@rm-frontend/news/source/3-organisms/news/news-list/NewsListComponent';
import { TextMedia } from '@rm-frontend/base/source/2-molecules/text-media/TextMediaComponent';
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

export const KickstartDSPage: FunctionComponent<KickstartDSPageProps> = ({
  keyvisual,
  heading,
  content,
}) => (
  <KickstartDSLayout>
    {keyvisual && <Keyvisual {...keyvisual} />}

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
