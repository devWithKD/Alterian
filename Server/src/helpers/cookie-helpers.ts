export const accessCookieOps = {
  httpOnly: true,
  expires: new Date(Date.now() + 3600000),
};

export const refreshCookieOps = {
  httpOnly: true,
  expires: new Date(Date.now() + 432000000),
};
