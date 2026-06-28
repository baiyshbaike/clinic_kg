import { ref, reactive } from 'vue'

interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  message: string
}

interface ValidationRules {
  [key: string]: ValidationRule[]
}

interface ValidationErrors {
  [key: string]: string
}

export function useFormValidation(rules: ValidationRules) {
  const errors = reactive<ValidationErrors>({})
  const touched = reactive<Record<string, boolean>>({})

  const validate = (data: Record<string, string>): boolean => {
    let isValid = true
    Object.keys(errors).forEach((key) => delete errors[key])

    Object.entries(rules).forEach(([field, fieldRules]) => {
      const value = data[field] || ''

      for (const rule of fieldRules) {
        if (rule.required && !value.trim()) {
          errors[field] = rule.message
          isValid = false
          break
        }

        if (rule.minLength && value.length < rule.minLength) {
          errors[field] = rule.message
          isValid = false
          break
        }

        if (rule.maxLength && value.length > rule.maxLength) {
          errors[field] = rule.message
          isValid = false
          break
        }

        if (rule.pattern && !rule.pattern.test(value)) {
          errors[field] = rule.message
          isValid = false
          break
        }
      }
    })

    return isValid
  }

  const validateField = (field: string, value: string): void => {
    delete errors[field]
    const fieldRules = rules[field]
    if (!fieldRules) return

    for (const rule of fieldRules) {
      if (rule.required && !value.trim()) {
        errors[field] = rule.message
        break
      }

      if (rule.minLength && value.length < rule.minLength) {
        errors[field] = rule.message
        break
      }

      if (rule.maxLength && value.length > rule.maxLength) {
        errors[field] = rule.message
        break
      }

      if (rule.pattern && !rule.pattern.test(value)) {
        errors[field] = rule.message
        break
      }
    }
  }

  const touchField = (field: string) => {
    touched[field] = true
  }

  const reset = () => {
    Object.keys(errors).forEach((key) => delete errors[key])
    Object.keys(touched).forEach((key) => delete touched[key])
  }

  return {
    errors,
    touched,
    validate,
    validateField,
    touchField,
    reset,
  }
}
