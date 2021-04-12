### Init
- php artisan key:generate  && php artisan config:clear
- php artisan migrate && db:seed
- php artisan storage:link && cd storage/app/public && mkdir zip && chown -R  nginx:nginx zip
- npm install
- npm install -g laravel-echo-server
- npm run all-prod
- laravel-echo-server init
- laravel-echo-server start
- php artisan queue:work 安装supervisor

### 可复用
- getCode 获取代码表数据以下拉框形式展示
- common_stick 置顶和上下线
- getCommonCodeNameById 获取代码表的名称  --连接的形式

### 备忘录
- 权限策略方式 leader();
-  git rm --cached xxxx 删除跟踪文件 
- php artisan config:cache