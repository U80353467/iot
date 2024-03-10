# 物联网设备管理网站

在根目录下运行

```shell
docker-compose up
```

打包。

进入容器`Iot-database`，运行`mysql -u root -p`，输入密码`123456`，使用`./database/source/init.sql`创建数据库并建表。

访问`localhost:3000`可以看到网站。

默认设备上限数是10，有需要可在`./iotclient/target/iot.properties`中修改。

数据库建表时已经插入了5个设备和1个用户。
