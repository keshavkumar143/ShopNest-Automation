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

## Build APK (EAS)

```bash
eas login
npm run build:apk
```

The APK will be available for download from the Expo dashboard.

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

Copy the template and fill in your BrowserStack credentials:

```bash
cp .env.example .env
```

```
BROWSERSTACK_USERNAME=your_username
BROWSERSTACK_ACCESS_KEY=your_access_key
BROWSERSTACK_APP_ID=bs://your_app_id
```

### Upload APK to BrowserStack

```bash
curl -u "YOUR_USERNAME:YOUR_ACCESS_KEY" \
  -X POST "https://api-cloud.browserstack.com/app-automate/upload" \
  -F "file=@/path/to/app-release.apk"
```

Copy the returned `app_url` (e.g., `bs://abc123`) into `BROWSERSTACK_APP_ID` in `.env`.

### Run Tests

```bash
cd tests

# Run all specs locally (login -> navigation -> cart)
npm test

# Run a specific suite locally
npm run test:login
npm run test:navigation
npm run test:cart
npm run test:full

# Run all specs on BrowserStack (4 devices in parallel)
npm run test:bs

# Run a specific suite on BrowserStack
npm run test:bs:login
npm run test:bs:navigation
npm run test:bs:cart
npm run test:bs:full

# Run via BrowserStack Node SDK (uses browserstack.yml)
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
    ├── wdio.local.conf.js  ← Extends base + local Appium capabilities
    └── wdio.browserstack.conf.js ← Extends base + 4 BrowserStack capabilities
```

Specs execute in order: `login.spec.js` → `navigation.spec.js` → `cart.spec.js`

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
