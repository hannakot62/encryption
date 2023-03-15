// m from 0b00000000 to 0b11111111
// k from 0b0000000000 to 0b1111111111
const sBlock1 = [
  [1, 0, 3, 2],
  [3, 2, 1, 0],
  [0, 2, 1, 3],
  [3, 1, 3, 2],
];
const sBlock2 = [
  [0, 1, 2, 3],
  [2, 0, 1, 3],
  [3, 0, 1, 0],
  [2, 1, 0, 3],
];
function ip(m) {
  m = ("00000000" + m.toString(2)).split("").slice(-8);
  let text = "";
  text += m[1];
  text += m[5];
  text += m[2];
  text += m[0];
  text += m[3];
  text += m[7];
  text += m[4];
  text += m[6];
  return text;
}
function ipreverse(c) {
  c = ("00000000" + c.toString(2)).split("").slice(-8);
  //last reordering
  let result = "";
  result += c[3];
  result += c[0];
  result += c[2];
  result += c[4];
  result += c[6];
  result += c[1];
  result += c[7];
  result += c[5];
  result = parseInt(result, 2);
  return result;
}
function encrypt(m, k) {
  let c;
  const [k1, k2] = generateKeys(k);
  let text = ip(m);
  // round 1
  text = round(text, k1);
  //перестановка
  let c1 = ("00000000" + text.toString(2)).split("").slice(-8);
  let left = c1.slice(0, 4).join("");
  let right = c1.slice(4).join("");
  text = right + left;
  //round 2
  c = round(text, k2);
  let result = ipreverse(c);
  return [result, k1, k2];
}

function decrypt(c, k) {
  const [k1, k2] = generateKeys(k);
  let text = ip(c);
  // round 1
  text = round(text, k2);
  //перестановка
  let c1 = ("00000000" + text.toString(2)).split("").slice(-8);
  let left = c1.slice(0, 4).join("");
  let right = c1.slice(4).join("");
  text = right + left;
  //round 2
  let m = round(text, k1);
  let result = ipreverse(m);
  return result;
}

console.log(encrypt(182, 0b1001010011));
console.log(decrypt(0b1111, 0b1001010011));

function generateKeys(k) {
  let k1, k2;
  let key = ("0000000000" + k.toString(2)).split("").slice(-10);

  let keyP10 = [];
  keyP10.push(key[2]);
  keyP10.push(key[4]);
  keyP10.push(key[1]);
  keyP10.push(key[6]);
  keyP10.push(key[3]);
  keyP10.push(key[9]);
  keyP10.push(key[0]);
  keyP10.push(key[8]);
  keyP10.push(key[7]);
  keyP10.push(key[5]);

  let left = keyP10.slice(0, 5).join("");
  let right = keyP10.slice(5).join("");
  left = parseInt(left, 2);
  right = parseInt(right, 2);

  //циклический сдвиг каждой из частей влево на 1 бит
  left = (left << 1) | (left >>> 4);
  right = (right << 1) | (right >>> 4);
  //обнуление шестого бита слева
  left = left & ~(1 << 5);
  right = right & ~(1 << 5);

  //составление первого ключа
  k1 = "";
  let k1Helper = (
    ("00000" + left.toString(2)).split("").slice(-5).join("") +
    ("00000" + right.toString(2)).split("").slice(-5).join("")
  ).split("");
  //p8
  k1 += k1Helper[5];
  k1 += k1Helper[2];
  k1 += k1Helper[6];
  k1 += k1Helper[3];
  k1 += k1Helper[7];
  k1 += k1Helper[4];
  k1 += k1Helper[9];
  k1 += k1Helper[8];

  k1 = parseInt(k1, 2);

  // циклический сдвиг каждой из частей влево на 2 бита
  left = (left << 2) | (left >>> 3);
  right = (right << 2) | (right >>> 3);
  //обнуление шестого бита слева
  left = left & ~(1 << 5);
  right = right & ~(1 << 5);
  //обнуление седьмого бита слева
  left = left & ~(1 << 6);
  right = right & ~(1 << 6);

  //составление второго ключа
  k2 = "";
  let k2Helper = (
    ("00000" + left.toString(2)).split("").slice(-5).join("") +
    ("00000" + right.toString(2)).split("").slice(-5).join("")
  ).split("");
  //p8
  k2 += k2Helper[5];
  k2 += k2Helper[2];
  k2 += k2Helper[6];
  k2 += k2Helper[3];
  k2 += k2Helper[7];
  k2 += k2Helper[4];
  k2 += k2Helper[9];
  k2 += k2Helper[8];

  k2 = parseInt(k2, 2);

  return [k1, k2];
}

function round(text, key) {
  //правило расширения
  let left = text.split("").slice(0, 4).join("");
  let right = text.split("").slice(4);
  let extended = "";
  extended += right[3];
  extended += right[0];
  extended += right[1];
  extended += right[2];
  extended += right[1];
  extended += right[2];
  extended += right[3];
  extended += right[0];
  //xor с ключом
  let step = key ^ parseInt(extended, 2);
  step = ("00000000" + step.toString(2)).split("").slice(-8);
  let forS1 = step.slice(0, 4);
  let forS2 = step.slice(4);
  //использование с-боксов
  let sLeft =
    sBlock1[parseInt(forS1[0] + forS1[3], 2)][parseInt(forS1[1] + forS1[2], 2)];
  let sRight =
    sBlock2[parseInt(forS2[0] + forS2[3], 2)][parseInt(forS2[1] + forS2[2], 2)];
  sLeft = ("00" + sLeft.toString(2)).split("").slice(-2).join("");
  sRight = ("00" + sRight.toString(2)).split("").slice(-2).join("");
  let sResult = sLeft + sRight;
  //p4
  sResult = sResult.split("");
  let sResultP4 = "";
  sResultP4 += sResult[1];
  sResultP4 += sResult[3];
  sResultP4 += sResult[2];
  sResultP4 += sResult[0];
  //xor
  let finalLeft = parseInt(sResultP4, 2) ^ parseInt(left, 2);
  finalLeft = ("0000" + finalLeft.toString(2)).split("").slice(-4).join("");
  //result
  let result = finalLeft + right.join("");
  result = parseInt(result, 2);
  // console.log(result.toString(2));
  return result;
}
