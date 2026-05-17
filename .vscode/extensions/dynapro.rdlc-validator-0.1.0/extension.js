// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const { DOMParser } = require("xmldom");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "rdlc-validator" is now active!'
  );

  let textEditorDisposable = vscode.commands.registerTextEditorCommand(
    "rdlc-validator.validate-rdlc",
    (editor, edit) => {
      const map = new Map();
      const editorContents = editor.document.getText();
      const parser = new DOMParser();
      const dom = parser.parseFromString(editorContents, "application/xml");
      const textBoxes = dom.getElementsByTagName("Textbox");
      for (let i = 0; i < textBoxes.length; i++) {
        let name = textBoxes.item(i).getAttribute("Name").valueOf();
        let key = name.toUpperCase();
        if (map.has(key)) {
          vscode.window.showInformationMessage(
            "Textbox name already exists:" + name
          );
        }
        map.set(key, textBoxes.item(i));
      }
    },
    this
  );

  context.subscriptions.push(textEditorDisposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
