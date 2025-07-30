export function mockToggleWish(): Promise<'success' | 'fail'> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() < 0.7;
      if (success) {
        resolve('success');
      } else {
        reject('fail');
      }
    }, 500);
  });
}
