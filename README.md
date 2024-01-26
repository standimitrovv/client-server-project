## How to run the project?

1. Clone the repo - type `git clone https://github.com/standimitrovv/client-server-project.git` in the terminal in whichever folder you want to store the project (I recommend you creating a separate folder for it).
2. Open the `API` folder in Visual Studio and run the the project in the "https" profile which would also create a documentation for the API on "https://localhost:7107/swagger/index.html" that you could check.
3. Open the `frontend` folder in Visual Studio Code (preferably).
4. Copy the contents of `.env.local.example` into the `.env.local` file in the root of the `frontend` folder and assign "https://localhost:7107/api" as a value of the "NEXT_PUBLIC_API" variable (after the "=" symbol).
5. Open the terminal (make sure you are in the `frontend` folder) and type `npm install` which would install all the required packages to run the project.
6. Finally, in the same terminal you wrote `npm install`, type `npm run dev` to start the local server on port 3000.
7. Open "https://localhost:3000" and enjoy!

- NB! You need to have both projects (the one in the `API` folder and the one in the `frontend` folder) running at the same time.
