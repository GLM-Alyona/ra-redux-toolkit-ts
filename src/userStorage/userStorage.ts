import { Films } from "../redux/slices/filmsSlice";

export const userStorage = {
    storage: localStorage,

    initialStorage() {
        if (!JSON.parse(this.storage.getItem('IMDbSerchAgent') as string)) {
            this.storage.setItem('IMDbSerchAgent', JSON.stringify({ favorite: [] }));
        }
    },

    addFavorite(favorite: { favorite: Films[] }) {
        this.storage.setItem('IMDbSerchAgent', JSON.stringify(favorite));
    },
    
    storageLoadFavorite() {
        try {
            return JSON.parse(this.storage.getItem('IMDbSerchAgent') as string)
          } catch (e) {
            throw new Error('Invalid data');
          }
    },
    
    removeFavorite() {
        this.storage.removeItem('IMDbSerchAgent')
    },
};