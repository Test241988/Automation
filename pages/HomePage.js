const {Selector} = require('testcafe');

function select(selector){
    return Selector(selector).with({boundTestRun:testController})

}
exports.HomePage = {
        SearchBox: function(){
            return select('input[name="search"]');
        },
        SearchButton: function(){
            return select('button>i[class*="search"]');
        },
        ResultGrid: function(){
            return select('[class*="product-grid"]');
        },
        SearchResults: function(string){
            var value = new RegExp(string,"i");
            return select('h4>a').withText(value);
        },
        Pagination:function(){
            return select('.pagination');
        },
        PageButton:function(string){
            return select('.pagination>li').child().withText(string);
        },
        PaginationText:function(){
            return select('[class*="text-right"]').innerText;
        },
        NoProductFoundText:function(string){
            return select('p').withText(string)
        }




}