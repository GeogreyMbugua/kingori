import { Grid, GridItem } from "@/components/layout/Grid";
import { MediaSlot } from "@/components/media/MediaSlot";
import { Reveal } from "@/components/motion/Reveal";
import { buildSizes } from "@/lib/media";
import type { EditorialFigure } from "@/types/content";
import type { AspectRatio } from "@/types/media";
import styles from "./FigureSequence.module.css";

const UPRIGHT: readonly AspectRatio[] = ["4:5", "3:4", "1:1"];

const wideSizes = buildSizes({ base: "100vw", wide: "104rem" });
const halfSizes = buildSizes({ base: "100vw", tablet: "50vw", wide: "52rem" });

type Placement = "wide" | "pair-first" | "pair-second" | "single";

/**
 * Rhythm comes from the crops the editor chose: landscape frames run the full
 * width; consecutive upright frames pair up, the second dropped lower so the
 * eye zig-zags; a lone upright frame sits off-centre rather than stranded.
 */
export function placeFigures(figures: readonly EditorialFigure[]): readonly Placement[] {
  const placements: Placement[] = [];
  figures.forEach((figure, index) => {
    if (!UPRIGHT.includes(figure.ratio)) {
      placements.push("wide");
      return;
    }
    if (placements[index - 1] === "pair-first") {
      placements.push("pair-second");
      return;
    }
    const next = figures[index + 1];
    placements.push(next && UPRIGHT.includes(next.ratio) ? "pair-first" : "single");
  });
  return placements;
}

const SPANS = {
  wide: { span: undefined, start: undefined },
  "pair-first": { span: { tablet: 4, desktop: 5 }, start: { desktop: 1 } },
  "pair-second": { span: { tablet: 4, desktop: 5 }, start: { desktop: 8 } },
  single: { span: { tablet: 5, desktop: 5 }, start: { tablet: 3, desktop: 6 } },
} as const;

export function FigureSequence({ figures }: { readonly figures: readonly EditorialFigure[] }) {
  const placements = placeFigures(figures);

  return (
    <Grid className={styles.sequence}>
      {figures.map((figure, index) => {
        const placement = placements[index] ?? "wide";
        const { span, start } = SPANS[placement];

        return (
          <GridItem
            key={index}
            span={span}
            start={start}
            className={placement === "pair-second" ? styles.dropped : undefined}
          >
            <Reveal>
              <MediaSlot
                slot={figure.asset}
                ratio={figure.ratio}
                sizes={placement === "wide" ? wideSizes : halfSizes}
                caption={figure.caption}
              />
            </Reveal>
          </GridItem>
        );
      })}
    </Grid>
  );
}
