# Rhythm Lab - Танцевальная студия

Лендинг для танцевальной студии "Rhythm Lab" на React + Vite.

## Быстрый старт

```bash
npm install
npm run dev
```

Проект доступен по адресу: http://localhost:3000

## Команды

| Команда | Описание |
|---------|----------|
| `npm run dev` | Запуск в режиме разработки |
| `npm run build` | Сборка для продакшена |
| `npm run preview` | Просмотр собранной версии |

## Деплой на хостинг

### Сборка проекта

```bash
npm run build
```

После сборки готовые файлы находятся в папке `dist/`.

---

### Рег.ру (reg.ru)

#### Пошаговая инструкция:

**1. Соберите проект:**
```bash
npm install
npm run build
```

**2. Подключитесь к хостингу по FTP:**
- Хост: ваш_домен или ftp.ваш_домен
- Логин: указан в письме от Рег.ру
- Пароль: указан в письме от Рег.ру
- Порт: 21

Рекомендуемые FTP-клиенты: [FileZilla](https://filezilla-project.org/), [WinSCP](https://winscp.net/)

**3. Загрузите файлы:**
- Откройте папку `www` или `public_html` на сервере
- Удалите стандартные файлы (index.html, если есть)
- Загрузите **всё содержимое** папки `dist/`:
  ```
  dist/
  ├── assets/
  ├── .htaccess      ← важно!
  ├── favicon.svg
  └── index.html
  ```

**4. Проверьте сайт:**
- Откройте ваш домен в браузере
- Сайт должен работать!

#### Возможные проблемы на Рег.ру:

| Проблема | Решение |
|----------|---------|
| Белый экран | Проверьте, что .htaccess загружен |
| 404 ошибка | Убедитесь, что файлы в папке www |
| Не грузятся стили | Очистите кеш браузера (Ctrl+F5) |
| Ошибка 500 | Проверьте права на файлы (644 для файлов, 755 для папок) |

#### Настройка прав через FTP:
```
Файлы: 644 (rw-r--r--)
Папки: 755 (rwxr-xr-x)
```

---

### Netlify

1. Зарегистрируйтесь на [netlify.com](https://netlify.com)
2. Нажмите "Add new site" → "Deploy manually"
3. Перетащите папку `dist/` в окно загрузки
4. Сайт готов!

**Или через CLI:**
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Vercel

1. Зарегистрируйтесь на [vercel.com](https://vercel.com)
2. Установите CLI: `npm i -g vercel`
3. Выполните команду в корне проекта:
```bash
vercel --prod
```

### GitHub Pages

1. Установите `base` в `vite.config.js`:
```js
base: '/название-репозитория/',
```

2. Соберите и задеплойте:
```bash
npm run build
npx gh-pages -d dist
```

### Обычный хостинг (Apache/Nginx)

1. Соберите проект: `npm run build`
2. Загрузите содержимое папки `dist/` на сервер через FTP/SFTP
3. Файл `.htaccess` уже включён для Apache

**Для Nginx добавьте в конфиг:**
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

### Docker

```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
docker build -t rhythm-lab .
docker run -p 80:80 rhythm-lab
```

## Структура проекта

```
├── public/           # Статические файлы
│   ├── favicon.svg   # Иконка сайта
│   ├── _redirects    # Редиректы для Netlify
│   └── .htaccess     # Конфиг для Apache
├── dist/             # Собранный проект (после build)
├── site.jsx          # Основной React компонент
├── main.jsx          # Точка входа
├── index.html        # HTML шаблон
├── index.css         # Стили (Tailwind CSS)
├── vite.config.js    # Конфигурация Vite
└── tailwind.config.js
```

## Технологии

- React 18
- Vite
- Tailwind CSS
- Framer Motion

