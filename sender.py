import os
import requests
import json

f = open("../apikey.txt", "r")
key = f.read()

try:
    g = requests.get("https://itsokayboomer.com/dequeue/dequeue.php?api="+key)                                      #gets old json data and updates command to a different one and sends it back
    if(g.text != "API key does not exist!"):
        contents = json.loads(g.text)
        contents["command"] = "set volume 0.3"

    contents = json.dumps(contents)
    r = requests.post("https://itsokayboomer.com/dequeue/dequeue.php", data = {'api' : key, 'contents' : contents})

    print(r.text)
except:
    print("An error occured, trying to reset your api. Please try again.")
    contents = json.dumps({'command':''})
    requests.post("https://itsokayboomer.com/dequeue/dequeue.php", data = {'api' : key, 'contents' : contents})
