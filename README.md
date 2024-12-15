> Effortlessly convert Spotify links to your preferred streaming service

Copy a link from your favorite streaming service, paste it into the search bar, and voilà! Links to the track on all other supported platforms are displayed. If the original source is Spotify you'll even get a quick audio preview to ensure it's the right track.

## Supported Streaming Services (Adapters)

Adapters represent the streaming services supported by the Web App and the Raycast Extension. Each adapter allows the app to convert links from one platform to others. The table below shows which features are available for each one:

| Adapter          | Inverted Search | Official API           | Verified Links |
| ---------------- | --------------- | ---------------------- | -------------- |
| Spotify          | Yes             | Yes                    | Yes            |
| Tidal            | Yes             | Yes                    | Yes            |
| YouTube Music    | Yes             | No                     | Yes            |
| Apple Music      | Yes             | No                     | Yes            |
| Deezer           | Yes             | Yes                    | Yes            |
| SoundCloud       | Yes             | No                     | Yes            |

## Web App

![Uptime Badge](https://uptime.sjdonado.com/api/badge/2/uptime/24?labelPrefix=Web%20Page%20&labelSuffix=h) ![Uptime Badge](https://uptime.sjdonado.com/api/badge/2/ping/24?labelPrefix=Web%20Page%20)

<div align="center">
  <img width="1200" alt="image" src="https://github.com/user-attachments/assets/ae6250f5-d1ed-41f2-ae21-8a2b2599a450" />
</div>

## Raycast Extension

![Uptime Badge](https://uptime.sjdonado.com/api/badge/3/uptime/24?labelPrefix=API%20&labelSuffix=h) ![Uptime Badge](https://uptime.sjdonado.com/api/badge/3/ping/24?labelPrefix=API%20)

<a title="Install idonthavespotify Raycast Extension" href="https://www.raycast.com/sjdonado/idonthavespotify"><img src="https://www.raycast.com/sjdonado/idonthavespotify/install_button@2x.png?v=1.1" height="64" style="height: 64px;" alt=""></a>


## Local Setup (Web App)

The list of environment variables is available in `.env.example`. To complete the values for `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` refer to https://developer.spotify.com/documentation/web-api, other variables related to cookies can be extracted from your browser.

To get the app up:

```sh
docker compose up -d

bun install
bun dev
```

## Local Setup (Raycast)
Follow the guidelines https://developers.raycast.com/basics/create-your-first-extension and look for the folder: https://github.com/raycast/extensions/tree/8533f11972392b6d22f69f073fdb2af6d8ffee10/extensions/idonthavespotify

## More info

Contributions are more than welcome, just open a PR and I'll review it promptly.

<img width=50 src="https://user-images.githubusercontent.com/27580836/227801051-a71d389e-2510-4965-a23e-d7478fe28f13.jpeg"/>
Icon Generated by https://deepai.org/machine-learning-model/text2img
