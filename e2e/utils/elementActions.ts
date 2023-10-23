export async function getElWidth(el: Detox.NativeElement | Detox.IndexableNativeElement) {
  const allAttrs = await el.getAttributes()
  const attrs = 'elements' in allAttrs ? allAttrs.elements[0] : allAttrs
  if ('frame' in attrs) {
    return attrs.frame.width
  }
  return attrs.width
}
