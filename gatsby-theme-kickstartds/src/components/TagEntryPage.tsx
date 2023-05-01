import React from "react";
import { FunctionComponent } from "react";

import { Section } from "@kickstartds/base/lib/section";
import { TextMedia } from "@kickstartds/base/lib/text-media";
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

export const TagEntryPage: FunctionComponent<any> = ({
  tagLabel,
  related,
  external,
  description,
}) => (
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
      <Section
        headline={{
          content: "Continue exploring kickstartDS...",
          level: "h2",
          subheadline: "Content directly related to kickstartDS",
          align: "left",
        }}
        spaceBefore="default"
        spaceAfter="none"
        width="wide"
        mode="tile"
        gutter="large"
      >
        {shuffleArray(related).map((related) => (
          <Related {...related} />
        ))}
      </Section>
    )}

    {description && (
      <Section
        headline={{
          content: `Definition for "${tagLabel.label}"`,
          level: "h3",
          align: "left",
        }}
        width="narrow"
        spaceAfter="default"
      >
        <TextMedia text={description} />
      </Section>
    )}

    {external && external.length > 0 && (
      <Section
        headline={{
          content: "... or explore other related, external content",
          level: "h2",
          subheadline: "Sourced from our Design System concierge database",
          align: "left",
        }}
        spaceBefore="none"
        width="wide"
        mode="tile"
        gutter="large"
      >
        {shuffleArray(external).map((external) => (
          <Related {...external} />
        ))}
      </Section>
    )}
  </>
);
