

import {Color, isIOS, AndroidApplication } from "@nativescript/core"


export function snackbar(options) {


  if(isIOS)
    return
  
  Snackbar = com.google.android.material.snackbar.Snackbar

  var activity = AndroidApplication.android.foregroundActivity || AndroidApplication.android.startActivity
  var parentLayout = activity.findViewById(android.R.id.content)

  var action = new android.view.View.OnClickListener({
    onClick: function(v) {
      if(options.callback)
        options.callback()
    }
  })

  options.actonText = options.actonText || "OK"
  options.message = options.message || ""

  snackbar = Snackbar.make(parentLayout, options.message, Snackbar.LENGTH_INDEFINITE)
  snackbar.setAction(options.actonText, action)

  snackbarView = snackbar.getView()

  if(options.backgroundColor){
    snackbarView.setBackgroundColor(new Color(options.backgroundColor).android);
  }
  
  if (options.maxLines){
    textView = snackbarView.findViewById(com.google.android.material.R.id.snackbar_text)    
    textView.setMaxLines(options.maxLines)
  }

  if(options.textColor)
    snackbar.setActionTextColor(new Color(options.textColor).android)

  snackbar.show()

}


export function messageBar(params){ 

    if(!isIOS)
        return

    var type = params.type || TWMessageBarMessageTypeSuccess

    var Style = createStyle(params) 

    TWMessageBarManager.sharedInstance().styleSheet = Style.init()
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
        return _super.apply(this, arguments) || this;
    }       

    MyStyle.init = function(){
        return MyStyle.new()
    }

    MyStyle.prototype.backgroundColorForMessageType = function(type){        
        var color =  new Color(params.backgroundColor).ios
        return color
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