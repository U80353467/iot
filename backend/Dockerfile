# 使用 Zulu JDK 18 作为基础镜像
FROM azul/zulu-openjdk:18 AS builder

# 设置工作目录
WORKDIR /app

# 复制项目文件到工作目录
COPY . .

# 构建应用
RUN ./mvnw package -DskipTests

# 使用 Zulu JDK 18 作为基础镜像
FROM azul/zulu-openjdk:18

# 设置工作目录
WORKDIR /app

# 复制构建好的 JAR 文件到工作目录
COPY --from=builder /app/target/lot-0.0.1-SNAPSHOT.jar ./app.jar

# 暴露端口
EXPOSE 8080

# 启动应用
CMD ["java", "-jar", "app.jar"]