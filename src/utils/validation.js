export function validateColumnTitle(title, columns, currentId) {
  const name = title.trim()

  if (name === '') {
    return 'Give the column a name'
  }

  const taken = columns.some(
    (column) =>
      column.id !== currentId &&
      column.title.toLowerCase() === name.toLowerCase(),
  )

  if (taken) {
    return 'That name is already used'
  }

  return ''
}

export function validateRepoName(value) {
  const name = value.trim()

  if (name === '') {
    return 'Enter a repository'
  }

  if (!name.includes('/')) {
    return 'Use the format owner/repo'
  }

  return ''
}
