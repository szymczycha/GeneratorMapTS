import { Point } from "./Point";

export class SelectionDiv{
    div: HTMLDivElement;
    startPoint: Point;
    isMoving: boolean
    constructor(){
        this.isMoving = false;
        this.div = document.getElementById("selectionDiv") as HTMLDivElement;
    }
    startSelect(pageX: number, pageY: number){
        this.startPoint = new Point(pageX, pageY);
        this.isMoving = true;
    }
    moveTo(currentX: number, currentY: number){
        if(this.isMoving){
            let currentPoint = new Point(currentX, currentY);
            let topLeftPoint = new Point(
                Math.min(this.startPoint.x, currentPoint.x),
                Math.min(this.startPoint.y, currentPoint.y)
                )
            let bottomRightPoint = new Point(
                Math.max(this.startPoint.x, currentPoint.x),
                Math.max(this.startPoint.y, currentPoint.y)
                )
            let width = bottomRightPoint.x - topLeftPoint.x;
            let height = bottomRightPoint.y - topLeftPoint.y;

            this.div.style.width = width-2+"px";
            this.div.style.height = height-2+"px";
            this.div.style.left = topLeftPoint.x+2+"px";
            this.div.style.top = topLeftPoint.y+2+"px";
        }
    }
    endSelect(){
        this.div.style.width = "0";
        this.div.style.height = "0";
        this.isMoving = false;
    }
}