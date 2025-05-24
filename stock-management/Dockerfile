# Étape 1 : image de base Java
FROM openjdk:17-jdk-slim

# Étape 2 : définir le dossier de travail dans le conteneur
WORKDIR /app

# Étape 3 : copier le .jar généré
COPY target/*.jar app.jar

# Étape 4 : exposer le port utilisé par Spring Boot
EXPOSE 8080

# Étape 5 : lancer l'application
ENTRYPOINT ["java", "-jar", "app.jar"]
