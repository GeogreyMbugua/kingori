import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MobilePhotoStack } from "@/features/about/MobilePhotoStack";

const images = [
  { src: "/images/animated/g1.jpg", alt: "Courtyard", width: 1440, height: 1914 },
  { src: "/images/animated/g2.jpg", alt: "Studio steps", width: 1440, height: 1806 },
] as const;

function stage() {
  const element = document.querySelector("[class*='stage']");
  if (!(element instanceof HTMLElement)) throw new Error("Photograph stack was not rendered");
  return element;
}

function swipe(from: number, to: number, y = 40) {
  const element = stage();
  const pointer = { pointerId: 1, button: 0, isPrimary: true, clientY: y };
  fireEvent.pointerDown(element, { ...pointer, clientX: from });
  fireEvent.pointerMove(element, { ...pointer, clientX: to });
  fireEvent.pointerUp(element, { ...pointer, clientX: to });
  return element;
}

describe("mobile photo stack", () => {
  it("follows a sideways swipe and has no buttons", () => {
    render(<MobilePhotoStack images={images} />);

    expect(screen.queryByRole("button")).toBeNull();
    expect(screen.getByText("01 / 02")).toBeTruthy();
    expect(screen.getByRole("img", { name: "Courtyard" })).toBeTruthy();

    const element = swipe(200, 40);
    expect(element.getAttribute("data-swiping")).toBe("true");
    fireEvent.transitionEnd(element.querySelector("[data-depth='0']") as Element, { propertyName: "transform" });

    expect(screen.getByText("02 / 02")).toBeTruthy();
    expect(screen.getByRole("img", { name: "Studio steps" })).toBeTruthy();
  });

  it("returns with a swipe toward the right and with the arrow keys", () => {
    render(<MobilePhotoStack images={images} />);
    const element = stage();

    fireEvent.keyDown(element, { key: "ArrowRight" });
    expect(screen.getByText("02 / 02")).toBeTruthy();

    swipe(40, 200);
    fireEvent.transitionEnd(element.querySelector("[data-depth='0']") as Element, { propertyName: "transform" });
    expect(screen.getByText("01 / 02")).toBeTruthy();
  });

  it("ignores a short or vertical movement", () => {
    render(<MobilePhotoStack images={images} />);

    swipe(100, 112);
    expect(screen.getByText("01 / 02")).toBeTruthy();

    const element = stage();
    fireEvent.pointerDown(element, { pointerId: 1, button: 0, isPrimary: true, clientX: 100, clientY: 40 });
    fireEvent.pointerMove(element, { pointerId: 1, button: 0, isPrimary: true, clientX: 108, clientY: 140 });
    fireEvent.pointerUp(element, { pointerId: 1, button: 0, isPrimary: true, clientX: 108, clientY: 140 });
    expect(screen.getByText("01 / 02")).toBeTruthy();
  });
});
