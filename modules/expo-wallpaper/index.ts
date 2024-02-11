import {
  NativeModulesProxy,
  EventEmitter,
  Subscription,
} from "expo-modules-core";

// Import the native module. On web, it will be resolved to ExpoWallpaper.web.ts
// and on native platforms to ExpoWallpaper.ts
import ExpoWallpaperModule from "./src/ExpoWallpaperModule";
import ExpoWallpaperView from "./src/ExpoWallpaperView";
import {
  ChangeEventPayload,
  ExpoWallpaperViewProps,
} from "./src/ExpoWallpaper.types";

export function hello(): string {
  return ExpoWallpaperModule.hello();
}

export function setWallpaper(options): string {
  return ExpoWallpaperModule.setWallpaper(options);
}

export { ExpoWallpaperView, ExpoWallpaperViewProps, ChangeEventPayload };
