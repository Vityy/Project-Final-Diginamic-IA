// src/components/UI/DateInput.tsx
import { Input } from './Input'
export function DateInput(props: Omit<Parameters<typeof Input>[0], 'type'>) {
  return <Input type="date" {...props} />
}
