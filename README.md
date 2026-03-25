# ShopNest - Mobile App + Automation Framework

A React Native (Expo) shopping app with a WebdriverIO + Appium automation test suite supporting local emulators, BrowserStack phones, and tablets.

---

## Project Structure

```
ShopNest-Automation/
├── App.js                            # App entry point
├── app.json                          # Expo config
├── eas.json                          # EAS Build config
├── package.json                      # App dependencies
│
├── src/
│   ├── screens/
│   │   ├── LoginScreen.js            # Login with validation
│   │   ├── HomeScreen.js             # Product list
│   │   ├── ProductScreen.js          # Product detail + Add to Cart
│   │   └── CartScreen.js             # Cart with remove & total
│   ├── components/
│   │   ├── ProductCard.js            # Reusable product card
│   │   └── CartItem.js               # Reusable cart item row
│   ├── navigation/
│   │   └── AppNavigator.js           # Stack navigator
│   ├── data/
│   │   └── products.js               # Static JSON product data
│   ├── utils/
│   │   └── cartStore.js              # Zustand cart state
│   └── constants/
│       └── theme.js                  # Color palette
│
├── tests/                            # Automation framework
│   ├── browserstack.yml              # BrowserStack SDK config (8 devices)
│   ├── .env.example                  # Environment variable template
│   ├── package.json                  # Test dependencies & scripts
│   ├── config/
│   │   ├── wdio.base.conf.js         # Shared config (specs, suites, timeouts)
│   │   ├── wdio.local.conf.js        # Local Appium config
│   │   └── wdio.browserstack.conf.js # BrowserStack multi-device config
│   ├── screenObjects/                # Page Object Model
│   │   ├── LoginScreen.js
│   │   ├── HomeScreen.js
│   │   ├── ProductScreen.js
│   │   └── CartScreen.js
│   ├── test/specs/
│   │   ├── login.spec.js
│   │   ├── navigation.spec.js
│   │   └── cart.spec.js
│   └── utils/
│       └── helpers.js                # Reusable driver helpers
│
└── assets/images/                    # App icons
```

---

## App Setup

### Prerequisites

- Node.js >= 18
- Expo CLI: `npm install -g expo-cli`
- EAS CLI: `npm install -g eas-cli`

### Install & Run

```bash
npm install
npm start
npm run android
npm run ios
```

---

## App Features

| Screen      | Features                                           |
|-------------|----------------------------------------------------|
| **Login**   | Username/password inputs, validation, login button  |
| **Home**    | Scrollable product list, cart button                |
| **Product** | Product image, name, price, description, Add to Cart|
| **Cart**    | Cart items, remove item, total price, checkout      |

### Tech Stack

- **React Native** (Expo SDK 54)
- **React Navigation** (Native Stack)
- **Zustand** (state management)
- Static JSON data (no backend)

---

## Build App (EAS)

### Android APK

```bash
eas login
npm run build:apk
```

The APK will be available for download from the Expo dashboard.

### iOS Simulator Build (macOS only)

```bash
npx expo run:ios
```

The `.app` file is generated at `ios/build/Build/Products/Debug-iphonesimulator/ShopNest.app`. Set the path in `IOS_APP_PATH` in your `.env`.

---

## Automation Setup

### Prerequisites

- Node.js >= 18
- Appium 2.x: `npm install -g appium`
- UiAutomator2 driver: `appium driver install uiautomator2`
- XCUITest driver (for iOS): `appium driver install xcuitest`
- Android SDK with an emulator (for local runs)

### Install Test Dependencies

```bash
cd tests
npm install
```

### Configure Environment

Copy the template and fill in your credentials:

```bash
cp .env.example .env
```

```
BROWSERSTACK_USERNAME=your_username
BROWSERSTACK_ACCESS_KEY=your_access_key
BROWSERSTACK_APP_ID=bs://your_android_app_id
BROWSERSTACK_IOS_APP_ID=bs://your_ios_app_id

ANDROID_DEVICE_NAME=emulator-5554
ANDROID_VERSION=13.0
ANDROID_APP_PATH=

IOS_DEVICE_NAME=iPhone 15
IOS_VERSION=17.4
IOS_APP_PATH=
```

### Upload App to BrowserStack

**Android APK:**

```bash
curl -u "YOUR_USERNAME:YOUR_ACCESS_KEY" \
  -X POST "https://api-cloud.browserstack.com/app-automate/upload" \
  -F "file=@/path/to/app-release.apk"
```

**iOS IPA:**

```bash
curl -u "YOUR_USERNAME:YOUR_ACCESS_KEY" \
  -X POST "https://api-cloud.browserstack.com/app-automate/upload" \
  -F "file=@/path/to/ShopNest.ipa"
```

Copy the returned `app_url` into `.env`:
- Android `bs://` URL → `BROWSERSTACK_APP_ID`
- iOS `bs://` URL → `BROWSERSTACK_IOS_APP_ID`

