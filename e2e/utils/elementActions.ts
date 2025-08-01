type AnyRecord = Record<string, any>

export async function getElWidth(el: Detox.NativeElement | Detox.IndexableNativeElement) {
  const allAttrs = await el.getAttributes()
  const attrs = 'elements' in allAttrs ? allAttrs.elements[0] : allAttrs

  const attrsRecord = attrs as AnyRecord

  if (attrsRecord.frame && attrsRecord.frame.width !== undefined) {
    return attrsRecord.frame.width
  }

  if (attrsRecord.width !== undefined) {
    return attrsRecord.width
  }

  return 0
}
