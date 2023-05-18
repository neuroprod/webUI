import LComponent, {LComponentSettings} from "./LComponent";

import UI_IC from "../UI_IC";
import UI_I from "../UI_I";
import DirtyButton from "./internal/DirtyButton";
import {DragBaseSettings} from "./internal/DragBase";
import {NumberType} from "../UI_Types";
import UI_Vars from "../UI_Vars";

export class LNumberSettings extends LComponentSettings
{
constructor() {
    super();
    this.canCopyToClipBoard =true;
}
}
export default class LNumber extends LComponent
{
    private value: number;
    private stringRef: string;
    private ref: any;


    private type: NumberType;
    private valueOld: number;
    private dragSettings: DragBaseSettings;
    private floatPrecision: number;
    constructor(id:number, label:string,value:number|null, ref:any,settings:LNumberSettings, type:NumberType =NumberType.FLOAT) {


        super(id,label,settings);
        this.value =value;
        this.stringRef=label;
        this.ref =ref;

        this.type =type

        if(this.type ==NumberType.FLOAT)
        {
            this.floatPrecision=UI_Vars.floatPrecision;
        }else{
            this.floatPrecision =0;
        }

        if(this.ref)
        {
            this.value= this.ref[this.stringRef]
        }
        this.valueOld =this.value;
        this.dragSettings =new DragBaseSettings()
        this.dragSettings.box.marginLeft =4;
        this.dragSettings.box.marginRight =20;

    }
    onAdded() {
        if(this.ref)
        {
            this.value= this.ref[this.stringRef]
        }
    }

    setSubComponents() {
        super.setSubComponents();
       if(UI_IC.dragBase("LSsl",this, "value",this.type,this.dragSettings))
        {
            if(this.valueOld != this.value)
            {
                this.setValueDirty(true)
            }
            else
            {
                this.setValueDirty(false)
            }
            if(this.ref)
            {
                this.ref[this.stringRef] =this.value
            }
        }
        if(UI_IC.dirtyButton("LSdb"))
        {
            this.value =this.valueOld;
            if(this.ref)
            {
                this.ref[this.stringRef] =this.value
            }
            this.setDirty()
            this.setValueDirty(false)

        }
        let btn =UI_I.currentComponent as DirtyButton
        btn.setValueDirty( this.valueDirty);
        UI_I.popComponent();
       if(UI_IC.settingsButton("LSset"))
        {
            console.log("showSettings")
        }
    }
    getReturnValue(): number {
        return this.value;
    }
    getClipboardValue(): string {
        return this.value.toFixed(this.floatPrecision) + "";
    }

}
