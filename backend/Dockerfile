FROM openjdk:21

WORKDIR /app

COPY build/libs/ec-site-playground-0.0.1-SNAPSHOT.jar /app/ec-site-playground.jar

ENTRYPOINT ["java", "-jar", "/app/ec-site-playground.jar"]

EXPOSE 8080