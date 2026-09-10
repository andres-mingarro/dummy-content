import type { LandscapeSubType } from "@/lib/images/landscapes";
import { SVG_INNER as DAWN_INNER, VIEW_BOX as DAWN_VB } from "./dawn";
import { SVG_INNER as DESERT_INNER, VIEW_BOX as DESERT_VB } from "./desert";
import { SVG_INNER as CITY_INNER, VIEW_BOX as CITY_VB } from "./city";
import { SVG_INNER as BEACH_INNER, VIEW_BOX as BEACH_VB } from "./beach";
import { SVG_INNER as PARK_INNER, VIEW_BOX as PARK_VB } from "./park";
import { SVG_INNER as MEADOW_INNER, VIEW_BOX as MEADOW_VB } from "./meadow";
import { SVG_INNER as VALLEY_INNER, VIEW_BOX as VALLEY_VB } from "./valley";
import { SVG_INNER as DUNES_INNER, VIEW_BOX as DUNES_VB } from "./dunes";
import { SVG_INNER as OCEAN_INNER, VIEW_BOX as OCEAN_VB } from "./ocean";
import { SVG_INNER as FARMLAND_INNER, VIEW_BOX as FARMLAND_VB } from "./farmland";
import { SVG_INNER as ALPINE_INNER, VIEW_BOX as ALPINE_VB } from "./alpine";
import { SVG_INNER as FOREST_INNER, VIEW_BOX as FOREST_VB } from "./forest";

export interface LandscapeEntry {
  inner: string;
  viewBox: string;
}

export const NATURE_LANDSCAPE_SVG_MAP: Record<LandscapeSubType, LandscapeEntry> = {
  dawn:     { inner: DAWN_INNER,     viewBox: DAWN_VB },
  desert:   { inner: DESERT_INNER,   viewBox: DESERT_VB },
  city:     { inner: CITY_INNER,     viewBox: CITY_VB },
  beach:    { inner: BEACH_INNER,    viewBox: BEACH_VB },
  park:     { inner: PARK_INNER,     viewBox: PARK_VB },
  meadow:   { inner: MEADOW_INNER,   viewBox: MEADOW_VB },
  valley:   { inner: VALLEY_INNER,   viewBox: VALLEY_VB },
  dunes:    { inner: DUNES_INNER,    viewBox: DUNES_VB },
  ocean:    { inner: OCEAN_INNER,    viewBox: OCEAN_VB },
  farmland: { inner: FARMLAND_INNER, viewBox: FARMLAND_VB },
  alpine:   { inner: ALPINE_INNER,   viewBox: ALPINE_VB },
  forest:   { inner: FOREST_INNER,   viewBox: FOREST_VB },
};
