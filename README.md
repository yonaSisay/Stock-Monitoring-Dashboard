---

# Stock Monitoring Dashboard

## Getting Started

To run the Stock Monitoring Dashboard, follow the steps below to clone the repository, install dependencies, and start the application.

### Step 1: Clone the Repository

1. Open your terminal.
2. Run the following command to clone the repository:

   ```bash
   git clone  https://github.com/yonaSisay/Stock-Monitoring-Dashboard.git
   ```

3. Navigate into the cloned project directory:

   ```bash
   cd stock-dashboard
   ```

### Step 2: Install Dependencies

1. Run the following command to install the necessary dependencies:

   ```bash
   npm install
   ```

### Step 3: Start the JSON Server

1. In the terminal, run the following command to start the JSON server and mock the backend:

   ```bash
   json-server --watch db.json --port 5000
   ```

   Alternatively, you can run:

   ```bash
   npm run serve
   ```

### Step 4: Run the Frontend Application

1. Open a **separate terminal** (keeping the JSON server running).
2. In the same project directory, run the following command to start the frontend:

   ```bash
   npm start
   ```

### Accessing the Dashboard

Once the frontend is running, you can view the application in your browser by navigating to:

[http://localhost:3000](http://localhost:3000)
