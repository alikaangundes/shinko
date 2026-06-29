# Shinko Production Deployment

## Services

- Frontend: Next.js on `127.0.0.1:3000`
- CMS: Strapi on `127.0.0.1:1337`
- Database: PostgreSQL
- Reverse proxy: Nginx
- Process manager: PM2

## DNS

Create these A records:

- `shinko.com.tr` -> `185.22.187.24`
- `www.shinko.com.tr` -> `185.22.187.24`
- `cms.shinko.com.tr` -> `185.22.187.24`

## Server Packages

```bash
apt update
apt install -y nginx postgresql postgresql-contrib git curl ufw
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt install -y nodejs
npm install -g pm2
apt install -y certbot python3-certbot-nginx
```

## PostgreSQL

```bash
sudo -u postgres psql
CREATE DATABASE shinko_cms;
CREATE USER shinko WITH ENCRYPTED PASSWORD 'CHANGE_ME';
GRANT ALL PRIVILEGES ON DATABASE shinko_cms TO shinko;
\c shinko_cms
GRANT ALL ON SCHEMA public TO shinko;
\q
```

## App Directory

```bash
mkdir -p /var/www/shinko
cd /var/www/shinko
git clone REPO_URL .
```

Create production env files from:

- `frontend/.env.production.example`
- `cms/.env.example`

## Build

```bash
cd /var/www/shinko/cms
npm ci
npm run build

cd /var/www/shinko/frontend
npm ci
npm run build
```

## PM2

```bash
cd /var/www/shinko
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

## Nginx

Create `/etc/nginx/sites-available/shinko`:

```nginx
server {
    listen 80;
    server_name shinko.com.tr www.shinko.com.tr;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

server {
    listen 80;
    server_name cms.shinko.com.tr;
    client_max_body_size 512M;

    location / {
        proxy_pass http://127.0.0.1:1337;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable:

```bash
ln -s /etc/nginx/sites-available/shinko /etc/nginx/sites-enabled/shinko
nginx -t
systemctl reload nginx
```

## SSL

```bash
certbot --nginx -d shinko.com.tr -d www.shinko.com.tr -d cms.shinko.com.tr
```

## Backups

Back up both:

- PostgreSQL database `shinko_cms`
- `cms/public/uploads`
