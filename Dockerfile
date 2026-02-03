FROM openjdk:21-ea-1-jdk-slim

USER nonroot
WORKDIR /home/nonroot

COPY backend/build/libs/better_timer.jar .

EXPOSE 8443

CMD ["java", "-jar", "better_timer.jar"]
