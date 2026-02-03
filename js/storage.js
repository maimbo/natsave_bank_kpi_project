/**
 * storage.js
 * Handles data persistence for Natsave Bank KPI Dashboard
 * Uses localStorage to save and retrieve data
 */

const STORAGE_KEY = 'natsave_kpi_data';

// Default empty data structure to ensure schema consistency
const DEFAULT_DATA = {
    financial: {},
    operational: {},
    quality: {},
    risk: {},
    compliance: {},
    lastUpdated: null
};

const StorageManager = {
    /**
     * Save data to localStorage
     * @param {string} category - 'financial', 'operational', 'quality', 'risk', 'compliance'
     * @param {object} data - The data object to save
     */
    saveKPIData(category, data) {
        try {
            const currentData = this.getAllKPIData();

            // Update specific category
            currentData[category] = { ...data };
            currentData.lastUpdated = new Date().toISOString();

            localStorage.setItem(STORAGE_KEY, JSON.stringify(currentData));
            console.log(`[Storage] Saved ${category} data successfully.`);
            return true;
        } catch (e) {
            console.error('[Storage] Error saving data:', e);
            return false;
        }
    },

    /**
     * Load all saved KPI data
     * @returns {object} The complete data object
     */
    getAllKPIData() {
        try {
            const dataStr = localStorage.getItem(STORAGE_KEY);
            if (!dataStr) return { ...DEFAULT_DATA };

            const parsedData = JSON.parse(dataStr);
            // Ensure all keys exist even if storage is partial
            return { ...DEFAULT_DATA, ...parsedData };
        } catch (e) {
            console.error('[Storage] Error loading data:', e);
            return { ...DEFAULT_DATA };
        }
    },

    /**
     * Clear all saved data
     */
    clearAllKPIData() {
        try {
            localStorage.removeItem(STORAGE_KEY);
            console.log('[Storage] Data cleared.');
            return true;
        } catch (e) {
            console.error('[Storage] Error clearing data:', e);
            return false;
        }
    },

    /**
     * Export data as JSON file
     */
    exportKPIData() {
        const data = this.getAllKPIData();
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "natsave_kpi_export_" + new Date().toISOString().slice(0, 10) + ".json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }
};

// Expose to window (global scope) for use in app.js
window.StorageManager = StorageManager;
