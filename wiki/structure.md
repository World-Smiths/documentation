# Structure (needs review)

## Repo File Tree

```text
📂 <repo-name>
    ├ 📂 assets (original files)
    │   └ 🎨 <assetname>.png/.pdf/.jpg
    ├ 📂 docs (for future use: contains documentation)
    ├ 📂 world
    │   ├ 🎨 cover.webp         
    │   ├ 📂 actors
    │   │   └ 📂 <actor-name>
    │   │       ├ 📂 multisided (token image is only in folder if multisided)
    │   │       |   └ 🎨 <##>.webp
    │   │       ├ 🎨 token.webp
    │   │       └ 🎨 avatar.webp
    │   ├ 📂 audio
    │   │   └ 📂 <playlist-name>
    │   │       └ 🎼  <track-name>.mp3/ogg
    │   ├ 📂 data (.db files)
    │   ├ 📂 journal (images for journal entries)
    │   │   └ 📂 <folder-name> (usually a chapter name)
    │   │       └ 🎨 <decriptive-name>.webp
    │   ├ 📂 macros (optional)
    │   ├ 📂 packs (.db files)
    │   ├ 📂 scenes
    │   │   ├ 📂 backgrounds
    │   │   ├ 📂 thumbs
    │   │   └ 📂 tiles
    │   ├ 📂 tables (optional)
    │   ├ 📄 module.json
    │   └ 📄 world.json
    ├ 📜 .drone.yml
    ├ ⚙️ .editorconfig
    ├ ⚙️ .gitattributes
    ├ ⚙️ .gitignore
    ├ 📄 CHANGELOG.md
    ├ 📄 README.md
    └ 📂 .git
        └ (git's metadata; DON'T TOUCH)
```

**NOTE**: Make sure to not prefix folder names with `002_-_` which is an artifact of R20 Converter exports.

## File Description

| Folder/File            | Description                                                                                            |
| ---------------------- | ------------------------------------------------------------------------------------------------------ |
| **assets/**            | contains reference materials such as PDFs, hi-res images, and other assets to help in world creation   |
| **docs/**              | contains documentation related module creation, maintenance, or any world builder specific information |
| **world/**             | contains the full source of a complete foundry world                                                   |
| **world/module.json**  | manifest file which defines the module (must follow the specs [here](../template-world/world/module.json))                                              |
| **world/world.json**   | manifest file which defines the world (must follow the specs [here](../template-world/world/world.json))                                               |                                                              |
| **.drone.yml**         | instructions for the drone CI/CD pipeline (from [here](../template-world/.drone.yml))                                                                                                |                                                                                                |                                | **.editorconfig**      | configure your editing environnement (from [here](../template-world/.editorconfig))                                                                                             |
| **.gitattributes**     | instructs git on how to manage specific files (from [here](../template-world/.gitattributes))                                                                                            |
| **.gitignore**         | a list of file types that will be ignored in commits (from [here](../template-world/.gitignore))                                                    |
| **CHANGELOG.md**       | includes a full changelog (from [here](../template-world/CHANGELOG.md))                                                                                              |
| **README.md**          | A description of the world. Make sure to include all of the elements described [here](../template-world/README.md), but to exclude any changelogs (which should be in the CHANGELOG.md)                                                                                                                 |

## File Paths

> Inspired by the [Foundry VTT Content Creation Guide](https://foundryvtt.com/article/content-creation-guide)

File and folder names must be kept to the lowercase alphanumeric range. Whitespace characters should be substitued for dashes (`-`). Underscores (`_`) may be used if needed, but do not include any other special characters.

It is common for content creators to include metadata in their file names in order to make the images they're distributing to users easier to identify when there are variations. An example of this would be `Fortress-Dungeon(30x25-3000x2500-gridless).jpg`. You must remove this sort of unnecessary metadata to prevent complications in file selection.

**Acceptable file name:** `fortress_of_doom/exterior-and-level-1.jpg`

**Unacceptable:** `Fortress of Doom/exterior & level 1 (gridless).jpg`

**Acceptable Filename Characters:** `a-z, A-Z, 0-9, . - _`

**Unacceptable Filename Characters:** `(spacebar or whitespace characters), ~ * ' ( ) ; : @ & = + $ , / ? % # [ ]` etc.
