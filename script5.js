//модулярная арифметика

const alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

function encrypt(m, k) {
  let c = "";
  //используем английский алфавит, где 26 символов
  const n = alphabet.length;
  const eulerConst = 12;
  const k2 = Math.pow(k, eulerConst - 1) % n;
  for (let i = 0; i < m.length; i++) {
    c += alphabet[(alphabet.indexOf(m[i]) * k) % n];
  }
  return [c, k2];
}

function decrypt(c, k) {
  const n = 26;
  let m = "";
  for (let i = 0; i < c.length; i++) {
    m += alphabet[(alphabet.indexOf(c[i]) * k) % n];
  }
  return m;
}

console.log(encrypt("hello", 3));
console.log(decrypt("vmhhq", 9));
console.log(encrypt("kot", 5));
console.log(decrypt("ysr", 21));
