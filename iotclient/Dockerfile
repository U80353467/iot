# 使用 OpenJDK 镜像作为基础镜像
FROM openjdk:8-jre-slim

# 设置工作目录
WORKDIR /app

# 复制本地的 JAR 文件到工作目录
COPY target ./

# 暴露端口
EXPOSE 1883

# 启动应用
CMD ["java", "-jar", "iotclient-1.0.0.jar"]