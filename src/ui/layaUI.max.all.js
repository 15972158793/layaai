var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var MainViewUI=(function(_super){
		function MainViewUI(){
			
		    this.specification=null;

			MainViewUI.__super.call(this);
		}

		CLASS$(MainViewUI,'ui.MainViewUI',_super);
		var __proto__=MainViewUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(MainViewUI.uiView);

		}

		MainViewUI.uiView={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Box","props":{"y":442,"x":144,"width":298,"var":"specification","height":278},"child":[{"type":"Poly","props":{"y":13,"x":39,"points":"10,0,-10,5,-10,-5,10,0","lineWidth":1,"lineColor":"#ff0000","fillColor":"#990000"}},{"type":"Poly","props":{"y":49,"x":39,"points":"10,0,-10,5,-10,-5,10,0","lineWidth":1,"lineColor":"#ff0000","fillColor":"#990099"}},{"type":"Poly","props":{"y":85,"x":39,"points":"10,0,-10,5,-10,-5,10,0","lineWidth":1,"lineColor":"#ff0000","fillColor":"#000099"}},{"type":"Poly","props":{"y":121,"x":39,"points":"10,0,-10,5,-10,-5,10,0","lineWidth":1,"lineColor":"#ff0000","fillColor":"#009900"}},{"type":"Poly","props":{"y":157,"x":39,"points":"10,0,-10,5,-10,-5,10,0","lineWidth":1,"lineColor":"#ff0000","fillColor":"#009999"}},{"type":"Poly","props":{"y":193,"x":39,"points":"10,0,-10,5,-10,-5,10,0","lineWidth":1,"lineColor":"#ff0000","fillColor":"#cc6600"}},{"type":"Circle","props":{"y":229,"x":39,"radius":10,"lineWidth":1,"fillColor":"#3e221d"}},{"type":"Label","props":{"y":2,"x":59,"text":"追逐","fontSize":20,"color":"#000000"}},{"type":"Poly","props":{"y":13,"x":126,"points":"10,0,-10,5,-10,-5,10,0","lineWidth":1,"lineColor":"#ff0000","fillColor":"#990099"}},{"type":"Label","props":{"y":2,"x":144,"text":"并躲避","fontSize":20,"color":"#000000"}},{"type":"Poly","props":{"y":13,"x":222,"points":"10,0,-10,5,-10,-5,10,0","lineWidth":1,"lineColor":"#ff0000","fillColor":"#000099"}},{"type":"Label","props":{"y":38,"x":59,"text":"追逐","fontSize":20,"color":"#000000"}},{"type":"Label","props":{"y":38,"x":144,"text":"并躲避","fontSize":20,"color":"#000000"}},{"type":"Label","props":{"y":74,"x":59,"text":"追逐","fontSize":20,"color":"#000000"}},{"type":"Label","props":{"y":74,"x":144,"text":"并躲避","fontSize":20,"color":"#000000"}},{"type":"Poly","props":{"y":49,"x":126,"points":"10,0,-10,5,-10,-5,10,0","lineWidth":1,"lineColor":"#ff0000","fillColor":"#000099"}},{"type":"Poly","props":{"y":49,"x":222,"points":"10,0,-10,5,-10,-5,10,0","lineWidth":1,"lineColor":"#ff0000","fillColor":"#990000"}},{"type":"Poly","props":{"y":85,"x":126,"points":"10,0,-10,5,-10,-5,10,0","lineWidth":1,"lineColor":"#ff0000","fillColor":"#990000"}},{"type":"Poly","props":{"y":85,"x":222,"points":"10,0,-10,5,-10,-5,10,0","lineWidth":1,"lineColor":"#ff0000","fillColor":"#990099"}},{"type":"Label","props":{"y":111,"x":59,"text":"沿着玩家点击的过的路线走","fontSize":20,"color":"#000000"}},{"type":"Label","props":{"y":146,"x":59,"text":"漫无目的一群漫游者","fontSize":20,"color":"#000000"}},{"type":"Label","props":{"y":182,"x":59,"text":"和同色集群行动类似的鱼群","fontSize":20,"color":"#000000"}},{"type":"Label","props":{"y":217,"x":59,"text":"所有角色都会躲避的障碍物","fontSize":20,"color":"#000000"}}]}]};
		return MainViewUI;
	})(View);