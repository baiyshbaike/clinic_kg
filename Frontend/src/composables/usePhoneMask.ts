import { ref, computed } from 'vue'

export function usePhoneMask() {
  const rawValue = ref('')

  const formattedValue = computed({
    get: () => {
      const digits = rawValue.value.replace(/\D/g, '')
      if (digits.length === 0) return ''
      if (digits.length <= 3) return `+${digits}`
      if (digits.length <= 6) return `+${digits.slice(0, 3)} (${digits.slice(3)})`
      if (digits.length <= 8) return `+${digits.slice(0, 3)} (${digits.slice(3, 6)}) ${digits.slice(6)}`
      return `+${digits.slice(0, 3)} (${digits.slice(3, 6)}) ${digits.slice(6, 8)}-${digits.slice(8, 10)}`
    },
    set: (val: string) => {
      rawValue.value = val.replace(/\D/g, '').slice(0, 12)
    },
  })

  const isValid = computed(() => {
    const digits = rawValue.value.replace(/\D/g, '')
    return digits.length === 12
  })

  return {
    formattedValue,
    isValid,
    rawValue,
  }
}
