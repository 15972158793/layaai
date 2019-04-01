
var Circle = function(_super) {
    function Circle(radius, color) {

        Circle.__super.call(this);
        void 0 === color && (color = "000000");
        this._radius = radius;
        this._color = color;
        this.graphics.drawCircle(0, 0, this._radius, this._color);
    }
    Laya.class(Circle,"src.circle",_super);
    var _proto_ = Circle.prototype;
    
    Object.defineProperty(_proto_, "radius", {
        get: function() {
            return this._radius
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(_proto_, "position", {
        get: function() {
            return new Vector2D(this.x,this.y)
        },
        enumerable: true,
        configurable: true
    });
    return Circle;
}(Laya.Sprite);