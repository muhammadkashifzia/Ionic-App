1. Ionic requires Node.js and npm (Node Package Manager). If you haven't installed them, download from Node.js 
        Then, install the Ionic CLI globally:
        npm install -g @ionic/cli
   
2. Create a New Ionic React App
        ionic start myApp blank --type=react
3. Run the Ionic App
        ionic serve
   
4. Build for Android & iOS
    To build for Android, add the Android platform:
       ionic capacitor add android
    For iOS (requires macOS with Xcode):
      ionic capacitor add ios
   
5. Run on a Device/Emulator
    Android
    ionic capacitor run android
    iOS
   ionic capacitor run ios
   
7. Build for Production
   
To prepare the app for production:
    ionic build
For deploying as a PWA, run:
   ionic serve --prod

