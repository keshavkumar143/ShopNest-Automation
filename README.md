# ShopNest - Mobile App + Automation Framework

A UI-only React Native (Expo) shopping app with a complete WebdriverIO + Appium automation test suite.

---

## Project Structure

```
ShopNest-Automation/
├── App.js                          # App entry point
├── app.json                        # Expo config
├── eas.json                        # EAS Build config
├── package.json                    # App dependencies
│
├── src/
│   ├── screens/
│   │   ├── LoginScreen.js          # Login with validation
│   │   ├── HomeScreen.js           # Product list
│   │   ├── ProductScreen.js        # Product detail + Add to Cart
│   │   └── CartScreen.js           # Cart with remove & total
│   ├── components/
│   │   ├── ProductCard.js          # Reusable product card
│   │   └── CartItem.js             # Reusable cart item row
│   ├── navigation/
│   │   └── AppNavigator.js         # Stack navigator
│   ├── data/
│   │   └── products.js             # Static JSON product data
│   ├── utils/
│   │   └── cartStore.js            # Zustand cart state
│   └── constants/
│       └── theme.js                # Color palette
│
├── tests/                          # Automation framework
│   ├── config/
│   │   ├── wdio.local.conf.js      # Local Appium config
│   │   └── wdio.browserstack.conf.js
│   ├── screenObjects/              # Page Object Model
│   │   ├── LoginScreen.js
│   │   ├── HomeScreen.js
│   │   ├── ProductScreen.js
│   │   └── CartScreen.js
│   ├── test/specs/
│   │   ├── login.spec.js
│   │   ├── cart.spec.js
│   │   └── navigation.spec.js
│   ├── utils/
│   │   └── helpers.js              # Reusable driver helpers
│   ├── .env                        # BrowserStack secrets
│   └── package.json
│
└── assets/images/                  # App icons
```

---

## App Setup

### Prerequisites
- Node.js >= 18
- Expo CLI: `npm install -g expo-cli`
- EAS CLI: `npm install -g eas-cli`

### Install & Run

```bash
# Install dependencies
npm install

# Start Expo dev server
npm start

# Run on Android emulator
npm run android

# Run on iOS simulator
npm run ios
```

---

## App Features

| Screen          | Features                                          |
|-----------------|---------------------------------------------------|
| **Login**       | Username/password inputs, validation, login button |
| **Home**        | Scrollable product list, cart button               |
| **Product**     | Product details, Add to Cart button                |
| **Cart**        | Cart items, remove item, total price, checkout     |

### Tech Stack
- **React Native** (Expo)
- **React Navigation** (Stack)
- **Zustand** (state management)
- Static JSON data (no backend)

---

## Build APK (EAS)

```bash
# Login to Expo
eas login

# Build APK (Android)
npm run build:apk
# or
eas build --platform android --profile preview
```

The APK will be available for download from the Expo dashboard.

---

## Automation Setup

### Prerequisites
- Node.js >= 18
- Appium 2.x: `npm install -g appium`
- Appium UiAutomator2 driver: `appium driver install uiautomator2`
- Android SDK with an emulator (for local)

### Install Test Dependencies

```bash
cd tests
npm install
```

### Configure Environment

Edit `tests/.env` with your BrowserStack credentials:

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

# Local (Appium server must be running)
npm run test:local

# BrowserStack
npm run test:bs
```

---

## Test Coverage

| Spec File           | Scenarios                                          |
|---------------------|---------------------------------------------------|
| `login.spec.js`     | Screen elements, empty validation, partial input, success |
| `cart.spec.js`      | Add item, display items, total price, remove item  |
| `navigation.spec.js`| Home->Product, back, Home->Cart, full flow         |

### Design Patterns
- **Page Object Model (POM)** — screen objects in `screenObjects/`
- **accessibilityId selectors** — all locators use `~accessibilityId`
- **Reusable helpers** — wait, tap, input, getText utilities

---

## All testIDs

| Screen   | testID                          |
|----------|---------------------------------|
| Login    | `login-screen`                  |
| Login    | `login-logo`                    |
| Login    | `login-title`                   |
| Login    | `login-subtitle`                |
| Login    | `login-username-input`          |
| Login    | `login-password-input`          |
| Login    | `login-button`                  |
| Login    | `login-error-message`           |
| Home     | `home-screen`                   |
| Home     | `home-title`                    |
| Home     | `home-cart-button`              |
| Home     | `home-product-list`             |
| Home     | `product-card-{id}`             |
| Home     | `product-card-{id}-name`        |
| Home     | `product-card-{id}-price`       |
| Home     | `product-card-{id}-image`       |
| Product  | `product-screen`                |
| Product  | `product-image`                 |
| Product  | `product-name`                  |
| Product  | `product-price`                 |
| Product  | `product-description`           |
| Product  | `product-add-to-cart-button`    |
| Cart     | `cart-screen`                   |
| Cart     | `cart-empty-message`            |
| Cart     | `cart-item-list`                |
| Cart     | `cart-item-{index}`             |
| Cart     | `cart-item-{index}-name`        |
| Cart     | `cart-item-{index}-price`       |
| Cart     | `cart-item-{index}-image`       |
| Cart     | `cart-item-{index}-remove-button` |
| Cart     | `cart-total-price`              |
| Cart     | `cart-checkout-button`          |
