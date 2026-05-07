export default function getServerBaseUrl() {
    if (import.meta.env.PROD) return import.meta.env.VITE_SERVER_PRODUCTION_URL
    return import.meta.env.VITE_SERVER_DEVELOPMENT_URL
}