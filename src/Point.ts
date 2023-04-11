
export class Point {
    /**
     * współrzędna x punktu na ekranie
     */
    x: number;
    /**
     * współrzędna y punktu na ekranie
     */
    y: number;

    constructor(pageX: number, pageY: number) {
        this.x = pageX;
        this.y = pageY;
    }
}