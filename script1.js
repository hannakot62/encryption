//железнодорожная изгородь

function encrypt(m, k) {
  let c = "";
  let array = new Array(k);
  for (let i = 0; i < k; i++) {
    array[i] = new Array(m.length);
  }
  //2k-2   - длина цикла (вниз-> и вверх по решетке до вершины)
  let cycleLength = 2 * k - 2;
  let cycleCounter = 0;
  let cycles = Math.floor(m.length / cycleLength + 1);

  let j = 0;
  let i = j - cycleCounter * k;

  while (cycleCounter != cycles) {
    //выбираем столбец начала цикла (вершину)
    j = cycleCounter * cycleLength;

    //спускаемся вниз
    for (; j < m.length; j++) {
      i = j - cycleCounter * cycleLength;
      if (i < k) array[i][j] = m[j];
      else break;
    }
    //выбираем начало подъёма
    j = cycleCounter * cycleLength + k;
    i = k - 2;
    //поднимаемся вверх
    for (; j < m.length; j++) {
      if (i > 0) array[i][j] = m[j];
      else break;
      i--;
    }
    cycleCounter++;
  }
  //запись в строку
  for (let i = 0; i < k; i++) {
    for (let j = 0; j < m.length; j++) {
      if (array[i][j]) {
        c += array[i][j];
      }
    }
  }
  return c;
}

function decrypt(c, k) {
  let m = "";

  let array = new Array(k);
  for (let i = 0; i < k; i++) {
    array[i] = new Array(c.length);
  }
  let cycleLength = 2 * k - 2;
  let cycleCounter = 0;
  let cycles = Math.floor(c.length / cycleLength + 1);

  let j = 0;
  let i = j - cycleCounter * k;
  //подготовка массива
  while (cycleCounter != cycles) {
    //выбираем столбец начала цикла (вершину)
    j = cycleCounter * cycleLength;

    //спускаемся вниз
    for (; j < c.length; j++) {
      i = j - cycleCounter * cycleLength;
      if (i < k) array[i][j] = true;
      else break;
    }
    //выбираем начало подъёма
    j = cycleCounter * cycleLength + k;
    i = k - 2;
    //поднимаемся вверх
    for (; j < c.length; j++) {
      if (i > 0) array[i][j] = true;
      else break;
      i--;
    }
    cycleCounter++;
  }
  //запись в массив
  let current = 0;
  for (let i = 0; i < k; i++) {
    for (let j = 0; j < c.length; j++) {
      if (array[i][j] === true) {
        array[i][j] = c[current++];
      }
    }
  }
  //чтение массива
  for (let j = 0; j < c.length; j++) {
    for (let i = 0; i < k; i++) {
      if (array[i][j]) {
        m += array[i][j];
        break;
      }
    }
  }
  return m;
}

console.log(encrypt("мама мыла раму", 4));
console.log(encrypt("абвгдеёжз", 3));
console.log(decrypt("мымамлаум ара ", 4));
console.log(decrypt("адзбгежвё", 3));
