> Laravel + Vue + ElementUI + Docker
>
> 陪伴我很久的后台管理，期间也使用过其他开箱即用的系统，但还是觉得自己定义的使用更顺手。
>
> 不是前后端分离，非常适合后端工程师的快速开发


### Init
- php artisan key:generate  && php artisan config:clear
- php artisan migrate && db:seed
- php artisan storage:link && cd storage/app/public && mkdir zip && chown -R  nginx:nginx zip
- npm install
- npm run all-prod
- system_settings 数据库添加qrcode
