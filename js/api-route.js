function shortener(url) {
    $.ajax({
        type: "GET",
        url: 'https://api.kawalcorona.com/indonesia',
        dataType: 'jsonp',
        cors: true ,
        contentType:'application/json',
        success: function(res){
                console.log("sadsad")
                console.log(res)
        }
      });
    $.ajax({
        type: "POST",
        url: 'https://cleanuri.com/api/v1/shorten',
        dataType: 'jsonp',
        cors: true ,
        contentType:'application/json',
        data: {
            'url': url
        },
        success: function(res){
                console.log("sadsad")
                console.log(res)
        }
      });
}