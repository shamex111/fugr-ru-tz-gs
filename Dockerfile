# Используем официальный образ Node.js в качестве базового
FROM node:20-alpine

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json в рабочую директорию
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта в рабочую директорию
COPY . .

# Собираем приложение
RUN npm run build

# Указываем команду для запуска приложения
CMD ["npm", "start"]

# Указываем порт, который будет использоваться контейнером
EXPOSE 3000