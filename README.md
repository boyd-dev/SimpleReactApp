## 스프링 부트 정적 리소스 위치에 프론트엔드 애플리케이션 배포하기

* 백엔드(스프링 부트)와 프론트엔드(리액트) 결합  
  프론트엔드 애플리케이션을 `yarn build`를 하면 build 디렉토리에 빌드 chunk가 생깁니다. 이것을 스프링 부트의 정적 리소스 
  디렉토리인 `/resources/static/` 아래로 복사합니다.
    
* Gradle Plugin for Node  
  스프링 부트의 build.gradle 스크립트에서 프론트엔드 애플리케이션을 빌드할 수 있습니다. 이 때 Node.js 빌드 플러그인을 사용합니다.
  [Gradle Plugin for Node](https://github.com/node-gradle/gradle-node-plugin) 을 플러그인으로 추가합니다. 
  
  ```shell
  plugins {
     ...
     id 'com.github.node-gradle.node' version '3.0.1'
  }
  ```
  그리고 다음과 같이 스크립트를 추가합니다. 예를 들어 리액트 애플리케이션 프로젝트의 위치가 `C:/Users/foo/SimpleReactApp` 이라고 하면 다음과 같은 태스크를 작성합니다.
  
  ```
  def frontendDir = "C:/Users/foo/SimpleReactApp"

  task copyFrontend(type: Copy) {
     from "$frontendDir/build"
     into "$projectDir/src/main/resources/static"       
  }

  // copy frontend app chunk to static directory after yarn_build task
  copyFrontend.dependsOn(yarn_build)

  compileJava.dependsOn(copyFrontend)

  node {
    nodeProjectDir = file("$frontendDir")
  }
  ```
  `copyFrontend` 태스크는 리액트 애플리케이션의 `build` 디렉토리에서 스프링 부트 정적 리소스 디렉토리로 복사하는 태스크입니다.
  그런데 이 태스크는 Node.js 플러그인이 제공하는 `yarn_build` 태스크 후에 실행되어야 합니다. 이 때 사용할 수 있는 것이 `dependsOn` 입니다.
  
  결과적으로 스프링 부트 프로젝트를 빌드하면 자동으로 프론트엔드 애플리케이션도 빌드되어 정적 리소스 디렉토리로 복사됩니다. 
