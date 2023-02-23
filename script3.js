//метод поворачивающейся решетки

function encrypt(m) {
  let c = "";

  const message = m;
  const ceilsInGrid = 16;
  const gridSize = Math.sqrt(ceilsInGrid);
  const gridCount = Math.ceil(message.length / ceilsInGrid);

  //если символов больше, чем клеток в решетке, создаем еще решетки
  for (let i = 0; i < gridCount; i++) {
    //патч - массив для одной решетки
    let patch = message.split("").splice(i * ceilsInGrid, ceilsInGrid);
    //создание решетки
    let grid = new Array(gridSize);
    for (let j = 0; j < grid.length; j++) {
      grid[j] = new Array(gridSize);
    }

    //проходы по решетке
    for (let j = 0; j < gridSize; j++) {
      let patchItem = patch.splice(0, gridSize);
      //заполнение
      grid[0][0] = patchItem[0];
      grid[1][3] = patchItem[1];
      grid[3][1] = patchItem[2];
      grid[2][2] = patchItem[3];

      //поворот

      //копия решетки
      let gridCopy = new Array(gridSize);
      for (let j = 0; j < grid.length; j++) {
        gridCopy[j] = new Array(gridSize);
      }
      //перенос "повернутых значений"
      for (let m = 0; m < gridSize; m++) {
        for (let n = 0; n < gridSize; n++) {
          gridCopy[n][gridSize - 1 - m] = grid[m][n];
        }
      }

      grid = JSON.parse(JSON.stringify(gridCopy));
    }
    //заполняем пустые места
    for (let m = 0; m < gridSize; m++) {
      for (let n = 0; n < gridSize; n++) {
        if (!grid[m][n]) grid[m][n] = "^";
      }
    }
    //склеиваем шифротекст
    for (let j = 0; j < gridSize; j++) {
      grid[j] = grid[j].join("");
    }
    c += grid.join("");
  }

  return c;
}

function decrypt(c) {
  let m = "";

  const encrypted = c;
  const ceilsInGrid = 16;
  const gridSize = Math.sqrt(ceilsInGrid);
  const gridCount = Math.ceil(encrypted.length / ceilsInGrid);

  //если символов больше, чем клеток в решетке, создаем еще решетки
  for (let i = 0; i < gridCount; i++) {
    //патч - массив для одной решетки
    let patch = encrypted.split("").splice(i * ceilsInGrid, ceilsInGrid);
    //создание решетки
    let grid = new Array(gridSize);
    for (let j = 0; j < grid.length; j++) {
      grid[j] = new Array(gridSize);
    }
    //заполнение
    let patchIndex = 0;
    for (let m = 0; m < gridSize; m++) {
      for (let n = 0; n < gridSize; n++) {
        grid[m][n] = patch[patchIndex++];
      }
    }

    //проходы по решетке
    for (let j = 0; j < gridSize; j++) {
      let patchItem = patch.splice(0, gridSize);

      //чтение из решетки
      m += grid[0][0];
      m += grid[1][3];
      m += grid[3][1];
      m += grid[2][2];

      //поворот

      //копия решетки
      let gridCopy = new Array(gridSize);
      for (let j = 0; j < grid.length; j++) {
        gridCopy[j] = new Array(gridSize);
      }
      //перенос "повернутых значений"
      for (let m = 0; m < gridSize; m++) {
        for (let n = 0; n < gridSize; n++) {
          gridCopy[n][gridSize - 1 - m] = grid[m][n];
        }
      }

      grid = JSON.parse(JSON.stringify(gridCopy));
    }
  }
  m = m.split("");
  let message = "";
  for (let i = 0; i < m.length; i++) {
    if (m[i] === "^") continue;
    message += m[i];
  }
  return message;
}

console.log(encrypt("это лекция по крипт ографии"));
console.log(decrypt("эе окпцтяр кло ииги^^^апи^ рот^ф"));
console.log(encrypt("hello world"));
console.log(decrypt("h d^^^oel^lwol^r"));
