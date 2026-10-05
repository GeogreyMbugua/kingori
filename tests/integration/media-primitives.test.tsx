import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ImageFrame } from "@/components/media/ImageFrame";
import { Video } from "@/components/media/Video";
import type { InformativeImage, VideoAsset } from "@/types/media";

const image: InformativeImage = {
  kind: "image",
  src: "/images/test.jpg",
  width: 1600,
  height: 1000,
  alt: "A test image",
  focalPoint: { x: 70, y: 35 },
};

const video: VideoAsset = {
  kind: "video",
  sources: [{ src: "/video/test.mp4", type: "video/mp4" }],
  width: 1920,
  height: 1080,
  poster: { kind: "image", src: "/images/poster.jpg", width: 1920, height: 1080, decorative: true },
  captions: { src: "/video/test.vtt", srcLang: "en", label: "English" },
  description: "A test video",
};

describe("ImageFrame", () => {
  it("crops to the ratio around the focal point", () => {
    const { container } = render(<ImageFrame image={image} sizes="100vw" ratio="4:5" />);
    const img = screen.getByRole("img", { name: "A test image" });
    expect(img.style.objectPosition).toBe("70% 35%");
    expect((img.parentElement as HTMLElement).style.aspectRatio).toBe("4 / 5");
    expect(container.querySelector("figure")).toBeNull();
  });

  it("becomes a figure with caption and credit", () => {
    const { container } = render(
      <ImageFrame image={image} sizes="100vw" caption="Caption" credit="Credit" />,
    );
    const figcaption = container.querySelector("figure > figcaption");
    expect(figcaption?.textContent).toBe("CaptionCredit");
    expect(figcaption?.querySelector("small")?.textContent).toBe("Credit");
  });

  it("renders decorative images with an empty alt", () => {
    const { container } = render(<ImageFrame image={video.poster} sizes="100vw" />);
    expect(container.querySelector("img")?.getAttribute("alt")).toBe("");
  });
});

describe("Video (player)", () => {
  it("uses native controls, loads on demand and includes captions", () => {
    const { container } = render(<Video video={video} />);
    const element = container.querySelector("video");
    expect(element?.hasAttribute("controls")).toBe(true);
    expect(element?.getAttribute("preload")).toBe("none");
    expect(element?.getAttribute("aria-label")).toBe("A test video");
    expect(element?.getAttribute("poster")).toContain("poster.jpg");
    const track = element?.querySelector("track");
    expect(track?.getAttribute("kind")).toBe("captions");
    expect(track?.getAttribute("srclang")).toBe("en");
  });
});

describe("Video (ambient)", () => {
  let play: ReturnType<typeof vi.fn<() => Promise<void>>>;

  function mockReducedMotion(reduce: boolean) {
    vi.stubGlobal(
      "matchMedia",
      vi.fn((query: string) => ({ matches: reduce, media: query })),
    );
  }

  beforeEach(() => {
    play = vi.fn<() => Promise<void>>(() => Promise.resolve());
    vi.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(play);
    vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("autoplays muted without controls when motion is allowed", () => {
    mockReducedMotion(false);
    const { container } = render(<Video video={video} mode="ambient" />);
    const element = container.querySelector("video");
    expect(element?.muted).toBe(true);
    expect(element?.hasAttribute("controls")).toBe(false);
    expect(play).toHaveBeenCalledTimes(1);
  });

  it("never autoplays under reduced motion", () => {
    mockReducedMotion(true);
    render(<Video video={video} mode="ambient" />);
    expect(play).not.toHaveBeenCalled();
    screen.getByRole("button", { name: "Play video" });
  });

  it("labels the control from the actual playback state", () => {
    mockReducedMotion(true);
    const { container } = render(<Video video={video} mode="ambient" />);
    const element = container.querySelector("video") as HTMLVideoElement;

    act(() => {
      fireEvent.play(element);
    });
    screen.getByRole("button", { name: "Pause video" });

    act(() => {
      fireEvent.pause(element);
    });
    screen.getByRole("button", { name: "Play video" });
  });
});
