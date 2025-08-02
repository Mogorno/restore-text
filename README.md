# 🧠 Restore Text

**Restore Text** — це утиліта для часткового відновлення пошкодженого англомовного тексту, в якому:

- відсутні пробіли
- є зірочки (`*`) замість літер
- порушено регістр
- перемішані слова

> 🔍 В основі — словниковий пошук з евристичною перевіркою неточностей.

---

## 📦 Встановлення

> Потрібен Node.js **v18+** та `npm`.

```bash
git clone https://github.com/your-username/restore-text.git
cd restore-text
npm install
```

> 🔤 Помісти файл `dictionary.txt` у директорію `src/`. У ньому мають бути англійські слова, по одному в рядку.

---

## ⚙️ Скрипти npm

```json
"scripts": {
  "build": "tsc",
  "start": "npm run build && node dist/index.js",
  "dev": "ts-node src/index.ts"
}
```

### Команди:

| Команда         | Опис                                |
| --------------- | ----------------------------------- |
| `npm run dev`   | Запуск з TypeScript напряму         |
| `npm run build` | Компіляція TS → JS у `dist/`        |
| `npm start`     | Збірка та запуск JS-файлу з `dist/` |

---

## 🧪 Приклад використання

### 🔧 Структура

```
src/
├── index.ts          # точка входу
├── TextRestorer.ts   # логіка відновлення
├── dictionary.txt    # словник слів
```

### 📥 Вхідні дані (приклад у index.ts):

```ts
const input =
    'A***ew*sbegninignt*g*tv***tried*f*s***ing*y*e*srtseionthebnkaadnofvhaingntohnigtod*';
const restored = textRestorer.restoreText(input);
console.log(restored);
```

### ✅ Очікуваний результат:

```
Alice was beginning to get very tired of sitting by her sister on the bank and of having nothing to do
```

---

## 🛠 Конфігурація

```ts
const restorer = new TextRestorer(dictionary, {
    maxInaccuracy: 1, // кількість дозволених невідповідностей (default: 0)
    maxUnknowns: 3, // скільки '*' можна в слові (default: 3)
    maxWordLength: 12, // максимальна довжина слів (default: 10)
    minWordLength: 2, // мінімальна довжина слів (default: 2)
    unknownSymbol: '*', // символ-замінник (default: '*')
});
```

Можна також змінити словник:

```ts
restorer.setDictionary(['new', 'words']);
```

---

## 📄 Формат dictionary.txt

```
alice
was
beginning
to
get
very
tired
of
sitting
by
her
sister
on
the
bank
and
having
nothing
do
once
or
twice
she
had
peeped
into
book
reading
but
it
no
pictures
conversations
in
what
is
use
thought
without
hello
word
hell
```

> 🔠 Усі слова — в **нижньому регістрі**, без зайвих пробілів.

---

## 📂 Приклад index.ts

```ts
import fs from 'fs';
import * as path from 'path';
import { TextRestorer } from './TextRestorer';

const filePath = path.join(__dirname, 'dictionary.txt');
const DICTIONARY = fs
    .readFileSync(filePath, 'utf-8')
    .toLowerCase()
    .split('\n')
    .map((word) => word.trim());

const textRestorer = new TextRestorer(DICTIONARY);

const input = 'H*ll*Wrodl';
const result = textRestorer.restoreText(input);
console.log(result); // Hello World
```

---

## 📘 Як це працює

- Текст розбивається на фрагменти (від `maxWordLength` до `minWordLength`)
- Кожен фрагмент перевіряється по словнику:
    - Порівнюється з урахуванням:
        - заміни символів (`*`)
        - обмеженої кількості помилок (невірних букв)
- Якщо є збіг — слово додається в результат
- Регістр символів відновлюється
