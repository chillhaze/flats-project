import firebase from 'firebase/app';

const generateUserAvatar = (user: firebase.User): string => {
  if (!user.displayName) {
    return 'U';
  }
  return user.displayName
    .trim()
    .split(' ')
    .map((w, i, a) => (i === 0 || i + 1 === a.length ? w[0] : null))
    .join('')
    .toUpperCase();
};

export default generateUserAvatar;
