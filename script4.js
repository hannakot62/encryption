//шифр Цезаря

const last = 0x44f;
const first = 0x410;

function encrypt(m, k) {
  let c = "";
  for (let i = 0; i < m.length; i++) {
    c += String.fromCharCode(
      m.charCodeAt(i) + k > last
        ? first + (k - (last - m.charCodeAt(i))) - 1
        : m.charCodeAt(i) + k
    );
  }
  return c;
}

function decrypt(c, k) {
  let m = "";
  for (let i = 0; i < c.length; i++) {
    m += String.fromCharCode(
      c.charCodeAt(i) - k < first
        ? last - (k - (c.charCodeAt(i) - first)) + 1
        : c.charCodeAt(i) - k
    );
  }
  return m;
}

console.log(encrypt("Аня", 2));
console.log(decrypt("ВпБ", 2));
console.log(encrypt("Приветики", 8));
console.log(decrypt("Чшркнъртр", 8));
console.log(encrypt("эюя", 3));
