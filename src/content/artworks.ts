import type { Artwork } from "./types";

/**
 * ORIGINAL PAINTINGS — shown in the gallery and on the homepage.
 *
 * Titles, years, media and dimensions are [placeholders]: fill them in
 * with the artist's real details. `alt` is a plain visual description
 * for screen readers, not an artwork statement.
 *
 * `size` controls how large the painting sits in the asymmetric grid:
 * "l" (large), "m", "s". `printSlug` links it to its print in the shop.
 *
 * To add a painting: put the file in /public/artworks/, then copy an
 * entry below and set `src`, `width` and `height` to the file's real pixels.
 */
export const artworks: Artwork[] = [
  {
    slug: "painting-01",
    title: "painting 01",
    year: "[year]",
    medium: "[medium]",
    dimensions: "[dimensions]",
    image: {
      src: "/artworks/painting-01.jpg",
      width: 2695,
      height: 4054,
      alt: "Painting of a blue telephone receiver, a black handset and a purple arm reaching towards a pink stiletto and a yellow paper plane, on a black-and-white checkerboard floor against lime green.",
      kind: "artwork",
    },
    printSlug: "artwork-01",
    size: "l",
  },
  {
    slug: "painting-02",
    title: "painting 02",
    year: "[year]",
    medium: "[medium]",
    dimensions: "[dimensions]",
    image: {
      // Taken from a phone screenshot (only the phone frame was trimmed).
      // Replace with a high-resolution photo or scan of the painting when available.
      src: "/artworks/painting-02.jpg",
      width: 785,
      height: 896,
      alt: "Painting of tangled figures in blue and green clothing climbing an aluminium ladder with yellow-and-black hazard stripes, hands gripping legs and shoulders, against a red-orange background.",
      kind: "artwork",
    },
    size: "m",
  },
  {
    slug: "painting-03",
    title: "painting 03",
    year: "[year]",
    medium: "[medium]",
    dimensions: "[dimensions]",
    image: {
      src: "/artworks/painting-03.jpg",
      width: 2624,
      height: 3491,
      alt: "Painting of two hands in glossy black gloves, one pulling the other's glove on, over a tiled pattern of blue circles and red wave shapes.",
      kind: "artwork",
    },
    printSlug: "artwork-03",
    size: "l",
  },
  {
    slug: "painting-04",
    title: "painting 04",
    year: "[year]",
    medium: "[medium]",
    dimensions: "[dimensions]",
    image: {
      // Photo of the canvas propped on a shelf beside a plant and a candle, not a straight-on scan.
      // Replace with a flat, high-resolution photo of the painting alone before offering it as a print.
      src: "/artworks/painting-04.jpg",
      width: 1440,
      height: 1800,
      alt: "Painting of a woman's torso in a purple top with a gold '555' necklace, her pink-nailed hands framing a martini glass of orange cocktail with a strawberry and a beaded stem, a green bottle at the left edge. Photographed on a white shelf beside a candle and a potted plant.",
      kind: "artwork",
    },
    size: "m",
  },
  {
    slug: "painting-05",
    title: "painting 05",
    year: "[year]",
    medium: "[medium]",
    dimensions: "[dimensions]",
    image: {
      src: "/artworks/painting-05.jpg",
      width: 2670,
      height: 3844,
      alt: "Painting of a leg in a glossy black knee-high heeled boot beside a sweep of red fabric with a black-gloved hand at its hem, on a blue-and-white checkerboard floor against an orange wall with monstera leaves.",
      kind: "artwork",
    },
    printSlug: "artwork-05",
    size: "l",
  },
  {
    slug: "painting-06",
    title: "painting 06",
    year: "[year]",
    medium: "[medium]",
    dimensions: "[dimensions]",
    image: {
      src: "/artworks/painting-06.jpg",
      width: 2893,
      height: 3934,
      alt: "Painting of a hand pulling a white tissue from a bright blue box, with a blue-gloved hand and a bare hand resting on a pale pink surface, against dark red drapery.",
      kind: "artwork",
    },
    printSlug: "artwork-06",
    size: "m",
  },
  {
    slug: "painting-07",
    title: "painting 07",
    year: "[year]",
    medium: "[medium]",
    dimensions: "[dimensions]",
    image: {
      src: "/artworks/painting-07.jpg",
      width: 3847,
      height: 2861,
      alt: "Painting of four figures shown from the neck down, in green, navy, bright blue and crimson satin shirts, arms wrapped around one another in an embrace, against a pale background.",
      kind: "artwork",
    },
    printSlug: "artwork-07",
    size: "l",
  },
];
