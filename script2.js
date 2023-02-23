//ключевая фраза

function encrypt(m, k) {
  let key = k;
  let keyCopy = key.split("");
  let sortedKey = k.split("").sort();
  let c = "";

  //keyCopy - порядок символов
  sortedKey.forEach((element, index) => {
    let indexInKey = keyCopy.indexOf(element);
    keyCopy[indexInKey] = index;
  });
  //создаем массив
  let stringsCount = Math.ceil(m.length / key.length);
  let array = new Array(stringsCount);
  for (let i = 0; i < stringsCount; i++) {
    array[i] = new Array(k.length);
  }
  //заполняем массив
  let mCharacterIndex = 0;
  for (let i = 0; i < stringsCount; i++) {
    for (let j = 0; j < k.length; j++) {
      m[mCharacterIndex]
        ? (array[i][j] = m[mCharacterIndex++])
        : (array[i][j] = "^");
    }
  }
  //считываем массив в шифротекст
  let cArray = [];
  for (let i = 0; i < stringsCount; i++) {
    let cryptoBlock = new Array(key.length);

    for (let j = 0; j < keyCopy.length; j++) {
      cryptoBlock[keyCopy[j]] = array[i][j];
    }

    cArray.push(cryptoBlock.join(""));
  }
  c = cArray.join("");
  return c;
}

function decrypt(c, k) {
  let m = "";

  let key = k;
  let keyCopy = key.split("");
  let sortedKey = k.split("").sort();

  //keyCopy - порядок символов
  sortedKey.forEach((element, index) => {
    let indexInKey = keyCopy.indexOf(element);
    keyCopy[indexInKey] = index;
  });
  //создаем чистый массив
  let stringsCount = c.length / key.length;
  let array = new Array(stringsCount);
  for (let i = 0; i < stringsCount; i++) {
    array[i] = new Array(k.length);
  }
  //создаем массив зашифрованных блоков
  let cArray = [];
  for (let i = 0; i < stringsCount; i++) {
    cArray.push(
      c
        .split("")
        .splice(i * key.length, key.length)
        .join("")
    );
  }
  //заполняем "чистый" массив
  for (let i = 0; i < cArray.length; i++) {
    for (let j = 0; j < key.length; j++) {
      if (cArray[i][j] === "^") continue;
      array[i][keyCopy.indexOf(j)] = cArray[i][j];
    }
    array[i] = array[i].join("");
  }
  m = array.join("");
  return m;
}

console.log(encrypt("это- лекция по алгоритмам шифрован", "криптография"));
console.log(decrypt("цеояэл-тк и ио мпгаорлтааош^мри вфн^", "криптография"));
console.log(encrypt("котягова", "анна"));
console.log(decrypt("кяотгаов", "анна"));
console.log(encrypt("криптограф", "мама"));
console.log(decrypt("рпкиортгф^а^", "мама"));
