class probabilityLib{
    static valuesOk(x,y){
        if (x < 0 || x > 1 || y < 0 || y > 1){
            return false;
        }
        return true;
    }

    static XandY(x, y){
        if (probabilityLib.valuesOk(x, y)){
            return x*y;
        }
        return 0;
    }

    static XandNotY(x, y){
        if (probabilityLib.valuesOk(x, y)){
            return x*(1-y);
        }
        return 0;
    }

    static XorY(x, y){
        if (probabilityLib.valuesOk(x, y)){
            return 1-((1-x)*(1-y));
        }
        return 0;
    }

    static XgivenY(x, y){
        if (probabilityLib.valuesOk(x, y)){
            return (x*y)/y;
        }
        return 0;
    }

    static XgivenNotY(x, y){
        if (probabilityLib.valuesOk(x, y)){
            return (probabilityLib.XandNotY(x, y))/(1-y);
        }
        return 0;
    }
}