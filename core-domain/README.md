# 🧠 core-domain

This library defines the **domain-level interfaces and types** shared across the `@react-native-spotify` monorepo.

It follows the **Ports and Adapters (Hexagonal)** architecture principle by isolating the contract (`AuthStore`, `TokenData`, etc.) from the implementation (`default-auth-store`, `mock-auth-store`, etc.).

## 📂 Structure

```
core-domain/
└── src/
    └── lib/
        └── AuthStore.ts      # Interface + type definitions
```

## ✨ Features

- Pure TypeScript contracts — no implementation logic
- Promotes decoupling and testing
- Compatible with DI (Dependency Injection)
- Ideal for mocking in tests or preview environments

## ✅ Provided interfaces

### AuthStore

```ts
export interface AuthStore {
  readonly token: string;
  readonly isTokenValid: boolean;

  loadToken(): Promise<void>;

  refreshAccessToken(): Promise<void>;
}
```

### TokenData

```ts
export interface TokenData {
  token: string;
  expiresAt: number;
}
```

## 📦 Usage

In your implementation lib (e.g., `auth-client`):

```ts
import { AuthStore, TokenData } from '@react-native-spotify/core-domain';
```

In your consumers:

```ts
import { authStore } from '@react-native-spotify/auth-client';
```

## 🧪 Testing

Easily mock interfaces from `core-domain` for unit tests or storybook:

```ts
import { AuthStore } from '@react-native-spotify/core-domain';

class FakeAuthStore implements AuthStore {
  token = 'fake';
  isTokenValid = true;

  async loadToken() {
  }

  async refreshAccessToken() {
  }
}
```

---

Maintained with ❤️ by Arnaud Vander and the SpotifyApp project team.
