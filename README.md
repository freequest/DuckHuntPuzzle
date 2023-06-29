# DuckHuntPuzzle
A server for running DuckHuntPuzzles. This project is a fork from https://github.com/bs24/MindbreakersServer wich is a fork from https://github.com/dlareau/puzzlehunt_server, where more information about the original project can be found. It also includes some code taken from https://gitlab.com/hunter2.app/hunter2, most notably for websocket communications and discord bot API. This project aims at different (or simpler) kinds of puzzle hunts than the aforementioned projects, therefore it focuses on different features.


### Setup
This project uses docker-compose as it's main form of setup. You can use the following steps to get a sample server up and going

1. Install [docker/docker-compose.](https://docs.docker.com/compose/install/)
2. Clone this repository.
3. Make a copy of ```sample.env``` named ```.env``` (yes, it starts with a dot).
4. Add your account to the group docker (check the docker group name running ```$groups``` then run ```sudo usermod -aG DOCKER-GROUP-NAME USERNAME```)
5. Run ```docker-compose up``` (possibly prepending ```sudo``` if needed) and let it run in a terminal
6. Once up, you'll need to run the following commands in another terminal to collect all the static files (to be run any time you alter static files) and to load in an initial hunt to pacify some of the display logic (to be run only once) :
```
docker-compose exec app python3 /code/manage.py collectstatic --noinput
docker-compose exec app python3 /code/manage.py loaddata initial_hunt_mb
```
7. You should now have the server running on a newly created VM, accessible via [http://localhost](http://localhost). The repository you cloned has been linked into the VM by docker, so any changes made to the repository on the host system should show up automatically. (A ```docker-compose restart``` may also be needed for ```.py``` changes to take effect, and the above collectstatic for static files (js, css, images...). You may need to run ```docker-compose build``` if you kill ```docker-compose up```. The superuser account (access to [http://localhost/admin](http://localhost/admin)) has the login ```hunt``` and the password ```admin```

8. (optional) If you want ssl authentification, you can adjust the environment variables NGINX_PROTOCOL in your .env file to "https", adjust the ssl configuration for your server in docker/configs/nginx_https.conf, and finally add your certificates to docker/volumes/ssl-certs.
