$(function() {

    var options = {
        on: {
            end: function() {
                if ($("#enable-cooldown").prop("checked"))
                    Cookies.set('DADA ordnungsgemäß durchgeführt', 'true', {
                        expires: 1 / 24 / 60 * 1, //1m
                    })
            }
        },

        phrases: [
            "Kunst erweitert die Welt",
            "Man kann nicht Künstler sein und an die Geschichte glauben",
            "Moral auf die alleinige Schärfung des Sinnes für Maß und Gestalt gewandt.",
            "Verliebtheit in Kreis und Würfel, in scharf schneidende Linien",
            "Stöckchen aus spanischem Rohr",
            "Gorgohaupt maßlosen Schreckens",
            "Poème simultan",
            "Der paralysierende Hintergrund der Dinge",
            "Hinrichtung der posierten Moralität und Fülle, Wort als magisches Komplexbild (Pfingsten), Preisgabe des Satzes dem Wort zuliebe",
            "Die Scheiße, die Tiere, die Tage  (statt Assonanz der Münzen)",
            "Von Energie trunkene Gespenster bohren wir den Dreizack ins ahnungslose Fleisch",
            "Geriesel von Verwünschungen",
            "Gummi und Regen",
            "Unmittelbar schaffen in Lokomotivorganismen",
            "Absolut in Reinheit geordnetes Chaos",
            "Reiter des Glucksens ersetzen wir die Tränen durch Sirenen",
            "Witwer der Gifttraurigkeit",
            "Die durch die Sinne eingeengte Logik ist eine gefährliche Krankheit, die Orgel verteilt Nelken für den lieben Gott",
            "Im großen Munde voll Honig und voller Exkremente schwimmen",
            "Gegen: ein verständliches Werk ist Journalistenprodukt<br>" +
            "(= Futter eines Mantels zu öffentlichem Nutzen; " +
            "Lampen, die die Brutalität bedecken, Pisse," +
            "welkes, abgeschmacktes Fleisch, das sich mit Hilfe" +
            "typographischer Mikroben vervielfältigt)" +
            "= Zustand des Wahnsinns einer Welt in den Händen von Banditen, die einander zerreißen und Jahrhunderte zerstören ohne Zweck und Absicht",
            "Jeder Mensch schreie!!",
            "Moralität ist eine Einimpfung von Schokolade in die Adern aller Menschen",
            "Vom Trust der Gedankenkrämer und Universitätswucherer"
        ],
        icons: [
            "http://i.imgur.com/dbzQXLO.jpg",
            "http://i.imgur.com/9mCbXhc.jpg",
            "http://i.imgur.com/rly2xZT.jpg",
            "http://i.imgur.com/B1X4rWW.png"
        ],
        sounds: {
            random: [
                "./demo-media/Windows/xp error.mp3",
                "./demo-media/Windows/os2warp3 bells.mp3",
                "./demo-media/Windows/os2warp3 drumroll.mp3",
                "./demo-media/Windows/os2warp3 twip.mp3",
                "./demo-media/Windows/winme chord.mp3",
                "./demo-media/Windows/winnt 40 chord.mp3",
                "./demo-media/Windows/winnt40 ding.mp3",
                "./demo-media/Windows/xp batterycritical.mp3",
                "./demo-media/Windows/xp notify.mp3"
            ],
            special: {
                start: [
                    "./demo-media/Windows/xp error.mp3"
                ],
                close: [
                    "./demo-media/Windows/os2warp4  dsk_clsw.mp3",
                    // "./demo-media/Windows/os2warp4 dsk_drag.mp3",
                    // "./demo-media/Windows/os2warp4 dsk_opnw.mp3"
                ]
            }
        },
        words: {
            cancel: "Abbrechen"
        }
    };

    $(".dada-button").on("click", function() {
        $(this).parent(".dada-button-container").addClass("is-clicked");
        $("#enable-button").attr("disabled", "disabled");
        doDada();
    });

    $(".countdown").on("click", "#js-clear-cooldown", function() {
        Cookies.remove("DADA ordnungsgemäß durchgeführt")
        window.location.reload()
    });

    if (Cookies.get('DADA ordnungsgemäß durchgeführt')) {
        $(".countdown").html(
            'DADA is on cooldown. ' +
            '<a href="#" id="js-clear-cooldown">(clear the cooldown)</a>'
        );
        return;
    }

    var countdown,
        $countdownTime = $(".countdown time"),

        doCountdown = function() {
            if ($(this).prop("checked")) {
                clearInterval(countdown);
                $countdownTime.text("5s…");
            } else {
                var i = 5;
                countdown = setInterval(function() {
                    $countdownTime.text((parseInt($countdownTime.text()) - 1) + "s…");
                    i--;
                    if (i <= 0) {
                        doDada();
                        clearInterval(countdown);
                    }
                }, 1000)
            }
        };

    $("#enable-button").on("change", doCountdown);
    doCountdown();

    var doDada = function() {
        $("#enable-button").attr("disabled", "disabled");
        $.DADA(options);
    }
})
