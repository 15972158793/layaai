

var MainView = function(_super) {
    function MainView() {
        MainView.__super.call(this);

        this._vehicleA = new SteeredVehicle();
        this.addChild(this._vehicleA);
        this._vehicleA.draw("#990000");

        this._vehicleB = new SteeredVehicle();
        this.addChild(this._vehicleB);
        this._vehicleB.draw("#990099");

        this._vehicleC = new SteeredVehicle();
        this.addChild(this._vehicleC);
        this._vehicleC.draw("#000099");


        this._vehicleD = new SteeredVehicle();
        this.addChild(this._vehicleD);
        this._vehicleD.draw("#009900");


        this._vehicleA.position = new Vector2D(400,400),
        this._vehicleA.velocity.length = 1,
        this._vehicleA.edgeBehavior = Vehicle.BOUNCE;


        this._vehicleB.position = new Vector2D(400,200),
        this._vehicleB.velocity.length = 1,
        this._vehicleB.edgeBehavior = Vehicle.BOUNCE,

        this._vehicleC.position = new Vector2D(800,300),
        this._vehicleC.velocity.length = 1,
        this._vehicleC.velocity.angle = Math.PI / 3,
        this._vehicleC.edgeBehavior = Vehicle.BOUNCE,

        this._vehicleD.position = new Vector2D(200,300),
        this._vehicleD.maxSpeed = 10,
        this._vehicleD.edgeBehavior = Vehicle.BOUNCE,

        this._circles = [];
        for (var h = 0; h < 4; h++) {
            var t = new Circle(30 * Math.random() + 20,"#3e221d");
            t.x = this.width / 2 + Math.random() * this.width / 2;
            t.y = Math.random() * this.height;
            this.addChild(t);
            this._circles.push(t);
        }

        this._wanders = [];
        for (var c = 0; c < 10; c++) {
            (o = new SteeredVehicle).edgeBehavior = Vehicle.BOUNCE,
            o.x = Math.random() * this.width;
            o.y = Math.random() * this.height;
            this.addChild(o);
            this._wanders.push(o);
        }


        this._flocks = [];
        for (var s = 0; s < 10; s++) {
            var o = new SteeredVehicle();
            o.edgeBehavior = Vehicle.BOUNCE;
            o.draw("#cc6600");
            o.x = Math.random() * this.width;
            o.y = Math.random() * this.height;
            this.addChild(o);
            this._flocks.push(o);
        }
        
        //跟随的路径
        this._path = [];

        this.on("click", this, this.onClick);
        Laya.timer.frameLoop(1, this, this.onLoop);
    }
    Laya.class(MainView,"src.MainView",_super);
    var _proto_ = MainView.prototype;
   
    _proto_.onClick = function() {

        this.graphics.drawCircle(this.mouseX, this.mouseY, 10, "#3e221d");
        if(0 != this._path.length){
            var p = this._path[this._path.length - 1];
            this.graphics.drawLine(p.x, p.y, this.mouseX, this.mouseY, "#e3beae", 2);
        }
        this._path.push(new Vector2D(this.mouseX,this.mouseY));
    }
    
    _proto_.onLoop = function() {

        this._vehicleA.seek(this._vehicleB.position);
        this._vehicleA.flee(this._vehicleC.position);
        this._vehicleA.avoid(this._circles);
        this._vehicleA.update();


        this._vehicleB.seek(this._vehicleC.position);
        this._vehicleB.flee(this._vehicleA.position);
        this._vehicleB.avoid(this._circles);
        this._vehicleB.update();


        this._vehicleC.seek(this._vehicleA.position);
        this._vehicleC.flee(this._vehicleB.position);
        this._vehicleC.avoid(this._circles);
        this._vehicleC.update();
        
        //
        for (var i = 0; i < this._wanders.length; i++){
            this._wanders[i].wander();
            this._wanders[i].avoid(this._circles);
            this._wanders[i].update();
        }

        //
        for (var h = 0; h < this._flocks.length; h++){
            this._flocks[h].flock(this._flocks);
            this._flocks[h].avoid(this._circles);
            this._flocks[h].update();
        }
        
        //跟随
        this._vehicleD.followPath(this._path,true);
        this._vehicleD.update();
    }
    
    return MainView;
}(MainViewUI);