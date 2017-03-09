/**
 * Created by richardperdaan on 07-03-17.
 */
if(window.mypa == null || window.mypa == undefined){
    window.mypa = {};
}
if(window.mypa.fn == null || window.mypa.fn == undefined){
    window.mypa.fn = {};
}

(function () {
    var getColumns, appendColumns,appendCards, getUrlParameter,repository;
    window.mypa.load = function () {
        var columns = getColumns();
        repository = getUrlParameter();

        $.each(columns, function(key, value) {
            appendColumn(value);
        });
    };

    getColumns = function () {
        return [
            {
                alias: "todo",
                title: "Todo"
            },
            {
                alias: "in-progress",
                title: "In progress"
            },
            {
                alias: "done",
                title: "Done"
            }
        ];
    };

    appendColumn = function (column) {
        $('.mypa_columns').append('<div class="column"><h2>' + column.title + '</h2><div class="cards" id="label-' + column.alias + '"></div></div>');
        appendCards(column)
    };

    appendCards = function (column) {
        $.ajax({
            url: "https://api.github.com/repos/myparcelnl/" + repository + "/issues?labels=" + column.alias,
            success : function(issues) {
                $.each(issues, function(key, issue) {
                    $('#label-' + column.alias).append('<div class="card"><a href="' + issue.html_url + '" target="_blank" class="card_url"><h3>' + issue.title + '</h3></a></div>');
                });
            }
        });
    };

    getUrlParameter = function () {
        var scripts = document.getElementsByTagName("script");
        for (var i = 0; i < scripts.length; i++) {

            var pa = scripts[i].src.split("?").pop().split("&");

            var repo = {};
            for (var j = 0; j < pa.length; j++) {
                var kv = pa[j].split("=");
                repo[kv[0]] = kv[1];
            }
            //return repo.rep;
            console.log(repo);
            if (repo.rep == "magento1"){

                return repo.rep;
            }
        }
    }

})();

$(document).ready(function() {
    window.mypa.load();
});

