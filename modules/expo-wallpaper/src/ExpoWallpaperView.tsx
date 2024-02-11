import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ExpoWallpaperViewProps } from './ExpoWallpaper.types';

const NativeView: React.ComponentType<ExpoWallpaperViewProps> =
  requireNativeViewManager('ExpoWallpaper');

export default function ExpoWallpaperView(props: ExpoWallpaperViewProps) {
  return <NativeView {...props} />;
}
