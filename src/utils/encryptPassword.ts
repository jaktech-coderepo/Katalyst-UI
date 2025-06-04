import crypto from 'crypto';

export default function encryptPassword(password: string) {
  const secretKey = Buffer.from(
    'd28490548fb1ddf738cdbce2b07cdc92b2d1637836d1ae17d8fb66d20458f23d',
    'hex'
  );
  const iv = Buffer.from('9ce151c1f952aef465b24b2f4b4084da', 'hex');

  const cipher = crypto.createCipheriv('aes-256-cbc', secretKey, iv);
  let encrypted = cipher.update(password, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}
