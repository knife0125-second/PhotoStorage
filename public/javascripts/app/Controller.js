/*jslint devel: true, unparam: true, sloppy: true, vars: false, nomen: true, plusplus: true, maxerr: 1000, indent: 2 */
/*global window, document, setInterval, clearInterval, setTimeout*/
(function (doc, win, $doc) {
  function Controller() {
    this.option = {
      pallet: new Pallet(),
      storage: new Storage(),
      gallery: new Gallery()
    };
  };

  Controller.prototype.run = function () {
    this.exportEvent();
    this.buildPage();
  };

  Controller.prototype.buildPage = function () {
    var option = this.option;
    option.pallet.build();
    option.storage.build();
    option.gallery.build();
  };

  Controller.prototype.exportEvent = function () {
    var option = this.option;

    $doc.bind('gallery.appearImage', function (documentEvent, img) {
      return option.gallery.appearImage(img);
    });

    $doc.bind('gallery.removeImage', function (documentEvent) {
      return option.gallery.removeImage();
    });

    $doc.bind('storage.saveImage', function (documentEvent, dataURL) {
      return option.storage.saveImage(dataURL);
    });

    $doc.bind('storage.getImages', function (documentEvent) {
      return option.storage.getImages();
    });

    $doc.bind('storage.clearAll', function (documentEvent) {
      return option.storage.clearAll();
    });
  };

  $(doc).ready(function () {
    var controller = new Controller();
    controller.run();
  });

}(document, window, jQuery(document)));
