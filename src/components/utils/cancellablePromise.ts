export type cancellablePromiseObj = {
  promise: Promise<unknown>;
  cancel: () => boolean;
};

export const cancellablePromise = (
  promise: Promise<unknown>
): cancellablePromiseObj => {
  let isCanceled = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      (value) => (isCanceled ? reject({ isCanceled, value }) : resolve(value)),
      (error) => reject({ isCanceled, error })
    );
  });
  
  return {
    promise: wrappedPromise,
    cancel: () => (isCanceled = true),
  };
};