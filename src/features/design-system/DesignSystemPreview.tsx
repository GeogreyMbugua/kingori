import { Text } from "@/components/typography/Text";
import { Section } from "@/components/ui/Section";
import { designSystemDemo } from "@/content/demo/design-system";
import { ColorSection } from "./ColorSection";
import { ContentStatusSection } from "./ContentStatusSection";
import { LayoutSection } from "./LayoutSection";
import { MediaSection } from "./MediaSection";
import { TypographySection } from "./TypographySection";
import { UiSection } from "./UiSection";

export function DesignSystemPreview() {
  return (
    <>
      <Section spacing="sm">
        <h1>{designSystemDemo.title}</h1>
        <Text variant="body-lg">{designSystemDemo.intro}</Text>
      </Section>
      <ContentStatusSection />
      <ColorSection />
      <TypographySection />
      <UiSection />
      <MediaSection />
      <LayoutSection />
    </>
  );
}
