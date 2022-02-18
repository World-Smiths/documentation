/*
* Make a backup before using this!
*
* Some assumptions:
*   You have a `packs/` directory with .db files referenced in a `module.json`
*   Only one compendium for each document type exists in that directory
*   World documents aren't already in a folder named after the world's title
*   There are no other modules enabled (other than ScenePacker & Compendium Folders)
*   Supports Scene Packer v2.3.28 and Compendium Folders v2.4.2
*/

if (!(game.modules.get("scene-packer")?.active && game.modules.get("compendium-folders")?.active)) {
    ui.notifications.error("Scene Packer and Compendium Folders must be enabled to use Auto World Pack.");
    return;
}

if (!game.modules.get(`${game.world.id}-module`)?.active) {
    ui.notifications.error(`You must have module named ${game.world.name} enabled to use Auto World Pack.`);
    return;
}

(async () => {
    const spMacros = game.packs.get("scene-packer.macros");
    await spMacros.getDocuments();

    await moveToFolders();
    await bulkReplaceAssetReferences();
    await regenerateThumbnails();
    await exportToCompendium();
    await relinkJournalEntries();
    await bulkPackScenes();
    await exportSceneFolders();
    await cleanupCFtempEntities();
    await showAssetReport();
    lockCompendiums();

    async function moveToFolders() {
        const collections = CONST.COMPENDIUM_DOCUMENT_TYPES.filter(t => t !== "Adventure");
        for (const collection of collections) {
            const documents = game[getDocumentClass(collection).collectionName];
            const folder = game.folders.find(f => f.type === collection && f.name === game.world.data.title)
                ?? await Folder.create({ name: game.world.data.title, type: collection });
            for (const document of documents) {
                if (game.folders.get(document.data.folder)) {
                    await game.folders.get(document.data.folder).update({ parent: folder.id });
                } else {
                    await document.update({ folder: folder.id });
                }
            }
            console.log("Moved documents to folder");
        }
    }

    async function bulkReplaceAssetReferences() {
        return new Promise(resolve => {
            spMacros.getName("Bulk replace asset references").execute();
            Hooks.once("renderDialog", (app, html) => {
                setTimeout(() => {
                    if (app.title === "Bulk replace asset references") {
                        html[0].querySelector("input[name='find']").value = `worlds/${game.world.id}`;
                        html[0].querySelector("input[name='replace']").value = `modules/${game.world.id}-module`;
                        html[0].querySelector("input[type='checkbox']").checked = true;
                        html[0].querySelector("button.dialog-button.ok").click();
                        resolve();
                    }
                }, 200);
            });
        });
    }

    async function regenerateThumbnails() {
        for (const scene of game.scenes) {
            try {
                const thumbnail = await scene.createThumbnail();
                await scene.update({ thumb: thumbnail.thumb }, { diff: false });
                console.log(`Regenerated thumbnail image for ${scene.name} background image`);
            } catch (err) {
                ui.notifications.error(err.message);
            }
        }
    }

    async function exportToCompendium() {
        lockCompendiums(false);

        for (const folder of game.folders.filter(f => f.name === game.world.data.title)) {
            await exportWithCompendiumFolders(folder);
        }
        console.log("Folder structure exported to compendium");
    }

    async function relinkJournalEntries() {
        return new Promise(resolve => {
            ScenePacker.PromptRelinkJournalEntries();
            Hooks.once("renderDialog", (app, html) => {
                setTimeout(() => {
                    if (app.title === "Relink Journal Entries") {
                        html[0].querySelector("select#module-name").value = `${game.world.id}-module`;
                        html[0].querySelector("input[type='checkbox']#make-changes").checked = true;
                        html[0].querySelector("button.dialog-button.relink").click();
                        console.log("Relinked Journal Entries");
                        resolve();
                    }
                }, 200);
            });
        });
    }

    async function bulkPackScenes() {
        return new Promise(resolve => {
            spMacros.getName("Bulk pack scenes").execute();
            Hooks.once("renderDialog", (app, html) => {
                setTimeout(() => {
                    if (app.title === "Pack all Scenes in a folder") {
                        html[0].querySelector("input[type='text'][name='folder']").value = game.world.data.title;
                        html[0].querySelector("button.dialog-button.ok").click();
                        console.log("Bulk packed scenes");
                        resolve();
                    }
                }, 200);
            });
        });
    }

    async function exportSceneFolders() {
        for (const folder of game.folders.filter(f => f.type === "Scene")) {
            await exportWithCompendiumFolders(folder, true);
            console.log("Re-exported scene folder structure to the compendium, merging by name");
        }
    }

    async function cleanupCFtempEntities() {
        return new Promise(resolve => {
            spMacros.getName("Clean up #[CF_tempEntity] entries").execute();
            Hooks.once("renderDialog", (app, html) => {
                setTimeout(() => {
                    if (app.title === "Remove #[CF_tempEntity]") {
                        html[0].querySelector("select#module-name").value = `${game.world.id}-module`;
                        html[0].querySelector("button.dialog-button.process").click();
                        console.log("Cleaned up #[CF_tempEntity] entries");
                        resolve();
                    }
                }, 200);
            });
        });
    }

    async function showAssetReport() {
        return new Promise(resolve => {
            new ScenePacker.AssetReport();
            Hooks.once("renderDialog", (app, html) => {
                setTimeout(() => {
                    if (app.title === "Asset Report") {
                        html[0].querySelector("button.dialog-button.module").click();
                        Hooks.once("renderDialog", (app, html) => {
                            setTimeout(() => {
                                if (app.title === "Asset Report") {
                                    html[0].querySelector("select#module-name").value = `${game.world.id}-module`;
                                    html[0].querySelector("button.dialog-button.default").click();
                                    Hooks.once("renderModuleSelect", (app, html) => {
                                        html[0].querySelector("footer.flexrow > button[type='submit']").click();
                                        console.log("Ran Asset Report");
                                        resolve();
                                    });
                                }
                            }, 200);
                        });
                    }
                }, 200);
            });
        });
    }

    /* -- Utilities -- */
    async function exportWithCompendiumFolders(folder, mergeByName = false) {
        return new Promise(resolve => {
            Hooks.once("renderDialog", async (app, html) => {
                await game.CF.FICManager.exportFolderStructureToCompendium(folder);
                setTimeout(() => {
                    if (app.title.startsWith("Export Content: ")) {
                        // html[0].querySelector("div.form-group > select[name='pack']").value = `${game.world.id}-module.something`;
                        if (mergeByName) html[0].querySelector("div.form-group > input[type='checkbox'][name='merge']").checked = true;
                        html[0].querySelector("button.dialog-button.ok").click();
                        resolve();
                    }
                }, 200);
            });
        });
    }

    function lockCompendiums(lock = true) {
        for (const pack of game.packs.filter(p => p.metadata.package === `${game.world.id}-module`)) {
            pack.configure({ locked: lock });
        }
        console.log(`${lock ? "Locked" : "Unlocked"} compendiums`);
    }
})();