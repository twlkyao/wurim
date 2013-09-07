(function() {
  Crafty.c("Player", {
    init: function() {
      this.requires("2D, DOM, player, Fourway, SpriteAnimation, Collision");
      this.attr({
        hp: 30,
        x: WINDOW_WIDTH / 2 - 20,
        y: WINDOW_HEIGHT - 20,
        damage: 10
      });
      this.origin("center");
      this.bind('Moved', this.stopOnBorder);
      this.bind('KeyDown', this.fire);
      this.reset();
    },

    stopOnBorder: function() {
      this.x = this.x < 0 ? 0 : this.x;
      this.x = this.x > WINDOW_WIDTH - this.w ? WINDOW_WIDTH - this.w : this.x;
      this.y = this.y < 0 ? 0 : this.y;
      return this.y = this.y > WINDOW_HEIGHT - this.h ? WINDOW_HEIGHT - this.h : this.y;
    },

    fire: function(e) {
      var bullet;
      if (e.key === Crafty.keys.X) {
        // Player A
        bullet = Crafty.e('PlayerInitBulletLeft');
        Crafty.audio.play('biu');
        bullet.fireAt(this.x, this.y);
      } else if (e.key === Crafty.keys.C) {
        // Player B
        bullet = Crafty.e('PlayerInitBulletRight');
        Crafty.audio.play('biu');
        bullet.fireAt(this.x + this.w - bullet.w, this.y);
      } else if (
          (e.key === Crafty.keys.F || e.key == Crafty.keys.G) &&
          !this.in_boom) {
        var cd = Crafty.e('BoomCountdown');
        var self = this;
        cd.setKey(e.key == Crafty.keys.F ? Crafty.keys.G : Crafty.keys.F);
        cd.bind('Remove', function() {
          console.log('!!!');
          self.in_boom = false
        });
        self.in_boom = true;
      }
    },

    hurt: function(damage) {
      this.hp -= damage;
      Crafty.trigger('HurtPlayer', this);
      if (this.hp <= 0) {
        Crafty.trigger('KillPlayer', this);
        return this.destroy();
      }
    },
  });

}).call(this);
