const config = {
    appUrl : String(import.meta.env.VITE_APP_URL),
    projectId : String(import.meta.env.VITE_PROJECT_ID),
    databaseId : String(import.meta.env.VITE_DATABASE_ID),
    collectionId : String(import.meta.env.VITE_COLLECTION_ID)
}

export default config;