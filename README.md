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

Projet mobile construit avec :

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
├── core-logger/             # Logger partagé (react-native-logs)
├── http-client/             # Abstraction Axios
├── keychain-service/        # Accès Keychain / SecureStorage
├── player-state/            # Centralisation état du lecteur Spotify
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

Le projet supporte plusieurs environnements :

```
.env.development
.env.production
```

Variables attendues (typage automatique via `env.d.ts`) :

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

Ajoute ensuite un `babel.config.js` dans la lib :

```js
// babel.config.js dans libs/ma-lib
module.exports = require('../../babel.shared');
```

---

## 🧪 Tests (à venir)

> Configuration Jest modulaire prévue pour chaque lib.

---

<details>
<summary>📦 Libs & Modules utilisés</summary>


| Librairie          | Description                                         |
| ------------------ | --------------------------------------------------- |
| `auth-client`      | Gestion OAuth2 Spotify + token/refresh              |
| `core-config`      | Fonctions`getEnv()` et typage .env                  |
| `core-constants`   | Constantes partagées (services, endpoints, scopes) |
| `core-logger`      | Abstraction`react-native-logs`                      |
| `http-client`      | Abstraction d'Axios (api service + interceptors)    |
| `keychain-service` | Abstraction Keychain/SecureStorage                  |
| `player-state`     | Gestion centralisée état de lecture Spotify       |

</details>

---

## ✨ À venir

- 🎧 Intégration Spotify App Remote SDK
- 🔄 Refresh token automatique
- 🧪 Tests unitaires + e2e
- 📲 Animation du MiniPlayer
- 🌐 Mode offline + cache local

---

## 👨‍💻 Auteur

Développé par **Arnaud Vanderbecq**
[GitHub](https://github.com/arnaudvander) · [LinkedIn](https://linkedin.com/in/avanderbecq)

---

## 🪪 Licence

MIT
