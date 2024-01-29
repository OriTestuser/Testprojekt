
#Aus dem Übungspacket übernommen nur auf mein projekt angepasst

FROM maven:3.8.6-openjdk-18 AS build
COPY src /usr/src/app/src
COPY pom.xml /usr/src/app
#COPY stockfish-ubuntu-x86-64-modern /usr/src/app
RUN mvn -f /usr/src/app/pom.xml clean install



#FROM openjdk:18-jdk-alpine
FROM ubuntu
VOLUME /tmp
COPY --from=build /usr/src/app/target/* /usr/app/
EXPOSE 8080
RUN apt-get update && apt-get install openjdk-18-jdk -y && apt-get install stockfish -y && chmod +x /usr/games/stockfish
ENTRYPOINT ["java","-jar","/usr/app/Backend-0.0.1-SNAPSHOT.jar"]

