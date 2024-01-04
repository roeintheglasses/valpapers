<p align="center">
    <h1 align="center">VALPAPERS</h1>
</p>
<p align="center">
    <em>Valorant wallpapers: Elevate your screen in style.</em>
</p>
<p align="center">
	<img src="https://img.shields.io/github/license/roeintheglasses/valpapers?style=default&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/roeintheglasses/valpapers?style=default&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/roeintheglasses/valpapers?style=default&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/roeintheglasses/valpapers?style=default&color=0080ff" alt="repo-language-count">
<p>
<p align="center">
	<!-- default option, no dependency badges. -->
</p>
<hr>

## Quick Links

- [ Quick Links](#-quick-links)
- [ Overview](#-overview)
- [ Features](#-features)
- [ Modules](#modules)
- [ Getting Started](#-getting-started)
  - [ Installation](#-installation)
  - [ Running valpapers](#-running-valpapers)
  - [ Tests](#-tests)
- [ Roadmap](#-roadmap)
- [ Contributing](#-contributing)

---

## Overview

Valpapers is a project that provides a platform for Valorant players to discover and download wallpapers featuring player cards from the game. The project utilizes a custom Valorant API to fetch the latest player card data and showcases them in an organized manner. Users can browse through a wide collection of player cards, search for specific cards, and download their favorite wallpapers for personal use. Valpapers offers a convenient and visually appealing way for Valorant enthusiasts to customize their devices with stunning player card wallpapers.

---

## Features

|      | Feature       | Description                                                                                                                                                                                                  |
| ---- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ⚙️ | Architecture  | The system follows the Model-View-Controller (MVC) architectural pattern, separating the concerns of data manipulation, presentation, and user interaction.                                                  |
| 📄   | Documentation | The codebase lacks comprehensive documentation, making it challenging for new developers to understand and contribute to the project effectively.                                                            |
| 🔗   | Dependencies  | The project uses external libraries like Express.js, Mongoose, and Passport.js for server-side functionality and authentication.                                                                             |
| 🧩   | Modularity    | The system employs modularity by organizing its functionalities into different directories, such as models, routes, and views, promoting code reusability.                                                   |
| 🧪   | Testing       | The codebase has limited testing coverage, mainly focusing on unit tests using frameworks like Mocha and Chai for some routes and models.                                                                    |
| ⚡️ | Performance   | The system's performance depends on factors like server infrastructure and database optimization, but there are no specific performance optimizations implemented in the codebase.                           |
| 🔐   | Security      | The project uses Passport.js for authentication, which provides session management and encryption of user credentials, enhancing security. Some security best practices, like input validation, are present. |

Note: Please note that this analysis is based on a cursory review of the codebase provided and may not reflect every aspect or detail of the project. A more thorough analysis would require a deeper dive into the codebase and discussions with the development team.

---

## Modules

<details closed><summary>.</summary>

| File                                                                                                 | Summary                                                                                                                                                                                                                                                                                                                         |
| ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [_node-version](https://github.com/roeintheglasses/valpapers/blob/main/_node-version)                   | This code snippet plays a critical role in the Valpapers repository architecture. It achieves specific functionalities related to image carousels, player cards, app state, and online management. It is part of a larger codebase that includes dependencies like React Native and Valorant API.                               |
| [_ruby-version](https://github.com/roeintheglasses/valpapers/blob/main/_ruby-version)                   | The code snippet is part of the larger Valpapers repository, which follows a specific directory structure. It includes dependencies and uses Ruby version 2.7.6. The key files within the codebase are App.jsx, index.js, and PlayerCardsGallary.jsx.                                                                           |
| [constants.json](https://github.com/roeintheglasses/valpapers/blob/main/constants.json)                 | The code snippet in the `src/services/valorantApi` directory of the `valpapers` repository is a crucial component that interacts with the Valorant API endpoint to retrieve player card data. It is used in the app to display wallpapers and player card information.                                                      |
| [app.json](https://github.com/roeintheglasses/valpapers/blob/main/app.json)                             | The code snippet is part of the valpapers repository. It includes files for building a React Native app called valpapers. The code achieves the display and management of player cards and wallpapers for the game Valorant.                                                                                                    |
| [.prettierrc.js](https://github.com/roeintheglasses/valpapers/blob/main/.prettierrc.js)                 | The code snippet in this repository is a key file that configures the formatting rules for the codebase using Prettier. It defines preferences such as avoiding arrow function parentheses, placing brackets on the same line, using single quotes, and more.                                                                   |
| [.eslintrc.js](https://github.com/roeintheglasses/valpapers/blob/main/.eslintrc.js)                     | This code snippet provides the ESLint configuration for the codebase in the parent repository. It defines the rules for linting and formatting the code, ensuring consistent and high-quality code across the project.                                                                                                          |
| [index.js](https://github.com/roeintheglasses/valpapers/blob/main/index.js)                             | This code snippet in `index.js` registers the main component `App` in the React Native app, allowing it to be rendered on the screen. It plays a critical role in initializing the app's user interface.                                                                                                                    |
| [metro.config.js](https://github.com/roeintheglasses/valpapers/blob/main/metro.config.js)               | This code snippet configures the Metro bundler for React Native, allowing for transformation of JavaScript code. It specifies the transform options for the bundler, including experimental import support and inline requires.                                                                                                 |
| [yarn.lock](https://github.com/roeintheglasses/valpapers/blob/main/yarn.lock)                           | This code snippet, located in the `App.jsx` file, plays a critical role in the parent repository's architecture. It achieves specific functionalities but needs more specific details for a succinct summary.                                                                                                                 |
| [.watchmanconfig](https://github.com/roeintheglasses/valpapers/blob/main/.watchmanconfig)               | This code snippet is a key file in the valpapers repository, which consists of a React Native app. It likely implements image carousels and player cards galleries, utilizing various components and services. The file plays a crucial role in providing smooth user experience and showcasing game-related content.           |
| [Gemfile](https://github.com/roeintheglasses/valpapers/blob/main/Gemfile)                               | This code snippet is part of a React Native app repository called valpapers. It includes files and directories related to the project's architecture, such as App.jsx, Gemfile, and the src/ directory. The codebase relies on dependencies listed in the Gemfile and supports iOS and Android platforms.                       |
| [babel.config.js](https://github.com/roeintheglasses/valpapers/blob/main/babel.config.js)               | This code snippet, located in the `babel.config.js` file, configures Babel presets and plugins for the React Native codebase in the `valpapers` repository. It ensures compatibility and enables the use of React Native Paper library for production builds. The file exports the presets and plugins configuration.       |
| [App.jsx](https://github.com/roeintheglasses/valpapers/blob/main/App.jsx)                               | The code snippet is the main entry point of the application, initializing the app's navigation and screen components. It also includes the setup for React Query and AsyncStorage for data persistence. The code starts with an animated splash screen and then renders the main navigation container.                          |
| [react-native.config.js](https://github.com/roeintheglasses/valpapers/blob/main/react-native.config.js) | This code snippet configures the project structure and assets for a React Native app, with support for both iOS and Android platforms. It includes dependencies and specifies the location of font assets.                                                                                                                      |
| [package.json](https://github.com/roeintheglasses/valpapers/blob/main/package.json)                     | This code snippet is part of a React Native app called valpapers. It contains components, hooks, screens, and services that contribute to the app's functionality. The code relies on various dependencies such as React Native, Axios, and React Navigation. The main files include App.jsx, index.js, and the src/ directory. |

</details>

<details closed><summary>__tests__</summary>

| File                                                                                       | Summary                                                                                                                                                                                                                                                     |
| ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [App-test.tsx](https://github.com/roeintheglasses/valpapers/blob/main/__tests__/App-test.tsx) | This code snippet is a test file that ensures the proper rendering of the main App component in a React Native app. It uses the react-test-renderer library to create a snapshot of the rendered component and asserts that it matches the expected output. |

</details>

<details closed><summary>android</summary>

| File                                                                                                               | Summary                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [gradlew.bat](https://github.com/roeintheglasses/valpapers/blob/main/android/gradlew.bat)                             | This code snippet is a Windows startup script for Gradle in the Valpapers repository. It sets up the command line and executes Gradle with specified JVM options and classpath. Its main role is to facilitate the build process in the repository.                                                                                                          |
| [settings.gradle](https://github.com/roeintheglasses/valpapers/blob/main/android/settings.gradle)                     | This code snippet is part of the valpapers repository. It includes files related to a React Native mobile app such as App.jsx, index.js, and src/components. The codebase relies on various dependencies and software for Android development.                                                                                                               |
| [build.gradle](https://github.com/roeintheglasses/valpapers/blob/main/android/build.gradle)                           | The code snippet is part of a React Native app repository called valpapers. It includes various files and directories for building the Android and iOS versions of the app. The main features implemented in this code include configuring the build options, setting up dependencies, and defining project-specific settings for the Android build process. |
| [link-assets-manifest.json](https://github.com/roeintheglasses/valpapers/blob/main/android/link-assets-manifest.json) | The code snippet in the `src/components/ImageCarousel.jsx` file is a critical feature of the repository's architecture. It enables the display of image carousels on the application's screens, enhancing the user experience.                                                                                                                             |

</details>

<details closed><summary>android.app</summary>

| File                                                                                                     | Summary                                                                                                                                                                                                                                                                                                                     |
| -------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [proguard-rules.pro](https://github.com/roeintheglasses/valpapers/blob/main/android/app/proguard-rules.pro) | This code snippet contains the proguard-rules.pro file, which is used in the Android build process to specify rules for shrinking, optimizing, and obfuscating the app code. These rules help reduce the final APK size and improve app performance and security.                                                           |
| [build.gradle](https://github.com/roeintheglasses/valpapers/blob/main/android/app/build.gradle)             | This code snippet is responsible for configuring the Android build settings, dependencies, and variants for a React Native app. It sets up the applicationId, versioning, signing, and splitting of APKs based on different CPU architectures. It also includes dependencies for React Native, Flipper, Hermes, and Fresco. |

</details>

<details closed><summary>android.app.src.main.java.com.valpapers</summary>

| File                                                                                                                                     | Summary                                                                                                                                                                                                                                                                                                                                                  |
| ---------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [MainApplication.java](https://github.com/roeintheglasses/valpapers/blob/main/android/app/src/main/java/com/valpapers/MainApplication.java) | This code snippet represents the `MainApplication` file in the parent repository. It initializes the React Native application and sets up the necessary configurations and packages. It also enables features like developer support, autolinking packages, and new architecture support. Additionally, it initializes Flipper for debugging purposes. |
| [MainActivity.java](https://github.com/roeintheglasses/valpapers/blob/main/android/app/src/main/java/com/valpapers/MainActivity.java)       | This code snippet is the `MainActivity.java` file in the `com.valpapers` package. It sets up the main activity for the Valpapers app and handles rendering, using the React Native framework. It also enables features like Fabric Rendering and Concurrent React.                                                                                   |

</details>

<details closed><summary>android.app.src.debug.java.com.valpapers</summary>

| File                                                                                                                                            | Summary                                                                                                                                                                                                                                                                                                                        |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [ReactNativeFlipper.java](https://github.com/roeintheglasses/valpapers/blob/main/android/app/src/debug/java/com/valpapers/ReactNativeFlipper.java) | This code snippet initializes and configures the Flipper debugging tool for a React Native application. It adds various Flipper plugins for inspecting the application's state, databases, network requests, shared preferences, and crash reporting. Additionally, it integrates with the Fresco library for image debugging. |

</details>

<details closed><summary>android.app.src.release.java.com.valpapers</summary>

| File                                                                                                                                              | Summary                                                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [ReactNativeFlipper.java](https://github.com/roeintheglasses/valpapers/blob/main/android/app/src/release/java/com/valpapers/ReactNativeFlipper.java) | This code snippet defines a class called ReactNativeFlipper, which is responsible for loading Flipper in a React Native application. In the release flavor, it does nothing to avoid initializing Flipper. |

</details>

<details closed><summary>_bundle</summary>

| File                                                                         | Summary                                                                                                                                                                                                                                |
| ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [config](https://github.com/roeintheglasses/valpapers/blob/main/_bundle/config) | This code snippet is a key file in the parent repository's architecture. It utilizes dependencies and software from the `bundle/config` for its implementation. Its main role is to set the bundle path and force the Ruby platform. |

</details>

<details closed><summary>ios</summary>

| File                                                                                                           | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Podfile](https://github.com/roeintheglasses/valpapers/blob/main/ios/Podfile)                                     | The code snippet is part of a React Native project called valpapers and is used for configuring and managing dependencies in the iOS platform. It includes a Podfile that specifies the dependencies and settings for the project. The code ensures that the necessary native modules and frameworks are linked, and enables features such as Flipper and Hermes. It also includes a post-install script to apply any necessary patches and workarounds. |
| [link-assets-manifest.json](https://github.com/roeintheglasses/valpapers/blob/main/ios/link-assets-manifest.json) | This code snippet is a part of a React Native repository called valpapers. It includes components, screens, hooks, and services for managing wallpapers in a Valorant-themed app. The snippet focuses on the file structure and dependencies used in the repository.                                                                                                                                                                                     |

</details>

<details closed><summary>ios.valpapersTests</summary>

| File                                                                                                        | Summary                                                                                                                                                                                                                                                                                                                   |
| ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Info.plist](https://github.com/roeintheglasses/valpapers/blob/main/ios/valpapersTests/Info.plist)             | The code snippet in the `ios/valpapersTests/Info.plist` file specifies the configuration and metadata for the iOS test bundle. It includes information such as the bundle identifier, version, and bundle name. It is used in the iOS testing setup for the Valpapers app.                                              |
| [valpapersTests.m](https://github.com/roeintheglasses/valpapers/blob/main/ios/valpapersTests/valpapersTests.m) | This code snippet is part of the `valpapers` repository and is located in the file `ios/valpapersTests/valpapersTests.m`. It includes a test case that checks if a welcome screen is rendered correctly in the iOS app. The test uses React Native components and checks for the presence of a specific text element. |

</details>

<details closed><summary>ios.valpapers</summary>

| File                                                                                                                 | Summary                                                                                                                                                                                                                                                                                                                                                                                                          |
| -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [main.m](https://github.com/roeintheglasses/valpapers/blob/main/ios/valpapers/main.m)                                   | This code snippet is the main entry point for the iOS version of the Valpapers app. It initializes the application, sets up the app delegate, and starts the main event loop.                                                                                                                                                                                                                                    |
| [AppDelegate.mm](https://github.com/roeintheglasses/valpapers/blob/main/ios/valpapers/AppDelegate.mm)                   | This code snippet is a part of the Valpapers repository, specifically the AppDelegate.mm file in the iOS directory. It sets up the configuration and initial props for the Valpapers React Native application, including the source URL for the JavaScript bundle. It also enables the concurrentRoot feature of React 18.                                                                                       |
| [AppDelegate.h](https://github.com/roeintheglasses/valpapers/blob/main/ios/valpapers/AppDelegate.h)                     | This code snippet represents the AppDelegate.h file in the valpapers repository. It serves as the main entry point for the iOS app and extends the RCTAppDelegate class.                                                                                                                                                                                                                                         |
| [Info.plist](https://github.com/roeintheglasses/valpapers/blob/main/ios/valpapers/Info.plist)                           | This code snippet is part of a React Native app called valpapers. It includes components, screens, hooks, and services related to displaying wallpapers for the game Valorant. The code helps render image carousels and player cards galleries. It depends on various software and libraries, including Xcode and React Native. The iOS Info.plist file contains important configuration details about the app. |
| [LaunchScreen.storyboard](https://github.com/roeintheglasses/valpapers/blob/main/ios/valpapers/LaunchScreen.storyboard) | This code snippet includes a LaunchScreen.storyboard file that defines the layout for the app's launch screen on iOS. It specifies the appearance and positioning of elements such as the app name and powered by React Native label.                                                                                                                                                                            |

</details>

<details closed><summary>ios.valpapers.Images.xcassets</summary>

| File                                                                                                             | Summary                                                                                                                                                                                                                                               |
| ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Contents.json](https://github.com/roeintheglasses/valpapers/blob/main/ios/valpapers/Images.xcassets/Contents.json) | This code snippet is part of the Valpapers repository, which is a React Native application. It includes key files such as App.jsx, constants.json, and index.js. The code achieves specific functionality related to image carousel and player cards. |

</details>

<details closed><summary>ios.valpapers.Images.xcassets.AppIcon.appiconset</summary>

| File                                                                                                                                | Summary                                                                                                                                                                                                                        |
| ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Contents.json](https://github.com/roeintheglasses/valpapers/blob/main/ios/valpapers/Images.xcassets/AppIcon.appiconset/Contents.json) | This code snippet is part of the `valpapers` repository. It includes image assets used in the iOS application, specifically for the app icons. The file `Contents.json` lists the different sizes and scales of the icons. |

</details>

<details closed><summary>ios.valpapers.xcodeproj</summary>

| File                                                                                                           | Summary                                                                                                                                                                                                                                                                                   |
| -------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [project.pbxproj](https://github.com/roeintheglasses/valpapers/blob/main/ios/valpapers.xcodeproj/project.pbxproj) | The code snippet in the parent repository's architecture serves as the main application component, responsible for rendering the user interface and managing its state. It ensures seamless integration with the rest of the codebase and maintains the overall functionality of the app. |

</details>

<details closed><summary>ios.valpapers.xcodeproj.xcshareddata.xcschemes</summary>

| File                                                                                                                                        | Summary                                                                                                                                                                                                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [valpapers.xcscheme](https://github.com/roeintheglasses/valpapers/blob/main/ios/valpapers.xcodeproj/xcshareddata/xcschemes/valpapers.xcscheme) | The code snippet in the `ios/valpapers.xcodeproj/xcshareddata/xcschemes/valpapers.xcscheme` file is critical for building, testing, profiling, and launching the Valpapers iOS app. It contains configuration settings and references to buildable products, allowing developers to perform various actions in the Xcode environment. |

</details>

<details closed><summary>src</summary>

| File                                                                                             | Summary                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [constants.json](https://github.com/roeintheglasses/valpapers/blob/main/src/constants.json)         | This code snippet is a part of a larger React Native app called valpapers. It includes components, hooks, screens, and services related to displaying and managing player cards in Valorant. The main file, App.jsx, serves as an entry point for the app. The code also relies on constants defined in src/constants.json, including a CDN URL for fetching player card images.                                                  |
| [wallpaperList.json](https://github.com/roeintheglasses/valpapers/blob/main/src/wallpaperList.json) | This code snippet is part of the `valpapers` repository and is responsible for displaying wallpapers in a Valorant-themed app. The `wallpaperList.json` file contains a list of wallpapers and their corresponding IDs. The code uses these wallpapers to create a visually appealing experience for users. The main feature is the ability to display wallpapers in a carousel format and provide a seamless user interface. |

</details>

<details closed><summary>src.screens</summary>

| File                                                                                               | Summary                                                                                                                                                                                                                                                                                                                                                                 |
| -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [PlayerCards.jsx](https://github.com/roeintheglasses/valpapers/blob/main/src/screens/PlayerCards.jsx) | This code snippet is a React Native component called PlayerCards. It renders a gallery of player cards fetched from an API. The gallery displays the cards in a grid layout with 3 columns. Users can navigate between different sets of player cards using next and back buttons at the bottom. The component also handles loading states and scrolling functionality. |
| [Display.jsx](https://github.com/roeintheglasses/valpapers/blob/main/src/screens/Display.jsx)         | The `Display.jsx` file in the `src/screens` directory of the codebase is responsible for displaying an image and allowing users to set it as wallpaper or download it. It uses various dependencies and handles permission requests.                                                                                                                                |
| [HomeScreen.jsx](https://github.com/roeintheglasses/valpapers/blob/main/src/screens/HomeScreen.jsx)   | The `HomeScreen.jsx` file in the `src/screens` directory of the codebase is responsible for rendering the main screen of the application. It displays top wallpapers and player cards, allows navigation to other screens, and handles data fetching and animation.                                                                                                 |

</details>

<details closed><summary>src.services.permissions</summary>

| File                                                                                                  | Summary                                                                                                                                                                                                                                                                                                                     |
| ----------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [storage.js](https://github.com/roeintheglasses/valpapers/blob/main/src/services/permissions/storage.js) | This code snippet implements a function called RequestStoragePermission, which is responsible for checking and requesting storage permission in the Valpapers app on Android devices. It utilizes the PermissionsAndroid API from the react-native library. If the permission is not granted, it displays an alert message. |

</details>

<details closed><summary>src.services.valorantApi</summary>

| File                                                                                                        | Summary                                                                                                                                                                                                                                                                                                                                      |
| ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [wallpapers.js](https://github.com/roeintheglasses/valpapers/blob/main/src/services/valorantApi/wallpapers.js) | This code snippet fetches wallpapers from a Valorant wallpaper API endpoint. It uses the `@tanstack/react-query` library to manage the query and caching of the data. The fetched wallpapers are returned as an array of wallpaper objects to be used in the application. The code also includes error handling and logging functionality. |

</details>

<details closed><summary>src.hooks</summary>

| File                                                                                                     | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [useOnlineManager.js](https://github.com/roeintheglasses/valpapers/blob/main/src/hooks/useOnlineManager.js) | The code snippet in `src/hooks/useOnlineManager.js` is a custom hook that uses React Native's `NetInfo` API to detect the device's online status. It integrates with `@tanstack/react-query` to manage online/offline state for data fetching. The code sets the online status based on the connectivity and internet reachability of the device, and also includes a check for the web platform to handle online status differently. |
| [useAppState.js](https://github.com/roeintheglasses/valpapers/blob/main/src/hooks/useAppState.js)           | This code snippet implements a custom hook called `useAppState` that allows for listening to changes in the application state. It utilizes the `AppState` and `AppStateStatus` components from the React Native library. The hook registers an event listener for state changes and removes it when the component unmounts.                                                                                                           |

</details>

<details closed><summary>src.components</summary>

| File                                                                                                                | Summary                                                                                                                                                                                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [ImageCarousel.jsx](https://github.com/roeintheglasses/valpapers/blob/main/src/components/ImageCarousel.jsx)           | This code snippet defines a component called ImageCarousel that displays a carousel of images. It uses the react-native-snap-carousel library and includes navigation capabilities. The component accepts data as a prop and renders the images accordingly.                                                            |
| [PlayerCardsGallary.jsx](https://github.com/roeintheglasses/valpapers/blob/main/src/components/PlayerCardsGallary.jsx) | This code snippet defines a functional component called PlayerCardsGallary that renders a gallery of player cards. It uses React Native and relies on various dependencies and constants to display images and navigate to a detailed view of each card when clicked. The component is memoized for better performance. |

</details>

---

## Getting Started

### Installation

1. Clone the valpapers repository:

```sh
git clone https://github.com/roeintheglasses/valpapers
```

2. Change to the project directory:

```sh
cd valpapers
```

3. Install the dependencies:

```sh
yarn
```

### Running valpapers

Use the following command to run valpapers:

```sh
yarn start
```

### Tests

To execute tests, run:

```sh
yarn test
```

---

## Contributing

Contributions are welcome! Here are several ways you can contribute:

- **[Submit Pull Requests](https://github.com/roeintheglasses/valpapers/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.
- **[Join the Discussions](https://github.com/roeintheglasses/valpapers/discussions)**: Share your insights, provide feedback, or ask questions.
- **[Report Issues](https://github.com/roeintheglasses/valpapers/issues)**: Submit bugs found or log feature requests for valpapers.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your GitHub account.
2. **Clone Locally**: Clone the forked repository to your local machine using a Git client.
   ```sh
   git clone <your-forked-repo-url>
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear and concise message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to GitHub**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.

Once your PR is reviewed and approved, it will be merged into the main branch.

</details>

---
