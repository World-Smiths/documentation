# Symlinking

## Why?

In order for a world to show up in Foundry Virtual Tabletop it must be in your worlds directory (`Data/worlds`).

If you want to build the world outside of Foundry's world directory, you need to create a symbolic link (symlink) between the two locations so both git and foundry see what they expect to.

This is completely optional and it is likely easier to simply clone the repository directly into your `Data/worlds` directory.

You can also apply the same concepts to module or system development, substituting `worlds` for `modules` or `systems` respectively.

The process is slightly different depending on your OS:

## Windows

Open the command prompt as an Administrator and type:

```cmd
mklink /D [location you want files to appear] [where they really are]
```

For example, if your world is called `my-world` you would do:

```cmd
mklink /D "%localappdata%\FoundryVTT\Data\worlds\my-world" "D:\Projects\WorldSmiths\my-world"
```

The first path is the default install directory for FoundryVTT worlds, match that to wherever your software is installed. The second path is where the git repo is checked out.
If you are having a hard time figuring out the name of the world, check the `world.json`.

## Linux & Mac

Open a terminal and type:

```sh
ln -s [where they really are] [location you want files to appear]
```

For example, if your world is called `my-world` you would do:

```sh
ln -s "/home/Projects/WorldSmiths/my-world" "$HOME/foundrydata/Data/worlds/my-world"
```

The first path is where the git repo is checked out. The second path is the default install directory for FoundryVTT worlds, match that to wherever your software is installed.
If you are having a hard time figuring out the name of the world, check the `world.json`.
