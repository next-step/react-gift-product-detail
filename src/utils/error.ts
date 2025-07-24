export const hasErrorMessage = (
  err: unknown
): err is { response?: { data?: { message?: string } } } => {
  if (typeof err === 'object' && err !== null && 'response' in err) {
    const res = (err as { response?: { data?: { message?: unknown } } })
      .response;
    return typeof res?.data?.message === 'string';
  }
  return false;
};

export const hasAxiosErrorStatus = (
  err: unknown,
  status: number
): err is { response: { status: number } } => {
  if (typeof err === 'object' && err !== null && 'response' in err) {
    const res = (err as { response?: { status?: unknown } }).response;
    return typeof res?.status === 'number' && res.status === status;
  }
  return false;
};
