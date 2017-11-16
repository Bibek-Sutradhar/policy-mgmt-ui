node {
    stage("checkout"){
		 git url: 'https://github.com/Bibek-Sutradhar/policy-mgmt-ui.git',branch: 'master' 
	}
	stage("npm_install"){
		bat "npm install"
	}
	stage("build"){
		bat "npm run ng -- build"
	}
}