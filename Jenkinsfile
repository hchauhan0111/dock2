pipeline {
    agent any

    parameters {
        choice(name: 'UPDOWN_OPTION', choices: ['up', 'down'], description: 'Choose whether to bring the containers up or down')
    }

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
            when {
                expression {
                    return params.UPDOWN_OPTION == 'up'
                }
            }
            steps {
                script {
                    sh 'docker build -t dock_frontend ./my-react-app'
                    sh 'docker build -t dock_backend ./backend_service'
                }
            }
        }

        stage('Push to Docker Hub') {
            when {
                expression {
                    return params.UPDOWN_OPTION == 'up'
                }
            }
            steps {
                script {
                    echo "Pushing images to Docker Hub"
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
            when {
                expression {
                    return params.UPDOWN_OPTION == 'up'
                }
            }
            steps {
                script {
                    echo "Starting Docker Compose Up"
                    sh 'docker-compose up -d'  
                }
            }
        }

        stage('Docker Compose Down') {
            when {
                expression {
                    return params.UPDOWN_OPTION == 'down'
                }
            }
            steps {
                script {
                    echo "Stopping Docker Compose Down"
                    sh 'docker-compose down'
                }
            }
        }
    }
}
