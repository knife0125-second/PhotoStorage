/*jslint devel: true, unparam: true, sloppy: true, vars: false, nomen: true, plusplus: true, maxerr: 1000, indent: 2 */
/*global window, document, setInterval, clearInterval, setTimeout, Image, jQuery, localStorage*/
(function (doc, win) {

  function Storage() {
    this.option = {
      storageKey: 'imageStorage'
    };
  }

  Storage.prototype.build = function () {};

  Storage.prototype.saveImage = function (dataURL) {
    var saveData, jsonData, key = this.option.storageKey;
    saveData = localStorage.getItem(key);
    saveData = JSON.parse(saveData) || [];
    saveData.push(dataURL);
    jsonData = JSON.stringify(saveData);
    localStorage.setItem(key, jsonData);
    return true;
  };

  Storage.prototype.getImages = function () {
    var key = this.option.storageKey, saveData = localStorage.getItem(key);
    saveData = JSON.parse(saveData) || [];
    return saveData;
  };

  Storage.prototype.clearAll = function () {
    var key = this.option.storageKey;
    localStorage.removeItem(key);
  };

  // global Export
  win.Storage = Storage;

}(document, window));
