# JOSM Scripting Plugin

The JOSM scripting plugin executes scripts in the [Open Street Map](http://www.openstreetmap.org) editor
[JOSM](http://josm.openstreetmap.de/). 

Scripts can be defined in any scripting language for which a 
[JSR-223](http://www.jcp.org/aboutJava/communityprocess/pr/jsr223/) compatible script engine is available, in 
particular in 
* [JavaScript](http://en.wikipedia.org/wiki/JavaScript)
* [Groovy](http://groovy.codehaus.org/)
* [Ruby](http://www.ruby-lang.org/en/)
* [Python](http://www.python.org/)

## For JOSM users
The scripting plugin can be installed and kept up to date using JOSMs plugin manager:

1. Select Preferences -> Plugins
2. Search for the plugin "Scripting" and install it 

## For developers
The scripting plugin includes an embedded scripting engine for JavaScript based on 
[Mozilla Rhino](http://www.mozilla.org/rhino/).
It provides a custom JavaScript API to write scripts for the JOSM editor,refer to 
the [API documentation](http://gubaer.github.com/josm-scripting-plugin/).

Furthermore, it can 
* load and execute [plugins written in Python](http://gubaer.github.com/josm-scripting-plugin/doc/python.html).
* execute scripts written in Ruby, Groovy, and other languages, refer to 
[these examples](https://github.com/Gubaer/josm-scripting-plugin/tree/master/scripts). 

If you want to contribute to the scripting plugin itself, please fork this repository and
submit your pull requests.

## How to build

Add a new entry to [releases.conf](releases.conf) then run:

```bash
% git checkout deploy          # switch to deploy branch
% git merge master             # make sure the latest changes are merged to 'deploy'
% git push origin deploy       # push the 'deploy' branch

% ./gradlew clean build        # build the plugin
% ./gradlew deploy             # deploys the plugin jar to github,
                               # where it is picked up by the JOSM
                               # plugin installer
```

## How to test
There are two suites of unit tests
1. a suite of unit tests implemented in java and groovy which can be executed with a JUnit 4 test runner
   
   How to run:
   ```bash
   $ ./gradlew test
   ```
2. a suite of unit tests implemented in JavaScript which provide test cases for the JavaScript API.

   How to run:
   - Add the path `$JOSM_SCRIPTING_PLUGIN_ROOT/test/script-api` to the list of module repositories
        - launch JOSM
        - Scripting -> Configure ...
        - Select Tab 'Embedded Rhino Engine'
        - Add the module repository for unit tests
   - Launch JOSM, open the scripting console and enter
       ```JavaScript
       require("suite").run();
       ```
   - Click on Run. Results are logged to the console.
    

## Build status

[![Build Status](https://travis-ci.org/Gubaer/josm-scripting-plugin.svg?branch=master)](https://travis-ci.org/Gubaer/josm-scripting-plugin.svg?branch=master)

## Credits
The JOSM scripting plugin uses: 

* jsyntaxpane by Ayman Al-Sairafi
* [Rhino](http://www.mozilla.org/rhino/) scripting engine by Mozilla Foundation

## License
Published under GPL Version 3 and higher. See included LICENSE file.
