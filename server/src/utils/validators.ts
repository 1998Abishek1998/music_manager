
const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm;
const dateRegex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
const dateTimeRegex = /^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}$/;
const mobileRegex = /^9+([6-8][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9])/;
const phoneRegex = /^(01\d{7}|9[6-8]\d{8})$/;

export const minPasswordLen = 8;
const passwordRegex = /[\w~@#$%^&*+=`|{}:;!.?"()[\]-]+\d+/gi;

export const isValidEmail = (email: string): boolean => !!email.match(emailRegex);

export const isValidPhoneNumber = (phone: string): boolean => !!phone.match(phoneRegex);
export const isValidMobileNumber = (phone: string): boolean => !!phone.match(mobileRegex);

export const firstLetterUpperCase = (data: string): string => data.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());

export const isValidUsername =
  (username: string): boolean => Boolean(username.match(/^[^\s]+$/));

export const isValidPassword = (password: string): boolean =>
  ((password.length >= minPasswordLen) && !!password.match(passwordRegex));

export const isValidDate = (date: string) => Boolean(date.match(dateRegex));

export const isValidDateTime = (date: string) => Boolean(date.match(dateTimeRegex));

