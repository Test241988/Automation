const {Selector} = require('testcafe');

function select(selector){
    return Selector(selector).with({boundTestRun:testController})

}
exports.Upload = {
        ChooseFileButton: function(){
            return select('#file-upload');
        },
        UploadButton: function(){
            return select('#file-submit');
        },
        SuccessMessage: function(){
            return select('h3').withText('File Uploaded!');
        },
        UploadedFile:function(){
            return select('#uploaded-files');
        },
        ErrorMessage:function(){
            return select('h1').withText('Internal Server Error');
        }


}