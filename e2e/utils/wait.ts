export async function wait(time: number) {
  await new Promise((resolve) => setTimeout(resolve, time))
}
