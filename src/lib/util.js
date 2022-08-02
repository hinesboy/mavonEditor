/**
 * Created by zhy on 2016/12/25.
 */
/**
 * 深度拷贝对象
 * @param target
 * @param arg
 * @returns {*}
 * @constructor
 */
export function p_ObjectCopy_DEEP(target, arg) {
  for (const arg_item in arg) {
    const type = typeof arg[arg_item]
    if (!target[arg_item] || (type !== 'Object' && type !== 'object')) {
      target[arg_item] = arg[arg_item]
      continue
    } else {
      target[arg_item] = p_ObjectCopy_DEEP(target[arg_item], arg[arg_item])
    }
  }
  return target
}
/**
 * 解析url参数
 */
export function p_urlParse() {
  const url = window.location.search
  const obj = {}
  const reg = /[?&][^?&]+=[^?&]+/g
  const arr = url.match(reg)
  if (arr) {
    arr.forEach((item) => {
      const tempArr = item.substring(1).split('=')
      const key = decodeURIComponent(tempArr[0])
      const val = decodeURIComponent(tempArr[1])
      obj[key] = val
    })
  }
  return obj
}

export function stopEvent(e) {
  if (!e) {
    return
  }
  if (e.preventDefault) {
    e.preventDefault()
  }
  if (e.stopPropagation) {
    e.stopPropagation()
  }
}
