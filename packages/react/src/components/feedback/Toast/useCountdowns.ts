'use client';

import { useEffect, useMemo, useRef } from 'react';

type Countdown = {
  remaining: number;
  startedAt?: number;
  timeout?: ReturnType<typeof setTimeout>;
};

export type Countdowns = {
  /** Starts a countdown of `duration` for `id`, replacing any it had */
  set: (id: string, duration: number) => void;
  /** Drops the countdown of `id` without calling `onExpire` */
  clear: (id: string) => void;
  /** Pauses or resumes every countdown; a resumed one runs its time left */
  setPaused: (paused: boolean) => void;
};

/**
 * Pausable countdowns keyed by id, calling `onExpire` with the id once its
 * time has run. They only count down while mounted, and are stopped on unmount.
 */
export function useCountdowns(onExpire: (id: string) => void): Countdowns {
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  const countdownsRef = useRef(new Map<string, Countdown>());
  const pausedRef = useRef(false);
  const mountedRef = useRef(false);

  const countdowns = useMemo<Countdowns & { sync: () => void }>(() => {
    function run(id: string, countdown: Countdown) {
      countdown.startedAt = Date.now();
      countdown.timeout = setTimeout(() => {
        countdownsRef.current.delete(id);
        onExpireRef.current(id);
      }, countdown.remaining);
    }

    function stop(countdown: Countdown) {
      clearTimeout(countdown.timeout);

      if (countdown.startedAt !== undefined) {
        countdown.remaining -= Date.now() - countdown.startedAt;
        countdown.startedAt = undefined;
      }
    }

    function isRunning() {
      return mountedRef.current && !pausedRef.current;
    }

    function clear(id: string) {
      const countdown = countdownsRef.current.get(id);

      if (countdown) {
        stop(countdown);
        countdownsRef.current.delete(id);
      }
    }

    // Runs or stops every countdown to match whether they should be running
    function sync() {
      for (const [id, countdown] of countdownsRef.current) {
        stop(countdown);

        if (isRunning()) {
          run(id, countdown);
        }
      }
    }

    return {
      set(id, duration) {
        clear(id);

        const countdown: Countdown = { remaining: duration };

        countdownsRef.current.set(id, countdown);

        if (isRunning()) {
          run(id, countdown);
        }
      },
      clear,
      setPaused(paused) {
        if (paused === pausedRef.current) {
          return;
        }

        pausedRef.current = paused;
        sync();
      },
      sync,
    };
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    countdowns.sync();

    return () => {
      mountedRef.current = false;
      countdowns.sync();
    };
  }, [countdowns]);

  return countdowns;
}
