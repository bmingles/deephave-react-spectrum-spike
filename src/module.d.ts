import { Row } from '@deephaven/jsapi-types'

declare module '@deephaven/jsapi-types' {
  interface Row {
    offsetInSnapshot: number
  }
}
