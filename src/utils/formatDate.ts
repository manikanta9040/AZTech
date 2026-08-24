export const formatDate = (value: string | Date) => new Intl.DateTimeFormat().format(new Date(value))
