import { useEffect } from 'react';
import { Effect } from '@tauri-apps/api/window';
import * as zebar from 'zebar';
import { RootConfig } from '../types';
import { parseHexColor } from '../utils/parseHexColor';

const effectMap: Record<string, Effect[]> = {
  acrylic: [Effect.Acrylic],
  blur: [Effect.Blur],
  mica: [Effect.Mica],
  none: [],
};

const DEFAULT_EFFECT: Effect[] = [Effect.Acrylic];
const DEFAULT_COLOR = '#1e2228e0';

function resolveEffects(name: string): Effect[] {
  return effectMap[name] ?? DEFAULT_EFFECT;
}

function resolveBackgroundColor(config: RootConfig): string {
  const theme = config.app.themes.find(
    (t) => t.id === config.app.currentThemeId
  );
  return theme?.colors['--background'] ?? DEFAULT_COLOR;
}

export function useWindowEffects(state: RootConfig) {
  useEffect(() => {
    const effects = resolveEffects(state.app.windowEffect);
    const color = parseHexColor(resolveBackgroundColor(state));

    zebar
      .currentWidget()
      .tauriWindow.setEffects({ effects, color })
      .catch(() => {});
  }, [state.app.windowEffect, state.app.currentThemeId, state.app.themes]);
}
