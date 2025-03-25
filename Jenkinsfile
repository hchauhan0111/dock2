pipeline {
    agent any

    environment {
        GIT_REPO = 'https://github.com/hchauhan0111/dock2.git'
        //DOCKER_IMAGE = 'your-dockerhub-username/your-image-name'
    }

    stages {
        stage('Github Repo Checkout') {
            steps {
                git credentialsId: 'github-pat-token', url: "$GIT_REPO", branch: 'main'
            }
        }

        stage('Docker Compose Build') {
            steps {
                script {
                    sh 'docker-compose build'
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    echo "docker push "
                    docker.withRegistry('https://index.docker.io/v1/', 'docker-hub-credentials') {
                        sh 'docker tag dock_frontend:latest himanshuchauhan1/dock_frontend:latest'
                        sh 'docker tag dock_backend:latest himanshuchauhan1/dock_backend:latest'
                        sh 'docker push himanshuchauhan1/dock_frontend:latest'
                        sh 'docker push himanshuchauhan1/dock_backend:latest'
                    }
                }
            }
        }

        stage('Docker Compose Up') {
            steps {
                script {
                    echo "UP Compose"
                    //sh 'docker-compose up -d'
                }
            }
        }
    }
}
