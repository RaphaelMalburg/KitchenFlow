import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PrepListDTO, PrepListItemDTO, StationDTO, StoragePlacesDTO, UnitOfMeasureDTO } from "@/models/Stations";

type Stations = {
  stations: StationDTO[];
  storagePlaces: StoragePlacesDTO[];
  prepLists: PrepListDTO[];
  prepListItems: PrepListItemDTO[];
  unitOfMeasure: UnitOfMeasureDTO[];

  setStations: (stations: StationDTO[]) => void;
  setStoragePlaces: (storagePlaces: StoragePlacesDTO[]) => void;
  setPrepLists: (prepLists: PrepListDTO[]) => void;
  setPrepListItems: (prepListItems: PrepListItemDTO[]) => void;
  setUnitOfMeasure: (unitOfMeasure: UnitOfMeasureDTO[]) => void;
};

const useStations = create(
  persist<Stations>(
    (set) => ({
      stations: [],
      storagePlaces: [],
      prepLists: [],
      prepListItems: [],
      unitOfMeasure: [],

      setStations: async (stations) => {
        set({ stations });
      },
      setStoragePlaces: (storagePlaces) => set({ storagePlaces }),
      setPrepLists: (prepLists) => set({ prepLists }),
      setPrepListItems: (prepListItems) => set({ prepListItems }),
      setUnitOfMeasure: (unitOfMeasure) => set({ unitOfMeasure }),
    }),
    {
      name: "station-storage",
    }
  )
);

export default useStations;
