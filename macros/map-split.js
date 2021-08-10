//Note from fotoply: This seems to be very broken in 0.8.x currently..

let confirmed = false;
function getPosition(string, subString, index) {
  return string.split(subString, index).join(subString).length;
}


let d = new Dialog({
 title: "Background tiles",
 content: `
 <form>
      <div class="form-group">
       <label>Horizontal count:</label>
       <input id="horizontal" name="horizontal"></input>
       </div>
       <div class="form-group">
       <label>Vertical count:</label>
       <input id="vertical" name="vertical"></input>
      </div>
      <div class="form-group">
      <label>Lock tiles</label>
      <input id="lock" type="checkbox" name="lock" checked="false"></input>
      </div>
     </form>
 `,
 buttons: {
  ok: {
   icon: '<i class="fas fa-check"></i>',
   label: "Ok",
   callback: () => confirmed = true
  },
  cancel: {
   icon: '<i class="fas fa-times"></i>',
   label: "Cancel",
  }
 },
 default: "ok",
 close: html => {
     if (confirmed) {
         let horizontalCells = parseInt(html.find('[name=horizontal]')[0].value);
         let verticalCells = parseInt(html.find('[name=vertical]')[0].value);
         let lock = html.find('[name=lock]')[0].checked;
         
         doTiling(horizontalCells, verticalCells, lock);
 	   }
 	 }
}).render(true);

async function saveImage(image, x, y, location) {
    await canvas.app.renderer.extract.canvas(image).toBlob(function (b) {
		    let file = new File([b], "x" + x + "y" + y + ".webp", {type:"image/webp"});
		    FilePicker.upload("data", location + "/", file);
		}, "image/webp");
}

async function doTiling(horizontalCells, verticalCells, isLocked) {
        if(canvas.background.width % horizontalCells != 0 || canvas.background.height % verticalCells != 0) {
            ui.notifications.error("Cannot split background image into "  + horizontalCells + " by " + verticalCells + "; Must evenly divide.");
            return;
        }
    
         let width = canvas.background.width/horizontalCells;
         let height = canvas.background.height/verticalCells;
         
         var tempLoc = canvas.background.source.src;
         let location = "splitBackgrounds/" + tempLoc.substring(getPosition(tempLoc, "/", 3)+1, tempLoc.length).replaceAll("%20", " ").replaceAll("/", "-").split(".")[0];
         try {
             await FilePicker.createDirectory("data", "splitBackgrounds");
         } catch (_) {
             
         }
         try {
             await FilePicker.createDirectory("data",location);
         } catch (err) {
             console.log("Location already exists");
         }
         var texture = new PIXI.Texture.from(tempLoc);
         var originalWidth = texture.orig.width;
         var originalHeight = texture.orig.height;
	 console.log("Grid size: " + horizontalCells + " x " + verticalCells);
	 for (var x = 0; x < horizontalCells; x++) {
	   for (var y = 0; y < verticalCells; y++) {
	   	    var tile = new PIXI.Texture(texture, new PIXI.Rectangle(x*(originalWidth/horizontalCells), y*(originalHeight/verticalCells), (originalWidth/horizontalCells), (originalHeight/verticalCells)));
		    var tileSprite = new PIXI.Sprite(tile);
		    saveImage(tileSprite, x, y, location);
		    Tile.create({
              img: location +  "/x" + x + "y" + y + ".webp",
              width: width,
              height: height,
              scale: 1,
              x: x*width+Math.ceil(canvas.scene.data.padding*canvas.scene.data.width/canvas.scene.data.grid)*canvas.scene.data.grid,
              y: y*height+Math.ceil(canvas.scene.data.padding*canvas.scene.data.height/canvas.scene.data.grid)*canvas.scene.data.grid,
              z: -100,
              rotation: 0,
              hidden: false,
              locked: isLocked
            });
            await new Promise(r => setTimeout(r, 100));
	   }
	 }
	 ui.notifications.info("Finished splitting map, if you are seeing error tiles swap to another scene then back. After confirming that everything is in order you can remove background.")
}