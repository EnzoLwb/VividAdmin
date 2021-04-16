### Init
- composer install
- 添加 .env 文件并修改 数据库连接信息
- storage 和 bootstrap/cache 目录在 web 服务下应该是可写的权限，否则 Laravel 将无法运行
- chmod -R 777 public/userfiles
- php artisan key:generate  && php artisan config:clear
- composer dump-autoload
- php artisan migrate && php artisan db:seed
- php artisan storage:link 
- 导入 ./newtac_one_cms.sql 


### 测试环境 二次部署
- composer install (必须执行)
- php artisan migrate
- php artisan db:seed --class=RoutesMediaTableSeeder
- chmod -R 777 public/userfiles