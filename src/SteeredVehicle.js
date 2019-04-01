
var SteeredVehicle = function(_super) {
    function SteeredVehicle() {

        SteeredVehicle.__super.call(this);
        this._maxForce = 1;
        this._arrivalThreshold = 100;
        this._wanderAngle = 0;
        this._wanderDistance = 10;
        this._wanderRadius = 5;
        this._wanderRange = 1;
        this._avoidDistance = 300;
        this._avoidBuffer = 20;
        this._inSightDist = 200;
        this._tooCloseDist = 60;
        this._pathIndex = 0;
        this._pathThreshold = 20;
        this._steeringForce = new Vector2D();
    }
    Laya.class(SteeredVehicle,"src.SteeredVehicle",_super);
    var _proto_ = SteeredVehicle.prototype;

    Object.defineProperty(_proto_, "maxForce", {
        get: function() {
            return this._maxForce
        },
        set: function(e) {
            this._maxForce = e
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(_proto_, "arriveThreshold", {
        get: function() {
            return this._arrivalThreshold
        },
        set: function(t) {
            this._arrivalThreshold = t
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(_proto_, "wanderDistance", {
        get: function() {
            return this._wanderDistance
        },
        set: function(t) {
            this._wanderDistance = t
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(_proto_, "wanderRadius", {
        get: function() {
            return this._wanderRadius
        },
        set: function(t) {
            this._wanderRadius = t
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(_proto_, "wanderRange", {
        get: function() {
            return this._wanderRange
        },
        set: function(t) {
            this._wanderRange = t
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(_proto_, "avoidDistance", {
        get: function() {
            return this._avoidDistance
        },
        set: function(t) {
            this._avoidDistance = t
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(_proto_, "avoidBuffer", {
        get: function() {
            return this._avoidBuffer
        },
        set: function(t) {
            this._avoidBuffer = t
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(_proto_, "pathIndex", {
        get: function() {
            return this._pathIndex
        },
        set: function(t) {
            this._pathIndex = t
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(_proto_, "pathThreshold", {
        get: function() {
            return this._pathThreshold
        },
        set: function(t) {
            this._pathThreshold = t
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(_proto_, "inSightDist", {
        get: function() {
            return this._inSightDist
        },
        set: function(t) {
            this._inSightDist = t
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(_proto_, "tooCloseDist", {
        get: function() {
            return this._tooCloseDist
        },
        set: function(t) {
            this._tooCloseDist = t
        },
        enumerable: true,
        configurable: true
    });

    _proto_.update = function() {
        this._steeringForce.truncate(this._maxForce);
        this._steeringForce = this._steeringForce.divide(this._mass);
        this._velocity = this._velocity.add(this._steeringForce);
        this._steeringForce = new Vector2D();
        //基类调用
        Vehicle.prototype.update.call(this);
    }
    
    _proto_.seek = function(t) {
        var e = t.subtract(this._position);
        e.normalize();
        var i = (e = e.multiply(this._maxSpeed)).subtract(this._velocity);
        this._steeringForce = this._steeringForce.add(i);
    }
    
    _proto_.flee = function(t) {
        var e = t.subtract(this._position);
        e.normalize();
        var i = (e = e.multiply(this._maxSpeed)).subtract(this._velocity);
        this._steeringForce = this._steeringForce.subtract(i)
    }
    
    _proto_.arrive = function(t) {
        var e = t.subtract(this._position);
        e.normalize();
        var i = this._position.dist(t)
          , o = (e = i > this._arrivalThreshold ? e.multiply(this._maxSpeed) : e.multiply(this._maxSpeed * i / this._arrivalThreshold)).subtract(this._velocity);
        this._steeringForce = this._steeringForce.add(o)
    }
    
    _proto_.pursue = function(t) {
        var e = this.position.dist(t.position) / this._maxSpeed
          , i = t.position.add(t.velocity.multiply(e));
        this.seek(i)
    }
    
    _proto_.evade = function(t) {
        var e = this.position.dist(t.position) / this._maxSpeed
          , i = t.position.subtract(t.velocity.multiply(e));
        this.flee(i)
    }
    
    _proto_.wander = function() {
        var t = this.velocity.clone().normalize().multiply(this._wanderDistance)
          , e = new Vector2D(0);
        e.length = this._wanderRadius,
        e.angle = this._wanderAngle,
        this._wanderAngle += Math.random() * this._wanderRange - .5 * this._wanderRange;
        var i = t.add(e);
        this._steeringForce = this._steeringForce.add(i)
    }
    
    _proto_.avoid = function(t) {
        for (var e = 0; e < t.length; e++) {
            var i = t[e]
              , o = this._velocity.clone().normalize()
              , n = i.position.subtract(this._position)
              , r = n.dotProd(o);
            if (r > 0) {
                var s = o.multiply(this._avoidDistance)
                  , a = o.multiply(r);
                if (a.subtract(n).length < i.radius + this._avoidBuffer && a.length < s.length) {
                    var h = o.multiply(this._maxSpeed);
                    h.angle += n.sign(this._velocity) * Math.PI / 2;
                    var c = a.length / s.length;
                    h = h.multiply(1 - c),
                    this._steeringForce = this._steeringForce.add(h),
                    this._velocity = this._velocity.multiply(c)
                }
            }
        }
    }
    
    _proto_.followPath = function(t, e) {
        void 0 === e && (e = !1);
        var i = t[this._pathIndex];
        null != i && (this._position.dist(i) < this._pathThreshold && (this._pathIndex >= t.length - 1 ? e && (this._pathIndex = 0) : this._pathIndex++),
        this._pathIndex >= t.length - 1 && !e ? this.arrive(i) : this.seek(i))
    }
    
    _proto_.flock = function(t) {
        for (var e = this._velocity.clone(), i = new Vector2D, o = 0, n = 0; n < t.length; n++) {
            var r = t[n];
            r != this && this.inSight(r) && (e = e.add(r.velocity),
            i = i.add(r.position),
            this.tooClose(r) && this.flee(r.position),
            o++)
        }
        o > 0 && (e = e.divide(o),
        i = i.divide(o),
        this.seek(i),
        this._steeringForce.add(e.subtract(this._velocity)))
    }
    
    _proto_.inSight = function(t) {
        if (this._position.dist(t.position) > this._inSightDist)
            return false;
        var e = this._velocity.clone().normalize();
        return !(t.position.subtract(this._position).dotProd(e) < 0);
    }
    
    _proto_.tooClose = function(t) {
        return this._position.dist(t.position) < this._tooCloseDist
    }

    return SteeredVehicle;
}(Vehicle);