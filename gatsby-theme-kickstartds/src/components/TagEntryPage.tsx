import React from "react";
import { FunctionComponent } from "react";

import { Section } from "@kickstartds/base/lib/section";
import { Related } from "@kickstartds/design-system/dist/components/related/RelatedComponent";

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
};

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
        {shuffleArray(related).map((related) => (
          <Related {...related} />
        ))}
      </Section>
    )}
  </>
);
