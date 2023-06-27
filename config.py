import os

PORT = os.getenv("PORT", default=5000)

# bind is the socket to bind the guicorn server 
bind = "0.0.0.0:{}".format(PORT)