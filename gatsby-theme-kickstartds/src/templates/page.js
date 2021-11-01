import { SEO } from "../components/Seo";
import { Providers } from "../components/Providers";

import { ContentPage } from "../components/ContentPage";
import { BlogDetailPage } from "../components/BlogDetailPage";
import { BlogListPage } from "../components/BlogListPage";
import { GlossaryEntryPage } from "../components/GlossaryEntryPage";

const selectTemplate = (key, props) => {
  switch (key) {
    case 'default':
    case 'content':
      return <ContentPage {...props} />

    case 'blog-list':
      return <BlogListPage {...props} />

    case 'blog-detail':
      return <BlogDetailPage {...props} />

    case 'glossary':
      return <GlossaryEntryPage {...props} />

    default:
      return <ContentPage {...props} />
  }
}

export const GatsbyPage = ({ pageContext: { page } }) => (
  <Providers>
    {selectTemplate(page.layout, page)}
  </Providers>
);

export default GatsbyPage;
