var GameMain = (function(){
    function GameMain() {
        Laya.init(1280, 720,true);
        Laya.ResourceManager.systemResourceManager.autoRelease = false;
        Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_HEIGHT;
        Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
        Laya.stage.alignV = Laya.Stage.ALIGN_CENTER;
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.bgColor = "#000000";
        Laya.stage.frameRate = Laya.Stage.FRAME_FAST;

        var view = new MainView();
        view.graphics.drawRect(0, 0, view.width, view.height, "#ffddcc");
        Laya.stage.addChild(view);
        
    }
    Laya.class(GameMain,"src.GameMain");
    
    return GameMain;
})();
new GameMain();