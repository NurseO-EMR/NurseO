export default class TapOutService {
    // eslint-disable-next-line no-use-before-define
    private static instance: TapOutService;
    // private writtenInfo: string;
    // private readonly id: string | null;


    // constructor() {
    //     this.writtenInfo = "";
    //     this.id = this.getUserID();
    //     if(this.id !== null) {
    //         this.initKeyboardListener();
    //         this.clearWrittenInfo();
    //     }
    // }

    // private initKeyboardListener() {
    //     document.addEventListener("keyup",e=>{
    //         this.writtenInfo +=e.key;
    //         this.checkIfWrittenInfoIsSameAsID();
    //     })
    // }

    // private clearWrittenInfo() {
    //     setInterval(()=>this.writtenInfo="", 500);
    // }

    // private async checkIfWrittenInfoIsSameAsID() {
    //     if(this.writtenInfo === this.id) {
    //         await getAuth().signOut();
    //         window.location.replace("/")
    //     }
    // }

    // private getUserID():string | null{
    //     if(getAuth().currentUser) {
    //         const email = getAuth().currentUser?.email
    //         if(email === null) return null;
    //         const id = email?.split("@")[0];
    //         return id!;
    //     }

    //     return "";
    // }











    public static getInstance() {
        // if (!TapOutService.instance) {
        //     TapOutService.instance = new TapOutService();
        // }
        // return TapOutService.instance;
        console.error("not implemented")
    }

    public static initialize() {
        this.getInstance();
    }

}