# Namster

# Running/Developing the app

Within ~/Namster/src/Namster, run:

```
dotnet restore
dotnet build
dotnet run
```

This requires that [.NET Core be installed](#dotnet-core-installation).


# Updating dependencies

Occasionally (and definitely before first run) you'll need to update the dependencies and download new libraries.  Run these commands in ~/Namster/src/Namster:

    npm install
    bower install
    gulp build


# Troubleshooting

There is a bug with the Mac mono runtime that may cause an error running the web server. If you get the error: `IOException: kqueue() FileSystemWatcher has reached the maximum nunmber of files to watch.` then you'll need to add the following line to the top of your ~/.bash_profile file and restart your terminal.

    export MONO_MANAGED_WATCHER=false

# Installing .NET Core on a Mac <a id="dotnet-core-installation"></a>


Follow the instructions at [Install for Mac OS X 10.11](https://www.microsoft.com/net/core#macos).

OR

I like to install via command line:

Install .Net Core

```brew cask install dotnet```

And you're good to go!
