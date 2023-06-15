import { IExtracsRepository, IReponseExtracs } from "../implementations/IExtractsRepository";
import { IExtracts } from "../modal/IExtracts";
import { compareAsc, isAfter, isBefore, isEqual, parseISO } from 'date-fns';

// "tipo", "saldo", "data", "descricao"

export class InMemoryExtractsRepository implements IExtracsRepository {
    public items: IExtracts[] = [];

    async SearchForMoreRecentExtractsById(id_user: number): Promise<IReponseExtracs[]> {
        const extracts = this.items.filter((item)=> {
            return item.id_user = id_user;
        })
        
        const extractsOrder = extracts.sort((item1, item2)=>{
            return compareAsc(new Date(item1.data), new Date(item2.data));
        })

        const extractsFive = extractsOrder.map((item)=>{
            return {
                data: item.data,
                descricao: item.descricao,
                saldo: item.saldo,
                tipo: item.tipo,
            }
           
        });

        return extractsFive.slice(0,5);
    }

    async createExtracts(data: IExtracts): Promise<void> {
        const id = this.items.length+1;

        const extract = {
            ...data,
            id,
        }
        
        await  this.items.push(extract);
    }

    async SearchForDataStartAndEndbyId(id: number, dateStart: string, dateEnd: string): Promise<IReponseExtracs[]> {
        const extracts = this.items.filter((item)=> {
            return item.id_user = id;
        })

        const extractsFilter = extracts.filter((item)=>{

            const dateIso = new Date(item.data);
            const dateStartISO = new Date(dateStart);
            const dateEndISO = new Date(dateEnd);
            
            if( ( isAfter(dateStartISO, dateIso) ||  isEqual(dateIso, dateStartISO)) && 
                ( isBefore(dateIso, dateEndISO) || isEqual(dateIso, dateEndISO))){
                    return item;
            }
        })

        const response =  extractsFilter.map((item)=>{
            return {
                data: item.data,
                descricao: item.descricao,
                saldo: item.saldo,
                tipo: item.tipo,
            }
           
        })
        
        return response;
    }

    async CountByWithdraw(dateStart: string, dateEnd: string, UserId: number): Promise<number> {
        const extracts = this.items.filter((item)=> {
            return item.id_user = UserId;
        })
        
        const extractsFilter = extracts.filter((item)=>{
            if( ( new Date(dateStart) >= new Date(item.data)) && ( new Date(dateEnd) <= new Date(item.data)) ){
                return item;
            }
        })
        const some =  extractsFilter.reduce((acumulador, extrato)=>{
            if(extrato.tipo === "Saque"){
                return acumulador += extrato.saldo;
            }
        },0)
        return some;
    }

    async CountBySending(dateStart: string, dateEnd: string, UserId: number): Promise<number> {
        const extracts = this.items.filter((item)=> {
            return item.id_user = UserId;
        })

        const extractsFilter = extracts.filter((item)=>{
            if( ( new Date(dateStart) >= new Date(item.data)) && ( new Date(dateEnd) <= new Date(item.data)) ){
                return item;
            }
        })

        const some =  extractsFilter.reduce((acumulador, extrato)=>{
            let some = acumulador
            if(extrato.tipo === "envio"){
                some += extrato.saldo;
            }
            return some;
        },0)
        return some;
    }
}
