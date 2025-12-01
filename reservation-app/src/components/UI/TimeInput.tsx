// src/components/UI/TimeInput.tsx
import { Input } from './Input'
export function TimeInput(props: Omit<Parameters<typeof Input>[0], 'type'>) {
  return <Input type="time" step="900" {...props} /> // 15-min steps
}