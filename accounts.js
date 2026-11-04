/* Local demonstration accounts only. This is not server-side authentication. */
(function (root) {
  'use strict';
  const hex = bytes => [...bytes].map(b => b.toString(16).padStart(2, '0')).join('');
  const bytes = value => Uint8Array.from(value.match(/../g), n => parseInt(n, 16));
  function read(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  }
  function publicProfile(user) {
    return { id:user.id, name:user.name, email:user.email, avatar:user.avatar || null };
  }
  function valid(user) {
    return user && (typeof user.id === 'number' || typeof user.id === 'string') &&
      typeof user.name === 'string' && typeof user.email === 'string';
  }
  async function derive(password, salt) {
    const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']);
    return hex(new Uint8Array(await crypto.subtle.deriveBits({name:'PBKDF2', salt:bytes(salt), iterations:210000, hash:'SHA-256'}, key, 256)));
  }
  async function passwordRecord(password) {
    const salt = hex(crypto.getRandomValues(new Uint8Array(16)));
    return { salt, hash:await derive(password, salt) };
  }
  async function verify(password, record) {
    if (!record || !/^[a-f0-9]{32}$/.test(record.salt) || !/^[a-f0-9]{64}$/.test(record.hash)) return false;
    return await derive(password, record.salt) === record.hash;
  }
  async function migrate(users) {
    const result=[];
    for (const user of users.filter(valid)) {
      const password = typeof user.pass === 'string' ? await passwordRecord(user.pass) : user.password;
      result.push({...publicProfile(user), password});
    }
    return result;
  }
  const api={read, publicProfile, valid, passwordRecord, verify, migrate};
  if (typeof module !== 'undefined' && module.exports) module.exports=api;
  else root.LocalAccounts=api;
})(globalThis);
