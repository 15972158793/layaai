
var Vehicle = function(_super) {

    Vehicle.WRAP = "wrap";
    Vehicle.BOUNCE = "bounce";

    function Vehicle() {
        Vehicle.__super.call(this);
        this._edgeBehavior = Vehicle.WRAP;
        this._mass = 1;
        this._maxSpeed = 5;
        this._position = new Vector2D();
        this._velocity = new Vector2D();
        this.draw();
    }
    Laya.class(Vehicle,"src.Vehicle",_super);
    var _proto_ = Vehicle.prototype;
    _proto_.draw = function(t) {
        if(t === void 0) t = "#009999";
        this.graphics.clear();
        this.graphics.drawPoly(10, 0, [-10, 5, -10, -5, 10, 0], t);
    }

    _proto_.update = function() {
        this._velocity.truncate(this._maxSpeed);
        this._position = this._position.add(this._velocity);
        this._edgeBehavior == Vehicle.WRAP ? this.wrap() : this._edgeBehavior == Vehicle.BOUNCE && this.bounce();
        this.x = this.position.x;
        this.y = this.position.y;
        this.rotation = 180 * this._velocity.angle / Math.PI;
    }
    
    _proto_.bounce = function() {
        null != this.stage && (this.position.x > this.stage.width ? (this.position.x = this.stage.width,
        this.velocity.x *= -1) : this.position.x < 0 && (this.position.x = 0,
        this.velocity.x *= -1),
        this.position.y > this.stage.height ? (this.position.y = this.stage.height,
        this.velocity.y *= -1) : this.position.y < 0 && (this.position.y = 0,
        this.velocity.y *= -1))
    }
    
    _proto_.wrap = function() {
        null != this.stage && (this.position.x > this.stage.width && (this.position.x = 0),
        this.position.x < 0 && (this.position.x = this.stage.width),
        this.position.y > this.stage.height && (this.position.y = 0),
        this.position.y < 0 && (this.position.y = this.stage.height))
    }

    Object.defineProperty(_proto_, "edgeBehavior", {
        get: function() {
            return this._edgeBehavior
        },
        set: function(t) {
            this._edgeBehavior = t
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(_proto_, "mass", {
        get: function() {
            return this._mass
        },
        set: function(t) {
            this._mass = t
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(_proto_, "maxSpeed", {
        get: function() {
            return this._maxSpeed
        },
        set: function(t) {
            this._maxSpeed = t
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(_proto_, "position", {
        get: function() {
            return this._position
        },
        set: function(t) {
            this._position = t,
            this.x = this._position.x,
            this.y = this._position.y
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(_proto_, "velocity", {
        get: function() {
            return this._velocity
        },
        set: function(t) {
            this._velocity = t
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(_proto_, "x", {
        set: function(t) {
            this._x = t,
            this._position.x = this._x
        },
        enumerable: !0,
        configurable: !0
    });

    Object.defineProperty(_proto_, "y", {
        set: function(t) {
            this._y = t,
            this._position.y = this._y
        },
        enumerable: true,
        configurable: true
    });

    return Vehicle;
}(Laya.Sprite);