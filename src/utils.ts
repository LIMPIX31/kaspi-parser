export async function retry<T>(task: () => T, max: number, _tries = 0): Promise<T | undefined> {
  if (_tries > max) {
    return
  }

  try {
    return await task()
  } catch (ignored: any) {
    console.log(`Retry failing with: ${ignored?.message}`)
    return retry(task, max, _tries + 1)
  }
}
