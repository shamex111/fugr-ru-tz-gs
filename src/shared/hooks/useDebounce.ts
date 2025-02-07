import { useCallback, useRef, useState } from 'react';

export function useDebounce<T>(
  callback: (value: T) => void,
  delay: number,
  defaultValue?: T
) {
  const [value, setValue] = useState<T>(defaultValue ?? (null as unknown as T));
  const timer = useRef<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback(
    (newValue: T) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      setValue(newValue);

      timer.current = setTimeout(() => {
        callback(newValue);
      }, delay);
    },
    [callback, delay]
  );

  return [value, debouncedCallback] as const;
}
