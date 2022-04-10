/*
1.create a new project in console.firebase.google.com 
2.npm install firebase
3.create firebase.init.js and import getAuth to export auth
4.Firebase settings > Authentication > enable Email and Password sign-in-provider
5.create login,signup component, setup route.
6.attach form field handler and form submit handler.
7.npm install --save react-firebase-hooks
8.useCreateUserWithEmailAndPasssword from react-firebase-hooks
9.if user is created redirect to the expected page
10.useSignInWithEmailAndPassword for Login
11.create RequireAuth component => check user exists also tract user's location.
12.In routes, wrap protected component by using Require Auth component.
*/

/*
hosting steps:
1.npm install -g firebase tools (just one time for our computer)
2.firebase login (just one time for our computer)
3.firebase init (one time for each project)
4.npm run build (to build our project) (everytime we wants to deploy)
5.firebase deploy (everytime we wants to deploy)
 */