# 🎧 react-native-spotify

<p align="center">
  <strong>Application Spotify en React Native avec architecture Nx modulaire</strong><br />
  <em>Scalable, typée, modulaire, prête pour la prod.</em>
</p>

<p align="center">
  <img alt="tech" src="https://img.shields.io/badge/tech-react_native-blue?style=flat-square" />
  <img alt="nx" src="https://img.shields.io/badge/monorepo-nx-blueviolet?style=flat-square" />
  <img alt="license" src="https://img.shields.io/badge/license-MIT-green?style=flat-square" />
</p>

---

## 🚀 Aperçu

Projet mobile construit avec:

- ⚛️ **React Native** (Metro)
- 🧱 **Nx Monorepo**
- 🔐 SecureStorage (iOS/Android)
- ⚙️ Multi-libs modulaire (`auth-client`, `core-config`, etc.)
- 📄 Chargement d'environnements `.env` avec typage
- 🧠 Scalable & maintenable pour équipe ou freelance

---

## 📁 Structure du monorepo

```bash
react-native-spotify/
├── apps/
│   └── spotify-app/         # App principale React Native
├── auth-client/             # Authentification Spotify OAuth
├── core-config/             # Accès typé aux variables d'env
├── core-constants/          # Constantes globales (Spotify, tokens, services)
├── core-domain/             # Interfaces métier partagées
├── core-dto/                # Objets de transfert de données (DTO)
├── core-logger/             # Logger partagé (react-native-logs)
├── http-client/             # Abstraction Axios
├── keychain-service/        # Accès Keychain / SecureStorage
├── player-state/            # Centralisation état du lecteur Spotify
├── spotify-client/          # Client Web API Spotify
└── test-utils/              # Utilitaires de tests
```

---

## 🛠️ Installation & lancement

```bash
yarn install

# Lancer l'app mobile
nx run spotify-app:start

# (optionnel) reset cache Metro
nx run spotify-app:start --reset-cache
```

---

## ⚙️ Configuration `.env`

Le projet supporte plusieurs environnements:

```
.env.development
.env.production
```

Variables attendues (typage automatique via `env.d.ts`):

```env
SPOTIFY_CLIENT_ID=your-client-id
SPOTIFY_CLIENT_SECRET=your-secret
REDIRECT_URI=org-vander-myspotifyapp://callback
```

---

## 🧱 Ajout de librairie partagée

```bash
nx g @nx/js:lib nom-librairie
```

Ajoute ensuite un `babel.config.js` dans la lib:

```js
// babel.config.js dans libs/ma-lib
module.exports = require('../../babel.shared');
```

---

## 🧪 Tests

> Configuration Jest modulaire prévue pour chaque lib.

---

## ✨ À venir

- 🎧 Intégration Spotify App Remote SDK
- 🧪 Tests unitaires + e2e
- 📲 Animation du MiniPlayer
- 🌐 Mode offline + cache local

---

## 👨‍💻 Auteur

Développé par **Arnaud Vanderbecq**  
[GitHub](https://github.com/vandervdb) · [LinkedIn](https://linkedin.com/in/avanderbecq)

---

## 🪪 Licence

MIT

---

## 🇬🇧 English version

### Overview

A Spotify mobile app built with React Native and a modular Nx monorepo.  
Scalable, typed and production ready.

### Monorepo structure

```bash
react-native-spotify/
├── apps/
│   └── spotify-app/         # Main React Native app
├── auth-client/             # Spotify OAuth authentication
├── core-config/             # Typed access to environment variables
├── core-constants/          # Global constants (Spotify, tokens, services)
├── core-domain/             # Shared domain interfaces
├── core-dto/                # Data transfer objects (DTO)
├── core-logger/             # Shared logger (react-native-logs)
├── http-client/             # Axios abstraction
├── keychain-service/        # Keychain / SecureStorage access
├── player-state/            # Centralized Spotify player state
├── spotify-client/          # Spotify Web API client
└── test-utils/              # Testing utilities
```

### Installation

```bash
yarn install
nx run spotify-app:start
```

### Environment configuration

`.env.development` or `.env.production` with variables:

```env
SPOTIFY_CLIENT_ID=your-client-id
SPOTIFY_CLIENT_SECRET=your-secret
REDIRECT_URI=org-vander-myspotifyapp://callback
```

### Shared library

```bash
nx g @nx/js:lib library-name
```

Then add `babel.config.js` inside the library:

```js
// babel.config.js in libs/my-lib
module.exports = require('../../babel.shared');
```

### Tests

Modular Jest configuration planned for each library.

### Roadmap

- Spotify App Remote SDK integration
- Unit & e2e tests
- MiniPlayer animation
- Offline mode & local cache

### Author

Developed by **Arnaud Vanderbecq**

### License

MIT
