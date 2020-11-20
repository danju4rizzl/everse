# A daily Companion Browser Extension

## ⚙️ Instalation:

To install from Chrome Store download the extension [here](https://danju4rizzl.github.io/everse/).

[Download](https://github.com/danju4rizzl/everse/archive/master.zip) or Clone the repo:

With Github-CLI:

    gh repo clone danju4rizzl/everse

The extension is bundled with parcel. You can run NPM or Yarn(recommended) commands during development.

Build the extension locally:

    yarn build-prod

or

    npm build-prod

Extract the zip file created after running the build-prod command

You need to install the extension to install locally in your browser ie

- Chrome,
- Vivaldi.
- Firefox,
- More browser coming soon.

> Browser extension local installation processes may be different

![enter image description here](https://res.cloudinary.com/deejay-dev/image/upload/v1605827152/Everse%20Extension%20/google-chrome-1682953_yub8jt.png)**Chrome installation:**
Open up the Google Chrome Browsers and go to: **[chrome://extensions/](chrome://extensions/)** , then switch/toggle on **Developer mode** in your google chrome. Then click on the **Load Unpacked** button at the top and select the extracted `dist `folder.

![enter image description here](https://res.cloudinary.com/deejay-dev/image/upload/v1605827303/Everse%20Extension%20/vivaldi_1_lrr5vb.png) **Vivaldi installation:**
Open up the Vivaldi Browser and go to **[vivaldi://extensions/](vivaldi://extensions/)** ,then switch/toggle on **Developer mode** in your google chrome. Then click on the **Load Unpacked** button at the top and select the extracted `dist `folder.

Open vivaldi `Settings > Tabs` in the "TAB" section , under "New Tab Page", select "Start Page" and check "Controlled by Extension" if it's not already checked.

![enter image description here](https://res.cloudinary.com/deejay-dev/image/upload/v1605827152/Everse%20Extension%20/firefox_adoc4m.png) **FireFox installation:**
Open up the FireFox Browser and go to **[about:debugging#/runtime/this-firefox](about:debugging#/runtime/this-firefox)** , click on the **Load Temporary Add-on** button, then locate and enter the extracted `dist `folder, open it and select the **manifest.json** file to install the extension.

## 👨🏾‍💻 Development:

In the terminal run the following command to install all the dependencies:

    yarn install

or

    npm install

After installing the dependencies run the following command to start development

    yarn start

or

    npm start

> This will open the browser and starts a development server with
> hot-reload.

## Happy Coding 👍🏾
