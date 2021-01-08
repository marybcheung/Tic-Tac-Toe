var assert = require('assert');
var cpu = require('../CPU.js');
var gameBoard = require('../GameBoard.js');


describe('CPU', function() {
  describe('#bestPlay()', function() {
    it('should return {2, 0}', function() {
      let state = [
        [ "O","X","O"],
        [ null,"X", null ],
        [ null, null, null ]
      ]
      assert.deepEqual(cpu.data.bestPlay(state), {x: 2, y: 1});
    });
  });
});