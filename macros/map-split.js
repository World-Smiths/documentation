let tilesLocation = `splitBackground/${canvas.scene.name}`;
let content = `<form>
                <p>This macro will convert the current scene's background image to smaller tiles that should improve rendering performance in low resources computers. To continue, select the amount of splits you want and press <strong>OK.</strong></p>
                <p>Checking <strong>Lock tiles</strong> will lock the tiles so they cannot be moved/deleted accidentally.</p>
                <p>If you need to revert the changes this macro do, you can manually delete the added tiles and re-set the scene's background to the previous value (check the chat log for the file).</p>
                <div class="form-group">
                  <label>Horizontal count:</label>
                  <input name="horizontal" value="2"></input>
                </div>
                <div class="form-group">
                  <label>Vertical count:</label>
                  <input name="vertical" value="2"></input>
                </div>
                <div class="form-group">
                  <label>Lock tiles</label>
                  <input type="checkbox" name="lock"></input>
                </div>
              </form>`;

new Dialog({
  title: "Convert background to tiles",
  content,
  buttons: {
    ok: {
      icon: '<i class="fas fa-check"></i>',
      label: "Ok",
      callback: (html) => {
        const horizontal = html.find("[name=horizontal]")[0].value;
        const vertical = html.find("[name=vertical]")[0].value;
        const lock = html.find("[name=lock]")[0].checked;
        createTiles(horizontal, vertical, lock);
      },
    },
    cancel: {
      icon: '<i class="fas fa-times"></i>',
      label: "Cancel",
    },
  },
}).render(true);

async function createTiles(horizontalCells, verticalCells, locked) {
  let texture = new PIXI.Texture.from(canvas.background.bgPath);
  let tileWidth = texture.orig.width / horizontalCells;
  let tileHeight = texture.orig.height / verticalCells;

  if (!Number.isInteger(tileWidth) || !Number.isInteger(tileHeight)) {
    ui.notifications.error(`Cannot split a ${texture.orig.width} by ${texture.orig.height} background image into ${horizontalCells} by ${verticalCells}; must evenly divide.`);
    return;
  }

  createLocationIfNeeded();

  var tilesData = [];
  for (var x = 0; x < horizontalCells; x++) {
    for (var y = 0; y < verticalCells; y++) {
      var tileTexture = new PIXI.Texture(
        texture,
        new PIXI.Rectangle(x * tileWidth, y * tileHeight, tileWidth, tileHeight)
      );
      var tileSprite = new PIXI.Sprite(tileTexture);
      await saveImage(`background_${x}_${y}.webp`, tileSprite);
      tilesData.push(dataForTile(tileWidth, tileHeight, x, y, locked));
    }
  }
  await canvas.scene.createEmbeddedDocuments("Tile", tilesData);
  ChatMessage.create({content: "Removing background image: " + canvas.scene.img});
  await Scene.updateDocuments([{_id: canvas.scene.id, img: ""}]);

  ui.notifications.info("Done!");
}

async function createLocationIfNeeded() {
  var fullPath = "";

  for (const component of tilesLocation.split("/")) {
    try {
      fullPath += `${component}/`;
      await FilePicker.createDirectory("data", fullPath);
    } catch (_err) {}
  }
}

async function saveImage(filename, image) {
  await canvas.app.renderer.extract.canvas(image).toBlob(function (blob) {
    let file = new File([blob], filename, { type: "image/webp" });
    FilePicker.upload("data", tilesLocation, file);
  }, "image/webp");
}

function dataForTile(tileWidth, tileHeight, x, y, locked) {
  return {
    img: `${tilesLocation}/background_${x}_${y}.webp`,
    width: tileWidth,
    height: tileHeight,
    x: canvas.scene.dimensions.paddingX + x * tileWidth,
    y: canvas.scene.dimensions.paddingY + y * tileHeight,
    z: -100,
    locked: locked,
  };
}