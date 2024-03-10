drop database if exists iot__;
create database iot__;
use iot__;
create table `user`(
                       userid int primary key auto_increment,
                       username varchar(63) unique not null,
                       `password` varchar(63) not null,
                       email varchar(63) unique not null,
                       `role` varchar(63) not null
);

create table device(
                       deviceId int primary key auto_increment,
                       deviceName varchar(63) unique not null,
                       `description` varchar(255) not null,
                       deviceType varchar(63) not null,
                       userid varchar(63) not null,
                       foreign key (userid) references `user`(username) on delete cascade on update cascade
);

create table message(
                        logId int primary key auto_increment,
                        clientId varchar(255) not null,
                        info varchar(255) not null,
                        `value` int not null,
                        alert int not null,
                        lng double not null,
                        lat double not null,
                        `timestamp` long not null,
                        foreign key (clientId) references device(deviceName) on delete cascade on update cascade
);

insert into `user` (username, `password`, email, `role`) values ('admin', 'admin', 'admin123456@qq.com', 'admin');
insert into device (deviceName, `description`, userid, deviceType) values ('device0001', 'device0001', 'admin', 'Sensor');
insert into device (deviceName, `description`, userid, deviceType) values ('device0002', 'device0002', 'admin', 'Sensor');
insert into device (deviceName, `description`, userid, deviceType) values ('device0003', 'device0003', 'admin', 'Actuator');
insert into device (deviceName, `description`, userid, deviceType) values ('device0004', 'device0004', 'admin', 'SmartHome');
insert into device (deviceName, `description`, userid, deviceType) values ('device0005', 'device0005', 'admin', 'HealthMonitor');
