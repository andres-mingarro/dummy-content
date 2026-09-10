export type DevicePresetId = "desktop" | "laptop" | "tablet" | "mobile";

export type DevicePresetOrientation = "landscape" | "portrait";

export interface DevicePreset {
  id: DevicePresetId;
  width: number;
  height: number;
  orientation: DevicePresetOrientation;
}

// Las 2 resoluciones landscape y las 2 portrait más usadas según estadísticas
// generales de viewport: Full HD sigue siendo la resolución de escritorio más
// común, 1366×768 la de notebook más común; en portrait, el viewport de mobile
// moderno ronda 390×844 y el de tablet 768×1024.
export const DEVICE_PRESETS: DevicePreset[] = [
  { id: "desktop", width: 1920, height: 1080, orientation: "landscape" },
  { id: "laptop",  width: 1366, height: 768,  orientation: "landscape" },
  { id: "tablet",  width: 768,  height: 1024, orientation: "portrait" },
  { id: "mobile",  width: 390,  height: 844,  orientation: "portrait" },
];
