![nextjs](https://github.com/user-attachments/assets/b5b02513-0f24-4d18-8863-7243a7ebbeef)

# Next.js v15 Starter Template

This is a modern starter template designed for developers to kickstart their Next.js v15 projects. It comes pre-configured with essential tools and best practices to accelerate development and reduce boilerplate setup.

---

## Features

- **Next.js v15**: The latest version of Next.js with optimized performance and features.
- **Organized Folder Structure**: Clean and extensible architecture for better maintainability.
- **State Management**: Integrated with Redux Toolkit for advanced state management.
- **Context API**: Simplified state sharing without prop drilling.
- **Custom Hooks**: Prebuilt hooks to enhance reusability and efficiency.
- **Environment Variables**: Centralized and secure configuration using `.env` files.  
  **⚠️ Note:** Make sure to uncomment the `.env` file from the `.gitignore` file to ignore pushing it in the repo.

---

## Getting Started

### Clone the Repository

Start by cloning the repository:

```bash
git clone git@github.com:Moamal-2000/nextjs-template.git
```

---

### Install Dependencies

Ensure you have Node.js installed on your machine. Then run:

```bash
npm install
```

Or, if you prefer Yarn:

```bash
yarn install
```

---

### Run the Development Server

To start the local development server, use:

```bash
npm run dev
```

Your application will be available at `http://localhost:3000` by default.

---

### Build for Production

To create an optimized production build, run:

```bash
npm run build
```

You can then serve the build using:

```bash
npm run start
```

---

### Folder Structure

- **`/pages`**: Contains the app's routes and API endpoints.
- **`/components`**: Reusable UI components.
- **`/styles`**: Global and component-specific styles.
- **`/hooks`**: Custom React hooks for shared logic.
- **`/redux`**: State management setup with Redux Toolkit.
- **`/public`**: Static assets like images and fonts.

---

## Customization

This template is designed to be flexible and extendable. Feel free to customize it to fit your specific project requirements.

---

## Contributing

Contributions are welcome! If you have ideas for improvement or find any issues, feel free to fork the repository, make your changes, and open a pull request.
