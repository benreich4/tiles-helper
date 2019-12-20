    $("#tls-tileset .tls-tile .tls-tile__frame").toArray().map(function(i, tile){
        return $(tile).select(".tls-tile__layer use").toArray().map(function(i, layer) {
            return $(layer).attr("xlink:href");
        });
    });