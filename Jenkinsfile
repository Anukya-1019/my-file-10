pipeline {
    agent any

    parameters {
        string(
            name: 'IMAGE_TAG',
            defaultValue: 'latest',
            description: 'Docker Image Tag'
        )
    }

    environment {
        PROJECT_ID = 'project-fbd51434-4f3d-4d37-8f7'
        REGION = 'asia-south1'
        REPOSITORY = 'sample-api-repo'
        IMAGE_NAME = 'sample-api'
        IMAGE_URI = "${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPOSITORY}/${IMAGE_NAME}:${params.IMAGE_TAG}"
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Run Unit Tests') {
            steps {
                bat 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t sample-api .'
            }
        }

        stage('Tag Docker Image') {
            steps {
                bat '''
                docker tag sample-api:latest %REGION%-docker.pkg.dev/%PROJECT_ID%/%REPOSITORY%/%IMAGE_NAME%:%IMAGE_TAG%
                '''
            }
        }

        stage('Push Image to Artifact Registry') {
            steps {
                bat '''
                docker push %REGION%-docker.pkg.dev/%PROJECT_ID%/%REPOSITORY%/%IMAGE_NAME%:%IMAGE_TAG%
                '''
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                echo 'Deployment stage will be completed after GKE cluster creation.'
            }
        }
    }

    post {

        success {
            echo 'Pipeline Completed Successfully.'
        }

        failure {
            echo 'Pipeline Failed.'
        }

        always {
            cleanWs()
        }
    }
}
