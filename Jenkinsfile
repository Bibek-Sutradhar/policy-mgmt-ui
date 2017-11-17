node {
    stage("checkout"){
		 git url: 'https://github.com/Bibek-Sutradhar/policy-mgmt-ui.git',branch: 'master' 
	}
	stage("npm_install"){
		bat "npm install"
	}
	stage("build"){
		bat "ng build -prod"
	}

	stage("cloudfoundry_login"){
	    withCredentials([usernamePassword(credentialsId: 'b0f0019d-4979-4a80-9bc8-50c707e89e95', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
            bat 'echo %USERNAME%'
	        bat 'cf login -a https://api.run.pivotal.io -u %USERNAME% -p %PASSWORD%'
	    }
	}
	stage("clodfoundry_push"){
	    bat "cf push"
	}
}