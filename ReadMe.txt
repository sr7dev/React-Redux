Install NodeJS:

Node V8 ( Please use the Homebrew method):

https://nodejs.org/en/download/package-manager/#macos

Install GIT:

https://gist.github.com/derhuerst/1b15ff4652a867391f03#file-mac-md

Install Yarn:

https://yarnpkg.com/lang/en/docs/install/

For Mysql:
https://gist.github.com/nrollr/3f57fc15ded7dddddcc4e82fe137b58e

After installing MySQL:

Login to mySQL:

mysql -u root -p

Create database:

create database ‘databasename’;

Use database:

use ‘database name’;

After you extract the source code you need to run the following commands:

yarn install

You need to create(or rename config-example.js) to config.js file under (Folder/src)

Then go to db folder (src/db) and Import the DB dump file:

mysql -u username -p database_name < db_dump.sql
Then run the following command to start the project

Folder: yarn start