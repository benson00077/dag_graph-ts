import React from 'react'
import { cancellablePromiseObj, cancellablePromise } from '../utils/cancellablePromise'

// const noop = () => {};
const delay = (n: number) => new Promise((resolve) => setTimeout(resolve, n))

export function useClickPreventionOnDoubleClick(onClick: () => void, onDoubleClick: () => void) {
  const api = useCancellablePromises()

  const handleClick = () => {
    api.clearPendingPromise()
    const waitForClick = cancellablePromise(delay(300))
    api.appendPendingPromise(waitForClick)

    return waitForClick.promise
      .then(() => {
        api.removePendingPromise(waitForClick)
        onClick()
      })
      .catch((errInfo) => {
        api.removePendingPromise(waitForClick)
        if (!errInfo.isCanceled) throw errInfo.error
      })
  }

  const handleDoubleClick = () => {
    api.clearPendingPromise()
    onDoubleClick()
  }

  return [handleClick, handleDoubleClick]
}

function useCancellablePromises() {
  const pendingPromises = React.useRef([] as cancellablePromiseObj[])

  const appendPendingPromise = (promise: cancellablePromiseObj) => {
    pendingPromises.current = [...pendingPromises.current, promise]
  }

  const removePendingPromise = (promise: cancellablePromiseObj) => {
    pendingPromises.current = pendingPromises.current.filter((p) => p !== promise)
  }

  const clearPendingPromise = () => pendingPromises.current.map((p) => p.cancel())

  const api = {
    appendPendingPromise,
    removePendingPromise,
    clearPendingPromise,
  }
  return api
}
