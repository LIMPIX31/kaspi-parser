# kaspi-parser

# Result demo
[articles.json](https://github.com/LIMPIX31/kaspi-parser/blob/master/articles.json)

# Requirements
* Node: 18, 19
* Do not use npm (yarn only)

# Installation
```bash
yarn # zero install
yarn generate # Generate/Update prisma client
docker-compose up db # Start postgres (proxies db)
```

# Start
```bash
yarn start # Run script
```
Собранные данные будут выведены в файл `articles.json`

# Prisma Studio (to add proxies)
```bash
yarn dlx prisma studio
```

# Env
```dotenv
CITY_ID=235230100
DATABASE_URL=postgres://postgres:password@localhost:5432/db?schema=public
# Ограничение по использованию одного прокси
PROXY_MAX_USAGE=30
# Максимальное кол-во запросов к API одновременно
CONCURRENCY=10
# Таймаут запроса в секундах
TIMEOUT=7
```
