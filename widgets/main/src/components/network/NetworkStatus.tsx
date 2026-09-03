import { Chip } from '@overline-zebar/ui';
import { Wifi, WifiOff } from 'lucide-react';
import { useRef } from 'react';
import * as zebar from 'zebar';
import { calculateWidgetPlacementFromRight } from '../../utils/calculateWidgetPlacement';

interface NetworkStatusProps {
  network: {
    interfaces: zebar.NetworkInterface[];
  } | null;
}

export default function NetworkStatus({ network }: NetworkStatusProps) {
  const chipRef = useRef<HTMLButtonElement>(null);
  const interfaces = network?.interfaces ?? [];
  const connectedInterface =
    interfaces.find((networkInterface) => networkInterface.isDefault) ??
    interfaces[0];
  const connectedName = connectedInterface
    ? connectedInterface.friendlyName || connectedInterface.name
    : 'No network';

  return (
    <Chip
      ref={chipRef}
      as="button"
      type="button"
      aria-label={`Network: ${connectedName}`}
      className="outline-none"
      onClick={async () => {
        const placement = await calculateWidgetPlacementFromRight(chipRef, {
          width: 400,
          height: 400,
        });
        await zebar.startWidget('system-stats', placement, {});
      }}
    >
      {connectedInterface ? (
        <Wifi className="size-3.5 text-icon" strokeWidth={3} />
      ) : (
        <WifiOff className="size-3.5 text-icon" strokeWidth={3} />
      )}
    </Chip>
  );
}
