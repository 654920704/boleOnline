var Crawler = require('crawler');

var url = require('url');

var fs = require('fs');

// fs.writeFileSync('./bole.json','');

var arr = [];
var c = new Crawler({
    maxConnections: 10,
    callback: function (error, result, $) {

        // var strData = fs.readFileSync('./bole.json');
        // if(strData!=''){
        //     arr = JSON.parse(strData);
        // }

        $('.res-item').each(function (index, item) {
            var obj = {};
            var imgUrl = $($(item).find('img')[0]).attr('src');
            var title = $($(item).find('h3')[0]).text();
            var detail = $($(item).find('p')[0]).text();
            var authorName = $($(item).find('a')[1]).text();
            obj.title = title;
            obj.authorName = authorName;
            obj.imgUrl = imgUrl;

            obj.detail = detail;

            arr.push(obj);
        })
        console.log(arr.length);
        fs.writeFileSync('./bole.json', JSON.stringify(arr));


    }
})
var urls = [];

for (var i = 1; i < 20; i++) {
    if (i == 1) {
        urls.push('http://hao.jobbole.com/latest/');
    } else {
        urls.push('http://hao.jobbole.com/latest/page/' + i + '/');
    }
}
c.queue(urls);