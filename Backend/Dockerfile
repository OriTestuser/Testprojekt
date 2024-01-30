
#Aus dem Übungspacket übernommen nur auf mein projekt angepasst

FROM maven:3.9.1-amazoncorretto-19-debian-bullseye AS build
COPY src /usr/src/app/src
COPY pom.xml /usr/src/app
#COPY stockfish-ubuntu-x86-64-modern /usr/src/app
RUN mvn -f /usr/src/app/pom.xml clean install


#FROM openjdk:18-jdk-alpine
FROM ubuntu
VOLUME /tmp
COPY --from=build /usr/src/app/target/* /usr/app/
EXPOSE 8080
RUN apt-get update && apt-get install openjdk-19-jdk -y && apt-get install -y wget && apt-get clean && rm -rf /var/lib/apt/lists/*
ENTRYPOINT ["java","-jar","/usr/app/Backend-0.0.1-SNAPSHOT.jar"]




#edit start
# Download and install OpenJDK 18
# Download and install OpenJDK 19
RUN wget https://download.java.net/java/GA/jdk19.0.2/fdb695a9d9064ad6b064dc6df578380c/7/GPL/openjdk-19.0.2_linux-x64_bin.tar.gz && \
    tar -xvf openjdk-19.0.2_linux-x64_bin.tar.gz && \
    mv jdk-19.0.2 /opt/ && \
    rm openjdk-19.0.2_linux-x64_bin.tar.gz

# Set environment variables for Java
ENV JAVA_HOME=/opt/jdk-19.0.2
ENV PATH="${JAVA_HOME}/bin:${PATH}"



#RUN wget https://download.java.net/openjdk/jdk18/ri/openjdk-18+36_linux-x64_bin.tar.gz && \
#    tar -xvf openjdk-18+36_linux-x64_bin.tar.gz && \
#    mv jdk-18+36_linux-x64_bin /opt/jdk-18 && \
#    rm openjdk-18+36_linux-x64_bin.tar.gz

# Install curl
#RUN apk --no-cache add curl
#
## Download and install OpenJDK 18
#RUN curl -O https://download.java.net/openjdk/jdk18/ri/openjdk-18+36_linux-x64_bin.tar.gz && \
#    tar -xvf openjdk-18+36_linux-x64_bin.tar.gz && \
#    mv jdk-18+36 /opt/ && \
#    rm openjdk-18+36_linux-x64_bin.tar.gz

#
#
## Set environment variables for Java
#ENV JAVA_HOME=/opt/jdk-18
#ENV PATH="${JAVA_HOME}/bin:${PATH}"

WORKDIR /usr/app

# Copy the Stockfish binary
COPY src/main/java/Gruppe/C/Backend/linuxstockfish/stockfish-ubuntu-x86-64-modern .
# Ensure the Stockfish binary is executable
RUN chmod +x stockfish-ubuntu-x86-64-modern


#edit end


