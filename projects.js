if(window.mypa == null || window.mypa == undefined){
    window.mypa = {};
}
if(window.mypa.fn == null || window.mypa.fn == undefined){
    window.mypa.fn = {};
}

(function () {
    var getColumns, appendColumns,appendCards, getUrlParameter;
    window.mypa.load = function () {
        var columns = getColumns();
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
            url: "https://api.github.com/repos/myparcelnl/magento1/issues?labels=" + column.alias,
            success : function(issues) {
                $.each(issues, function(key, issue) {
                    $('#label-' + column.alias).append('<div class="card"><a href="' + issue.html_url + '" target="_blank" class="card_url"><h3>' + issue.title + '</h3></a></div>');
                });
            }
        });
    };
})();

$(document).ready(function() {
    if ($(".mypa_columns")[0]){
        window.mypa.load();
    }
});