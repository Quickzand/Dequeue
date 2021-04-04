import os
import requests
import time
import json
from sys import platform
import pyautogui

import asyncio
from winrt.windows.media.control import \
    GlobalSystemMediaTransportControlsSessionManager as MediaManager

#argparse for verbosity and optional key when not using file

f = open("../apikey.txt", "r")
key = f.read()

async def get_media_info():
    sessions = await MediaManager.request_async()

    # This source_app_user_model_id check and if statement is optional
    # Use it if you want to only get a certain player/program's media
    # (e.g. only chrome.exe's media not any other program's).

    # To get the ID, use a breakpoint() to run sessions.get_current_session()
    # while the media you want to get is playing.
    # Then set TARGET_ID to the string this call returns.

    current_session = sessions.get_current_session()
    if current_session:  # there needs to be a media session running
        info = await current_session.try_get_media_properties_async()

        # song_attr[0] != '_' ignores system attributes
        info_dict = {song_attr: info.__getattribute__(song_attr) for song_attr in dir(info) if song_attr[0] != '_'}

        # converts winrt vector to list
        info_dict['genres'] = list(info_dict['genres'])

        return info_dict

    # It could be possible to select a program from a list of current
    # available ones. I just haven't implemented this here for my use case.
    # See references for more information.
    raise Exception('TARGET_PROGRAM is not the current media session')

current_media_info = asyncio.run(get_media_info())
print(current_media_info)

while True:
    try:
        r = requests.get("https://itsokayboomer.com/dequeue/dequeue.php?api="+key)
        if(r.text != "API key does not exist!"):
            data = json.loads(r.text)
            print(data)
            if(data["command"] != ""):
                commandArr = data["command"].split(" ")                             

                #should probably use switch statements here
                if(commandArr[0] == "run"):
                    os.popen(data["command"].split(" ", 1)[1])
                elif(commandArr[0] == "set"):
                    if(commandArr[1] == "volume"):
                        if(platform == "win32"):
                            if(commandArr[2] == "mute"):
                                os.popen("nircmd\\nircmd.exe mutesysvolume 1")
                            elif(commandArr[2] == "unmute"):
                                os.popen("nircmd\\nircmd.exe mutesysvolume 0")
                            elif(commandArr[2] == "togglemute"):
                                os.popen("nircmd\\nircmd.exe mutesysvolume 2")
                            else:
                                maxVol = 65535
                                percentVol = float(commandArr[2])
                                newVol = maxVol * percentVol
                                data["volume"] = commandArr[2]
                                os.popen("nircmd\\nircmd.exe setsysvolume "+str(newVol))
                        else:
                            print("todo: osx :nauseated_face:")
                    elif(commandArr[1] == "playback"):
                        if(commandArr[2] == "toggleplay"):
                            pyautogui.press("playpause")
                        elif(commandArr[2] == "prev"):
                            pyautogui.press("prevtrack")
                        elif(commandArr[2] == "next"):
                            pyautogui.press("nexttrack")

                data["command"] = ""
                data = json.dumps(data)
                requests.post("https://itsokayboomer.com/dequeue/dequeue.php", data = {'api' : key, 'contents' : data})
            
        else:
            break
        time.sleep(0.1)
    except KeyboardInterrupt:
        break
    except:
        print("An error occured, trying to reset your api. Please try again.")
        contents = json.dumps({'command':'','volume':0})
        requests.post("https://itsokayboomer.com/dequeue/dequeue.php", data = {'api' : key, 'contents' : contents})
        break
        
