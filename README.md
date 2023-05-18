## Running
```console
rose@rose:~$ git clone git@github.com:keeilzhanstd/fish-front.git
rose@rose:~$ cd fish-front
```
#### Dev: 
```console
rose@rose:/fish-front$ npm run start:dev
```
#### QA: 
```console
rose@rose:/fish-front$ npm run start:qa
```
#### Prod: 
```console
rose@rose:/fish-front$ npm run start:prod
```

Change .env files accordingly to you backend  
For example if your back api running on port 8000

```.env
# .env.dev
REACT_APP_API_BASE_URL=http://localhost:8000
REACT_APP_ENV=Dev
REACT_APP_ALLOW_FEATURE_ACCESS=1
```
