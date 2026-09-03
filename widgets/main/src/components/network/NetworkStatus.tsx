import {
  Chip,
  Popover,
  PopoverPopup,
  PopoverPortal,
  PopoverPositioner,
  PopoverTrigger,
} from '@overline-zebar/ui';
import { Check, Wifi, WifiOff } from 'lucide-react';
import * as zebar from 'zebar';

interface NetworkStatusProps {
  network: {
    interfaces: zebar.NetworkInterface[];
  } | null;
}

export default function NetworkStatus({ network }: NetworkStatusProps) {
  const interfaces = network?.interfaces ?? [];
  const connectedInterface =
    interfaces.find((networkInterface) => networkInterface.isDefault) ??
    interfaces[0];
  const connectedName = connectedInterface
    ? connectedInterface.friendlyName || connectedInterface.name
    : 'No network';

  return (
    <Popover>
      <PopoverTrigger
        render={(props) => (
          <Chip
            {...props}
            as="button"
            type="button"
            aria-label={`Network: ${connectedName}`}
            className="outline-none"
          />
        )}
      >
        {connectedInterface ? (
          <Wifi className="size-3.5 text-icon" strokeWidth={3} />
        ) : (
          <WifiOff className="size-3.5 text-icon" strokeWidth={3} />
        )}
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverPositioner
          side="bottom"
          align="end"
          sideOffset={6}
          className="z-[9999]"
        >
          <PopoverPopup className="w-64 p-3">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-muted">
              Network
            </div>
            {connectedInterface ? (
              <div className="mb-3 flex items-center gap-2 border-b border-border pb-3">
                <Wifi className="size-4 text-icon" strokeWidth={2.5} />
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">
                    {connectedName}
                  </div>
                  <div className="text-xs text-text-muted">Connected</div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm text-text-muted">
                <WifiOff className="size-4" />
                No network interfaces found.
              </div>
            )}
            {interfaces.length > 0 && (
              <div className="space-y-1">
                {interfaces.map((networkInterface) => {
                  const name =
                    networkInterface.friendlyName || networkInterface.name;
                  const isConnected =
                    networkInterface.name === connectedInterface?.name;

                  return (
                    <div
                      key={networkInterface.name}
                      className="flex items-center justify-between gap-3 rounded-md px-2 py-1.5 text-xs"
                    >
                      <span className="truncate">{name}</span>
                      {isConnected && (
                        <Check className="size-3.5 shrink-0 text-icon" />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </PopoverPopup>
        </PopoverPositioner>
      </PopoverPortal>
    </Popover>
  );
}
