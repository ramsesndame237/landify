pipeline {
    agent any
    options {
        skipStagesAfterUnstable()
    }
    stages {
        stage('Clone repository') {
            steps {
                script{
                    sh 'printenv'
                    echo 'Pulling...' + env.BRANCH_NAME
                    checkout scm
                }
            }
        }

        stage('Build') {
            steps {
                script{
                    echo 'Copy env file for the current branch'       
                    sh "cp ${env.BRANCH_NAME}.env .env"

                    slackSend(message: "${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)\nBuild commencé", channel: "zelos-sfm-dev")
                    if (env.BRANCH_NAME == 'master') {
                        app = docker.build("registry.gitlab.com/kevmaxsarl/zelos/frontend:latest")
                    } else if (env.BRANCH_NAME == 'main') {
                        app = docker.build("registry.gitlab.com/kevmaxsarl/zelos/frontend:develop")
                    } else {
                        app = docker.build("registry.gitlab.com/kevmaxsarl/zelos/frontend:"+env.BRANCH_NAME)
                    }
                }
            }
        }
        stage('Test'){
            steps {
                echo 'Empty...'
            }
        }
        stage('Deploy') {
            steps {
                script{
                    docker.withRegistry('https://registry.gitlab.com/kevmaxsarl/zelos/frontend', 'gitlab_username_password') {
                        // app.push("${env.BUILD_NUMBER}")
                        if (env.BRANCH_NAME == 'master') {
                            app.push("latest")
                        } else if (env.BRANCH_NAME == 'main') {
                            app.push("develop")
                        } else {
                            app.push(env.BRANCH_NAME)
                        }
                    }
                }
            }
        }

    }
    
    post {
        success {
            slackSend(color: "good", message: "${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)\nBuild effectué avec succès", channel: "zelos-sfm-dev")
        }
        failure {
            slackSend(failOnError:true, message:"${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)\nÉchec de build", channel: "zelos-sfm-dev")
        }
    }

}
