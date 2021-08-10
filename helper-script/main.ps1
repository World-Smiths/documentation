#!/bin/pwsh

# Check if Git is installed
try
{
    git | Out-Null
}
catch [System.Management.Automation.CommandNotFoundException]
{
    "Git is not installed. Please install it before running this script."
    Start-Process https://git-scm.com/download/
    exit
}

# Set world_directory
Get-content Env:world_directory
if ($?) {
    $world_directory = Get-content Env:world_directory
} else {
    $world_directory = Read-Host "What is the root of your world directory (ie. where do you keep your projects?)"
    $env:world_directory = $world_directory
}

# Ask user what to do
function Open-Menu 
{
    do
    {
        Write-Host "1. Update my files `n2. Send my work `n3. Upload a new world `n4. Quit"
        $menuresponse = Read-Host [Enter Selection]
        Switch ($menuresponse) {
            "1" {Update-Files}
            "2" {Send-Files}
            "3" {Publish-Files}
            "4" {Exit-PSSession}
        }
    }
    until (1..4 -contains $menuresponse) 
}

function Update-Files {
    Write-Output "Updating..."
    $name = Read-Host "Enter the exact name of the folder that contains the world you wish to update: "
    Set-Location $world_directory
    Set-Location $name
    git pull
    if ($?) {
        Write-Output "Success! Your files have been updated"
    } else {
        Write-Output "That didn't work. Are you sure that you entered the correct name?"
        Write-Output "Returning to main menu..."
        Open-Menu
    }
}

function Send-Files {
    $name = Read-Host "Enter the exact name of the folder that contains the world you wish to send: "
    $name = Read-Host "What did you change? This message will be shown to everyone. "
    Set-Location $world_directory

    Set-Location $name
    if ($?) {
        Write-Output "Succefully located your files"
    } else {
        Write-Output "That didn't work. The directory doesn't seem to exist. Are you sure that you entered the correct name?"
        Write-Output "Returning to main menu..."
        Open-Menu
    }

    git add .
    if ($?) {
        Write-Output "Your changes have been staged"
    } else {
        Write-Output "That didn't work. This doesn't seem to be a git directory. Have you cloned it from the GitHub? Are you sure that you entered the correct name?"
        Write-Output "Returning to main menu..."
        Open-Menu
    }

    git commit -m "$message"
    if ($?) {
        Write-Output "Your changes have been commited"
    } else {
        Write-Output "That didn't work, sorry."
        Write-Output "Returning to main menu..."
        Open-Menu
    }

    git push
    if ($?) {
        Write-Output "Success! Your changes have been uploaded!"
    } else {
        Write-Output "That didn't work, sorry."
        Write-Output "Returning to main menu..."
        Open-Menu
    }
}

function Publish-Files {
    Write-Output "Uploading..."
    $link = Read-Host "Enter clone link: "
    $name = Read-Host "Enter repo name: "
    $path = Read-Host "Enter the path of the root directory of the world files you want to upload: "
    $destination = Get-Location
    Set-Location "$world_directory"
    git clone "$link"
    Set-Location "$name"
    git checkout main
    Set-Location world
    Move-Item -Path "$path/*" -Destination $destination -Force
    Write-Output "Ready to commit"
    PAUSE
    git add .
    git commit -m "Initial Upload"
    Write-Output "Ready to push"
    PAUSE
    git push
}