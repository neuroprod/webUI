import Component, {ComponentSettings} from "../Component";
import DockTabData from "../../docking/DockTabData";
import Color from "../../math/Color";
import Vec2 from "../../math/Vec2";
import UI_I from "../../UI_I";

export class DockPanelIndicatorSettings extends ComponentSettings
{
    public colorMain: Color = new Color().setHex("#00a8ff", 0.5);
    public colorMainOver: Color = new Color().setHex("#00a8ff", 0.6);
    constructor() {
        super();
        this.hasBackground =true;
        this.backgroundColor.copy(this.colorMain)
    }
}


export default class DockPanelIndicator extends Component
{
    private item: DockTabData;
    private isOverDrag: Boolean;
    constructor(id:number,item:DockTabData,settings:DockPanelIndicatorSettings) {
        super(id,settings);
        this.item =item;
        this.posOffset.copy(this.item.rect.pos)
        this.size.copy(this.item.rect.size);

    }
    checkMouseOverLayout(pos: Vec2) {
        let isOver = this.layoutRect.contains(pos);
        if(UI_I.mouseListener.isUpThisFrame &&  this.isOverDrag)
        {
            UI_I.dockManager.dockInPanel(this.item.panel);
        }
        if (isOver && !this.isOverDrag) {
            this.isOverDrag = true;
            this.setDirty();
        } else if (!isOver && this.isOverDrag) {

            this.isOverDrag = false;
            this.setDirty();
        }
        return isOver;
    }
}