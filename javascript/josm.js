/**
 * 
 * 
 * @module josm 
 * 
 */

var Version = org.openstreetmap.josm.data.Version;
var MessageFormat = java.text.MessageFormat;
var out = java.lang.System.out;
var ScriptingConsole = org.openstreetmap.josm.plugins.scripting.ui.console.ScriptingConsole;
var JOptionPane = javax.swing.JOptionPane;
var HelpAwareOptionPane = org.openstreetmap.josm.gui.HelpAwareOptionPane;
var Main = org.openstreetmap.josm.Main;
var util = require("josm/util");

/**
 * <p>This is the global JOSM API object. It represents a running JOSM instance.</p>
 * 
 * 
 * @namespace josm
 */

/**
 * <p>Replies the current JOSM version string.</p>
 * 
 * @example
 * josm.alert(josm.version);
 * 
 * @memberOf josm
 * @name version
 * @field
 * @readOnly
 * @instance
 * @type {string} 
 */
Object.defineProperty(exports, "version", {
	get: function() {
		return Version.getInstance().getVersionString();
	}
});
 
/**
 * <p>Replies the layers object.</p>
 * 
 * @example
 * josm.alert("num layers: " + josm.layers.length);
 * 
 * // name of first layer 
 * josm.alert("num layers: " + josm.layers.get(0).name);
 * 
 * @memberOf josm
 * @name layers
 * @field
 * @readOnly
 * @instance
 * @type {object} 
 */
Object.defineProperty(exports, "layers", {
	get: function() {
		return require("josm/layers");
	}
});

/**
 * <p>Displays an alert window with a message</p>
 * 
 * <strong>Signatures</strong>
 * <dl>
 *   <dt><strong>alert(message)</strong><dt>
 *   <dd>Displays an information message with an OK button.</dd>
 *   
 *   <dt><strong>alert(message, ?options)</strong><dt>
 *   <dd>Displays a message. The look and feel of the alert window depends on the <var>options</var>. The
 *   following options are supported:
 *   <ul>
 *     <li><strong>title</strong> - (optional) the window title. A string is expected. Empty string if missing.</li>
 *      <li><strong>messageType</strong> - (optional) the message type. Use one of the following values: 
 *         <ul>
 *            <li>JOptionPane.INFORMATION_MESSAGE, "info","information"</li>
 *            <li>JOptionPane.ERROR_MESSAGE, "error"</li>
 *            <li>JOptionPane.WARNING_MESSAGE, "warning", "warn"</li>
 *            <li>JOptionPane.QUESTION_MESSAGE, "question"</li>
 *            <li>JOptionPane.PLAIN_MESSAGE, "plain"</li>
 *         </ul>
 *         Default value is OptionPane.INFORMATION_MESSAGE. String values are not case sensitive and leading and
 *         trailing white space is removed.
 *      </li>
 *   </ul>
 *   </dd>
 * </dl>
 * 
 * @example
 * 
 * // display an information alert
 * josm.alert("Hello World!");
 * 
 * // display an error alert 
 * josm.alert("Got an error", {
 *    title: "Error Alert",
 *    messageType: "error"    
 * });
 * 
 * @memberOf josm
 * @instance
 * @name alert
 */
exports.alert = function() {	
	var map = {
			"information": JOptionPane.INFORMATION_MESSAGE,
			"info": JOptionPane.INFORMATION_MESSAGE,
			"error": JOptionPane.ERROR_MESSAGE,
			"warning": JOptionPane.WARNING_MESSAGE,
			"warn": JOptionPane.INFORMATION_MESSAGE,
			"question": JOptionPane.QUESTION_MESSAGE,
			"plain": JOptionPane.PLAIN_MESSAGE,
	};
	function titleFromOptions(options) {
		if (util.isString(options.title)) return options.title;
		return "";
	};
	function messageTypeFromOptions(options) {
		if (util.isNumber(options.messageType)) {
			var mt = options.messageType;
			for (var key in map){
				if (!map.hasOwnProperty(key)) continue;
				if (mt == map[key]) return mt;
			}
			return JOptionPane.INFORMATION_MESSAGE;
		} else if (util.isString(options.messageType)) {
			var opt = util.trim(options.messageType).toLowerCase();
			var ret = map[opt];
			return ret !== undefined ? ret : JOptionPane.INFORMATION_MESSAGE;
		}
		return JOptionPane.INFORMATION_MESSAGE; 
	};
	
	switch(arguments.length){
	case 0: return;
	case 1: 
		HelpAwareOptionPane.showOptionDialog(Main.parent, arguments[0],"", JOptionPane.INFORMATION_MESSAGE,null);
		return;
	default:
		if (typeof arguments[1] !== "object") {
			HelpAwareOptionPane.showOptionDialog(Main.parent, arguments[0],"", JOptionPane.INFORMATION_MESSAGE,null);
			return;
		}
		var title = titleFromOptions(arguments[1]);
		var messageType = messageTypeFromOptions(arguments[1]);
		HelpAwareOptionPane.showOptionDialog(Main.parent, arguments[0],title, messageType,null);
	}	
};