/* Read a query parameter from the current URL. */
function getUrlParam(name) {
    var params = new URLSearchParams(window.location.search);
    return params.get(name);
}

$(function () {
    var $kw = $("#kw"),
        $searchSubmit = $("#search-submit"),
        $urlOutput = $("#url-output"),
        $tips = $("#tips"),
        $stop = $("#stop"),
        $arrow = $("#arrow");

    var stepTimeout, typeInterval;

    /* Read and decode the query string. The query is Base64 encoded so that
       recipients of the link cannot read the answer directly from the URL. */
    var query = getUrlParam("q");
    if (!!query) {
        try {
            query = Base64.decode(query);
        } catch (e) {
            console.log(e);
        }
    }

    /* If a query is present, start the guided Google tutorial */
    if (!!query) {
        $tips.html("Let me show you how it's done.");
        $stop.fadeIn();

        stepTimeout = setTimeout(function () {
            $tips.html("1. First, click on the search box.");

            $arrow
                .removeClass("active")
                .show()
                .animate(
                    {
                        left: $kw.offset().left + 20 + "px",
                        top: $kw.offset().top + $kw.outerHeight() / 2 + "px",
                    },
                    2000,
                    function () {
                        $tips.html("2. Type what you want to find.");
                        $arrow.addClass("active");

                        stepTimeout = setTimeout(function () {
                            $arrow.fadeOut();

                            var i = 0;
                            typeInterval = setInterval(function () {
                                $kw.val(query.substr(0, i));
                                if (++i > query.length) {
                                    clearInterval(typeInterval);
                                    $tips.html("3. Click the \"Google Search\" button.");

                                    $arrow
                                        .removeClass("active")
                                        .fadeIn()
                                        .animate(
                                            {
                                                left:
                                                    $searchSubmit.offset().left +
                                                    $searchSubmit.width() / 2 + "px",
                                                top:
                                                    $searchSubmit.offset().top +
                                                    $searchSubmit.height() / 2 + "px",
                                            },
                                            1000,
                                            function () {
                                                $tips.html("<strong>See? Wasn't that easy?</strong>");
                                                $arrow.addClass("active");

                                                stepTimeout = setTimeout(function () {
                                                    window.location =
                                                        "https://www.google.com/search?q=" +
                                                        encodeURIComponent(query);
                                                }, 1000);
                                            }
                                        );
                                }
                            }, 200);
                        }, 500);
                    }
                );
        }, 1000);
    }

    /* "Stop" button - cancel the tutorial */
    $stop.click(function () {
        clearTimeout(stepTimeout);
        clearInterval(typeInterval);
        $stop.hide();
        $arrow.stop().hide();
        $kw.val(query);
        query = false;
        $tips.html("Type a question, then click \"Google Search\"!");
    });

    /* Form submit - generate a shareable Let-Me-Google-That-For-You style link */
    $("#search-form").submit(function () {
        if (!!query) return false;

        var question = $.trim($kw.val());
        if (!question) {
            $tips.html('<span style="color: red">Please type a question first!</span>');
            $kw.val("");
        } else {
            $tips.html("Copy the link below and send it to the person who should have Googled it themselves.");

            $("#output").fadeIn();
            $urlOutput
                .val(
                    window.location.origin +
                    window.location.pathname +
                    "?q=" + Base64.encode(question)
                )
                .focus()
                .select();
        }
        return false;
    });

    /* Copy-to-clipboard handling */
    var clipboard = new ClipboardJS("[data-clipboard-target]");
    clipboard.on("success", function (e) {
        $tips.html('<span style="color: #4caf50">Copied! Now send the link.</span>');
    });
    clipboard.on("error", function (e) {
        $tips.html('<span style="color: red">Copy failed. Please copy the link manually.</span>');
    });

    /* Preview the generated link in a new tab */
    $("#preview").click(function () {
        var link = $urlOutput.val();
        if (!!link) {
            window.open(link);
        }
    });
});
