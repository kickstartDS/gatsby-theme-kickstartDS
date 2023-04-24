import React from "react";
import { FunctionComponent } from "react";

import { Section } from "@kickstartds/base/lib/section";
import { Related } from "@kickstartds/design-system/dist/components/related/RelatedComponent";

export const TagEntryPage: FunctionComponent<any> = ({ tagLabel, related }) => (
  <>
    <Section
      headline={{
        content: `Content tagged with: "${tagLabel.label}"`,
        level: "h1",
        subheadline: "Explore more content related to this tag",
        align: "center",
      }}
      width="wide"
      spaceAfter="none"
    />

    {related && related.length > 0 && (
      <Section spaceBefore="default" width="wide" mode="tile" gutter="large">
        {related.map((related) => (
          <Related {...related} />
        ))}
      </Section>
    )}
  </>
);
