export class ErrorService {
    private static instance:ErrorService | null;


    public static getInstance() {
        if(this.instance) return this.instance
        else {
            this.instance = new ErrorService()
            return this.instance
        }
    }
}