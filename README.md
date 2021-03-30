### Init
- php artisan key:generate  && php artisan config:clear
- php artisan migrate && db:seed
- php artisan storage:link && cd storage/app/public && mkdir zip && chown -R  nginx:nginx zip
- npm install
- npm run prod
- php artisan queue:work 安装supervisor

