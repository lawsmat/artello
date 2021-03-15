# drone-tests
 Fly and optionally record movement with any tello drone.
 
## usage

0. install dependencies (run `yarn` or `npm i`)
1. connect to drone
2. run utility below
3. amazing

General control utility:
```
yarn start
# or:
npm start
```

Replay recordings (not camera recordings, *movement* recordings!):
```
yarn replay
# or:
npm run replay
```

⚠️ use with caution, drones can be scary sometimes ⚠️

### Note on recordings:
(Edit, this is being fixed in [#2](https://github.com/lawsmat/drone-tests/issues/2))

Recordings are meant for short flights. If the drone goes at a slightly different angle at the beginning, or hovers differently during takeoff, the recording can have catastrophic errors.

I tried flying it into my kitchen and it bashed its face into the wall (actually reasonably close, but not good enough)

I also did a fly-around, it didn't go well and also crashed into the wall.
