/*:
-------------------------------------------------------------------------------
@title HMS: Hide Message Window
@author Hime --> HimeWorks (http://himeworks.com)
@version 1.0
@date Mar 2, 2016
@filename HIME_HMSHideMessageWindow.js
@url 

If you enjoy my work, consider supporting me on Patreon!

* https://www.patreon.com/himeworks

If you have any questions or concerns, you can contact me at any of
the following sites:

* Main Website: http://himeworks.com
* Facebook: https://www.facebook.com/himeworkscom/
* Twitter: https://twitter.com/HimeWorks
* Youtube: https://www.youtube.com/c/HimeWorks
* Tumblr: http://himeworks.tumblr.com/

-------------------------------------------------------------------------------
@plugindesc v1.0 - 
@help 
-------------------------------------------------------------------------------
== Description ==

Sometimes, you want to be able to hide the message window while a message is
being shown.

For example, if you have some background art behind the message, you might let
the player admire the art by hiding the message at anytime.

This plugin allows you to choose which button to press to hide the message
window.

When the window is closed, the message will not advance.

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Free for use in commercial projects, but it would be nice to let me know
- Please provide credits to HimeWorks

== Change Log ==

1.0 - Mar 2, 2016
 - initial release

== Usage ==

In the plugin parameters, choose which button you wish to use for hiding
the message window.

If you're using the default input system, you can see this page for a list of
input formats

http://himeworks.com/wiki/index.php?title=MV_Formula_Library/Conditional_Formulas#Input-Based_Formulas

Depending on what input plugins you're using, the button you have to add might
be different. Consult the respective plugin instructions for more details.

-------------------------------------------------------------------------------
@param Hide Button
@desc Button to press to toggle message window visibility
@default shift
-------------------------------------------------------------------------------
 */ 
var Imported = Imported || {} ;
var TH = TH || {};
Imported.TH_HideMessageWindow = 1;
TH.HideMessageWindow = TH.HideMessageWindow || {};

(function ($) {

  $.params = PluginManager.parameters("HIME_HMSHideMessageWindow");
  $.button = $.params["Hide Button"].trim();

  var TH_WindowMessage_initMembers = Window_Message.prototype.initMembers;
  Window_Message.prototype.initMembers = function() {
    TH_WindowMessage_initMembers.call(this);
    this._isHidden = false;
  };
  
  var TH_WindowMessage_updateInput = Window_Message.prototype.updateInput;
  Window_Message.prototype.updateInput = function() {
    if (Input.isTriggered($.button) || TouchInput.isCancelled()) {
      this.updateHidden();
    }
    return TH_WindowMessage_updateInput.call(this);
  };
  
  Window_Message.prototype.updateHidden = function() {
    this._hidden = !this._hidden
    if (this._hidden) {
      this.visible = false;
    }
    else {
      this.visible = true;
    }
  };
  
  var TH_WindowMessage_updateMessage = Window_Message.prototype.updateMessage;
  Window_Message.prototype.updateMessage = function() {
    if (this._isHidden) {
      return false;
    }
    else {
      return TH_WindowMessage_updateMessage.call(this);
    }
  }
  
  var TH_WindowMessage_terminateMessage = Window_Message.prototype.terminateMessage;
  Window_Message.prototype.terminateMessage = function() {
    if (!this._hidden) {
      TH_WindowMessage_terminateMessage.call(this);
    }
  };

})(TH.HideMessageWindow);