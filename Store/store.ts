import { SheetEntityStore } from '@/types';
import axios from 'axios';
import { create } from 'zustand';


export const useSheetStore = create<SheetEntityStore>((set) => ({
    identificator: "",
    loading: false,
    isOpen: false,
    setIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),

    setIdentificator: (id) => () => {
        set({  isOpen: true,  identificator: id,  });
    },

    data: null,

    execute: async (identificator, settinData, path) => {
        set({loading:true});

        if (identificator == "" || identificator == null) {
            set({  loading: false, data: null });
            return;
        }

        try {
            //const res = await axios.get(route(path, {id: identificator}));
            const userRes = await axios.get(path);
            const userData = userRes.data;
            set({  loading: false, data: userData });
            settinData(userData);
        } catch (err) {
            
        }
    },

    reset: () => set({  isOpen: false,  identificator: "",  })
}));