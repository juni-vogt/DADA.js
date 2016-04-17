# DADA.js
Bring DADA to your website!

[![Demo](https://raw.githubusercontent.com/matthias-vogt/DADA.js/gh-pages/demo-media/img/demo.gif)](//matthias-vogt.github.io/DADA.js)

Demo: [matthias-vogt.github.io/DADA.js](//matthias-vogt.github.io/DADA.js)

This is a [`jQuery`](//jquery.com) plugin to plant something that looks like a Virus on your website. When activated, lots of `Windows 98` dialogs pop up with configurable random phrases, icons and sounds. The dialogs are spinning, pulsing, rotating, and even move away from your cursor if you try to close them.

## What even
> **Dada** ([/ˈdɑːdɑː/](https://en.wikipedia.org/wiki/Help:IPA_for_English)) or **Dadaism** was an [art movement](https://en.wikipedia.org/wiki/Art_movement) of the European [avant-garde](https://en.wikipedia.org/wiki/Avant-garde) in the early 20th century. [...]
> The beginnings of Dada correspond to the outbreak of [World War I](https://en.wikipedia.org/wiki/World_War_I). For many participants, the movement was a protest against the [bourgeois](https://en.wikipedia.org/wiki/Bourgeoisie) [nationalist](https://en.wikipedia.org/wiki/Nationalism) and [colonialist](https://en.wikipedia.org/wiki/Colonialism) interests, which many Dadaists believed were the root cause of the war, and against the cultural and intellectual conformity—in art and more broadly in society—that corresponded to the war.
> Many Dadaists believed that the 'reason' and 'logic' of bourgeois [capitalist](https://en.wikipedia.org/wiki/Capitalism) society had led people into war. They expressed their rejection of that ideology in artistic expression that appeared to reject logic and embrace [chaos](https://en.wikipedia.org/wiki/Randomness) and [irrationality](https://en.wikipedia.org/wiki/Irrationality). For example, [George Grosz](https://en.wikipedia.org/wiki/George_Grosz) later recalled that his Dadaist art was intended as a protest "against this world of mutual destruction."

 — [Wikipedia](https://en.wikipedia.org/wiki/Dada)

In this spirit and to celebrate DADA's 100th anniversary, this plugin is supposed to bring confusion, havoc and fun to the web.
**It can also be used to announce DADA performances** ;)

## Usage
`DADA.js` depends on [jQuery](https://jquery.com/), so make sure you have that loaded. You can use it like this:
```javascript
$.DADA(options);
```

### Install

```html
<link href="stylesheet" type="text/css" href="DADA.min.css">
<link href="stylesheet" type="text/css" href="DADA-button.min.css"> <!-- optional -->
<script src="jquery.min.js"></script>
<script src="DADA.min.js"></script>
```

The plugin comes with `DADA-button.scss` which helps you style a cool looking button users can click to initiate the DADA. Kinda ruins the whole point of surprise and confusion but whatever.
```html
<div class="dada-button-container">
    <button class="dada-button" title="DADA expressly dissociates itself from the contents of this website.">DADA!</button>
    <span>Please click the button now!</span>
</div>
```
For better loading performance, I'd recommend loading the script as non-critical content (by putting the `<script>` and `<style>` tags at the end of the body tag). Please also consider concatenating it with your other dependencies.

Install and update easily using [npm](http://npmjs.com):
```sh
npm install dada --save
```

### Options
```javascript
{

    // content

    phrases: [
        // possible random phrases for dialogs
        // expects array of strings
        "DADA is DADA is DADA"
    ],
    icons: [
        // possible random icons for dialogs
        // expects array of URIs as strings
    ],
    sounds: {
        random: [
            // possible random sounds for dialogs
            // expects array of URIs as strings
        ],
        special: {
            // possible random sounds for special events of dialogs

            close: [
                // possible random sounds for when dialogs close
            ],
            start: [
                // possible random sounds for the first modal
            ]
        }
    },

    // callbacks

    on: {
        start: function() {
            // when the first modal opens
        },
        end: function() {
            // when DADA ends
        },
        ok: function() {
            // when any OK button is clicked
        },
        cancel: function() {
            // when any Cancel button is clicked
        }
    },

    // timing

    time: 20000, // total time DADA should run
    baseTimePerDialog: 1500, // time before a new dialog pops up (+- a little randomization)
    waitTimeAfterFirstDialog: 8000, // time to wait after the first pop up (suspense)

    // window markup

    windowTemplate: '' + // template for windows' markups
        '<div class="window">' +
        '    <div class="bar">' +
        '        {{title}}' +
        '        <button class="close js-cancel">×</button>' +
        '    </div>' +
        '    <div class="content">' +
        '        <img class="icon" alt="DADA Icon">' +
        '        <div class="text">' +
        '            <br>' +
        '            <button class="js-ok">{{ok}}</button>' +
        '            <button class="js-cancel">{{cancel}}</button>' +
        '        </div>' +
        '    </div>' +
        '</div>',
    words: { // context for windows' templates
        title: "DADA-Error!!1",
        ok: "OK",
        cancel: "Cancel"
    },

}
```


### Destroying
DADA cannot be stopped.

## Browser support
This uses CSS3 transitions, animations and filters, so full [browser support](http://caniuse.com/#feat=css-transitions) is ie10+. Everything >ie8 should degrade just fine, though.

Yes, it's responsive&#42;.<br>&#42;kinda

## Contributing
You are very welcome to contribute! Please send pull requests and issues.

## Feature requests
Feel free to post issues to ask for features.

## TODO
- [ ] support CommonJS and AMD
- [ ] Clean up gulpfile

## License
WTFPL, no warranty. Attribution would be appreciated.