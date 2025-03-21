**Overview of the Multi-Service Application**

In this project, We build a multi-service application that includes the following components:

Backend Service (Node.js): This service will handle all the API requests, business logic, and interaction with the database and cache. It's built with Node.js and can use frameworks like Express.js to expose RESTful APIs to the frontend.

Frontend Service (React): The frontend service will be a React.js application that communicates with the backend via API calls. It will be responsible for rendering the user interface and handling user interactions.

Database Service: A relational database (e.g., PostgreSQL) will store the application’s data. The backend service will interact with this database to read and write data.

Cache Service(Redis): A caching layer using Redis will be used to speed up the application by storing frequently accessed data in memory. The backend service will interact with Redis to reduce the number of database queries and improve performance.

**Example Workflow**
1. The user interacts with the React frontend (e.g., filling out a form).
2. The frontend makes an HTTP request (e.g., using API) to the Node.js backend.
3. The Node.js backend processes the request and queries the Redis cache for data if it’s available. If the data is not cached, it queries the database.
4. The Node.js backend returns the response to the React frontend, which updates the user interface.

**Docker**
1. Created Docker file for backend and frontend services.
2. Docker images will need to be generat for container run.
3. We will use the docker compose to manage all the services by writing docker-compose.yaml file.

**Docker Commands Used**
1. Listing docker images : docker images
2. Checking container: docker ps
3. Image Build: docker build -t imagename .
4. Image Tag: docker tag localreponame:tag dockerreponame:tag  [when pushing to docker hub]
5. Image Push: docker push dockerreponame:tag

