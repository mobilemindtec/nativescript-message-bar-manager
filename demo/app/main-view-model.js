var Observable = require("data/observable").Observable;
var messageBar = require("nativescript-message-bar-manager")
var Color = require("tns-core-modules/color").Color
var application = require("application")

function getMessage(counter) {
    if (counter <= 0) {
        return "Hoorraaay! You unlocked the NativeScript clicker achievement!";
    } else {
        return counter + " taps left";
    }
}

function createViewModel() {
    var viewModel = new Observable();
    viewModel.counter = 42;
    viewModel.message = getMessage(viewModel.counter);

    viewModel.onTap = function() {
        this.counter--;
        this.set("message", getMessage(this.counter));

        show({
            title: "My Title",
            message: "My message " + this.counter,
            backgroundColor: "#000000",
            callback: function(){
                console.log("message taped")
            }
        })
    }

    return viewModel;
}

exports.createViewModel = createViewModel;


function show(params){

    if(!application.ios)
        return

    var type = params.type || TWMessageBarMessageTypeSuccess

    var Style = createStyle(params) 

    TWMessageBarManager.sharedInstance().styleSheet = new Style()
    params.duration = params.duration || 10

    TWMessageBarManager.sharedInstance().showMessageWithTitleDescriptionTypeDurationCallback(params.title, params.message, type, params.duration, function(){
        if(params.callback)
            params.callback()
    })
}

function createStyle(params) {

    var MyStyle = (function(_super){

    __extends(MyStyle, _super);
    function MyStyle() {
        _super.apply(this, arguments);
    }       

    MyStyle.init = function(){
        return MyStyle.new()
    }

    MyStyle.prototype.backgroundColorForMessageType = function(type){
        return new Color(params.backgroundColor).ios
    }

    MyStyle.prototype.strokeColorForMessageType = function(type){
        return null 
    }

    MyStyle.prototype.iconImageForMessageType = function(type){
        UIImage.imageNamed("icon-info")
    }

    /*
    MyStyle.prototype.titleFontForMessageType = function(){
        
    }

    MyStyle.prototype.descriptionFontForMessageType = function(){
        
    }*/

    MyStyle.prototype.titleColorForMessageType = function(type){

        if(params.titleColor)
            return new Color(params.titleColor).ios

        return new Color("#FFFFFF").ios
        
    }

    MyStyle.prototype.descriptionColorForMessageType = function(type){
        
        if(params.messageColor)
            return new Color(params.messageColor).ios

        return new Color("#FFFFFF").ios
    }

    MyStyle.ObjCProtocols = [TWMessageBarStyleSheet];
    return MyStyle
    
    })(NSObject)

  return MyStyle
}