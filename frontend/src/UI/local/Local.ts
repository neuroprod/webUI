export default class Local {
    static dockData: any = null;
    static itemData = {};
    static uiData = {};
    private static isDirty: boolean;

    static init() {
        this.uiData["itemData"] = this.itemData
        this.uiData["dockData"] = this.dockData
        let data = localStorage.getItem("uiData");

        if (data) {
            this.uiData = JSON.parse(data);
            this.itemData = this.uiData["itemData"];

            this.dockData = this.uiData["dockData"];
        } else {

        }


    }

    static setItem(id: number, data: any) {
        this.uiData["itemData"][id] = data;
        this.isDirty = true;


    }

    static getItem(id: number): any {
        return this.uiData["itemData"][id];
    }

    static setDockData(data: any) {

        this.uiData["dockData"] = data;
        this.isDirty = true;


    }

    static saveData() {
        if (!this.isDirty) return;

        let s = JSON.stringify(this.uiData);
        localStorage.setItem("uiData", s);


        this.isDirty = false;
    }

    static clearLocalData() {
        localStorage.removeItem("uiData")

    }

    static saveToJson() {
        let data = JSON.stringify(this.uiData);
        this.download(data, 'uiSettings.json', 'text/plain');
    }

    static download(content, fileName, contentType) {
        var a = document.createElement("a");
        var file = new Blob([content], {type: contentType});
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }

}
