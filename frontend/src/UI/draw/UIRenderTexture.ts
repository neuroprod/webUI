import UITexture from "./UITexture";
import Vec2 from "../math/Vec2";
import FBO from "../GL/FBO";
import UI_I from "../UI_I";

export default class UIRenderTexture extends UITexture
{

    private fbo: FBO;
    private gl: WebGL2RenderingContext | WebGLRenderingContext;
    constructor() {
        super();
        this.gl =UI_I.renderer.gl;
        this.fbo =new FBO(UI_I.renderer.gl,100,100)
        this.setTextureGL( this.fbo.texture,100,100)
    }
    setSize(w:number,h:number){
        if(w==this.width && h==this.height)false;
        if(w<1 || h<1)return ;
        this.fbo.delayedResize(w,h);
        this.width =w;
        this.height =h;
        this.size.set(w,h)
return true;
    }
    bind()
    {
        this.gl.viewport(0,0,this.width,this.height)
        this.textureGL =this.fbo.texture;
        this.fbo.bind()
    }

    unBind()
    {
        this.fbo.unbind()
    }




}