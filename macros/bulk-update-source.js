Dialog.prompt({
    title: "Bulk Update Source",
    content: '<p>Enter a new value to use for Actor and Item source:</p><input type="text" name="source" style="margin: 0.5em 0">',
    label: "Update All",
    callback: html => {
        const updates = [...game.items, ...game.actors].filter(a => !a.getFlag('core', 'sourceId')?.includes('Compendium.dnd5e.monsters')).map(a => ({
            _id: a.id,
            "data.details.source": html.querySelector("input").value
        }));
        Actor.updateDocuments(updates);
    },
    options: { jQuery: false }
});