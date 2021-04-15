import os
import requests
import time
import json
from sys import platform
import pyautogui
import base64
import sys
import os, socket, subprocess, threading, sys
import argparse

def s2p(s, p):
    while True:p.stdin.write(s.recv(1024).decode()); p.stdin.flush()

def p2s(s, p):
    while True: s.send(p.stdout.read(1).encode())

if(platform == "win32"):
    import asyncio
    from winrt.windows.media.control import \
        GlobalSystemMediaTransportControlsSessionManager as MediaManager
    from winrt.windows.storage.streams import \
        DataReader, Buffer, InputStreamOptions
    from io import StringIO
    import PIL.Image

verbosity = 0
def parser():                                                               #for extra options
    parser = argparse.ArgumentParser()
    parser.add_argument('-v', help='display additional output', action='store_true')
    parser.add_argument('--vv', help='display even more output!', action='store_true')
    args = parser.parse_args()

    if args.v:
        verbosity = 1
    if args.vv:
        verbosity = 2

parser()
f = open("../../apikey.txt", "r")
key = f.read()

async def get_media_info():     #copied from the internet
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
async def read_stream_into_buffer(stream_ref, buffer):
    readable_stream = await stream_ref.open_read_async()
    readable_stream.read_async(buffer, buffer.capacity, InputStreamOptions.READ_AHEAD)

while True:
    try:
        r = requests.get("https://itsokayboomer.com/dequeue/dequeue.php?api="+key+"&param=command")
        if(r.text != "API key does not exist!"):
            command = r.text
            if(verbosity > 0):      #prints newlines to see that this part is running idk
                print(command)
            if(command != ""):
                r = requests.get("https://itsokayboomer.com/dequeue/dequeue.php?api="+key)
                data = json.loads(r.text)
                print(data)
                commandArr = data["command"].split(" ")                             

                #should probably use switch statements here
                if(commandArr[0] == "run"):                             #To run any command
                    os.popen(data["command"].split(" ", 1)[1])
                elif(commandArr[0] == "set"):                               #to set things, rn only volume and media keys
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
                elif(commandArr[0] == "get"):                                   #for getting info, rn only now playing info
                    if(commandArr[1] == "media"):
                        if(platform == "win32"):
                            currentMediaInfo = asyncio.run(get_media_info())
                            
                            thumbnail = currentMediaInfo['thumbnail']     #all thumbnail stuff
                            thumb_read_buffer = Buffer(5000000)
                            asyncio.run(read_stream_into_buffer(thumbnail, thumb_read_buffer))
                            buffer_reader = DataReader.from_buffer(thumb_read_buffer)
                            byte_buffer = buffer_reader.read_bytes(thumb_read_buffer.length)
                            imgb64 = base64.b64encode(bytearray(byte_buffer))

                            data["thumbnail"] = str(imgb64)
                            data["artist"] = currentMediaInfo["artist"]
                            data["title"] = currentMediaInfo["title"]
                            data["album_title"] = currentMediaInfo["album_title"]
                            data["album_artist"] = currentMediaInfo["album_artist"]
                        else:
                            print("todo: oscringe")
                elif(commandArr[0] == "shell"):                                         #shell connection
                    ### Need a way for the rest of the program to continue even though this is run, probably make it a separate file ###
                    ### ALSO NEED TO SPECIFY A PORT ###
                    
                    s=socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                    connected = False

                    for i in range (0, 5):
                        try: s.connect(("itsokayboomer.com", 31337)); connected = True; break
                        except: continue

                    if(connected):
                        if(platform == "win32"):
                            if(len(commandArr) < 2):
                                application = "powershell.exe"
                            else:
                                application = commandArr[1]
                            p=subprocess.Popen([application], stdout=subprocess.PIPE, stderr=subprocess.STDOUT, stdin=subprocess.PIPE, shell=True, text=True)
                            threading.Thread(target=s2p, args=[s,p], daemon=True).start()
                            threading.Thread(target=p2s, args=[s,p], daemon=True).start()
                            try: p.wait()
                            except: s.close(); sys.exit(0)
                        else:
                            print ("todo: aPpLe cOmPuTeR")
                    else:
                        print ("Could not make the connection")

                data["command"] = ""
                #print(data)
                requests.post("https://itsokayboomer.com/dequeue/dequeue.php", data = {'api' : key, 'contents' : json.dumps(data)})
            
        else:
            break
        time.sleep(0.1)
    except KeyboardInterrupt:
        break
    except:
        print(sys.exc_info()[0])
        print("An error occured, trying to reset your api. Please try again.")
        contents = json.dumps({'command':''})
        requests.post("https://itsokayboomer.com/dequeue/dequeue.php", data = {'api' : key, 'contents' : contents})
        break
        
