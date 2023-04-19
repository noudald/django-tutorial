# Vanilla JS front-end

Because who needs a framework?

## Folder structure idea

This idea is to split libraries from business logic.

```
app
 |-- login
 |     |-- login.html
 |     |-- login.js
 |     |-- login.css
 |
 |-- helloworld
 |     |-- helloworld.html
 |     |-- helloworld.js
 |     |-- helloworld.css
 |
 |-- settings
 |     |-- global.js
 |     |-- pages.js
 |     |-- ...
 |
 |-- main.js

libs
 |-- router.js
 |-- navbar.js
 |-- w2ui
      |-- w2ui.min.js
      |-- w2ui.min.css

index.html
```
