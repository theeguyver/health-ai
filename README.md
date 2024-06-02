![Chatbot Icon](https://github.com/theeguyver/health-ai/blob/master/public/chatbot_icon.jpg)
# Health[.]AI 
## _Your Friendly Neighbourhood Therapy Chatbot_

![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

![Version](https://img.shields.io/badge/version-v1.0-green) ![License](https://img.shields.io/badge/license-MIT-8A2BE2)

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)


## Table of Contents
* [📚 About](#about)
* [✨ Features](#features)
* [💻 Tech Stack](#tech-stack)
* [⚙️ Getting Started](#getting-started)
* [🧑‍💻 Development](#development)
* [➕ Contributions](#contributions)
* [©️ License](#license)
* [❤️ About US](#about-us)

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## 📚 About

We are excited to introduce you to our AI chatbot. This AI chatbot is designed to support mental well-being. This groundbreaking concept combines the power of AI and the brilliance of Machine Learning algorithms to create a chatbot that is uniquely qualified to understand an individual’s emotional state. This can be used for various purposes – like online therapy, mental health support and help in retrieval of information about your mental state. Our mission is to provide personalized advice and support. In a world where the preservation of mental health is of utmost importance, the chatbot provides a ray of hope. It offers a remedy that is accessible, compassionate, and prompt for those in need.

> Your mental health is just as important as your physical health. Taking care of mental health is an act of self love. 

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

# ✨ Features

-	**Discreet and Private**: Our chatbot will offer a discreet and private way to access support.
-	**Cost Efficient**: Our chatbot will provide cost effective mental health assistance offered free of cost for users.
-	**Crisis of well-trained Professionals**: Our chatbot will help to bridge the gap between required number of professionals and number of available professionals by being easily accessible to the users. It can also serve many people simultaneously. 
-	**Create Awareness**: Our chatbot can provide information about mental health, reducing the lack of awareness and understanding of these issues.
-	**Offered in Multiple Languages**: Our chatbot will be offered in multiple languages and will be trained to accommodate cultural contexts.

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## 💻 Tech Stack
Health[.]AI uses a number of open source projects to work properly:
### Frontend

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A superset of JavaScript that adds static types.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Heroicons**: A set of free, MIT-licensed high-quality SVG icons for UI development.

### Backend

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: A fast, unopinionated, minimalist web framework for Node.js.

### API

- **Google Maps JavaScript API**: Provides interactive maps and location services.

And of course Health[.]AI itself is open source with a [public repository][]
 on GitHub.
 
 ### Tools

- **VSCode**: A powerful, lightweight code editor.
- **LM Studio**: A tool for local machine learning model inference.
 - **Postman**: A collaboration platform for API development and testing.
- **MongoDB Atlas**: A fully-managed cloud database service.

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## ⚙️ Getting Started

### Prerequisites

This project requires the following tools and libraries to be set up on your development machine. 

- **Node.js**:  Download and install the latest stable version of Node.js from the official website: [Node.js](https://nodejs.org/)
  Node.js comes bundled with npm (Node Package Manager), which we'll use to install other dependencies.
- **Express.js**: A web framework for Node.js. We'll install this using npm later in the setup process.
- **MongoDB Atlas**:  A cloud-based database service by MongoDB. You can sign up for a free tier account to use MongoDB Atlas for development purposes: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

- **LM Studio**: A tool for running machine learning models locally. You can download LM Studio from their website: [Download LM Studio](https://lmstudio.ai/) 

- **VS Code**: A powerful, lightweight code editor with great features for development. Download VS Code for your operating system here: [VS Code](https://code.visualstudio.com/)

- **Postman**: A collaboration platform for designing and testing APIs. You can download the free desktop app or use the web version: [Postman](https://www.postman.com/) 

### Dependencies

* `mongodb`: This library allows our application to interact with the MongoDB database.
* `express`: This library provides a framework for building web applications in Node.js.
* `crypto`: This library provides cryptographic functions used for security purposes (e.g., password hashing).
* `cors`: This library enables Cross-Origin Resource Sharing (CORS) which allows requests from different domains.

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## 🔨 Installation

### 1. Clone the Repository

First, clone this project's repository from GitHub to your local machine. This command downloads all the project files to your computer.

Open your favorite Terminal and run these commands.

```bash
git clone https://github.com/theeguyver/health-ai.git
cd health-ai
```

### 2. Install Dependencies

Before running the application, we need to install the required libraries and dependencies. These libraries provide the functionalities used in the project's code. We'll use `npm install` to install them.

```bash
npm install mongodb express crypto cors
```

### 3. Start the Servers

This project consists of multiple servers running on different ports. Each server handles a specific functionality of the application. Here's how to start each server:

**a. ML Server (Port 1234)**

This server handles communication with the machine learning model (used for tasks like text analysis or generation). We won't directly start this server with a node command. We will set up the ML Server later in **Step 4**. 

**b. Chat Response Server (Port 2000)**

Navigate to the directory containing the chat response server code (`app/chatbot`) and run `node chatresponse.js` to start the server. This server processes chatbot interactions.

```bash
cd app/chatbot
node chatresponse.js
```

**c. Database Server (Port 3000)**

Run `node backend.js` to start the server. This server interacts with the MongoDB database.

```bash
node backend.js
```

**d. Frontend Server (Port 3001)**

Run `npm run dev` to start the frontend application. This is the user interface you'll interact with in the browser.

```bash
npm run dev
```

**e. Fetch User Details Server (Port 3002)**

Navigate to the directory containing the user details fetching code (`app/user`) and run `node fetchuserdetails.js` to start the server. This server retrieves user data.

```bash
cd app/user
node fetchuserdetails.js
```

**f. Therapists Fetch Details Server (Port 3003)**

Navigate to the directory containing the therapist details fetching code (`app/library`) and run `node therapistsfetchdetails.js` to start the server. This server retrieves therapist data.

```bash
cd app/library
node therapistsfetchdetails.js
```

**g. Profile Photo Upload Server (Port 3004)**

Navigate to the directory containing the profile photo upload code (`app/user`) and run `node profilephotoupload.js` to start the server. This server handles profile picture uploads.

```bash
cd app/user
node profilephotoupload.js
```

**h. Chat History Server (Port 4002)**

Navigate to the directory containing the chat history code (`app/chatbot`) and run `node chathistory.js` to start the server. This server manages chat history.

```bash
cd app/chatbot
node chathistory.js
```

### 4. Set up Local ML Server

This project utilizes a machine learning model. Here's how to set up a local server to run the model:

* **Download the Model:** Visit [Carl-Llama-2-13B-GGUF](https://huggingface.co/TheBloke/Carl-Llama-2-13B-GGUF) on Hugging Face to download the machine learning model.
* **Load the model into LM Studio:**  Follow LM Studio's instructions to load the downloaded model.
* **Start the server:**  Use LM Studio's interface to start the server that will run the model.

### 5. Open the project. 
Open your browser and navigate to `http://localhost:3001`

### Building for Production

To build the app for production, run:

```bash
npm run build
```

This will create a `build` directory with the production build of the app.

### Additional Notes

* Make sure you have **Node.js** installed on your machine before proceeding. Node.js is the runtime environment that allows our JavaScript code to run. You can download it from [Node.js](https://nodejs.org/).
* **Postman** is a helpful tool for testing the application's API endpoints during development.

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## 🧑‍💻Development

This section provides instructions for running the project in development mode and some guidelines for contributing to the codebase.

### Prerequisites

* Ensure you have Node.js and npm installed on your machine. Refer to the Prerequisites section for installation instructions.  

### Database Connection

This project utilizes a MongoDB database to store application data. You'll need to connect your local development environment to your MongoDB instance. Replace `'YOUR_MONGODB_URI'` with your own MongoDB connection URI in the following files:

* Line 9 of `backend.js`
* Line 6 of `app/chatbot/chathistory.js`
* Line 9 of `app/library/therapistfetchdetails.js`
* Line 11 of `app/user/fetchuserdetails.js`
* Line 11 of `app/user/profilephotoupload.js`

Instructions for obtaining your MongoDB connection URI can be found in your MongoDB provider's documentation.

### Google Maps API Key

The Google Maps integration within the therapist details page utilizes an API key. To enable this functionality, you'll need to generate a Google Maps API Key and replace `'YOUR_API_KEY'` with your actual key in line 46 of `page.tsx` located under `app/library`.

### Ports

The application utilizes multiple servers running on different ports. Here's a breakdown of the ports and their purposes:

| Port | Server/File          | Purpose                                 |
|-------|----------------------|------------------------------------------|
| 1234  | ML Server              | Manages communication with the ML model   |
| 2000  | chatresponse.js (app/chatbot) | Processes chatbot interactions          |
| 3000  | Database Server       | Interacts with the MongoDB database     |
| 3001  | Frontend             | User interface                         |
| 3002  | fetchuserdetails.js (app/user) | Retrieves user data from the database  |
| 3003  | therapistsfetchdetails.js (app/library) | Fetches therapist data from MongoDB    |
| 3004  | profilephotoupload.js (app/user) | Handles profile picture uploads        |
| 4002  | chathistory.js (app/chatbot) | Manages chat history                     |

### Endpoints

The application exposes various API endpoints for different functionalities. Here's a breakdown of some key endpoints and their purposes:

| Endpoint                                      | Purpose                                                |
|------------------------------------------------|---------------------------------------------------------|
| localhost:2000/chatresponse                       | Communicates with localhost:1234/v1/chat/completions     |
|                                                   | to query the ML model for responses to user prompts   |
| localhost:2000/endsession                        | Stores chat history for a session in MongoDB          |
|                                                   | interacts with localhost:4002/addChat for storage      |
| localhost:3000/register                         | Handles registration of new users                       |
| localhost:3000/login                            | Manages authentication of existing users               |
| localhost:3002/userdetails                       | Serves user details fetched from the database            |
| localhost:3002/uploads                           | Serves static content, such as profile pictures         |
| localhost:3004/uploadphoto                        | Facilitates uploading and updating of profile pictures  |
| localhost:3003/therapists                         | Fetches therapist data from MongoDB                      |
| localhost:4002/sessionhistory                      | Fetches details of previous chat sessions for reference  |
 | localhost:4002/addChat                      | Stores the chat history for current session in MongoDB  |
 
![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## ➕ Contributions
Want to contribute? Great!
We welcome contributions to this project! Here are some ways you can get involved:

* **Bug reports:** If you find a bug in the code, please report it by creating a new issue on GitHub. 
* **Feature requests:** If you have a suggestion for a new feature, please create a new issue on GitHub. 
* **Pull requests:** We are happy to accept pull requests that fix bugs, improve the documentation, or add new features. Please make sure to follow our coding style guidelines before submitting a pull request.

**Coding Style Guidelines**

* We recommend using a consistent code style throughout the project. You can enforce this style using a linter like ESLint. 
* Use descriptive variable and function names.
* Write clear and concise comments to explain your code.
* Follow best practices for Node.js development.

**Getting Started with Contributing**

1. Fork the repository on GitHub.
2. Clone the forked repository to your local machine.
3. Make changes to the code.
4. Test your changes locally.
5. Commit your changes and push them to your forked repository.
6. Create a pull request from your forked repository to the main branch of this repository.

We appreciate your contributions to this project!

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## ©️ License

![License](https://camo.githubusercontent.com/92ef5e7ebc8632fef4862d243dda949198df87928b72df01444fc213163a7e53/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6c6963656e73652f496c65726961796f2f6d61726b646f776e2d6261646765733f7374796c653d666f722d7468652d6261646765)

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## ❤️ About US
**This project was developed as a 8-member group project for Engineering Project in Community Service (EPICS), for the course _DSN-3099_ of VIT Bhopal University, by the team consisting of:**
- [Subhodeep Mukherjee](https://github.com/theeguyver)
- [Shreelu Santosh](https://github.com/ShreeluSantosh)
- [Anjali Kolhatkar](https://github.com/anjalikolhatkar)
- [Priya Jha](https://github.com/priyajha2612)
- [Gitisha Mishra]()
- [Prakashchand Choudhary](https://github.com/prakash279)
- [Suchismita Dutta]()
- [Akash Shivshankar Kharabe]()



