# proj-edge-ai-app

# Requirement
## nodejs
- 8.x
## NPM(Node Pacakge Manager)
- v5.6 or higher
- yarn
- grunt

# pre installed
```
# yarn 명령어가 실행되지 않은 경우 아래의 명령을 실행해 주세요.
sudo npm install -g yarn
# grunt 명령어가 실행되지 않은 경우 아래의 명령을 실행해 주세요.
sudo npm install grunt-cli
```

# Build
```
yarn install
grunt
```

# Backend API

|Rest Type | API                    | Description                                                     |
|----------|------------------------|-----------------------------------------------------------------|
| GET      | api/ml/get             |모든 등록된 configuration 정보를 가져온다.                              |
| POST     | api/ml/save            |입력된 모든 configuration 정보를 저장한다.                              |
|          |                        |저장위치는 {custom.ini의 ml path}/config/cid.                        |
|          |                        |cid는 save 버튼 클릭시 입력한 이름.                                     |
| POST     | api/ml/start/:cid/:type|등록된 configuration를 run 한다.                                     |
|          |                        |여기서 type은 "python"                                              |
| PUT      | api/ml/stop/:pid       |running 중인 configuration를 stop 시킨다.                            |
| Delete   | api/ml/remove/:cid     |등록된 configuration를 삭제한다.                                      |
| GET      | api/ml/check           |등록된 프로세스 상태를 OS의 프로세스 상태와 비교하여 틀리면 DB file를 update한다.|
-----------------------------------------------------------------------------------------------------

1. GET : api/ml/get

[example in javascript]
```javascript
this.backendSrv.get('api/ml/get').then(result => {
      // Use result.Result
      console.log(result.Result);
});
```

2. POST : api/ml/save
[request body 정보]
```go
type MLsaveReq struct {
	Cid         string  `form:"cid"`
	Pid         string  `form:"pid"`
	Model       string  `form:"model"`
	Algorithm   string  `form:"algorithm"`
	Framework   string  `form:"framework"`
	InputInfo   string  `form:"inputInfo"`
	OutputInfo  string  `form:"outputInfo"`
	UploadModel []*multipart.FileHeader `form:"model[]"`
	UploadAlgorithm []*multipart.FileHeader `form:"algorithm[]"`
}
```
[example in javascript]
```javascript
var data = new FormData();
data.append("cid","test1");
data.append("pid","test1");
data.append("model","test1");
data.append("algorithm","test1");
data.append("framework","test1");
data.append("inputInfo","test1");
data.append("outputInfo","test1");

for (let model of modelList) {
  data.append('model[]', model);
}
for (let algorithm of algorithmList) {
  data.append('algorithm[]', algorithm);
}

this.http({
  method: 'POST',
  url: 'api/ml/save',
  data: data,
  headers: { 'Content-Type': undefined },
  transformResponse: angular.identity,
}).then(result => {
  console.log(result);
});
```

3. PUT : api/ml/start/:cid/:type - 등록된 configuration를 run 한다. 
                                 여기서 type은 "python"
```javascript
this.backendSrv.put('api/ml/start/cid/python').then(result => {
});
```

4. PUT : api/ml/stop/:pid - running 중인 configuration를 stop 시킨다.

```javascript
this.backendSrv.put('api/ml/stop/pid').then(result => {
});
```

5. Delete : api/ml/remove/:cid - 등록된 configuration를 삭제한다.
```javascript
this.backendSrv.delete('api/ml/remove/cid').then(result => {
});
```

6. GET : api/ml/check
```javascript
this.backendSrv.delete('api/ml/check').then(result => {
  if (result.Result > 0 ) {
      something wrong and updated the status
  }
});
```
