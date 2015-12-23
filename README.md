# Namster

# Running/Developing the app

You need to run these two commands at the same time, so open up to terminal windows and run

    dnx web
    gulp watch

# Updating dependencies

Occasionally (and definitely before first run) you'll need to update the dependencies and download new libraries.  Run these commands:

    dnu restore
    npm install
    bower install

# Troubleshooting

There is a bug with the Mac mono runtime that may cause an error running the web server. If you get the error: `IOException: kqueue() FileSystemWatcher has reached the maximum nunmber of files to watch.` then you'll need to add the following line to the top of your ~/.bash_profile file and restart your terminal.

    export MONO_MANAGED_WATCHER=false

# Installing the ASPNET5 runtime on a Mac

Follow the instructions at [Installing ASP.NET 5 On Mac OS X](http://docs.asp.net/en/latest/getting-started/installing-on-mac.html
).  You'll need to install the mono runtime which you can do by following the "Install ASP.NET 5 with Visual Studio Code" instructions.

OR

I like to install via command line, which requires a few steps:

Install DNVM

    curl -sSL https://raw.githubusercontent.com/aspnet/Home/dev/dnvminstall.sh | DNX_BRANCH=dev sh && source ~/.dnx/dnvm/dnvm.sh

Install mono

    brew install mono

Install dnx for mono

    dnvm upgrade -r mono

And you're good to go!
