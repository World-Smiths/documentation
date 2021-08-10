# Lighting

> Inspired by [the official Foundry Content Creation Guide](https://foundryvtt.com/article/content-creation-guide)

Unless it is necessary to account for specific system-related light mechanics for your content, lighting should favour the visual appearance of lighting in a map over trying to adhere to strict mechanical rules on how far light spreads based on the game system.

Light sources should always be given a color.

There are some suggested colors below that can provide some rich overtones, but they are only guidelines, always tweak the light color and intensity to achieve the best visual look for the scene.

## Color Palette

These example values all assume a default 0.7 color intensity, adjust as required for your scene:

- Candles, Torches - `#a2642a`
- Fire (orange)- `#7f4a14`
- Fire (yellow)- `#a2642a`
- Daylight (warm) - `#b79471`
- Daylight (cold) - `#94a6bc`
- Full Moonlight (warm) - `#ab9c8c`
- Full Moonlight (cold) - `#647080`
- Magical Fire / Neon Red - `#800000`
- Magical Fire (Blue) / Neon Blue - `#000080`
- Magical Fire (Green) / Neon Green - `#008000`
- Magical Fire (Purple) / Black Light (Purple) - `#540080`
- Reflective Gold - `#f0be35`
- Reflective Water - `#6dcab4`
- Magma - `#c27a29`

## Placement

Try to only place light sources where they are depicted on the map as to not create "disembodied lights".

For light sources that are made up of many individual lights (such as collections of candles, or a candelabra) it is best to create a single light to represent the total light produced, instead of lighting every single candle. In some cases where there are multiple light sources of varied colours in close proximity, consider using a single Chroma-animated light source instead of individually placed lights.

![Lighting Example](https://foundryvtt.s3.us-west-2.amazonaws.com/website-media-dev/user_671/screen/lighting-example-2020-12-16.jpg)

Left: A three-candle candelabra represented by a single light entity.  
Right: A two-candle candelabra represented by two overlapping lights.
