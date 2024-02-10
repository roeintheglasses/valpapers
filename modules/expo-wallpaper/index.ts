// Import the native module. On web, it will be resolved to ExpoWallpaper.web.ts
// and on native platforms to ExpoWallpaper.ts
import ExpoWallpaperModule from "./src/ExpoWallpaperModule";

export function hello(): string {
  return ExpoWallpaperModule.hello();
}

export async function setWallpaper(value: string, callback: Function) {
  return await ExpoWallpaperModule.setWallpaper(value);
}
