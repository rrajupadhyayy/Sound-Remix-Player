### Sound Remix Player Demo Project

---

## Dependencies

- [node](https://nodejs.org/en/)
- [nvm](https://github.com/nvm-sh/nvm)
- [Xcode](https://developer.apple.com/xcode/)
- [Android Studio](https://developer.android.com/studio)
## Installation on local machine

Use the correct node version

```
nvm use
```

Install `node_modules`.

```
npm i
```

Install `pods`

```
cd ios && pod install
```

## Libraries used

## Essential Libraries 

- `rn-fetch-blob`:
    - Used for downloading mp3 for the first time via freesound.org

- `@react-native-async-storage/async-storage`:
    - Since this is a single file project, I avoided using redux and managed with async storage.    

- `react-native-sound`:
    - Used for loading the sound asset that is cached in local storage.

- `react-native-circular-progress-indicator`:
    - Used for displaying the download progress bar as per one of the requirements

-  `react-native-vector-icons`:
    - Used for displaying the icons on individual sound buttons.

---

## Libraries installed due to dependancies

- `react-native-svg` and `react-native-reanimated`
    - These are installed as primary peer dependancies for `react-native-circular-progress-indicator`

---
## Libraries installed for additional features ( Not original scope )

- `@react-native-community/netinfo`
    - To check for internet connection before making the api call to download the mp3 files.

- `react-native-linear-gradient`
    - To make the background similar to the screenshots attached 

---

## Folder Structure

- All the relative files are stored in `src`.

- All the common reusable components are located at `src/components`.

- Reusable hooks are stored at `src/hooks`.

- Helper functions are stored at `src/utils`.

- App constants are stored at `src/config`.

- Render/ Display files are located at `src/pages`

---

## Coding Practices

- Avoid using relative paths, using absolute paths instead. ( implemented in `tsconfig.json` file)

- Common styles are stored in `globalStyles.ts` and the font styles are stored in `typography.ts`.

- Component specific styles are stored to it's corresponding styles file. 
Eg: `component.styles.ts`

- Component helper functions and constants are stored to its corresponding utils file.
Eg: `component.utils.ts`

- Component specific types are stored to it's corresponding types file. 
Eg: `component.types.ts`

