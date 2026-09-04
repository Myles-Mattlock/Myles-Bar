import { Button } from '@myles-zebar/ui';
import { AnimatePresence, motion } from 'framer-motion';
import { Broom, ChevronRight } from 'lucide-react';
import { GlazeWmOutput } from 'zebar';
import * as zebar from 'zebar';
import { cn } from '../../utils/cn';

interface LeftButtonsProps {
  glazewm: GlazeWmOutput | null;
}

const cleanupToolPath =
  'C:\\Program Files\\SystemCleanUp\\System CleanUp.exe';

export function LeftButtons({ glazewm }: LeftButtonsProps) {
  const handleCleanup = async () => {
    try {
      await zebar.shellSpawn('cmd.exe', [
        '/c',
        'start',
        '',
        cleanupToolPath,
      ]);
    } catch (error) {
      console.error('Failed to launch the cleanup tool', error);
    }
  };

  return (
    <div className="flex items-center h-full gap-1.5">
      <AnimatePresence>
        {glazewm?.bindingModes.map((bindingMode) => (
          <motion.div
            key={bindingMode.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15, ease: 'easeInOut' }}
            exit={{ opacity: 0 }}
            className="flex items-center h-full"
          >
            <Button size="sm">
              {bindingMode.displayName ?? bindingMode.name}
            </Button>
          </motion.div>
        ))}
      </AnimatePresence>

      <Button
        size="icon-sm"
        onClick={handleCleanup}
        className="h-full"
        title="Run system cleanup"
      >
        <Broom className="h-3 w-3" strokeWidth={2.5} />
      </Button>

      {glazewm && (
        <Button
          size="icon-sm"
          onClick={() => glazewm.runCommand('toggle-tiling-direction')}
          className="h-full"
        >
          <ChevronRight
            className={cn(
              'h-3 w-3 transition-transform duration-200 ease-in-out',
              glazewm.tilingDirection === 'vertical' ? 'rotate-90' : ''
            )}
            strokeWidth={3}
          />
        </Button>
      )}
    </div>
  );
}
