import { FunctionComponent } from 'react';
import { KickstartDSLayout } from './KickstartDSLayoutComponent';
import { Keyvisual } from '@rm-frontend/visuals/source/2-molecules/keyvisual/keyvisual/KeyvisualComponent';
import { NewsList } from '@rm-frontend/news/source/3-organisms/news/news-list/NewsListComponent';
import { KickstartDSPageProps } from './KickstartDSPageProps';

const elementCounter = [];

/*function getComponent(element) {
  elementCounter[element.type] = elementCounter[element.type]+1 || 1;
  const key = `${element.type}-'+${elementCounter[element.type]}`;

  console.log(key, element);

  switch (element.type) {
    case 'teaser-box':
      //return <Teaserbox key={key} data={element} />;
    case 'textpic-intextleft':
      //return <TextpicIntextleft key={key} data={element} />;
    default:
      return `No component definition for type: ${element.type}`;
  }
};*/

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

    <NewsList news-items={content} />
  </KickstartDSLayout>
);

// {content && content.length > 0 && content.map((element) => getComponent(element))}