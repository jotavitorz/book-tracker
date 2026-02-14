
export function calcProgress(current: number, total: number){
    
    if(total === 0 ){
        return 0;
    }

    return ((current / total) * 100).toFixed(2);
}