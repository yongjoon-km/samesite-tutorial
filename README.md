# SameSite tutorial

## How to run

- Install mkcert to run https in your localhost

```bash
brew install mkcert
```

- Install local certificates using mkcert on each server resource-server and front

```bash
cd resourece-server
mkcert site1.com
" output -> site1.com.pem, site1.com-key.pem
```

```bash
cd front
mkcert site2.com
" output -> site2.com.pem, site2.com-key.pem
```

- Install express server and run resource-server

```bash
cd resource-server
npm install
npm run start
```

- Run front server

```bash
cd front
npx http-server -S -C ./site2.com.pem -K ./site2.com-key.pem
```
