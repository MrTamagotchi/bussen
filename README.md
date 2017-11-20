# bussen-hem

A stupid little CLI-app that accesses Skånetrafikens Open API and prints a tiny timetable of the 5 coming busses. All in Swedish.

![preview](https://github.com/MrTamagotchi/bussen/blob/master/bussen-preview.gif?raw=true "preview")

## Setup
If you happen to live at my place or want to know when to commute from Djäknegatan to any stop in the direction "Västra Hamnen via Dockan" do the following:
 * `$ npm install` or `$ yarn install` 
 * `$ npm link`
 * bam, done, wow! Now you can run `bussen-hem` anywhere, anytime.

TODO - 
 * Fix stupid hacks
 * Un-hardcode the bus
 * Settings command to set your own bus
 * Scrap everything and make a proper Skånetrafiken-CLI using [this wrapper I just found](https://github.com/axelniklasson/node-skanetrafiken/wiki/API-documentation) 🙃
