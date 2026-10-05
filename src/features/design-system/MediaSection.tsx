import { ImageFrame } from "@/components/media/ImageFrame";
import { MediaPlaceholder } from "@/components/media/MediaPlaceholder";
import { Grid, GridItem } from "@/components/layout/Grid";
import { Text } from "@/components/typography/Text";
import { Section } from "@/components/ui/Section";
import { designSystemDemo } from "@/content/demo/design-system";
import { buildSizes } from "@/lib/media";
import type { AspectRatio } from "@/types/media";

const CROPS: readonly AspectRatio[] = ["21:9", "16:9", "1:1", "4:5"];
const halfSizes = buildSizes({ base: "100vw", tablet: "50vw", wide: "52rem" });

export function MediaSection() {
  const card = designSystemDemo.focalCard;

  return (
    <Section label="Media" labelledBy="ds-media">
      <h2 id="ds-media">Images and placeholders</h2>
      <Text variant="body-sm">
        The same test card cropped to each ratio. The target marks the focal point and must stay
        in frame in every crop.
      </Text>
      <Grid>
        {CROPS.map((ratio) => (
          <GridItem key={ratio} span={{ tablet: 4, desktop: 6 }}>
            <ImageFrame image={card} ratio={ratio} sizes={halfSizes} caption={`Crop ${ratio}`} />
          </GridItem>
        ))}
        <GridItem span={{ tablet: 8, desktop: 12 }}>
          <ImageFrame
            image={card}
            sizes={buildSizes({ base: "100vw", wide: "80rem" })}
            caption="Intrinsic ratio with caption and credit."
            credit="Credit: specimen"
          />
        </GridItem>
        {(["4:5", "3:2", "16:9"] as const).map((ratio) => (
          <GridItem key={ratio} span={{ tablet: 4, desktop: 4 }}>
            <MediaPlaceholder ratio={ratio} label={`Placeholder ${ratio}`} />
          </GridItem>
        ))}
      </Grid>
      <Text variant="body-sm">
        Video ships no sample asset. Player mode uses native controls and requires captions for
        any meaningful audio; ambient mode is muted, has a pause control, and never autoplays
        under reduced motion.
      </Text>
    </Section>
  );
}
