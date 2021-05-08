'use strict';

class PrivateController {

  /**
   * GET /private
   */
   index(req, res, next) {
    res.render('private');
  }

}

module.exports = new PrivateController();