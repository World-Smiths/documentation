# Git

Information pertaining to the installation, configuration, and use of Git with the World Smiths server.

## Installation

Below are links to individual installation walk-throughs for each operating system. These instructions are for how to install the official git commandline utility. Many GUI applications also install git automatically for the user but the results are not always consistent. For this reason we suggest installing the CLI as a baseline and then adding any GUI tools you may want after you've confirmed everything works.

### [Windows](https://git-scm.com/download/win)

There are also a few ways to install Git on Windows. The most official build is available for download on the Git website. Just go [here](https://git-scm.com/download/win) and the download will start automatically.

> Note that this is a project called Git for Windows, which is separate from Git itself; click [here](https://gitforwindows.org) for more information on it.

To get an automated installation you can use the Git Chocolatey package. Note that the Chocolatey package is community maintained.

### [Mac](https://git-scm.com/download/mac)

Most Mac machines will have git installed by default. To determine what version of git you already have try to run git from the terminal.

`$ git --version`

If you don’t have it installed already, it will prompt you to install it.

If you want a more up to date version, you can also install it via a binary installer. A macOS Git installer is maintained and available for download at the [Git website](https://git-scm.com/download/mac).

### [Linux](https://git-scm.com/download/linux)

If you want to install the basic Git tools on Linux via a binary installer, you can generally do so through the package management tool that comes with your distribution. If you’re on Fedora (or any closely-related RPM-based distribution, such as RHEL or CentOS), you can use dnf:

`$ sudo dnf install git-all`

If you’re on a Debian-based distribution, such as Ubuntu, try apt:

`$ sudo apt install git-all`

For more options, there are instructions for installing on several different Unix distributions on the [Git website](https://git-scm.com/download/linux).

## LFS

Git LFS is an extension for git-scm that helps with the management of large files and files that don't handle text based diffs well.  For instructions on how to download and install Git LFS, visit [their page](https://git-lfs.github.com/),

The world repository template includes a prebuilt .gitattributes file which tracks common files that should utilize LFS by default.

### Configure LFS for Your Account

```sh
git lfs install
```

If that doesn't work, try:

```sh
git-lfs install
```

## Resources

### Using Git

Check out this [15 minute video tutorial for beginners](https://www.youtube.com/watch?v=USjZcfj8yxE) (or the [text version](https://www.notion.so/Introduction-to-Git-ac396a0697704709a12b6a0e545db049)). These guides cover installation and basic use.

[A YouTube guide](https://www.youtube.com/watch?v=F2DBSH2VoHQ) for [visual studio code](https://code.visualstudio.com/) users.

[Back to top](#git)
