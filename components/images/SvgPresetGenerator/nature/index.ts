import type { LandscapeSubType } from "@/lib/images/landscapes";
import { SVG_INNER as NATURE_INNER } from "./nature";
import { SVG_INNER as DESERT_INNER } from "./desert";
import { SVG_INNER as MOUNTAIN_RIVER_INNER } from "./mountain-river";
import { SVG_INNER as TREE_FOREST_INNER } from "./tree-forest";
import { SVG_INNER as RIVER_INNER } from "./river";
import { SVG_INNER as WATERFALL_INNER } from "./waterfall";

export const NATURE_LANDSCAPE_SVG_INNER: Record<LandscapeSubType, string> = {
  nature:           NATURE_INNER,
  desert:           DESERT_INNER,
  "mountain-river": MOUNTAIN_RIVER_INNER,
  "tree-forest":    TREE_FOREST_INNER,
  river:            RIVER_INNER,
  waterfall:        WATERFALL_INNER,
};
