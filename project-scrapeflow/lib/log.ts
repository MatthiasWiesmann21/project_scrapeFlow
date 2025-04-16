import {
  Log,
  LogCollector,
  LogFunctions,
  LogLevel,
  LogLevels,
} from "@/types/log";

export function createLogCollector(): LogCollector {
  const logs: Log[] = [];
  const getAll = () => logs;

  const logFunctions = {} as Record<LogLevel, LogFunctions>;

  LogLevels.forEach(
    (level) =>
      (logFunctions[level] = (message: string) =>
        logs.push({ message: message, level, timestamp: new Date() }))
  );
  return {
    getAll,
    ...logFunctions,
  };
}
