// src/hooks/useForm.ts
import { useState } from 'react'
import type { ZodSchema } from 'zod'

export function useForm<T>(initial: T, schema?: ZodSchema<T>) {
  const [values, setValues] = useState<T>(initial)
  const [errors, setErrors] = useState<Record<string, string>>({})

  function set<K extends keyof T>(key: K, value: T[K]) {
    setValues((v) => ({ ...v, [key]: value }))
  }

  function validate(): boolean {
    if (!schema) return true
    const result = schema.safeParse(values)
    if (!result.success) {
      const errs: Record<string, string> = {}
      result.error.issues.forEach((i) => {
        errs[i.path.join('.')] = i.message
      })
      setErrors(errs)
      return false
    }
    setErrors({})
    return true
  }

  return { values, set, errors, validate, setErrors }
}
