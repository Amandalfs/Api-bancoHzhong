interface IVerifyAge {
    execute(nasc:string): boolean
}

class verifyAge implements IVerifyAge {
    execute (nasc:string){
        const date = new Date();
        const year = date.getFullYear();
        const nascYear = Number(nasc.slice(nasc.length-4));
        if(year-nascYear>=18) {
            return false;
        } else {
            return true;
        }
    
    }

}


export { verifyAge, IVerifyAge };