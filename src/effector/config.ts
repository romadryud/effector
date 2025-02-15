import {forIn} from './collection'
import {assertObject, isObject, isVoid} from './is'

export function processArgsToConfig(
  arg,
  singleArgument: true,
): [any, any | void]
export function processArgsToConfig(args): [any[], any | void]
export function processArgsToConfig(
  args,
  singleArgument?: boolean,
): [any[], any | void] {
  const rawConfig = singleArgument ? args : args[0]
  assertObject(rawConfig)
  let metadata = rawConfig.or
  if (rawConfig.and) {
    args = rawConfig.and
  }
  return [args, metadata]
}

/**
processed fields:

'name',
'sid',
'loc',
'handler',
'updateFilter',
'parent',
'serialize',
'named',
'derived',
*/
export const flattenConfig = (part, config = {}) => {
  if (isObject(part)) {
    flattenConfig(part.or, config)
    forIn(part, (value, field) => {
      if (!isVoid(value) && field !== 'or' && field !== 'and') {
        config[field] = value
      }
    })
    flattenConfig(part.and, config)
  }
  return config
}
