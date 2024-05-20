# Recipe App

This is a React-based web application that allows users to search for recipes and view detailed information about them. It uses the Spoonacular API to fetch recipe data.

## Features

- **Search Recipes:** Users can search for recipes based on a query, cuisine, diet, and intolerances.
- **View Recipe Details:** Users can view detailed information about a specific recipe, including ingredients and instructions.

## Technologies Used

- **React:** JavaScript library for building user interfaces.
- **Material-UI:** React component library for a consistent and appealing UI.
- **Axios:** Promise-based HTTP client for making API requests.
- **React Router:** Library for routing in React applications.

## How to Run the Application

### Prerequisites

- **Node.js and npm (or yarn):** Make sure you have Node.js and npm (or yarn) installed on your machine.

### Local Development

1.  **Clone the repository:**
    
    ```bash
    git clone https://github.com/AhmadSameerDevelopment/recipe-app-react-atypon.git
    cd AhmadSameerDevelopment
    ```
    
2.  **Install Dependencies:**
    
    ```bash
    npm install  # or yarn install
    ```
    
3.  **Start the Development Server:**
    
    ```bash
    npm run start-dev   # or yarn start
    ```
    
4.  **Access the Application:**
    
    Open your browser and navigate to `http://localhost:3000`.

## How to Run the Application on Heroku

### Prerequisites

- **Heroku Account:** Create a free Heroku account if you don't have one.
- **Heroku CLI:** Install the Heroku CLI.

### Steps to Deploy

1.  **Create a Heroku App:**
    
    ```bash
    heroku create your-app-name
    ```
    
2.  **Set Buildpack:**
    
    ```bash
    heroku buildpacks:set mars/create-react-app
    ```
    
3.  **Set Environment Variables:**
    
    ```bash
    heroku config:set REACT_APP_SPOONACULAR_API_KEY=your_api_key_here
    ```
    
4.  **Deploy the Application:**
    
    ```bash
    git push heroku main
    ```
    
5.  **Open the Application:**
    
    ```bash
    heroku open
    ```



## API Endpoints (Spoonacular)

*   **Search Recipes:**
    *   `GET https://api.spoonacular.com/recipes/complexSearch`
        *   Query Parameters: `query`, `cuisine`, `diet`, `intolerances`, `apiKey`

*   **Recipe Information:**
    *   `GET https://api.spoonacular.com/recipes/{id}/information`
        *   Query Parameters: `apiKey`

## Design Decisions

*   **Material-UI:** Used for a consistent and visually appealing design.
*   **Axios:** Chosen for its simplicity and ease of use in making HTTP requests.
*   **React Router:** Used for handling client-side routing.
*   **Direct API Calls:** The frontend directly calls the Spoonacular API for fetching recipe data.
*   **Accessibility:** Implemented basic ARIA attributes for improved accessibility.

## Lessons Learned

*   Using component libraries like Material-UI can speed up development.
*   Managing loading and error states is crucial for a good user experience.
*   Accessibility features should be considered from the start of development.

## Highlights

*   **Clean UI:** The application has a clean and user-friendly interface.
*   **Dynamic Search:** Recipes are fetched dynamically based on user input.
*   **Accessibility:** Efforts made to make the app more accessible.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
