pipeline {
    agent any

    stages {
        stage('Setup') {
            steps {
                echo 'Setup...'
                sh 'go get ./...'
            }
        }
        stage('Generate') {
            steps {
                echo 'Generate...'
            }
        }
        stage('Build') {
            steps {
                echo 'Build...'
            }
        }
    }
}