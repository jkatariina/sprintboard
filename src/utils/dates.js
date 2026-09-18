export function isOverdue(dueDate) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return new Date(dueDate) < today
}
