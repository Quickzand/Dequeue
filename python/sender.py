import os
import requests
import json
import sys

f = open("../../apikey.txt", "r")
key = f.read()

try:
    g = requests.get("https://itsokayboomer.com/dequeue/dequeue.php?api="+key)                                      #gets old json data and updates command to a different one and sends it back
    if(g.text != "API key does not exist!"):
        contents = json.loads(g.text)
        contents["command"] = "shell cmd.exe"

    contents = json.dumps(contents)
    r = requests.post("https://itsokayboomer.com/dequeue/dequeue.php", data = {'api' : key, 'contents' : contents})

    print(r.text)
except:
    print(sys.exc_info()[0])
    print("An error occured, trying to reset your api. Please try again.")
    contents = json.dumps({'command':'test'})
    requests.post("https://itsokayboomer.com/dequeue/dequeue.php", data = {'api' : key, 'contents' : contents})
