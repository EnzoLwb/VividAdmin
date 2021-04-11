### Init
- composer install
- 添加 .env 文件并修改 数据库连接信息
- storage 和 bootstrap/cache 目录在 web 服务下应该是可写的权限，否则 Laravel 将无法运行
- php artisan key:generate  && php artisan config:clear
- php artisan migrate && php artisan db:seed
- php artisan storage:link 
- cm_eml_template `emailId` update Primary and AUTO_INCREMENT

