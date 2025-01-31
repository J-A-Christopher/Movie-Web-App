# React + TypeScript + Vite

This is a React,Typescript and Vite project that queries for movie data using the TMDB api.

## Project Structure

- `src/`:This is the folder that houses all app specific code.
  - `api/`:This is the directory with all the code for querying the api data using rtk query
  - `assets/`: This is a directory that holds images that are used in the app
  - `components/`:This is a directory that contains all the ui components.
        - `common/`:Houses components that are used in more than one page.
        - `ui`:Houses components from the shadcn ui library
  - `error/`: Houses error specific logic
  - `firebase/`: Houses specific code to initialize my firebase instance for authentication purposes
  - `hooks/`: Contains hooks for my error toast
  - `lib/`: typically contains utility functions, helper components, and configurations that support shadcn components.
  - `pages/`: contains individual app pages.
    - `Home/`: contains the home page component code.
      - `logout/`: contains code for my logout dialog.
    - `login/`: contains the login component code.
    - `SignUp/`: contains signup component code.
  - `protected/`: houses code to protect unauthenticated users from accessing the app's home page.
  - `state/`: contains app state related code.
    - `slices/`: define individual pieces of state.
    - `store/`:  is the central location where all slices are combined and managed.
  - `tests/`: houses test logic.
  - `utils/`: contains utility functions and helper methods.


## **Packages Used**

### **Core Dependencies**
- `react`: Core React library for building user interfaces.  
- `react-dom`: Provides DOM-specific methods for React applications.  
- `react-router-dom`: Used for client-side routing in React applications.  
- `@reduxjs/toolkit`: Official, recommended Redux package for state management.  
- `react-redux`: Allows React components to interact with the Redux store.  

### **UI & Styling**
- `@radix-ui/react-alert-dialog`: Accessible alert dialog component from Radix UI.  
- `@radix-ui/react-dialog`: Modal dialog component from Radix UI.  
- `@radix-ui/react-separator`: A separator component for layout structure.  
- `@radix-ui/react-slot`: Utility for composing UI components.  
- `@radix-ui/react-toast`: Toast notifications for displaying messages.  
- `lucide-react`: Icon library providing customizable SVG icons.  
- `tailwindcss`: Utility-first CSS framework for styling.  
- `tailwind-merge`: Helps merge Tailwind classes dynamically.  
- `tailwindcss-animate`: Provides animation utilities for Tailwind.  
- `class-variance-authority`: Helps define component variants using Tailwind.  
- `clsx`: Utility for conditionally joining class names.  

### **State Management & API Handling**
- `firebase`: Google’s backend service for authentication, storage, and databases.  
- `@reduxjs/toolkit`: Simplifies state management with Redux.  

### **Development & Testing**
- `vite`: Frontend tooling for fast builds and hot module replacement.  
- `@vitejs/plugin-react`: Vite plugin for React support.  
- `typescript`: Statically typed JavaScript for better code safety.  
- `eslint`: JavaScript linter for maintaining code quality.  
- `typescript-eslint`: Linting support for TypeScript in ESLint.  
- `jest`: Testing framework for JavaScript and TypeScript.  
- `vitest`: Vite-native testing framework for unit and integration testing.  
- `@testing-library/react`: Helps test React components with a user-centric approach.  
- `@testing-library/user-event`: Simulates user interactions in tests.  
- `redux-mock-store`: Mocks Redux store for testing purposes.  
- `firebase-mock`: Mocking library for testing Firebase services.  
- `msw`: API mocking tool for simulating network requests in tests.  
- `jsdom`: Simulates a browser environment in Node.js for testing.  

### **Build Tools & Performance**
- `postcss`: Tool for transforming CSS with JavaScript plugins.  
- `autoprefixer`: Automatically adds vendor prefixes to CSS rules.  
- `cross-fetch`: Fetch API polyfill for server-side requests.  
- `globals`: Provides predefined global variables for ESLint.  
- `@tailwindcss/vite`: Integrates Tailwind CSS with Vite.  


## **Logic**

- The app provides user authentication via **email/password** and **Google Sign-In**.  
- The homepage is **protected**, meaning only authenticated users can access it.  

### **Movie Display & Navigation**
- After signing in, users see a **grid of movie cards** displaying available movies.  
- Each card provides a **preview** of the movie, including basic details.  
- Users can tap on a movie card to view **detailed information** about the selected movie.  

### **Search & Pagination**
- The app implements an **efficient pagination system** to handle large datasets.  
- A **search functionality** allows users to **filter movies** based on their preferences.  

### **Authentication Flow**
- Users can **sign up or log in** using their **email and password** or **Google Sign-In**.  
- Upon successful login, the user is **redirected to the homepage** to view the movie grid.  
- The **log-out button** allows users to securely sign out of their accounts.  

### **State & Error Handling**
- The authentication state determines whether a user **can access protected routes**.  
- Proper **error handling** ensures users receive meaningful feedback when authentication or data fetching fails.  
- The UI updates dynamically based on the **user’s authentication status and movie data availability**.  


## **Running the Project**

- First, create a `.env` file at the **root** of your project.  

- Copy and paste the following inside the `.env` file:  

  ```env
  VITE_API_KEY=c8c7945fbb0fe5fd39bc0eceeddce1d3
  VITE_FIREBASE_API_KEY=AIzaSyCUPEPS04DasCapKXYLxnDSdmB_5Zj29aY
  VITE_AUTH_DOMAIN=movie-app-68682.firebaseapp.com
  VITE_PROJECT_ID=movie-app-68682
  VITE_STORAGE_BACKET=movie-app-68682.firebasestorage.app
  VITE_MESSAGING_SENDER_ID=843241586679
  VITE_APP_ID=1:843241586679:web:72f6350de6a0b812fdf8f2

- Then copy and paste the following commands on your command line 
- npm install
- npm run dev


## Screenshots

Here are some of the screenshots taken from the app.
![Screenshot](screenshots/google-sign-in.png)
![Screenshot](screenshots/logout.png)
![Screenshot](screenshots/movie-cards.png)
![Screenshot](screenshots/movie-detail.png)
![Screenshot](screenshots/pagination.png)
![Screenshot](screenshots/search.png)
![Screenshot](screenshots/signin.png)
![Screenshot](screenshots/signup.png)
