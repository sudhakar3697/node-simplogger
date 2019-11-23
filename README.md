# logger

An extremely simple logger for Node.js

Require the module

```
const { Logger } = require('logger');
```
Usage (Logging to console):

Create an instance of the Logger

```
const logger = new Logger();
```

Access the functions.

```
logger.error("File not found", "Sample.txt");
logger.warn("You are using older version of the API");
logger.success("User has been verified successfully");
logger.info("Server is running on port 8000");
logger.debug("I am here :P");
```

Configuring the logger (Logging to a file, specific loglevels, No console)

```
const logger = new Logger({
    console: 'file',
    file: './test.log',
    append: true,
    label: 'Test:',
    levels: ['ERROR', 'WARN']
});
```

Configuring the logger (Logging to both file & console, specific loglevels, ISO timestamp)

```
const logger = new Logger({
    console: 'both',
    file: './test.log',
    append: true,
    timestamp: 'iso',
    label: 'Test:',
    levels: ['ERROR', 'WARN', 'INFO', 'DEBUG']
});
```

Configurations for the logger

<table>
   <tr>
      <th>attribute</th>
      <th>type</th>
      <th>values</th>
      <th>default</th>
      <th>remarks</th>
   </tr>
   <tr>
      <td>console</td>
      <td>String</td>
      <td>'console','file','both'</td>
      <td>'console'</td>
      <td>Decides whether to log to a file or console or both</td>
   </tr>
   <tr>
      <td>file</td>
      <td>String</td>
      <td>/path/to/the/logfile</td>
      <td></td>
      <td>-</td>
   </tr>
   <tr>
      <td>append</td>
      <td>Boolean</td>
      <td>true,false</td>
      <td>false</td>
      <td>-</td>
   </tr>
   <tr>
      <td>label</td>
      <td>String</td>
      <td>Any</td>
      <td>' '</td>
      <td>-</td>
   </tr>
   <tr>
      <td>timestamp</td>
      <td>String</td>
      <td>'clf','iso','locale'</td>
      <td>'clf'</td>
      <td>-</td>
   </tr>
   <tr>
      <td>levels</td>
      <td>Array</td>
      <td>['ERROR', 'WARN', 'SUCCESS', 'INFO', 'DEBUG']</td>
      <td>['ERROR', 'WARN', 'SUCCESS', 'INFO', 'DEBUG']</td>
      <td>Configurable logging levels</td>
   </tr>
</table>

A screenshot!

![Screenshot](https://i.imgur.com/NlLiW6n.png)
