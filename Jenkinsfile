pipeline {
    agent any

    tools {
        go 'go-1.17'
    }

    stages {
        stage('Setup') {
            steps {
                echo 'Setup...'
                sh 'go version'
                sh 'echo $PWD'
            }
        }
        stage('Build') {
            steps {
                echo 'Build...'
                sh 'go get ./...'
                sh 'go build ./...'
                sh 'go build'
            }
        }
        stage('test') {
            steps {
                echo 'Test...'
            }
        }
    }
}
