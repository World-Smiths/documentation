# Packing a world

Here are steps involved in packing a world with Scene Packer:

1. Remove any un-needed `packs` entries from the `module.json` file and delete the corresponding .db files (`packs/` folder).
2. Put all documents in folders.
3. Run "Bulk Replace Asset References" macro from Scene Packer.
4. Regenerate thumbnails
5. Export to folders by using the Compendium Folders "Export Folder Structure" option.
6. Run the "Relink Compendium Journal Entries" macro from Scene Packer.
7. Pack all scenes using the "Bulk Pack Scenes" macro from Scene Packer.
8. Export Folder Structure for scenes with "Merge By Name" option.
9. Re-run the "Relink Compendium Journal Entries" macro from Scene Packer.
10. Run "Cleanup #[CF_tempEntity]" macro from Scene Packer.
11. Asset report on module

Please see Blair's amazing [Scene Packer Tutorial](https://www.youtube.com/watch?v=cG6qtoZPczI) for a video version of this.

I have also created [a macro](../macros/auto-world-pack.js) which attempts to automate all of the steps above. If you use it, please make sure that you backup first and that your setup corresponds with the assumptions described at the top of the file. A good way of making sure of this is to use our [Template World](https://github.com/world-smiths/template-world).