### Run Tests

All commands run from the `tests/` directory:

```bash
cd tests
```

#### Android (Local)

Requires: Android emulator running + Appium server started

```bash
npm run test:android
npm run test:android:login
npm run test:android:navigation
npm run test:android:cart
```

#### iOS (Local)

Requires: macOS + Xcode + iOS Simulator + Appium with XCUITest driver

```bash
appium driver install xcuitest

npm run test:ios
npm run test:ios:login
npm run test:ios:navigation
npm run test:ios:cart
```

#### BrowserStack (Android + iOS)

Runs on 4 devices in parallel (Galaxy S23, Galaxy Tab S8, iPhone 15, iPad Pro 12.9):

```bash
npm run test:bs
npm run test:bs:login
npm run test:bs:navigation
npm run test:bs:cart
npm run test:bs:full
npm run test:bs:sdk
```

---

## BrowserStack Device Matrix

The `browserstack.yml` and `wdio.browserstack.conf.js` target 8 devices across phones and tablets:

| Platform | Device                | OS Version | Type   |
|----------|-----------------------|------------|--------|
| Android  | Samsung Galaxy S23    | 13.0       | Phone  |
| Android  | Google Pixel 7        | 13.0       | Phone  |
| Android  | Samsung Galaxy Tab S8 | 12.0       | Tablet |
| Android  | Google Pixel Tablet   | 13.0       | Tablet |
| iOS      | iPhone 15             | 17         | Phone  |
| iOS      | iPhone 13             | 15         | Phone  |
| iOS      | iPad Pro 12.9 2022    | 16         | Tablet |
| iOS      | iPad 10th             | 16         | Tablet |

---

## Config Architecture

```
wdio.base.conf.js          ← Shared: specs order, suites, framework, timeouts
    ├── wdio.local.conf.js  ← Extends base + Android/iOS capability (PLATFORM env var)
    └── wdio.browserstack.conf.js ← Extends base + 4 capabilities (2 Android + 2 iOS)
```

Specs execute in order: `login.spec.js` → `navigation.spec.js` → `cart.spec.js`

The local config reads `PLATFORM=android|ios` to select the right capability (defaults to Android).
The BrowserStack config uses `BROWSERSTACK_APP_ID` for Android and `BROWSERSTACK_IOS_APP_ID` for iOS.

---

## Test Coverage

| Spec File            | Tests | Scenarios                                                       |
|----------------------|-------|-----------------------------------------------------------------|
| `login.spec.js`      | 5     | Display elements, empty fields, username only, password only, successful login |
| `navigation.spec.js` | 5     | Home → Product, back to Home, Home → Cart, back to Home, full end-to-end flow |
| `cart.spec.js`       | 4     | Add product, display cart items, verify total price, remove item |
| **Total**            | **14**|                                                                 |

### Design Patterns

- **Page Object Model (POM)** — screen objects in `screenObjects/`
- **accessibilityLabel selectors** — all elements use both `testID` and `accessibilityLabel` for reliable `~accessibilityId` matching on Android and iOS
- **Reusable helpers** — `waitForElement`, `tapElement`, `setInputValue`, `clearInput`, `getElementText`, `isElementDisplayed`
- **Base config inheritance** — shared settings in `wdio.base.conf.js`, extended by local and BrowserStack configs

---

## Accessibility IDs

Every interactive and visible element has both `testID` and `accessibilityLabel` set to the same value for reliable Appium `~accessibilityId` selectors.

| Screen   | accessibilityLabel                |
|----------|-----------------------------------|
| Login    | `login-screen`                    |
| Login    | `login-logo`                      |
| Login    | `login-title`                     |
| Login    | `login-subtitle`                  |
| Login    | `login-username-input`            |
| Login    | `login-password-input`            |
| Login    | `login-button`                    |
| Login    | `login-error-message`             |
| Home     | `home-screen`                     |
| Home     | `home-title`                      |
| Home     | `home-cart-button`                |
| Home     | `home-product-list`               |
| Home     | `product-card-{id}`               |
| Home     | `product-card-{id}-name`          |
| Home     | `product-card-{id}-price`         |
| Home     | `product-card-{id}-image`         |
| Product  | `product-screen`                  |
| Product  | `product-image`                   |
| Product  | `product-name`                    |
| Product  | `product-price`                   |
| Product  | `product-description`             |
| Product  | `product-add-to-cart-button`      |
| Cart     | `cart-screen`                     |
| Cart     | `cart-empty-message`              |
| Cart     | `cart-item-list`                  |
| Cart     | `cart-item-{index}`               |
| Cart     | `cart-item-{index}-name`          |
| Cart     | `cart-item-{index}-price`         |
| Cart     | `cart-item-{index}-image`         |
| Cart     | `cart-item-{index}-remove-button` |
| Cart     | `cart-total-price`                |
| Cart     | `cart-checkout-button`            |
