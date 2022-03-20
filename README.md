# SameSite tutorial

## Overview
To get image resourece from resoure-server you need `loginId` cookie with the request.
If you click login button, you will get the `loginId` cookie with a SameSite attribute. This attribute can be changed in code either of `strict`, `lax`, `none`.

The front server has `<img />` and `<a />` elements.
- When `SameSite=strict`, then both elements won't work.
- When `SameSite=lax`, then only `<a />` will work.
- When `SameSite=none`, then both elements will work.


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

- Add the below to `/etc/hosts` so that you can access them with domain name on your local machine.

```bash
127.0.0.1	site1.com
127.0.0.1	site2.com
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
