# Selector Usage Guide

## Overview

This guide explains how to use selectors in the project. Our project uses a centralized selector management system that provides type safety and maintainability.

## Table of Contents

1. [Basic Usage](#basic-usage)
2. [Adding New Selectors](#adding-new-selectors)
3. [Best Practices](#best-practices)
4. [Examples](#examples)

## Basic Usage

### 1. Importing Selectors

First, import the necessary utilities from the selectors module:

```typescript
import { getSelector, SelectorKeys } from "../../utils/selectors";
```

### 2. Using Selectors in Page Objects

When defining page objects, use the `getSelector` function with `SelectorKeys`:

```typescript
import { Page, Locator } from "@playwright/test";
import { getSelector, SelectorKeys } from "../../utils/selectors";

export class LoginPage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;

  constructor(page: Page) {
    // Use predefined selector keys
    this.usernameInput = page.locator(getSelector(SelectorKeys.USERNAME_INPUT));
    this.passwordInput = page.locator(getSelector(SelectorKeys.PASSWORD_INPUT));
  }
}
```

## Adding New Selectors

### 1. Update SelectorKeys

Add new selector keys to the appropriate category in `utils/selectors.ts`:

```typescript
export const SelectorKeys = {
  // Add to existing category
  LOGIN: {
    NEW_SELECTOR: 'newSelector',
    ...
  },

  // Or create a new category
  NEW_FEATURE: {
    SOME_BUTTON: 'someButton',
    SOME_INPUT: 'someInput'
  }
}
```

### 2. Add Selector Implementation

Add the actual selector implementation in the appropriate CSV file under the `selectors` directory:

```csv
# key,selector,type,comments
newSelector,#new-element,button,New feature button
```

## Best Practices

1. **Use Type-Safe Keys**

   - Always use `SelectorKeys` constants instead of string literals
   - This ensures compile-time checking and autocompletion

2. **Organize by Feature**

   - Group related selectors under appropriate categories
   - Keep selectors organized in the CSV files

3. **Meaningful Names**

   - Use descriptive names for selector keys
   - Follow the naming convention: FEATURE_ELEMENT_TYPE

4. **Documentation**
   - Add comments in CSV files to describe the purpose of selectors
   - Include any special considerations or dependencies

## Examples

### Login Page Example

```typescript
import { Page, Locator } from "@playwright/test";
import { getSelector, SelectorKeys } from "../../utils/selectors";

export class LoginPage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.usernameInput = page.locator(
      getSelector(SelectorKeys.LOGIN.USERNAME_INPUT)
    );
    this.passwordInput = page.locator(
      getSelector(SelectorKeys.LOGIN.PASSWORD_INPUT)
    );
    this.loginButton = page.locator(
      getSelector(SelectorKeys.LOGIN.LOGIN_BUTTON)
    );
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
```

### Admin Page Example

```typescript
import { Page, Locator } from "@playwright/test";
import { getSelector, SelectorKeys } from "../../utils/selectors";

export class AdminPage {
  readonly searchBox: Locator;
  readonly userLink: Locator;

  constructor(page: Page) {
    this.searchBox = page.locator(
      getSelector(SelectorKeys.ADMIN.SEARCH_BOX_SELECT)
    );
    this.userLink = page.locator(getSelector(SelectorKeys.ADMIN.USER_LINK));
  }

  async searchUser(username: string) {
    await this.searchBox.fill(username);
    await this.userLink.click();
  }
}
```

## Error Handling

The selector system will throw an error if:

- A selector key is not found in any category
- The selector implementation is missing in CSV files

Example error message:

```
Error: Selector with key 'undefined' not found in any category
```

If you encounter this error, ensure that:

1. The selector key is properly defined in `SelectorKeys`
2. The selector implementation exists in the appropriate CSV file
3. The import path is correct
4. You're using the correct category and key combination

## Need Help?

If you need to add new selectors or have questions about the selector system:

1. Check the existing selectors in `utils/selectors.ts`
2. Review the CSV files in the `selectors` directory
3. Follow the examples in this guide
4. Contact the team lead for assistance with complex selectors
