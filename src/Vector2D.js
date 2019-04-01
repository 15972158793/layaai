var Vector2D = function() {

    function Vector2D(x, y) {
        void 0 === x && (x = 0);
        void 0 === y && (y = 0);
        this._x = x;
        this._y = y;
    }
    Laya.class(Vector2D,"src.Vector2D");
     var _proto_ = Vector2D.prototype;

    Object.defineProperty(_proto_, "length", {
        get: function() {
            return Math.sqrt(this.lengthSQ)
        },
        set: function(t) {
            var e = this.angle;
            this._x = Math.cos(e) * t;
            this._y = Math.sin(e) * t;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(_proto_, "lengthSQ", {
        get: function() {
            return this._x * this._x + this._y * this._y;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(_proto_, "angle", {
        get: function() {
            return Math.atan2(this._y, this._x)
        },
        set: function(t) {
            var e = this.length;
            this._x = Math.cos(t) * e,
            this._y = Math.sin(t) * e
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(_proto_, "perp", {
        get: function() {
            return new Vector2D(-this.y,this.x);
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(_proto_, "x", {
        get: function() {
            return this._x
        },
        set: function(t) {
            this._x = t
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(_proto_, "y", {
        get: function() {
            return this._y
        },
        set: function(t) {
            this._y = t
        },
        enumerable: true,
        configurable: true
    });

    _proto_.draw = function(t,color) {
        void 0 === color && (color = "000000");
        t.drawLine(0, 0, this._x, this._y, color);
    }

    _proto_.clone = function() {
        return new Vector2D(this.x,this.y);
    }
    
    _proto_.zero = function() {
        this._x = 0;
        this._y = 0;
        return this;
    }
    
    _proto_.isZero = function() {
        return 0 == this._x && 0 == this._y;
    }
    
    _proto_.normalize = function() {
        if (0 == this.length) {
            this._x = 1;
            return this;
        }
        var t = this.length;
        this._x /= t;
        this._y /= t;
        return this;
    }
    
    _proto_.truncate = function(t) {
        this.length = Math.min(t, this.length);
        return this;
    }
    
    _proto_.reverse = function() {
        this._x = -this._x;
        this._y = -this._y;
        return this;
    }
    
    _proto_.isNormalized = function() {
        return 1 == this.length;
    }
    
    _proto_.dotProd = function(t) {
        return this._x * t.x + this._y * t.y;
    }
    
    _proto_.crossProd = function(t) {
        return this._x * t.y - this._y * t.x;
    }
    
    _proto_.angleBetween = function(t, e) {
        if(t.isNormalized() || (t = t.clone().normalize()) || 
        e.isNormalized() || (e = e.clone().normalize())){
             return Math.acos(t.dotProd(e));
        }
    }
    
    _proto_.sign = function(t) {
        return this.perp.dotProd(t) < 0 ? -1 : 1;
    }
    
    _proto_.dist = function(t) {
        return Math.sqrt(this.distSQ(t));
    }
    
    _proto_.distSQ = function(t) {
        var e = t.x - this.x
          , n = t.y - this.y;
        return e * e + n * n;
    }
    
    _proto_.add = function(e) {
        return new Vector2D(this._x + e.x,this._y + e.y);
    }
    
    _proto_.subtract = function(e) {
        return new Vector2D(this._x - e.x,this._y - e.y);
    }
    
    _proto_.multiply = function(e) {
        return new Vector2D(this._x * e,this._y * e);
    }
    
    _proto_.divide = function(e) {
        return new Vector2D(this._x / e,this._y / e);
    }
    
    _proto_.equals = function(t) {
        return this._x == t.x && this._y == t.y;
    }
    
    _proto_.toString = function() {
        return "[Vector2D(x:" + this._x + ",y:" + this._y + ")]";
    }
    
    return Vector2D;
}();