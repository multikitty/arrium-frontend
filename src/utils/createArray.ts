const range = (start: number, end: number, value: any) => {
  return Array(end - start + 1).fill(value)
}

export default range
