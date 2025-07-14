import config from "../config.js";
import { Client, ID, Databases } from "appwrite";

class DatabaseServices {
    client = new Client();
    databases;
    constructor() {
        this.client.setEndpoint(config.appUrl).setProject(config.projectId);
        this.databases = new Databases(this.client);
    }
    
    async createTodo({title, completed, description, priority, category, userId}) {
        try {
            const todo = await this.databases.createDocument(
                config.databaseId,
                config.collectionId,
                ID.unique(),
                { title, completed, description, priority, category, userId }
            );
            return todo;
        } catch (error) {
            console.error("Error creating todo:", error);
            throw error;
        }
    }
    async getTodos(userId) {
        try {
            const response = await this.databases.listDocuments(
                config.databaseId,
                config.collectionId,
                [Query.equal('userId', userId)]
            );
            return response.documents;
        } catch (error) {
            console.error("Error fetching todos:", error);
            throw error;
        }
    }
    async deleteTodo(todoId) {
        try {
            await this.databases.deleteDocument(
                config.databaseId,
                config.collectionId,
                todoId
            );
        } catch (error) {
            console.error("Error deleting todo:", error);
            throw error;
        }
    }
    async updateTodo(todoId, updates) {
        try {
            const todo = await this.databases.updateDocument(
                config.databaseId,
                config.collectionId,
                todoId,
                updates    // This is a Ojbect containing the fields to update
            );
            return todo;
        } catch (error) {
            console.error("Error updating todo:", error);
            throw error;
        }
    }
}

const databaseServices = new DatabaseServices();
export default databaseServices;