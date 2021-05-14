## 프론트엔드 애플리케이션

스프링 부트를 [백엔드](https://github.com/boyd-dev/SimpleSpringBootBoard) REST API서버로, 리액트 애플리케이션을 프론트엔드로 하는 간단한 게시판입니다. 
  
* 프론트엔드 애플리케이션  
  react.js를 기반으로 프론트엔드 애플리케이션이 작성되어 있습니다. 사용된 주요 라이브러리들은 다음과 같습니다.
  
  - react-redux
  - redux-saga
  - axios
  - react-router-dom
  - ag-grid-react
  - ckeditor5-react
  - styled-components
  - react-js-pagination
  - react-loader-spinner  
  

* CKEditor 5 Classic 에디터  
  CKEditor는 다양한 플러그인들이 제공되므로 필요한 플러그인을 사용하여 에디터를 구성할 수 있습니다. 직접 설정할 수도 있지만 
  공식 사이트에서 제공되는 [온라인 빌더](https://ckeditor.com/ckeditor-5/online-builder/) 를 사용하여 에디터를 
  커스터마이징할 수 있습니다.
  
  온라인 빌더를 통해 만들어진 에디터는 ckeditor5.zip 파일로 다운로드 받게 됩니다. 압축을 해제한 후 리액트 프로젝트의 루트에 복사합니다. 그리고 다음 명령어를 통해 설치합니다.
  온라인 빌더가 제공해주는 압축 파일 안에는 소스 파일 `ckeditor.js`가 포함되어 있으므로 개발자가 수정하여 다시 빌드할 수 
  있도록 되어 있습니다.

   ```
   yarn add file:./ckeditor5
   ```
   리액트에서 CKEditor를 쉽게 사용하려면 `@ckeditor/ckeditor5-react`를 설치합니다. 
   여기서는 `ckeditor5-custom-build/build/ckeditor`은 온라인 빌더로 만들어진 에디터가 모듈로 설치된 것입니다.

   ```javascript
   import { CKEditor } from "@ckeditor/ckeditor5-react";
   import Editor from "ckeditor5-custom-build/build/ckeditor";

   <CKEditor editor={Editor}
      config={editorConfiguration}
      data={content}
      onChange={ handleEditorChange }
      onReady={ editor => {
         // You can store the "editor" and use when it is needed.
         console.log('Editor is ready to use!', editor);
      }}
  />
  ```
  이 레포지토리를 클론한 후에는 그냥 `yarn install` 만을 수행하면 되겠습니다.

* CKEditor 이미지 게시판    
  CKEditor의 이미지 게시판은 다음 플러그인에 의해 활성화됩니다. 
  ```
  Editor.builtinPlugins = [
     ...,
     Image,
     ImageStyle,
     ImageResize,
     ImageToolbar,
     ImageUpload,
     ...
  ]
  ```
  에디터에서 이미지를 첨부하면 즉시 백엔드 서버에 업로드되면서 리턴되는 링크를 내용에 삽입합니다. 이 기능은 CKEditor의 "업로드 adapter"에 의해 이루어집니다. 
  업로드 adapter는 개발자가 가이드에 따라 직접 구현해주어야 하지만 CKEditor에서 제공되는 ["Simple upload adapter"](https://ckeditor.com/docs/ckeditor5/latest/features/image-upload/simple-upload-adapter.html) 를 사용합니다. 
  `ckeditor.js`에 다음을 추가합니다.
  
   ```
   import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';
   Editor.builtinPlugins = [
      ...,
      SimpleUploadAdapter
   ]
   ```  

* react-redux, redux-saga  
  상태 관리와 백엔드 서버와의 데이터 송수신과 위해 "리액트 리덕스"와 "리덕스 사가"를 사용합니다. 리액트 Hook의 도입으로 리액트 리덕스를 보다 쉽게 사용할 수 있게 되었습니다.
  `useSelector`와 `useDispatch`를 사용하면 스토어에 저장된 값들을 쉽게 참조하고 다음 액션을 디스패치 할 수 있습니다.
  
  백엔드 서버의 API를 호출하기 위해 `axios`와 미들웨어인 리덕스 사가를 사용하면 보다 체계적으로 인터페이스할 수 있습니다. 예를 들어
조회의 경우는 다음과 같은 순서에 의해 처리됩니다.  
  
  
  1. `GET_LIST` 액션이 디스패치되면 해당 액션을 사가 함수가 캐치(`takeLatest`)합니다. 이 액션은 백엔드 서버 API 호출이므로 쿠키에 JWT가 있는지 확인합니다.
  2. JWT가 존재하면 사가 함수는 다시 `GET_LIST_CALL` 액션을 디스패치(`yield put`)합니다. 
  3. `GET_LIST_CALL` 액션이 디스패치되면 역시 그것을 다른 사가 함수가 캐치하고 백엔드 서버의 API를(`axios`) 호출합니다.
  4. 백엔드 서버는 요청을 처리하고 JSON 객체로 결과를 리턴합니다.
  5. 사가 함수는 리턴 받은 결과를 파라미터로 하여 다시 `GET_LIST_OK` 액션을 디스패치 합니다.
  6. `GET_LIST_OK` 액션을 받은 리듀서는 스토어의 상태를 갱신합니다.
  
  이렇게 각 단계별로 중간에 추가적인 작업이 필요한 경우 미들웨어인 리덕스 사가를 활용할 수 있습니다.


* react-router-dom  
  SPA는 단일 페이지 애플리케이션이므로 게시판의 기능상 목록, 쓰기, 읽기 등의 페이지로 전환할 필요가 있습니다. 그래서 리액트 라우터를 사용합니다.
  
  여기서는 프론트엔드와 백엔드 애플리케이션이 스프링부트 내장 톰켓에 의해 함께 구동되므로 웹브라우저의 모든 요청은 백엔드 서버가 받습니다. 백엔드 서버는 기본적으로 유효한 JWT가 있는 API 호출만 처리합니다.
  문제는 프론트엔드의 react-router에서 라우팅되는 요청도 백엔드가 받게 된다는 것입니다. 그래서 리액트 라우터의 요청 패턴을 구분할 필요가 있습니다. 다음과 같이 
  `/app/**`로 시작하는 패턴으로 라우팅 URL을 정합니다. 
  
   ```javascript
   import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
   <Switch>
        <Route path="/app/list"  component={List} />
        <Route path="/app/read"  component={ReadAndModify} />
        <Route path="/app/write" component={Write} />
   </Switch>
   ```
   백엔드 측에서는 이 요청을 다시 `index.html`로 포워딩하고 리액트 라우터가 처리하게 됩니다.  


* react-js-pagination  
  게시판 목록의 페이징을 위해서 `react-js-pagination` 라이브러리를 사용합니다. 이 라이브러리는 부트스트랩에 의존성을 가지므로 부트스트랩을 추가합니다.  
  

* styled-components, bootstrap  
  화면 디자인에서는 `styled-components`을 사용하여 레이아웃을 정합니다. 스타일시트는 부트스트랩 3.3을 적용합니다.

  
