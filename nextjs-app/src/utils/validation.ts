export const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isValidPassword = (password: string) => {
  // 8~16桁、英文字・数字・記号をそれぞれ1文字以上
  // const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>/?`~]).{8,16}$/;
  // return regex.test(password);

  return password.length >= 8;
};
