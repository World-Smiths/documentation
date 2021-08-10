# Structure (needs review)

## Repo File Tree

```text
📂 <repo-name>
    ├ 📂 actors
    │   └ 📂 <actor-name>
    │       ├ 📂 multisided (token image is only in folder if multisided)
    │       |   └ 🎨 <##>.webp
    │       ├ 🎨 token.webp
    │       └ 🎨 avatar.webp    
    ├ 📂 assets (original files)
    │   └ 🎨 <assetname>.png/.pdf/.jpg
    ├ 📂 audio
    │   └ 📂 <playlist-name>
    │       └ 🎼  <track-name>.mp3/ogg
    ├ 📂 data (.db files)
    ├ 📂 journals (images for journal entries)
    │   └ 📂 <folder-name> (usually a chapter name)
    │       └ 🎨 <decriptive-name>.webp
    ├ 📂 scripts
    │   └ 📂 macros
    ├ 📂 packs (.db files)
    ├ 📂 scenes
    │   ├ 📂 backgrounds
    │   ├ 📂 thumbs
    │   └ 📂 tiles
    ├ 📂 tables
    ├ 🎨 cover.webp 
    ├ 📄 module.json
    ├ 📄 world.json
    ├ ⚙️ .editorconfig
    ├ ⚙️ .gitattributes
    ├ ⚙️ .gitignore
    ├ 📄 CHANGELOG.md
    ├ 📄 README.md
    └ 📂 .git
        └ (git's metadata; DON'T TOUCH)
```

## File Description

| Folder/File        | Description                                                                                                                                               |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **actors/**        | A folder with actor tokens and avatars                                                                                                                    |
| **assets/**        | Contains reference materials such as PDFs, hi-res images, and other assets to help in world creation                                                      |
| **audio/**         | A folder with audio tracks                                                                                                                                |
| **data/**          | A folder with database files for the world                                                                                                                |
| **journals/**      | A folder with images for the the journal entries                                                                                                          |
| **packs/**         | A folder with database files for the module                                                                                                               |
| **scenes/**        | A folder with images for the scenes                                                                                                                       |
| **scripts/**       | A folder with JavaScript world scripts and macros                                                                                                         |
| **.editorconfig**  | Configures your editing environnement (get from [here](https://github.com/World-Smiths/template-world/blob/main/.editorconfig))                           |
| **.gitattributes** | Instructs git on how to manage specific files (get from [here](https://github.com/World-Smiths/template-world/blob/main/.gitattributes))                  |
| **.gitignore**     | A list of file types that will be ignored in commits (get from [here](https://github.com/World-Smiths/template-world/blob/main/.gitignore))               |
| **CHANGELOG.md**   | Includes a full changelog (see [here](https://github.com/World-Smiths/template-world/blob/main/CHANGELOG.md))                                             |
| **cover.webp**     | A static cover image for the package                                                                                                                      |
| **module.json**    | Manifest file which defines the module (must follow the specs [here](https://github.com/World-Smiths/template-world/blob/main/world/module.json))         |
| **README.md**      | A description of the world. Make sure to include all of the elements described [here](https://github.com/World-Smiths/template-world/blob/main/README.md) |
| **world.json**     | Nanifest file which defines the world (must follow the specs [here](https://github.com/World-Smiths/template-world/blob/main/world/world.json))           |
