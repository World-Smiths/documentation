// @ts-nocheck
/*
* Make a backup before using this!
*
* Some assumptions:
*   You have a `packs/` directory with .db files referenced in a `module.json`
*   Only one compendium for each document type exists in that directory
*   World documents aren't already in a folder named after the world's title
*   There are no world documents which don't have compendiums
*   There are no other modules enabled (other than ScenePacker & Compendium Folders)
*   Only works in English
*   Supports Scene Packer v2.4.4 and Compendium Folders v2.4.3
*/

(async () => {
    if (!(game.modules.get("scene-packer")?.active && game.modules.get("compendium-folders")?.active)) {
        ui.notifications.error("Scene Packer and Compendium Folders must be enabled to use Auto World Pack.");
        return;
    }
    if (!game.modules.get(`${game.world.id}-module`)?.active) {
        ui.notifications.error(`You must have module named ${game.world.name} enabled to use Auto World Pack.`);
        return;
    }

    const spMacros = game.packs.get("scene-packer.macros");
    await spMacros.getDocuments();

    await moveToFolders();
    await bulkReplaceAssetReferences();
    await regenerateThumbnails();
    await exportToCompendium();
    await relinkJournalEntries();
    await bulkPackScenes();
    await exportSceneFolders();
    await relinkJournalEntries();
    await cleanupCFtempEntities();
    await lockCompendiums();
    await showAssetReport();

    async function moveToFolders() {
        const collections = CONST.COMPENDIUM_DOCUMENT_TYPES.filter(t => t !== "Adventure");
        for (const collection of collections) {
            const documents = game[getDocumentClass(collection).collectionName];
            if ([...documents].length) {
                const folder = game.folders.find(f => f.type === collection && f.name === game.world.data.title)
                    ?? await Folder.create({ name: game.world.data.title, type: collection });
                for (const document of documents) {
                    if (game.folders.get(document.data.folder)) {
                        await game.folders.get(document.data.folder).update({ parent: folder.id });
                    } else {
                        await document.update({ folder: folder.id });
                    }
                }
                console.log(`Moved ${collection} Documents to folder`);
            }
        }
    }

    async function bulkReplaceAssetReferences() {
        return new Promise(resolve => {
            spMacros.getName("Bulk replace asset references").execute();
            Hooks.once("renderDialog", (app, html) => {
                setTimeout(async () => {
                    if (app.title === "Bulk replace asset references") {
                        html[0].querySelector("input[name='find']").value = `worlds/${game.world.id}`;
                        html[0].querySelector("input[name='replace']").value = `modules/${game.world.id}-module`;
                        html[0].querySelector("input[type='checkbox']").checked = true;
                        html[0].querySelector("button.dialog-button.ok").click();
                        console.log("Replaced asset references");
                        await confirm("Bulk replace asset references");
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
        await lockCompendiums(false);

        for (const folder of game.folders.filter(f => f.name === game.world.data.title)) {
            await exportWithCompendiumFolders(folder);
        }
        console.log("Folder structure exported to compendium");
    }

    async function relinkJournalEntries() {
        return new Promise(resolve => {
            ScenePacker.PromptRelinkJournalEntries();
            Hooks.once("renderDialog", (app, html) => {
                setTimeout(async () => {
                    if (app.title === "Relink Journal Entries") {
                        html[0].querySelector("select#module-name").value = `${game.world.id}-module`;
                        html[0].querySelector("input[type='checkbox']#make-changes").checked = true;
                        html[0].querySelector("button.dialog-button.relink").click();
                        Hooks.once("renderDialog", (app, html) => {
                            setTimeout(async () => {
                                if (app.title === "Lock compendiums?") {
                                    html[0].querySelector("button.dialog-button.no").click();
                                    
                                    console.log("Relinked Journal Entries");
									await confirm("Relink Journal Entries");
									resolve();
                                }
                            }, 200);
                        });
                    }
                }, 200);
            });
        });
    }

    async function bulkPackScenes() {
        return new Promise(resolve => {
            spMacros.getName("Bulk pack scenes").execute();
            Hooks.once("renderDialog", (app, html) => {
                setTimeout(async () => {
                    if (app.title === "Pack all Scenes in a folder") {
                        html[0].querySelector("input[type='text'][name='folder']").value = game.world.data.title;
                        html[0].querySelector("button.dialog-button.ok").click();
                        console.log("Bulk packed scenes");
                        await confirm("Bulk pack scenes");
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
                setTimeout(async () => {
                    if (app.title === "Remove #[CF_tempEntity]") {
                        html[0].querySelector("select#module-name").value = `${game.world.id}-module`;
                        html[0].querySelector("button.dialog-button.process").click();
                        console.log("Cleaned up #[CF_tempEntity] entries");
                        await confirm("Clean up #[CF_tempEntity] entries");
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
    async function confirm(text) {
        await Dialog.confirm({
            title: "Confirm Finished",
            content: `<p>Is ${text} properly completed? If not, please wait before continuing.</p>`
        });
    }

    async function exportWithCompendiumFolders(folder, mergeByName = false) {
        return new Promise(resolve => {
            game.CF.FICManager.exportFolderStructureToCompendium(folder);
            Hooks.once("renderDialog", async (app, html) => {
                setTimeout(async () => {
                    if (app.title.startsWith("Export Content: ")) {
                        // html[0].querySelector("div.form-group > select[name='pack']").value = `${game.world.id}-module.something`;
                        if (mergeByName) html[0].querySelector("div.form-group > input[type='checkbox'][name='merge']").checked = true;
                        html[0].querySelector("button.dialog-button.ok").click();
                        console.log(`Exported ${folder.type} folder structure to compendium`);
                        await confirm(`Export ${folder.type} folder structure to compendium`);
                        resolve();
                    }
                }, 200);
            });
            setTimeout(() => {
                if (Object.values(ui.windows).find(w => w.title.startsWith("Export Content: "))) {
                    console.log("Continuing since there was an error exporting this folder to compendium. Most likely because there is no compendium for this Document type.");
                    resolve();
                }
            }, 500);
        });
    }

    async function lockCompendiums(lock = true) {
        for (const pack of game.packs.filter(p => p.metadata.package === `${game.world.id}-module`)) {
            await pack.configure({ locked: lock });
        }
        console.log(`${lock ? "Locked" : "Unlocked"} compendiums`);
    }
})();