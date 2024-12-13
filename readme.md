## React & Electron Starter Template

### Overview

This project is a starter template for building desktop applications using **React** and **Electron**. It comes with a simple configuration and provides a bash script to easily update the project metadata (name, version, author, and description) in `package.json`.

---

### Project Structure

```
my-electron-app/
├── client/              # React frontend code
│   ├── public/
│   └── src/
├── backend/             # Electron main process code
│   └── electron-main.js
├── package.json         # Project metadata and dependencies
└── update_package.sh    # Script to update project metadata
```

---

### Scripts

#### 1. Development Scripts

-  **Start Electron in Development Mode**:

   ```bash
   yarn electron-dev
   ```

   Runs Electron with a development server.

-  **Start Electron on Windows**:

   ```bash
   yarn electron-dev-win
   ```

#### 2. Build Scripts

-  **Build the React App and Package Electron**:

   ```bash
   yarn buildpack
   ```

   This script builds the React frontend and packages the Electron app.

-  **Package the App**:

   ```bash
   yarn package
   ```

   Uses `electron-builder` to create distributable packages for macOS, Windows, and Linux.

---

### Update Project Metadata

To update the project metadata (name, version, author, and description) in `package.json`, use the `update_package.sh` script.

#### How to Use the Script

1. **Make the script executable**:

   ```bash
   chmod +x update_package.sh
   ```

2. **Run the script with parameters**:

   ```bash
   ./update_package.sh "new-project-name" "1.1.0" "new-author" "New project description"
   ```

This updates `package.json` with the provided values.

---

### Prerequisites

-  **Node.js & Yarn**: Ensure Node.js and Yarn are installed.
-  **`jq`**: Required for the `update_package.sh` script.

   -  On Ubuntu/Debian:

      ```bash
      sudo apt-get install jq
      ```

   -  On macOS:

      ```bash
      brew install jq
      ```

---

### Example `package.json` Before Update

```json
{
   "name": "csveditor",
   "version": "1.0.0",
   "author": "n1developer",
   "description": "CSV Editor"
}
```

### Example `package.json` After Update

```json
{
   "name": "new-project-name",
   "version": "1.1.0",
   "author": "new-author",
   "description": "New project description"
}
```

---

### Author

**n1developer**

Email: [admin@qg.ch](mailto:admin@qg.ch)
