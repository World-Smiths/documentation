# Snippets

**More macros [here](../macros).**

> Many of these macros haven't been updated for v9 yet. If you have an updated copy of one, please contribute it 😃

## Re-associate tokens with actors with the same name

```js
const scene = game.scenes.active;
const unlinked = canvas.scene.data.tokens.map(t => {
    const actor = game.actors.entities.find(a => a.name === t.name);
    if (actor) {
        return {
            _id: t._id,
            actorId: actor.id
        }
    } else {
        console.log(t.name);
        return {
            _id: t._id,
            actorId: ""
        }
    }
});
const updates = duplicate(unlinked);
scene.updateEmbeddedEntity("Token", updates);
ui.notifications.info('Tokens linked to actors.');
console.log(updates);
```

## Replaces tokens with linked ones

```js
// Will create a fresh copy of all selected unlinked NPCs (or all on board if none selected).
// Main use is for when you correct an NPC in the sidebar and need to replace all current tokens.
function findUnlinked (token) { 
   return true
};
// get the list of tokens to respawn
const tokens = canvas.tokens.controlled.length > 0 ? canvas.tokens.controlled.filter(findUnlinked) : canvas.tokens.placeables.filter( findUnlinked );
// generated the info needed
let spawnInfo = tokens.map( token => {
    let protoToken = duplicate(game.actors.getName(token.name)?.data.token);
    if (protoToken){
        protoToken.deleteId = token.id;
        protoToken.x = token.x;
        protoToken.y = token.y;
    }
    return protoToken;
})
spawnInfo = spawnInfo.filter( info => !!info );
const deleteIds = spawnInfo.map( info => info.deleteId );
(async ()=>{
    await canvas.tokens.createMany(spawnInfo);
    await canvas.tokens.deleteMany(deleteIds);
})();
```

## Fix Names and Bars

> Updated for v9

Set Names to hover for owner and Bars to always display for owner for both tokens and prototype tokens. Also set bar 1 to track HP and unset bar 2.

```js
// Display Modes: ALWAYS, CONTROL, HOVER, NONE, OWNER, OWNER_HOVER
for (const scene of game.scenes) {
    await scene.updateEmbeddedDocuments("Token", scene.tokens.map(t => ({
        _id: t.id,
        "bar1.attribute": "attributes.hp",
        "bar2.attribute": null,
        displayName: CONST.TOKEN_DISPLAY_MODES.OWNER_HOVER,
        displayBars: CONST.TOKEN_DISPLAY_MODES.OWNER,
    })));
}
Actor.updateDocuments(game.actors.map(a => ({
    _id: a.id,
    token: {
        "bar1.attribute": "attributes.hp",
        "bar2.attribute": null,
        displayName: CONST.TOKEN_DISPLAY_MODES.OWNER_HOVER,
        displayBars: CONST.TOKEN_DISPLAY_MODES.OWNER,
    },
})));
ui.notifications.info("Tokens bar1, bar2, and name set.");
```

## Toggle Token Vision

```js
// Update selected tokens to flip between token vision ON and OFF.
const updates = [];
for (let token of canvas.tokens.controlled) {
  let newTV = (token.data.vision == true) ? false : true;
  updates.push({
    _id: token.id,
    vision: newTV
  });
};
// use `canvas.tokens.updateMany` instead of `token.update` to prevent race conditions (meaning not all updates will be persisted and might only show locally)
canvas.tokens.updateMany(updates);
```
