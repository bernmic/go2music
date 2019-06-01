pipeline {
    agent any

    stages {
        stage('Setup') {
            steps {
                echo 'Setup...'
                sh 'go version'
                sh 'echo $PWD'
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