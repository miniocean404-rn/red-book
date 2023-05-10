export function formartPhone(phone: string): string {
  const trim: string = phone.replace(/\s+/g, '')

  return [trim.slice(0, 3), trim.slice(3, 7), trim.slice(7, 11)]
    .filter((item) => !!item)
    .join(' ')
}

export function replaceBlank(phone: string) {
  return phone.replace(/\s+/g, '')
}
