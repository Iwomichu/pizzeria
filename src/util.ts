export class Utilities{
    public static NormalizeMail(email: string){
        //Normalization

        return email;
    }
    public static kwotaSlownie(amount: number): string{
        let sentence = "";

        if(amount>1000000){
            sentence += Utilities.liczbaSlownie(Math.floor(amount/1000000)) + Utilities.milionyOdmiana(Math.floor(amount/1000000)%10);
            amount = Math.floor(amount%1000000);
        } 
        if(amount>1000){
            sentence += Utilities.liczbaSlownie(Math.floor(amount/1000)) + Utilities.tysiaceOdmiana(Math.floor(amount/1000)%10);
            amount = Math.floor(amount%1000);
        }
        sentence += Utilities.liczbaSlownie(amount);

        return sentence;

    }

    public static liczbaSlownie(amount: number): string{
        return Utilities.setki(amount) + Utilities.nieregularne(amount);
    }

    public static nieregularne(amount: number){
        if(amount%100>10 && amount%100<20){
            switch(amount%100){
                case 10: return "dziesiec ";
                case 11: return "jedenaście ";
                case 12: return "dwanaście ";
                case 13: return "trzynaście ";
                case 14: return "czternaście ";
                case 15: return "pietnaście ";
                case 16: return "szesnaście ";
                case 17: return "siedemnaście ";
                case 18: return "osiemnaście ";
                case 19: return "dziewietnaście ";
            }
        }
        return Utilities.dziesiatki(amount%100) + Utilities.jednosci(amount%10);
    }

    public static jednosci(amount: number): string{
        switch(amount){
            case 1: return "jeden ";
            case 2: return "dwa ";
            case 3: return "trzy ";
            case 4: return "cztery ";
            case 5: return "piec ";
            case 6: return "szesc ";
            case 7: return "siedem ";
            case 8: return "osiem ";
            case 9: return "dziewiec ";
            default: return "";
        }
    }

    public static dziesiatki(amount: number): string{
        if(amount>=90) return "dziewiecdziesiat ";
        if(amount>=80) return "osiemdziesiat ";
        if(amount>=70) return "siedemdziesiat ";
        if(amount>=60) return "szescdziesiat ";
        if(amount>=50) return "piecdziesiat ";
        if(amount>=40) return "czterdziesci ";
        if(amount>=30) return "trzydziesci ";
        if(amount>=20) return "dwadziescia ";
        return "";
    }

    public static setki(amount: number): string{
        if(amount>=900) return "dziewiecset ";
        if(amount>=800) return "osiemset ";
        if(amount>=700) return "siedemset ";
        if(amount>=600) return "szescset ";
        if(amount>=500) return "piecset ";
        if(amount>=400) return "czterysta ";
        if(amount>=300) return "trzysta ";
        if(amount>=200) return "dwiescie ";
        if(amount>=100) return "sto ";
        return "";
    }

    public static milionyOdmiana(amount: number): string{
        switch(amount){
            case 1:
            return "milion ";
            case 2:
            case 3:
            case 4:
            return "miliony ";
            default:
            return "milionów ";
        }
    }

    
    public static tysiaceOdmiana(amount: number): string{
        switch(amount){
            case 1:
            return "tysiac ";
            case 2:
            case 3:
            case 4:
            return "tysiace ";
            default:
            return "tysiecy ";
        }
    }
}