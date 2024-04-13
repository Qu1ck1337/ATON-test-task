import sqlite3

import uvicorn as uvicorn
from fastapi import FastAPI, Body, Response, status, Request
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


connection = sqlite3.connect('db.sqlite')
cursor = connection.cursor()


class UserToken:
    def __init__(self, token, user):
        self.token = token
        self.user = user


tokens = []

@app.post('/access')
async def get_access(data=Body()):
    user = cursor.execute('''SELECT * FROM Users WHERE login=? AND password=?''', (data['login'], data['pass'])).fetchone()
    if user:
        clients = cursor.execute('''SELECT accountID, surname, name, patronymic, birthday, TIN, status FROM Clients WHERE user=?''', (user[0], )).fetchall()
        return clients
    return Response(status_code=status.HTTP_404_NOT_FOUND)


@app.post('/set_status')
async def get_access(data=Body()):
    cursor.execute('''UPDATE Clients SET status=? WHERE accountID=?''', (data["new_status"], data["accountID"]))
    return Response(status_code=status.HTTP_200_OK)


if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)
    connection.close()