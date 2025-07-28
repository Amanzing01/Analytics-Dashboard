Steps for configuring the repo in your local device

1: Clone the repo to your local device using "git clone /repo url/"
2: Install the dependencies into both the folders (client & server) using "npm install"
3: create a ".env" file in the server repo 
4: In the .env file paste the following

///////////////////////////////////////////////////////////////////////////////////
MONGO_URI = mongodb+srv://amansushilsingh440:aman123@cluster0.svtpgsm.mongodb.net/
PORT = 5000
///////////////////////////////////////////////////////////////////////////////////

you can also use your own Mongo DB Connection

5: For seeding the fake data run "npm run seed" in "server" repo , wait till you se "Done Seeding & Disconnected from MongoDB" on your console/teminal
6: run the command "npm run dev" in both the repo (client & server) once data is seeded .

