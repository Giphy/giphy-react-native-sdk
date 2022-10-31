export async function getElWidth(el: Detox.NativeElement | Detox.IndexableNativeElement) {
  const attrs = await el.getAttributes()

  if ('elements' in attrs) {
    return attrs.elements[0]?.frame?.width
  } else if ('frame' in attrs) {
    return attrs.frame.width
  }
  return attrs.width
}
