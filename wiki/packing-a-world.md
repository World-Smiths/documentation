# Packing a world into a module with Scene Packer

Here are steps involved in packing a world with Scene Packer:

1. Remove any un-needed `packs` entries from the `module.json` file and delete the corresponding .db files (`packs/` folder).
2. Put all documents in folders.
3. Run "Bulk Replace Asset References" macro from Scene Packer.
   - Regenerate thumbnails
4. Export to folders by using the Compendium Folders "Export Folder Structure" option.
5. Run the "Relink Compendium Journal Entries" macro from Scene Packer.
6. Pack all scenes using the "Bulk Pack Scenes" macro from Scene Packer.
7. Export Folder Structure for scenes with "Merge By Name" option.
8. Run "Cleanup #[CF_tempEntity]" macro from Scene Packer.
9. Asset report on module

Please see Blair's amazing [Scene Packer Tutorial](https://www.youtube.com/watch?v=cG6qtoZPczI) for a video version of this.

I have also created [a macro](../macros/auto-world-pack.js) which attempts to automate all of the steps above. If you use it, please make sure that you backup first and that your setup corresponds with the assumptions described at the top of the file. A good way of making sure of this is to use our [Template World](https://github.com/world-smiths/template-world).
