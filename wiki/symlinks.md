# Symlinking

## Why?

In order for a world to show up in Foundry Virtual Tabletop it must be in your worlds directory (`Data/worlds`).
The way the worlds exist on the repo is more for long term management, and less for plug-n-play. When you clone the world, all of the actual world files are inside a subdirectory named `world` which isn't what Foundry VTT expects.

If you want to just get working then the 'easiest' is to just grab all the files from the world folder and move them to your foundry directory and me the top level folder to match the expected world name.

The recommended long term solution is to create a symbolic link (symlink) between the two locations so both git and foundry see what they expect to. This way you can easily commit your changes while having the repo available in Foundry VTT at the same time.
The process is slightly different depending on your OS:

## Windows

Open the command prompt as an Administrator and type:

```cmd
mklink /D [location you want files to appear] [where they really are]
```

For example, if your world is called `my-world` you would do:

```cmd
mklink /D "%localappdata%\FoundryVTT\Data\worlds\my-world" "D:\Projects\WorldSmiths\my-world\world"
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
ln -s "/home/Projects/WorldSmiths/my-world/world" "$HOME/foundrydata/Data/worlds/my-world"
```

The first path is where the git repo is checked out. The second path is the default install directory for FoundryVTT worlds, match that to wherever your software is installed.
If you are having a hard time figuring out the name of the world, check the `world.json`.
