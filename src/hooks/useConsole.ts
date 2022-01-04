export default function useConsole(): {
  Console: Console;
} {
  return { Console: console };
}
