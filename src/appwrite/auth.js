import conf from "../conf/conf"
import { Client, Account, ID } from "appwrite";
// console.log("conf.appwriteUrl",conf.appwriteUrl)


export class AuthService {
    client = new Client();
    account;
    constructor() {
        
        try {
            this.client
                .setEndpoint(conf.appwriteUrl)
                .setProject(conf.appwriteProjectId);
            // console.log("This is Client", this.client)
            this.account = new Account(this.client);
            // console.log("This is new A/c", this.account)
        } catch (error) {
            // console.log("Error setting Appwrite endpoint:", error);
            throw error; // Rethrow the error to handle it at the caller level
        }

    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            console.log("This is userAccount", userAccount);
            if (userAccount) {
                // call another method
                console.log("This is enrtryof 1 A/C", userAccount);
                return this.login({ email, password });
            } else {
                console.log("This is enrtryof 2 A/C", userAccount);
                return userAccount;
            }
        } catch (error) {
            console.log("This is exit Ac ", error)
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        // console.log("this is a entry")
        try {
            return await this.account.get();

        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }
        // console.log("this is a exit")
        return null;
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService